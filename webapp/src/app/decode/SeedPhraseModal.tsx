import { Box, Fade, Grid, IconButton, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import { getDecodedSeedPhrase } from "../brain";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export interface SeedPhraseModalProps {
  open: boolean;
  onClose: () => void;
  memoryIndexes: number[];
}

const SeedPhraseModal = ({
  open,
  onClose,
  memoryIndexes,
}: SeedPhraseModalProps) => {
  const seedphrase = getDecodedSeedPhrase(memoryIndexes);

  return (
    <Modal open={open} onClose={onClose}>
      <Fade in={open}>
        <Box
          width="100%"
          height="100%"
          border="1px solid red"
          sx={{
            position: "absolute" as const,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "50%",
            maxWidth: "50%%",
            maxHeight: "80%",
            display: "flex",
            flexDirection: "column" as const,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: "0px 2px 16px rgba(0, 0, 0, 0.08)",
            paddingTop: 4,
            paddingBottom: 2,
            paddingLeft: 4,
            paddingRight: 4,
          }}
        >
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography variant="h2" gutterBottom>
              Decoded seed phrase
            </Typography>
            <IconButton
              size="large"
              onClick={() => {
                navigator.clipboard.writeText(seedphrase);
              }}
            >
              <ContentCopyIcon />
            </IconButton>
          </Box>

          <Grid container spacing={2}>
            {seedphrase.split(" ").map((phrase, index) => (
              <Grid item xs={6} key={index}>
                <Typography variant="h5">
                  {index + 1}. {phrase}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Fade>
    </Modal>
  );
};

export default SeedPhraseModal;
