"use client";
import { Box, Button, Container, Typography } from "@mui/material";

const accentColor = "#2a9461";
const softAccent = "#8ec8ac"; // Averaged color

export default function Choice({
  onEncodeClick,
  onDecodeClick,
}: {
  onEncodeClick: () => void;
  onDecodeClick: () => void;
}) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        bgcolor: "#f1fdf7",
        px: 2,
      }}
    >
      {/* Header */}
      <Typography variant="h2" fontWeight="bold" color={accentColor} mb={2}>
        Memorize Your Seed Phrase
      </Typography>
      <Typography variant="h5" color="#444" maxWidth="600px" mb={4}>
        Secure your crypto assets by transforming your seed phrase into an
        easy-to-remember format.
      </Typography>

      {/* Buttons */}
      <Container maxWidth="sm">
        <Button
          variant="contained"
          fullWidth
          sx={{
            bgcolor: accentColor,
            color: "white",
            fontSize: "1.2rem",
            fontWeight: "bold",
            py: 2,
            borderRadius: "8px",
            mb: 2,
            textTransform: "none",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            "&:hover": { bgcolor: "#227548" },
          }}
          onClick={onEncodeClick}
        >
          Convert Seed Phrase to Memory
        </Button>

        <Button
          variant="contained"
          fullWidth
          sx={{
            bgcolor: softAccent,
            color: "white",
            fontSize: "1.2rem",
            fontWeight: "bold",
            py: 2,
            borderRadius: "8px",
            textTransform: "none",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            "&:hover": { bgcolor: "#6ea48a" },
          }}
          onClick={onDecodeClick}
        >
          Convert Memory to Seed Phrase
        </Button>
      </Container>
    </Box>
  );
}
