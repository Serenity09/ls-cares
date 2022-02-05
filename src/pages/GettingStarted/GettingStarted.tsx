import Box from "@mui/material/Box";

import { UseUserInformation } from "../../types/UserInfo";

import GettingStartedStepper from "./GettingStartedStepper";
import Intro from "./Intro";
import WhatAboutYou from "./WhatAboutYou";
import TheGoodPart from "./TheGoodPart";

export default function GettingStarted(props: UseUserInformation) {
  const steps = [
    { title: "Intro", element: <Intro /> },
    { title: "What about you?", element: <WhatAboutYou {...props} /> },
    { title: "The good part", element: <TheGoodPart {...props.userInfo} /> },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <GettingStartedStepper steps={steps} />
    </Box>
  );
}
