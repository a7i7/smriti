"use client";
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { SubmitHandler, useForm } from "react-hook-form";

import Grid from "@mui/material/Grid2";
import { Autocomplete, Button, TextField } from "@mui/material";
import { getEncodedIndexes } from "../brain";
import { wordlist } from "@scure/bip39/wordlists/english";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

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
    console.log(data);
    const seedPhrase = Array.from({ length: 12 })
      .map((_, i) => data[`phrase${i}`])
      .join(" ");
    console.log(seedPhrase);
    console.log(seedPhrase);
    console.log(getEncodedIndexes(seedPhrase));
  };

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
                    onChange={(e, value) => {
                      setValue(`phrase${i}`, value ?? "");
                    }}
                    options={wordlist}
                    renderInput={(params) => (
                      <TextField {...params} label={`${i + 1}.`} />
                    )}
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
    </Box>
  );
};

export default Encode;
