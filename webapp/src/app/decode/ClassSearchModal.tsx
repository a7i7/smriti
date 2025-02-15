import { Box, Fade, TextField } from "@mui/material";
import Modal from "@mui/material/Modal";

export interface ClassSearchModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (id: number) => void;
}

const ClassSearchModal = ({ open, onClose }: ClassSearchModalProps) => {
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
          Hello
          <TextField placeholder="Search..." />
        </Box>
      </Fade>
    </Modal>
  );
};

export default ClassSearchModal;
