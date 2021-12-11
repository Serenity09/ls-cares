import { ThemeProvider } from '@emotion/react';
import { createTheme, responsiveFontSizes } from '@mui/material';
import react, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Disclaimer from './pages/Disclaimer';
import Layout from './layouts/Layout';
import GettingStarted from './pages/GettingStarted/GettingStarted';
import Guide from './pages/Guide';

export function App() {
  const [ isDisclaimerOpen, setIsDisclaimerOpen ] = useState(true);
  const [ acceptedDisclaimer, setAcceptedDisclaimer ] = useState(true);
  
  let theme = createTheme();
  theme = responsiveFontSizes(theme);

  const closeDisclaimer = function(acceptedDisclaimer: boolean) {
    if (acceptedDisclaimer)
      setIsDisclaimerOpen(false);
    else {
      setAcceptedDisclaimer(false);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Disclaimer open={isDisclaimerOpen} onClose={closeDisclaimer} />
      <Layout>
        <BrowserRouter>
          <Routes>
            <Route path="/"  element={<GettingStarted />} />
            <Route path="/disclaimer-rejected" />
            
            <Route path="/guide" element={<Guide />} />
            <Route path="/guide/state=:state" element={<Guide />} />
            <Route path="/guide/state=:state/age=:age" element={<Guide />} />
            <Route path="/guide/state=:state/age=:age/projectedExpenses=:projectedExpenses" element={<Guide />} />
            <Route path="/guide/state=:state/age=:age/projectedExpenses=:projectedExpenses/projectedIncome=:projectedIncome" element={<Guide />} />
            <Route path="/guide/enc=:encryptedData" element={<Guide />} />
          </Routes>
        </BrowserRouter>
      </Layout>
    </ThemeProvider>
  );
}
