import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import { CLASSES } from "../classes";
import Typography from "@mui/material/Typography";

export interface ClassCardProps {
  id: string;
  onClick?: () => void;
}
const ClassCard = ({ id, onClick }: ClassCardProps) => {
  const cardClass = CLASSES.find((cls) => cls.id === id);
  return (
    <Card
      sx={{
        maxWidth: "400px",
      }}
      onClick={onClick}
    >
      <CardActionArea
      // sx={{
      //   height: "100%",
      //   "&[data-active]": {
      //     backgroundColor: "action.selected",
      //     "&:hover": {
      //       backgroundColor: "action.selectedHover",
      //     },
      //   },
      // }}
      >
        <CardContent
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 3,
          }}
        >
          <Typography variant="h5" component="div">
            {cardClass?.title ?? ""}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {cardClass?.emoji}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ClassCard;
