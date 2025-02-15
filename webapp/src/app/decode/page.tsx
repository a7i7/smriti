"use client";
import Box from "@mui/material/Box";
import ClassCard from "./ClassCard";
import { CLASSES } from "../classes";
import { useState } from "react";
import ClassSearchModal from "./ClassSearchModal";

const Decode = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Box
        display="flex"
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        gap="24px"
        padding="24px"
      >
        {CLASSES.map((item) => {
          return (
            <ClassCard
              key={item.id}
              id={item.id}
              onClick={() => {
                setOpen(true);
              }}
            />
          );
        })}{" "}
      </Box>
      <ClassSearchModal
        open={open}
        onClose={() => setOpen(false)}
        onSelect={() => {
          // onSelect
        }}
      />
    </>
  );
};

export default Decode;
