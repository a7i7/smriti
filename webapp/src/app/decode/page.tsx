"use client";
import Box from "@mui/material/Box";
import ClassCard from "./ClassCard";
import { CLASSES, SEARCH_ATTRIBUTES_EXTRACTOR } from "../classes";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import {
  Button,
  Card,
  CardContent,
  Divider,
  selectClasses,
  Typography,
} from "@mui/material";

const Decode = () => {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchStarted, setIsSearchStarted] = useState(false);

  const [searchResults, setSearchResults] = useState<
    { data: any; index: number }[]
  >([]);

  const [selectedResults, setSelectedResults] = useState<
    {
      id: string;
      data: any;
      index: number;
    }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Open the IndexedDB
        const request = indexedDB.open("MyDatabase");

        request.onsuccess = (event) => {
          const db = event.target.result;

          const classTitle = CLASSES.find(
            (cls) => cls.id === selectedClass
          )?.title;

          console.log("abc");
          if (!classTitle) {
            return;
          }
          console.log("def");

          const transaction = db.transaction(classTitle, "readonly");
          const objectStore = transaction.objectStore(classTitle);

          const data = objectStore.getAll();

          data.onsuccess = () => {
            const result = data.result;
            const searchExtractor = SEARCH_ATTRIBUTES_EXTRACTOR.find(
              (cls) => cls.id === selectedClass
            )?.extractor;

            if (searchExtractor) {
              const searchResults = result
                .map((data, index) => {
                  return {
                    data,
                    index,
                  };
                })
                .filter(({ data, index }) => {
                  const tokens = searchExtractor(data)
                    .filter((at) => at)
                    .flatMap((at) => at.split(/[ @]+/))
                    .map((at) => at.toLowerCase());
                  const searchTokens = searchQuery.toLowerCase().split(" ");

                  return (
                    searchQuery.length === 0 ||
                    searchTokens.every((splitQuery) => {
                      return tokens.some((at) => at.startsWith(splitQuery));
                    })
                  );
                });
              if (searchResults.length < 20) {
                console.log(searchResults);
                setSearchResults(searchResults);
              } else {
                setSearchResults(searchResults.slice(0, 20));
              }
            }
          };

          data.onerror = () => {
            console.error("Error counting data:", data.error);
          };
        };
      } catch (error) {
        console.error("Unexpected error:", error);
      }
      setIsSearchStarted(false);
    };

    if (isSearchStarted) {
      fetchData();
    }

    // Cleanup (optional)
    return () => {
      // Any cleanup logic if required
    };
  }, [isSearchStarted]); // Empty dependency array ensures this runs once on mount.

  return (
    <>
      <Box display={"flex"}>
        <Box display="flex" flexDirection={"column"} gap="24px" padding="24px">
          {CLASSES.map((item) => {
            return (
              <ClassCard
                key={item.id}
                id={item.id}
                onClick={() => {
                  setSearchResults([]);
                  setSelectedClass(item.id);
                }}
                active={selectedClass === item.id}
                completed={selectedResults.some(
                  (selectedItem) => selectedItem.id === item.id
                )}
              />
            );
          })}{" "}
        </Box>
        <Divider orientation="vertical" flexItem sx={{ mr: 2 }} />
        <Box
          width={"100%"}
          display={"flex"}
          flexDirection={"column"}
          gap="8px"
          padding="8px"
        >
          {selectedClass && (
            <Typography variant="h2">
              {CLASSES.find((cls) => cls.id === selectedClass)?.title}
            </Typography>
          )}
          {selectedClass &&
            selectedResults.some((item) => item.id === selectedClass) && (
              <Card>
                <CardContent>
                  <Box py={3}>
                    {CLASSES.find((cls) => cls.id === selectedClass)?.render(
                      selectedResults.find((item) => item.id === selectedClass)
                        ?.data
                    )}
                  </Box>
                </CardContent>
              </Card>
            )}
          {selectedClass && (
            <Box display={"flex"} flexDirection={"column"} gap="16px">
              <Box display={"flex"} flexDirection={"row"} gap="8px">
                <TextField
                  placeholder={`Search ${
                    CLASSES.find((cls) => cls.id === selectedClass)?.title ?? ""
                  }`}
                  sx={{ width: "100%" }}
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                  }}
                />
                <Button
                  onClick={() => {
                    setIsSearchStarted(true);
                  }}
                >
                  Search
                </Button>
              </Box>
              {searchResults &&
                searchResults.map(({ data, index }) => {
                  return (
                    <Card key={index}>
                      <CardContent>
                        <Box
                          display="flex"
                          alignItems={"center"}
                          justifyContent={"flex-end"}
                          sx={{ p: 1 }}
                        >
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
                                  return prevData.map((item) => {
                                    if (item.id === selectedClass) {
                                      return {
                                        id: selectedClass,
                                        data,
                                        index,
                                      };
                                    }
                                    return item;
                                  });
                                } else {
                                  return [
                                    ...prevData,
                                    {
                                      id: selectedClass,
                                      data,
                                      index,
                                    },
                                  ];
                                }
                              });
                            }}
                          >
                            Accept
                          </Button>
                        </Box>
                        <Divider />
                        <Box py={3}>
                          {data &&
                            CLASSES.find(
                              (cls) => cls.id === selectedClass
                            )?.render(data)}
                        </Box>
                      </CardContent>
                    </Card>
                  );
                })}
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Decode;
