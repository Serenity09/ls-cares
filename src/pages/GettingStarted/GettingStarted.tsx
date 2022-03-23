import Box from "@mui/material/Box";

import GettingStartedStepper from "./GettingStartedStepper";
import Intro from "./Intro";
import WhatAboutYou from "./WhatAboutYou";
import TheGoodPart from "./TheGoodPart";

export default function GettingStarted() {
  const steps = [
    { title: "Intro", element: <Intro /> },
    { title: "What about you?", element: <WhatAboutYou /> },
    { title: "The good part", element: <TheGoodPart /> },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <GettingStartedStepper steps={steps} />
    </Box>
  );
}
