import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";

//select component Mui
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// components
import Prayer from "./Prayer";
export default function MainContent() {
  const bigfontRsp = {
    bigFonts: { xs: "22px", sm: "22px", md: "26px", lg: "40px" },
    smallFonts: { xs: "16px", sm: "16px", md: "20px", lg: "22px" },
  };

  const handleChange = (event) => {
    alert(event.target.value);
  };

  return (
    <div style={{ marginTop: "20vh" }}>
      <Grid
        sx={{
          direction: "rtl",
          margin: "20px",
        }}
        container
        spacing={2}
      >
        <Grid xs={6}>
          <Typography variant="h5" sx={{ fontSize: bigfontRsp.smallFonts }}>
            سبتمبر 2023 9| 4:20
          </Typography>
          <Typography
            variant="h3"
            sx={{
              color: "#849974",
              fontSize: bigfontRsp.bigFonts,
            }}
          >
            مكة المكرمة
          </Typography>
        </Grid>
        <Grid xs={6}>
          <Typography variant="h5" sx={{ fontSize: bigfontRsp.smallFonts }}>
            متبقي حتي صلاة المغرب
          </Typography>
          <Typography
            variant="h3"
            sx={{ color: "#849974", fontSize: bigfontRsp.bigFonts }}
          >
            1:12:34
          </Typography>
        </Grid>
      </Grid>
      <Divider style={{ borderColor: "white", opacity: "0.1" }} />
      {/* ***** Prayer component *****  */}
      <Stack
        style={{ marginTop: "20px" }}
        direction={{ xs: "column", sm: "column", md: "column", lg: "row" }}
        spacing={2}
        justifyContent="center"
        alignItems={"center"}
      >
        <Prayer
          title={"الفجر"}
          time={"4:17"}
          image="https://Images.akhbarelyom.com/images/images/large/20181023121406683.jpg"
        />
        <Prayer
          title={"الظهر"}
          time={"12:49"}
          image="https://Images.akhbarelyom.com/images/images/large/20181023121406683.jpg"
        />
        <Prayer
          title={"العصر"}
          time={"4:30"}
          image="https://Images.akhbarelyom.com/images/images/large/20181023121406683.jpg"
        />
        <Prayer
          title={"المغرب"}
          time={"7:30"}
          image="https://Images.akhbarelyom.com/images/images/large/20181023121406683.jpg"
        />
        <Prayer
          title={"العشاء"}
          time={"9:10"}
          image="https://Images.akhbarelyom.com/images/images/large/20181023121406683.jpg"
        />
      </Stack>
      {/* ===== Prayer component =====  */}
      {/* *****  select component *****  */}
      <Stack
        justifyContent="center"
        alignItems={"center"}
        sx={{ margin: "50px" }}
        direction={"row"}
      >
        <FormControl style={{ width: "50%" }}>
          <InputLabel id="demo-simple-select-label">المدينة</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            label="Age"
            onChange={handleChange}
            className="selectA"
          >
            <MenuItem value={10}>مكة</MenuItem>
            <MenuItem value={20}>المدينةالمنورة</MenuItem>
            <MenuItem value={30}>القاهرة</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      {/* =====  select component =====  */}
    </div>
  );
}
