"use client";
import React, { useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import worker_script from "./worker";
import { CLASSES, FILE_URL } from "../classes";
import { truncateSync } from "node:fs";
const DatabaseDownloader = () => {
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
        console.log(event.data);
        const { title, status } = event.data;
        updateStatus(title, status);
      };
      worker.postMessage({
        CLASSES,
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
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{
            minWidth: 500,
          }}
          onClick={() => {
            setDownloadStart(true);
          }}
        >
          Start Progress
        </Button>

        {progressByClass.map((item, index) => {
          const title = Object.keys(item)[0];
          const status = Object.values(item)[0];
          return (
            <Box key={index} width={"40%"} mb={2}>
              <Typography variant="h6" gutterBottom>
                {title}
              </Typography>
              <LinearProgress
                variant={
                  status === "in_progress" ? "indeterminate" : "determinate"
                }
                value={status === "completed" ? 100 : 0}
                color={status === "error" ? "error" : "success"}
                sx={{ width: "100%", height: 10 }}
              />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
export default DatabaseDownloader;
