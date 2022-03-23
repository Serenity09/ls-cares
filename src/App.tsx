import { ThemeProvider } from "@emotion/react";
import { createTheme, responsiveFontSizes } from "@mui/material";
import { useMemo, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./layouts/Layout";

import Disclaimer from "./pages/Disclaimer/Disclaimer";
import GettingStarted from "./pages/GettingStarted/GettingStarted";
import Guide from "./pages/Guide";
import { UserContext, User } from "./user/UserContext";

export function App() {
  let theme = createTheme();
  theme = responsiveFontSizes(theme);

  const [user, setUser] = useState(new User());
  const value = useMemo(() => ({ user, setUser }), [user]);

  return (
    <ThemeProvider theme={theme}>
      <UserContext.Provider value={value}>
        <Disclaimer />
        <Layout>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<GettingStarted />} />

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
      </UserContext.Provider>
    </ThemeProvider>
  );
}
