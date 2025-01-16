// import { openDB } from "idb";

const workerCode = () => {
  self.onmessage = async function (event) {
    const { CLASSES, FILE_URL, dbName, dbVersion } = event.data;

    const dbRequest = indexedDB.open(dbName, dbVersion);

    dbRequest.onupgradeneeded = function (event) {
      const db = event.target?.result;
      console.log("Upgrading database...");

      // Create object stores for each class if they don't exist
      for (const cls of CLASSES) {
        if (!db.objectStoreNames.contains(cls.title)) {
          db.createObjectStore(cls.title, { autoIncrement: true });
        }
      }
    };

    dbRequest.onsuccess = async function (event) {
      const db = event.target.result;
      console.log("Database opened successfully");

      for (const cls of CLASSES) {
        self.postMessage({ title: cls.title, status: "in_progress" });

        for (const file of cls.files) {
          try {
            const response = await fetch(FILE_URL + file);
            if (!response.ok) {
              throw new Error(`Failed to fetch ${file}`);
            }

            const data = await response.json();
            console.log(`Fetched data from ${file}`);
            console.log(data);

            const tx = db.transaction(cls.title, "readwrite");
            const store = tx.objectStore(cls.title);

            data.forEach((item, index) => {
              store.put(item, index);
            });

            await new Promise((resolve, reject) => {
              tx.oncomplete = resolve;
              tx.onerror = reject;
            });

            self.postMessage({ title: cls.title, status: "completed" });
            console.log(`Data from ${file} stored in ${cls.title}`);
          } catch (error) {
            console.error(error.message);
            self.postMessage({ title: cls.title, status: "error" });
          }
        }
      }
    };

    dbRequest.onerror = function (event) {
      console.error("Database error:", event.target?.error);
    };
  };
};

let code = workerCode.toString();
code = code.substring(code.indexOf("{") + 1, code.lastIndexOf("}"));

const blob = new Blob([code], { type: "application/javascript" });
const worker_script = URL.createObjectURL(blob);

export default worker_script;
