"use client";
import React, { useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import worker_script from "./worker";
import { CLASSES, FILE_URL } from "../classes";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

export interface DatabaseDownloaderProps {
  onDatabaseReady: () => void;
}

const DatabaseDownloader = ({ onDatabaseReady }: DatabaseDownloaderProps) => {
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
  const [downloadStart] = useState(true);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
      worker.onerror = (event) => {
        console.error("afif", event);
      };
      worker.onmessage = (event: {
        data: {
          error?: boolean;
          message?: string;
          title: string;
          status: "not_started" | "in_progress" | "completed" | "error";
        };
      }) => {
        const { title, status, error, message } = event.data;
        if (error) {
          console.log("error", event.data);
          setIsError(true);
          setErrorMessage(
            message ?? "Something went wrong! Please try again later"
          );
          return;
        }
        if (status === "in_progress") {
          setMessage(title);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progressByClass]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="100%"
      height="100vh"
      bgcolor="#f4f6f8"
    >
      {/* Header Section */}
      <Box
        width="100%"
        height={300}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        sx={{
          bgcolor: "primary.main",
          color: "white",
        }}
      >
        <Typography variant="h2" fontWeight="bold" gutterBottom>
          Memory Phrase
        </Typography>
        <Typography variant="h5" sx={{ opacity: 0.9 }}>
          Convert your seed phrase into a memorable story
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2, bgcolor: "white", color: "#2a9461" }}
          onClick={() => {
            window.open("https://forms.gle/MDHquLbNQKQEjxTh7", "_blank");
          }}
        >
          Get fully offline pro app for 10$
        </Button>
      </Box>

      {/* Progress Section */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        flex={1}
        px={3}
      >
        <Paper elevation={3} sx={{ width: "40%", p: 3, borderRadius: 3 }}>
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
            sx={{
              width: "100%",
              height: 12,
              borderRadius: 5,
              backgroundColor: "#e0e0e0",
              "& .MuiLinearProgress-bar": { backgroundColor: "primary.main" },
            }}
          />
          {isError && errorMessage && (
            <Box display={"flex"} flexDirection={"column"} mt={2} gap={1}>
              <Typography color="error">Fialed to download datasets</Typography>
              <Typography
                color="error"
                variant="body2"
                sx={{ opacity: 0.7, mt: 2 }}
              >
                {errorMessage}
              </Typography>
              <Button
                onClick={() => {
                  window.location.reload();
                }}
                variant="contained"
              >
                Retry
              </Button>
            </Box>
          )}
          {message && !isError && (
            <Box display={"flex"} flexDirection={"row"} mt={2} gap={1}>
              <Typography variant="h6" textAlign="center" sx={{ mt: 2 }}>
                {`Validating and downloading `}
              </Typography>
              <Typography
                variant="h6"
                textAlign="center"
                sx={{ mt: 2, color: "#2a9461" }}
              >
                {" " + message + " "}
              </Typography>
              <Typography variant="h6" textAlign="center" sx={{ mt: 2 }}>
                {` dataset`}
              </Typography>
            </Box>
          )}
        </Paper>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ opacity: 0.7, mt: 2 }}
        >
          This process can take up to a minute for the very first time
        </Typography>
      </Box>
    </Box>
  );
};
export default DatabaseDownloader;
