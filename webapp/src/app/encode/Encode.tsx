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
  TextField,
} from "@mui/material";
import { wordlist } from "@scure/bip39/wordlists/english";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { getEncodedIndexes, METADATA } from "../brain";
import * as bip39 from "@scure/bip39";
import { CLASSES } from "../classes";

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

const Encode = () => {
  const { register, setValue, getValues, watch, handleSubmit } =
    useForm<SeedPhraseFormValues>({
      resolver: yupResolver<SeedPhraseFormValues>(seedPhraseSchema),
    });

  const onSubmit: SubmitHandler<SeedPhraseFormValues> = async (
    data: SeedPhraseFormValues
  ) => {
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

  const [selectedCard, setSelectedCard] = React.useState<string | null>(null);

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
      for (let i = 0; i < 12; i++) {
        console.log(words[i]);
        setValue(`phrase${i}`, words[i]);
      }
      setGenerateSeedPhrase(false);
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
              console.log(result);
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

    fetchData();

    // Cleanup (optional)
    return () => {
      // Any cleanup logic if required
    };
  }, [memoryIndexes]); // Empty dependency array ensures this runs once on mount.

  return (
    <Box
      display="flex"
      flexDirection="column"
      width={"100%"}
      height={"100vh"}
      padding="24px"
    >
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
        <Box
          sx={{
            gap: 2,
          }}
          justifyContent={"space-between"}
          display={"flex"}
          alignItems={"center"}
          padding="36px 0px"
        >
          {cards.map((card, index) => (
            <Card
              key={index}
              sx={{
                maxWidth: "400px",
              }}
            >
              <CardActionArea
                onClick={() => {
                  setSelectedCard(card.id);
                  if (card.id === "random") {
                    setGenerateSeedPhrase(true);
                  } else {
                    new Array(12).fill(0).forEach((_, i) => {
                      setValue(`phrase${i}`, "");
                    });
                  }
                }}
                data-active={selectedCard === card.id ? "" : undefined}
                sx={{
                  height: "100%",
                  "&[data-active]": {
                    backgroundColor: "action.selected",
                    "&:hover": {
                      backgroundColor: "action.selectedHover",
                    },
                  },
                }}
              >
                <CardContent sx={{ height: "100%" }}>
                  <Typography variant="h5" component="div">
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
      </Box>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          marginRight={"20%"}
          marginLeft={"20%"}
        >
          <Grid
            container
            border="0px solid black"
            spacing={4}
            paddingBottom={"36px"}
          >
            {new Array(12).fill(0).map((_, i) => {
              return (
                <Grid size={6} key={i}>
                  <Autocomplete
                    value={(watch(`phrase${i}`) ?? "") as string}
                    onChange={(e, value) => {
                      setValue(`phrase${i}`, value ?? "");
                    }}
                    options={wordlist}
                    renderInput={(params) => (
                      <TextField {...params} label={`${i + 1}.`} />
                    )}
                    disabled={selectedCard === "random"}
                  />
                </Grid>
              );
            })}
            <Grid
              size={12}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Button variant="contained" type="submit">
                Generate memory
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
      <Box
        width="100%"
        display={"flex"}
        flexDirection={"column"}
        paddingX={"20%"}
      >
        {memoryIndexes && (
          <Box display={"flex"} flexDirection={"column"} gap="24px">
            <Typography variant="h3" gutterBottom>
              Memory
            </Typography>
            {memoryIndexes.map((index, i) => {
              return (
                <Card key={i}>
                  <CardContent>
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      gap="16px"
                      mb={2}
                    >
                      <Typography variant="h5">{CLASSES[i].title}</Typography>
                      <Typography variant="h3">{CLASSES[i].emoji}</Typography>
                    </Box>
                    <Divider />
                    <Box py={3}>
                      {generationStatues[i].data &&
                        CLASSES[i].render(generationStatues[i].data)}
                      <Divider />
                    </Box>
                  </CardContent>
                </Card>
              );
            })}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Encode;
