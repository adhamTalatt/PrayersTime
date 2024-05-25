import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
export default function Prayer({ title, time, image }) {
  return (
    <div>
      <Card
        sx={{
          background: "#fdf5e6",
          minWidth: { xs: "225px", sm: "350px", md: "450px", lg: "240px" },
          maxWidth: 345,
          direction: "rtl",
        }}
      >
        <CardMedia sx={{ height: 140 }} image={image} title="green iguana" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="h3">{time}</Typography>
        </CardContent>
      </Card>
    </div>
  );
}
