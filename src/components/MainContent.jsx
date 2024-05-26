import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";

//select component Mui
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

//axios For Request Api
import axios from "axios";

//React Hooks
import { useState, useEffect } from "react";

// components
import Prayer from "./Prayer";
import moment from "moment";
import "moment/dist/locale/ar-dz";
moment.locale("ar");
export default function MainContent() {
  // this state for save time and add Date get from momment (t)
  const [today, setToday] = useState("");

  // this state for save prayers-Timing get from API Response
  const [timings, setTimings] = useState({});

  // this state for save select city git from menuItems
  const [selectCity, setSelectCity] = useState({
    displayNameCity: "القاهرة",
    apiNameCity: "Cairo",
    conutry: "EG",
  });
  // ***** ApI Response get from (aladhan.com) *****
  const getTiminge = async () => {
    const responseAPI = await axios.get(
      `http://api.aladhan.com/v1/timingsByCity?city=${selectCity.apiNameCity}&country=${selectCity.conutry}&method=8`
    );
    setTimings(responseAPI.data.data.timings);
  };
  // ===== ApI Response get from (aladhan.com) =====

  // ***** select citys *****
  const availableCity = [
    {
      id: 1,
      displayNameCity: "مكة",
      apiNameCity: "Makkah",
      conutry: "Saudi Arabia",
    },
    {
      id: 2,
      displayNameCity: "المدينة المنورة",
      apiNameCity: "Madinah",
      conutry: "Saudi Arabia",
    },
    { id: 3, displayNameCity: "القاهرة", apiNameCity: "Cairo", conutry: "EG" },
  ];

  const menuItems = availableCity.map((city) => {
    return (
      <MenuItem key={city.id} value={city.apiNameCity}>
        {city.displayNameCity}
      </MenuItem>
    );
  });
  // ===== select citys =====

  useEffect(() => {
    getTiminge();
    // **** time and date from moment library ****
    const t = moment();
    setToday(t.format("MMM Do YYYY | h:mm"));
    // ===== time and date from moment library =====
  }, [selectCity]);

  // responsive fomts screen
  const bigfontRsp = {
    bigFonts: { xs: "22px", sm: "22px", md: "26px", lg: "40px" },
    smallFonts: { xs: "16px", sm: "16px", md: "20px", lg: "22px" },
  };

  const handleChange = (event) => {
    const objectCity = availableCity.find((city) => {
      return city.apiNameCity == event.target.value;
    });
    setSelectCity(objectCity);
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
            {today}
          </Typography>
          <Typography
            variant="h3"
            sx={{
              color: "#849974",
              fontSize: bigfontRsp.bigFonts,
            }}
          >
            {selectCity.displayNameCity}
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
          time={timings.Fajr}
          image="/src/assets/image/dhhr-prayer-mosque.png"
        />
        <Prayer
          title={"الظهر"}
          time={timings.Dhuhr}
          image="https://Images.akhbarelyom.com/images/images/large/20181023121406683.jpg"
        />
        <Prayer
          title={"العصر"}
          time={timings.Asr}
          image={"/src/assets/image/asr-prayer-mosque.png"}
        />
        <Prayer
          title={"المغرب"}
          time={timings.Maghrib}
          image="/src/assets/image/night-prayer-mosque.png"
        />
        <Prayer
          title={"العشاء"}
          time={timings.Isha}
          image="/src/assets/image/sunset-prayer-mosque.png"
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
          <InputLabel
            id="demo-simple-select-label"
            sx={{ color: "green", fontWeight: 700 }}
          >
            المدينة
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectCity.apiNameCity}
            label="Age"
            onChange={handleChange}
            className="selectA"
          >
            {menuItems}
          </Select>
        </FormControl>
      </Stack>
      {/* =====  select component =====  */}
    </div>
  );
}
