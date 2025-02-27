// import { openDB } from "idb";

const workerCode = () => {
  self.onmessage = async function (event) {
    const { CLASSES, FILE_URL, dbName, dbVersion } = event.data;

    const dbRequest = indexedDB.open(dbName, dbVersion);

    dbRequest.onupgradeneeded = function (event) {
      // @ts-expect-error Ignore until later
      const db = event.target?.result;
      // console.log("Upgrading database...");

      // Create object stores for each class if they don't exist
      for (const cls of CLASSES) {
        if (!db.objectStoreNames.contains(cls.title)) {
          db.createObjectStore(cls.title, { autoIncrement: true });
        }
      }
    };

    dbRequest.onsuccess = async function (event) {
      try {
        // @ts-expect-error Ignore until later
        const db = event.target.result;
        // console.log("Database opened successfully");

        for (const cls of CLASSES) {
          // Read data from files and store in indexedDB

          const transaction = db.transaction(cls.title, "readonly");
          const objectStore = transaction.objectStore(cls.title);

          // Count the entries
          const countRequest = objectStore.count();

          countRequest.onsuccess = function () {
            const count = countRequest.result;
            console.log(
              `Entries in ${cls.title}: ${cls.length}:: count ${count}`
            );
            if (count === cls.length) {
              self.postMessage({ title: cls.title, status: "completed" });
              return;
            }
          };

          self.postMessage({ title: cls.title, status: "in_progress" });

          for (const file of cls.files) {
            const response = await fetch(FILE_URL + file);
            if (!response.ok) {
              throw new Error(`Failed to fetch ${file}`);
            }

            const data = await response.json();

            const tx = db.transaction(cls.title, "readwrite");
            const store = tx.objectStore(cls.title);
            /* eslint-disable  @typescript-eslint/no-explicit-any */
            data.forEach((item: any, index: number) => {
              store.put(item, index);
            });

            await new Promise((resolve, reject) => {
              tx.oncomplete = resolve;
              tx.onerror = reject;
            });

            self.postMessage({ title: cls.title, status: "completed" });
            console.log(`Data from ${file} stored in ${cls.title}`);
          }
        }
      } catch (error) {
        self.postMessage({
          error: true,
          // @ts-expect-error Ignore until later
          message: error?.message ?? "Failed message",
        });
      }
    };

    dbRequest.onerror = function (event) {
      self.postMessage({
        error: true,
        // @ts-expect-error Ignore until later
        message: event.target?.error?.message ?? "Failed message 2",
      });
    };
  };
};

let code = workerCode.toString();
code = code.substring(code.indexOf("{") + 1, code.lastIndexOf("}"));

const blob = new Blob([code], { type: "application/javascript" });
const worker_script = URL.createObjectURL(blob);

export default worker_script;
