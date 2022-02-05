import { ThemeProvider } from "@emotion/react";
import { createTheme, responsiveFontSizes } from "@mui/material";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { UserInformation } from "./types/UserInfo";

import Layout from "./layouts/Layout";

import Disclaimer from "./pages/Disclaimer/Disclaimer";
import GettingStarted from "./pages/GettingStarted/GettingStarted";
import Guide from "./pages/Guide";

export function App() {
  const [userInfo, setUserInfo] = useState<UserInformation>({
    usState: null,
    age: null,
    projectedIncome: null,
    familySize: 1,
    isPregnant: false,
  });

  let theme = createTheme();
  theme = responsiveFontSizes(theme);

  return (
    <ThemeProvider theme={theme}>
      <Disclaimer />
      <Layout>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <GettingStarted userInfo={userInfo} setUserInfo={setUserInfo} />
              }
            />

            <Route path="/disclaimer-rejected" />

            <Route path="/guide" element={<Guide />} />
            <Route path="/guide/:state" element={<Guide />} />
            <Route path="/guide/:state/:age" element={<Guide />} />
            <Route
              path="/guide/:state/:age/:projectedIncome"
              element={<Guide />}
            />
            <Route path="/guide/enc=:encryptedData" element={<Guide />} />
          </Routes>
        </BrowserRouter>
      </Layout>
    </ThemeProvider>
  );
}
