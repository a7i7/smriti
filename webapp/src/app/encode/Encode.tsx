"use client";
import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { SubmitHandler, useForm } from "react-hook-form";

import Grid from "@mui/material/Grid2";
import {
  Autocomplete,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Paper,
  TextField,
} from "@mui/material";
import { wordlist } from "@scure/bip39/wordlists/english";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { getEncodedIndexes, METADATA } from "../brain";
import { CLASSES } from "../classes";
import * as bip39 from "@scure/bip39";

interface SeedPhraseFormValues {
  phrase0: string;
  phrase1: string;
  phrase2: string;
  phrase3: string;
  phrase4: string;
  phrase5: string;
  phrase6: string;
  phrase7: string;
  phrase8: string;
  phrase9: string;
  phrase10: string;
  phrase11: string;
}

const seedPhraseSchema = yup.object().shape({
  phrase0: yup.string().required(),
  phrase1: yup.string().required(),
  phrase2: yup.string().required(),
  phrase3: yup.string().required(),
  phrase4: yup.string().required(),
  phrase5: yup.string().required(),
  phrase6: yup.string().required(),
  phrase7: yup.string().required(),
  phrase8: yup.string().required(),
  phrase9: yup.string().required(),
  phrase10: yup.string().required(),
  phrase11: yup.string().required(),
});

const Encode = ({ onBack }: { onBack: () => void }) => {
  const { setValue, watch, handleSubmit } = useForm<SeedPhraseFormValues>({
    resolver: yupResolver<SeedPhraseFormValues>(seedPhraseSchema),
  });

  const onSubmit: SubmitHandler<SeedPhraseFormValues> = async (
    data: SeedPhraseFormValues
  ) => {
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    const seedPhrase = Array.from({ length: 12 })
      .map((_, i) => data[`phrase${i}`])
      .join(" ");
    setMemoryIndexes(getEncodedIndexes(seedPhrase));
  };

  const cards = [
    {
      id: "random",
      title: "Generate randomly",
      description: "Roll the dice and generate a seed phrase.",
    },
    {
      id: "manual",
      title: "Enter your own",
      description: "If you already have a seed phrase, enter it here.",
    },
  ];

  const [selectedCard, setSelectedCard] = React.useState<string | null>(
    "manual"
  );

  const [generateSeedPhrase, setGenerateSeedPhrase] = React.useState(false);

  const [memoryIndexes, setMemoryIndexes] = React.useState<number[] | null>(
    null
  );

  const [generationStatues, setGenerationStatus] = React.useState(
    METADATA.map((m) => {
      return {
        title: m.title,
        status: "not_started",
        data: undefined,
      };
    })
  );

  useEffect(() => {
    if (generateSeedPhrase) {
      const words = bip39.generateMnemonic(wordlist).split(" ");
      // const words =
      //   "laundry flower allow city excite leisure mind column because fiction unlock ugly".split(
      //     " "
      //   );
      for (let i = 0; i < 12; i++) {
        // console.log(words[i]);
        setValue(`phrase${i}`, words[i]);
      }
      setGenerateSeedPhrase(false);
      window.scrollBy(0, 100);
    }
  }, [generateSeedPhrase]);

  useEffect(() => {
    const fetchData = async () => {
      if (!memoryIndexes) {
        return;
      }
      try {
        // Open the IndexedDB
        const request = indexedDB.open("MyDatabase");

        request.onsuccess = (event) => {
          const db = event.target.result;

          CLASSES.forEach((cls, i) => {
            const transaction = db.transaction(cls.title, "readonly");
            const objectStore = transaction.objectStore(cls.title);

            const data = objectStore.get(memoryIndexes[i]);

            data.onsuccess = () => {
              const result = data.result;
              // console.log(result);
              setGenerationStatus((prev) => {
                return prev.map((item, index) => {
                  if (index === i) {
                    return {
                      ...item,
                      status: "completed",
                      data: result,
                    };
                  }
                  return item;
                });
              });
            };

            data.onerror = () => {
              console.error("Error counting data:", data.error);
            };
          });
        };
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    };

    if (memoryIndexes) {
      fetchData();
      const element = document.getElementById("memory-display");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }

    // Cleanup (optional)
    return () => {
      // Any cleanup logic if required
    };
  }, [memoryIndexes]); // Empty dependency array ensures this runs once on mount.

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
        height={250}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        sx={{
          bgcolor: "primary.main",
          color: "white",
          boxShadow: 2,
          p: 3,
        }}
      >
        <Box
          width="100%"
          display="flex"
          justifyContent={"flex-start"}
          alignItems={"center"}
        >
          <Typography
            variant="body1"
            fontWeight="bold"
            gutterBottom
            sx={{
              cursor: "pointer",
            }}
            onClick={onBack}
          >
            Go back
          </Typography>
        </Box>
        <Typography variant="h2" fontWeight="bold" gutterBottom>
          Memory Phrase
        </Typography>
        <Typography variant="h5" sx={{ opacity: 0.9 }}>
          Convert your seed phrase into a memorable story
        </Typography>
      </Box>

      {/* Card Selection Section */}
      <Box
        display="flex"
        justifyContent="center"
        gap={3}
        flexWrap="wrap"
        mt={4}
        mb={4}
      >
        {cards.map((card, index) => (
          <Card
            key={index}
            sx={{
              maxWidth: 400,
              borderRadius: 3,
              transition: "0.3s",
              boxShadow: selectedCard === card.id ? 5 : 2,
            }}
          >
            <CardActionArea
              onClick={() => {
                setSelectedCard(card.id);
                if (card.id === "random") {
                  setGenerateSeedPhrase(true);
                  setMemoryIndexes(null);
                } else {
                  new Array(12).fill(0).forEach((_, i) => {
                    setValue(`phrase${i}`, "");
                  });
                  setMemoryIndexes(null);
                }
              }}
              sx={{
                height: "100%",
                p: 2,
                bgcolor: selectedCard === card.id ? "action.selected" : "white",
                "&:hover": {
                  bgcolor: "action.selectedHover",
                },
              }}
            >
              <CardContent>
                <Typography variant="h5" fontWeight="bold">
                  {card.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {card.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>

      {/* Form Section */}
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
          <Paper
            elevation={3}
            sx={{
              width: "80%",
              p: 4,
              borderRadius: 3,
              boxShadow: 2,
              backgroundColor: "white",
            }}
          >
            <Grid container spacing={3}>
              {new Array(12).fill(0).map((_, i) => (
                <Grid size={6} key={i}>
                  <Autocomplete
                    value={(watch(`phrase${i}`) ?? "") as string}
                    onChange={(e, value) => setValue(`phrase${i}`, value ?? "")}
                    options={wordlist}
                    renderInput={(params) => (
                      <TextField {...params} label={`${i + 1}.`} fullWidth />
                    )}
                    disabled={selectedCard === "random"}
                  />
                </Grid>
              ))}
              <Grid size={12} display="flex" justifyContent="center">
                <Button variant="contained" type="submit" size="large">
                  Generate Memory
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </form>

      {/* Memory Display Section */}
      {memoryIndexes && (
        <Box
          width="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          mt={5}
          px={3}
        >
          <Typography
            variant="h3"
            fontWeight="bold"
            gutterBottom
            id="memory-display"
          >
            Memory
          </Typography>

          <Box
            display="flex"
            flexDirection="column"
            gap={3}
            width={{ xs: "90%", md: "70%", lg: "60%" }}
            mb={2}
          >
            {memoryIndexes.map((index, i) => (
              <Card
                key={i}
                sx={{
                  borderRadius: 3,
                  boxShadow: 3,
                  transition: "0.3s",
                  "&:hover": { boxShadow: 6 },
                }}
              >
                <CardContent>
                  {/* Title Row */}
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    gap={2}
                    mb={2}
                  >
                    <Typography variant="h5" fontWeight="bold" color="primary">
                      {CLASSES[i].title}
                    </Typography>
                    <Typography variant="h3">{CLASSES[i].emoji}</Typography>
                  </Box>

                  <Divider />

                  {/* Generated Content */}
                  <Box py={3}>
                    {generationStatues[i].data &&
                      CLASSES[i].render(generationStatues[i].data)}
                  </Box>

                  <Divider />
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Encode;
