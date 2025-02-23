"use client";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import ClassCard from "./ClassCard";
import { CLASSES, SEARCH_ATTRIBUTES_EXTRACTOR } from "../classes";
import SeedPhraseModal from "./SeedPhraseModal";

const accentColor = "#2a9461";

const Decode = ({ onBack }: { onBack: () => void }) => {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchStarted, setIsSearchStarted] = useState(false);
  const [showDecodedSeedPhraseModal, setShowDecodedSeedPhraseModal] =
    useState(false);
  const [searchResults, setSearchResults] = useState<
    { data: any; index: number }[]
  >([]);
  const [selectedResults, setSelectedResults] = useState<
    { id: string; data: any; index: number }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const request = indexedDB.open("MyDatabase");

        request.onsuccess = (event) => {
          const db = event.target.result;
          const classTitle = CLASSES.find(
            (cls) => cls.id === selectedClass
          )?.title;

          if (!classTitle) return;

          const transaction = db.transaction(classTitle, "readonly");
          const objectStore = transaction.objectStore(classTitle);
          const data = objectStore.getAll();

          data.onsuccess = () => {
            const result = data.result;
            const searchExtractor = SEARCH_ATTRIBUTES_EXTRACTOR.find(
              (cls) => cls.id === selectedClass
            )?.extractor;

            if (searchExtractor) {
              const filteredResults = result
                .map((data, index) => ({ data, index }))
                .filter(({ data }) => {
                  const tokens = searchExtractor(data)
                    .filter(Boolean)
                    .flatMap((at) => at.split(/[ @]+/))
                    .map((at) => at.toLowerCase());
                  const searchTokens = searchQuery.toLowerCase().split(" ");

                  return (
                    searchQuery.length === 0 ||
                    searchTokens.every((splitQuery) =>
                      tokens.some((at) => at.startsWith(splitQuery))
                    )
                  );
                });

              setSearchResults(filteredResults.slice(0, 100));
            }
          };

          data.onerror = () =>
            console.error("Error retrieving data:", data.error);
        };
      } catch (error) {
        console.error("Unexpected error:", error);
      }
      setIsSearchStarted(false);
    };

    if (isSearchStarted) {
      fetchData();
    }
  }, [isSearchStarted]);

  return (
    <Box display="flex" flexDirection="column">
      {/* Progress Section */}
      <Box
        width="100%"
        height="100px"
        bgcolor="#f1fdf7" // Soft background to complement the accent color
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        p={2}
        gap={1}
        borderRadius="8px"
        boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)" // Light shadow for depth
      >
        {selectedResults.length === CLASSES.length ? (
          <Button
            variant="contained"
            sx={{
              bgcolor: accentColor,
              color: "white",
              fontWeight: "bold",
              fontSize: "1.1rem",
              padding: "12px 24px",
              borderRadius: "8px",
              textTransform: "none",
              boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.2)",
              "&:hover": { bgcolor: "#227548" }, // Darker shade for hover
            }}
            onClick={() => setShowDecodedSeedPhraseModal(true)}
          >
            Get Seed Phrase
          </Button>
        ) : (
          <>
            <Box width={"100%"}>
              <Button onClick={onBack}>Back</Button>
            </Box>
            <Box width="80%">
              <LinearProgress
                variant="determinate"
                sx={{
                  width: "100%",
                  height: "12px",
                  borderRadius: "6px",
                  bgcolor: "#8ec8ac", // Soft greenish-gray background
                  "& .MuiLinearProgress-bar": {
                    bgcolor: accentColor, // Accent color for progress bar,
                  },
                }}
                value={(selectedResults.length / CLASSES.length) * 100}
              />
            </Box>

            <Typography variant="body1" color="#444" mt={1}>
              {selectedResults.length} of {CLASSES.length} selected
            </Typography>
          </>
        )}
      </Box>

      {/* Main Content */}
      <Box display="flex">
        {/* Sidebar (Categories) */}
        <Box
          display="flex"
          flexDirection="column"
          gap={2}
          p={3}
          width="300px"
          sx={{ bgcolor: "#f9f9f9", borderRight: "1px solid #ddd" }}
        >
          {CLASSES.map((item) => (
            <ClassCard
              key={item.id}
              id={item.id}
              onClick={() => {
                setSearchResults([]);
                setSelectedClass(item.id);
                setSearchQuery("");
              }}
              active={selectedClass === item.id}
              completed={selectedResults.some(
                (selectedItem) => selectedItem.id === item.id
              )}
            />
          ))}
        </Box>

        {/* Content Area */}
        <Box flex={1} p={3} display="flex" flexDirection="column" gap={2}>
          {/* Selected Class Title */}
          {selectedClass && (
            <Typography variant="h4" color={accentColor} fontWeight="bold">
              {CLASSES.find((cls) => cls.id === selectedClass)?.title}
            </Typography>
          )}

          {/* Selected Item Display */}
          {selectedClass &&
            selectedResults.some((item) => item.id === selectedClass) && (
              <Card sx={{ borderLeft: `5px solid ${accentColor}` }}>
                <CardContent>
                  <Box display="flex" justifyContent="flex-end" width={"100%"}>
                    <Button
                      variant="text"
                      onClick={() => {
                        setSelectedResults((prevData) =>
                          prevData.filter((item) => item.id !== selectedClass)
                        );
                      }}
                    >
                      Clear
                    </Button>
                  </Box>

                  {CLASSES.find((cls) => cls.id === selectedClass)?.render(
                    selectedResults.find((item) => item.id === selectedClass)
                      ?.data
                  )}
                </CardContent>
              </Card>
            )}

          {/* Search Input */}
          {selectedClass &&
            !selectedResults.some((item) => item.id === selectedClass) && (
              <Box display="flex" gap={2} alignItems="center">
                <TextField
                  placeholder={`Search ${
                    CLASSES.find((cls) => cls.id === selectedClass)?.title || ""
                  }`}
                  fullWidth
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                  variant="contained"
                  sx={{ bgcolor: accentColor, fontWeight: "bold" }}
                  onClick={() => setIsSearchStarted(true)}
                >
                  Search
                </Button>
              </Box>
            )}

          {/* Search Results */}
          {searchResults.length > 0 &&
            !selectedResults.some((item) => item.id === selectedClass) && (
              <Box display="flex" flexDirection="column" gap={2}>
                {searchResults.map(({ data, index }) => (
                  <Card key={index} sx={{ border: `1px solid ${accentColor}` }}>
                    <CardContent>
                      <Box display="flex" justifyContent="flex-end">
                        <Button
                          color="success"
                          variant="contained"
                          onClick={() => {
                            setSelectedResults((prevData) => {
                              if (
                                prevData.some(
                                  (item) => item.id === selectedClass
                                )
                              ) {
                                return prevData.map((item) =>
                                  item.id === selectedClass
                                    ? { id: selectedClass, data, index }
                                    : item
                                );
                              } else {
                                return [
                                  ...prevData,
                                  { id: selectedClass, data, index },
                                ];
                              }
                            });
                          }}
                        >
                          Accept
                        </Button>
                      </Box>
                      <Divider sx={{ my: 2 }} />
                      {CLASSES.find((cls) => cls.id === selectedClass)?.render(
                        data
                      )}
                    </CardContent>
                  </Card>
                ))}
              </Box>
            )}
        </Box>
      </Box>

      {/* Seed Phrase Modal */}
      {showDecodedSeedPhraseModal && (
        <SeedPhraseModal
          open={showDecodedSeedPhraseModal}
          onClose={() => setShowDecodedSeedPhraseModal(false)}
          memoryIndexes={
            CLASSES.map(
              (cls) => selectedResults.find((item) => item.id === cls.id)?.index
            ) as number[]
          }
        />
      )}
    </Box>
  );
};

export default Decode;
