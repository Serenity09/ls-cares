import { ThemeProvider } from '@emotion/react';
import { createTheme, responsiveFontSizes } from '@mui/material';
import react, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import IUserInfo from './interfaces/IUserInfo';

import Layout from './layouts/Layout';

import Disclaimer from './pages/Disclaimer/Disclaimer';
import GettingStarted from './pages/GettingStarted/GettingStarted';
import Guide from './pages/Guide';

export function App() {  
  const [ userInfo, setUserInfo ] = useState<IUserInfo>({
    usState: null,
    age: null,
    projectedIncome: null
  });

  let theme = createTheme();
  theme = responsiveFontSizes(theme);

  return (
    <ThemeProvider theme={theme}>
      <Disclaimer />
      <Layout>
        <BrowserRouter>
          <Routes>
            <Route path="/"  element={<GettingStarted userInfo={userInfo} setUserInfo={setUserInfo} />} />
            
            <Route path="/disclaimer-rejected" />
            
            <Route path="/guide" element={<Guide />} />
            <Route path="/guide/:state" element={<Guide />} />
            <Route path="/guide/:state/:age" element={<Guide />} />
            <Route path="/guide/:state/:age/:projectedIncome" element={<Guide />} />
            <Route path="/guide/enc=:encryptedData" element={<Guide />} />
          </Routes>
        </BrowserRouter>
      </Layout>
    </ThemeProvider>
  );
}
