import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MainContent from "./components/MainContent";
import "./App.css";
export default function App() {
  const theme = createTheme({
    typography: {
      fontFamily: "Cario",
    },
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <Container maxWidth="lg">
          <MainContent />
        </Container>
      </ThemeProvider>
    </>
  );
}
