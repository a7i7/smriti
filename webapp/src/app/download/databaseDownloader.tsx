"use client";
import React, { useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import worker_script from "./worker";
import { CLASSES, FILE_URL } from "../classes";
import { useRouter } from "next/navigation";

export interface DatabaseDownloaderProps {
  onDatabaseReady: () => void;
}

const DatabaseDownloader = ({ onDatabaseReady }: DatabaseDownloaderProps) => {
  const router = useRouter();
  const [progressByClass, setProgressByClass] = useState<
    {
      [key: string]: "not_started" | "in_progress" | "completed" | "error";
    }[]
  >(
    CLASSES.map((cls) => {
      return {
        [cls.title]: "not_started",
      };
    })
  );
  const [downloadStart, setDownloadStart] = useState(true);
  const [message, setMessage] = useState("");

  const updateStatus = (
    title: string,
    status: "not_started" | "in_progress" | "completed" | "error"
  ) => {
    setProgressByClass((prev) => {
      return prev.map((item) => {
        if (Object.keys(item)[0] === title) {
          return {
            [title]: status,
          };
        }
        return item;
      });
    });
  };
  useEffect(() => {
    if (downloadStart) {
      const worker = new Worker(worker_script);
      worker.onmessage = (event: {
        data: {
          title: string;
          status: "not_started" | "in_progress" | "completed" | "error";
        };
      }) => {
        const { title, status } = event.data;
        if (status === "in_progress") {
          setMessage(`Validating and downloading ${title}`);
        }

        updateStatus(title, status);
      };
      worker.postMessage({
        CLASSES: CLASSES.map((c) => {
          return {
            ...c,
            render: null,
          };
        }),
        FILE_URL,
        dbName: "MyDatabase",
        dbVersion: 1,
      });
      // Cleanup
      return () => {
        worker.terminate();
      };
    }
  }, [downloadStart]);

  useEffect(() => {
    const allCompleted = progressByClass.every((item) => {
      return Object.values(item)[0] === "completed";
    });

    if (allCompleted) {
      onDatabaseReady();
    }
  }, [progressByClass]);

  return (
    <Box display="flex" flexDirection="column" width={"100%"} height={"100vh"}>
      <Box
        width="100%"
        height="250px"
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Typography variant="h2" gutterBottom>
          Memory phrase
        </Typography>
        <Typography variant="h5" gutterBottom>
          Convert your seed phrase into a memorable story
        </Typography>
      </Box>
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Box width={"40%"} mb={2}>
          <LinearProgress
            variant="determinate"
            value={Math.round(
              (progressByClass.filter((item) => {
                const status = Object.values(item)[0];
                return status === "completed";
              }).length /
                progressByClass.length) *
                100
            )}
            sx={{ width: "100%", height: 10 }}
          />
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            {message}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
export default DatabaseDownloader;
