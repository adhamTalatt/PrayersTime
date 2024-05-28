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

//images
import fajrImage from "../../public/image/dhhr-prayer-mosque.png";
import asrImage from "../../public/image/asr-prayer-mosque.png";
import MaghribImage from "../../public/image/night-prayer-mosque.png";
import IshaImage from "../../public/image/sunset-prayer-mosque.png";
export default function MainContent() {
  // this state for save time and add Date get from momment (t)
  const [today, setToday] = useState("");

  // this state for save prayers-Timing get from API Response
  const [timings, setTimings] = useState({
    // Fajr: "",
    // Dhuhr: "",
    // Asr: "",
    // Maghrib: "",
    // Isha: "",
  });

  // this state for save select city git from menuItems
  const [selectCity, setSelectCity] = useState({
    displayNameCity: "القاهرة",
    apiNameCity: "Cairo",
    conutry: "EG",
  });

  const [nextPrayerIndex, setnextPrayerIndex] = useState(0);
  const prayersArray = [
    { key: "Fajr", displayName: "الفجر" },
    { key: "Dhuhr", displayName: "الظهر" },
    { key: "Asr", displayName: "العصر" },
    { key: "Maghrib", displayName: "المغرب" },
    { key: "Isha", displayName: "العشاء" },
  ];
  const [remainTime, setRemainTime] = useState("");
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
    {
      id: 3,
      displayNameCity: "القاهرة",
      apiNameCity: "Cairo",
      conutry: "Egypt",
    },
  ];

  const menuItems = availableCity.map((city) => {
    return (
      <MenuItem key={city.id} value={city.apiNameCity}>
        {city.displayNameCity}
      </MenuItem>
    );
  });
  // ===== select citys =====

  // ***** ApI Response get from (aladhan.com) *****
  const getTiminge = async () => {
    const responseAPI = await axios.get(
      `https://api.aladhan.com/v1/timingsByCity?city=${selectCity.apiNameCity}&country=${selectCity.conutry}&method=8`
    );
    setTimings(responseAPI.data.data.timings);
  };
  // ===== ApI Response get from (aladhan.com) =====

  //This UseEffect for Api Response
  useEffect(() => {
    getTiminge();
  }, [selectCity]);

  // this useEffect for timer
  useEffect(() => {
    // **** time and date from moment library ****
    const t = moment();
    setToday(t.format("MMM Do YYYY | h:mm"));
    // ===== time and date from moment library =====

    let interval = setInterval(() => {
      setupCountdownTimer();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timings]);

  const setupCountdownTimer = () => {
    const momentNow = moment();
    let prayerIndex = null;

    if (
      momentNow.isAfter(moment(timings["Fajr"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Dhuhr"], "hh:mm"))
    ) {
      prayerIndex = 1;
    } else if (
      momentNow.isAfter(moment(timings["Dhuhr"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Asr"], "hh:mm"))
    ) {
      prayerIndex = 2;
    } else if (
      momentNow.isAfter(moment(timings["Asr"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Maghrib"], "hh:mm"))
    ) {
      prayerIndex = 3;
    } else if (
      momentNow.isAfter(moment(timings["Maghrib"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Isha"], "hh:mm"))
    ) {
      prayerIndex = 4;
    } else {
      prayerIndex = 0;
    }
    setnextPrayerIndex(prayerIndex);
    // now after knowing what the next prayer is, we can setup the countdown timer by getting the prayer's time
    const nextPrayerObject = prayersArray[prayerIndex];
    const nextPrayerTime = timings[nextPrayerObject.key];
    const nextPrayerTimeMoment = moment(nextPrayerTime, "hh:mm");

    let remainingTime = moment(nextPrayerTime, "hh:mm").diff(momentNow);
    if (remainingTime < 0) {
      const midnightDiff = moment("23:59:59", "hh:mm:ss").diff(momentNow);
      const fajrToMidnightDiff = nextPrayerTimeMoment.deff(
        moment("00:00:00", "hh:mm:ss")
      );
      const totalDiffernce = midnightDiff + fajrToMidnightDiff;
      remainingTime = totalDiffernce;
    }
    const durationRemainTime = moment.duration(remainingTime);

    setRemainTime(
      `${durationRemainTime.hours()}:${durationRemainTime.minutes()}:${durationRemainTime.seconds()}`
    );
    console.log(
      `${durationRemainTime.hours()}:${durationRemainTime.minutes()}:${durationRemainTime.seconds()}`
    );
  };

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
            متبقي حتي صلاة {prayersArray[nextPrayerIndex].displayName}
          </Typography>
          <Typography
            variant="h3"
            sx={{
              color: "#849974",
              fontSize: bigfontRsp.bigFonts,
              direction: "rtl",
            }}
          >
            {remainTime}
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
        <Prayer title={"الفجر"} time={timings.Fajr} image={fajrImage} />
        <Prayer
          title={"الظهر"}
          time={timings.Dhuhr}
          image={
            "https://Images.akhbarelyom.com/images/images/large/20181023121406683.jpg"
          }
        />
        <Prayer title={"العصر"} time={timings.Asr} image={asrImage} />
        <Prayer title={"المغرب"} time={timings.Maghrib} image={MaghribImage} />
        <Prayer title={"العشاء"} time={timings.Isha} image={IshaImage} />
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
