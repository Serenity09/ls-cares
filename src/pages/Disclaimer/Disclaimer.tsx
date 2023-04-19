import { useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { useLocalStorage } from "../../hooks/useLocalStorage";

const disclaimerContentStyle = {
  "& p:not(:first-child)": {
    marginTop: "1rem",
  },
};
const disclaimerBlockStyle = {
  marginTop: "1rem",
};

//store user's disclaimer selection in a cookie
const APP_INFO = {
  name: "Livestream Cares",
  acronym: "LSC",
};
const VERSION = 1;
const DISCLAIMER_EXPIRATION = 7; //in days

const isLastAcceptedDisclaimerValid = (
  lastAcceptedDisclaimer: AcceptedDisclaimer | null
) => {
  if (!lastAcceptedDisclaimer) return false;

  const parsedDate = new Date(lastAcceptedDisclaimer.date);
  return (
    lastAcceptedDisclaimer.version === VERSION &&
    new Date(
      parsedDate.getFullYear(),
      parsedDate.getMonth(),
      parsedDate.getDate() + DISCLAIMER_EXPIRATION,
      parsedDate.getHours(),
      parsedDate.getMinutes(),
      parsedDate.getSeconds()
    ) >= new Date()
  );
};

type AcceptedDisclaimer = {
  date: Date;
  version: number;
};

export default function Disclaimer() {
  const [lastAcceptedDisclaimer, setLastAcceptedDisclaimer] =
    useLocalStorage<AcceptedDisclaimer | null>("lastAcceptedDisclaimer", null);

  const initialDisclaimerVisibility = !isLastAcceptedDisclaimerValid(
    lastAcceptedDisclaimer
  );
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(
    initialDisclaimerVisibility
  );

  const closeDisclaimer = function (acceptedDisclaimer: boolean) {
    if (acceptedDisclaimer) {
      setIsDisclaimerOpen(false);

      setLastAcceptedDisclaimer({ version: VERSION, date: new Date() });
    }
  };

  return (
    <Dialog
      open={isDisclaimerOpen}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Disclaimer</DialogTitle>
      <DialogContent sx={disclaimerContentStyle}>
        <DialogContentText sx={disclaimerBlockStyle}>
          The information available on {APP_INFO.name} ({APP_INFO.acronym}) may
          include inaccuracies, omissions, and other errors. {APP_INFO.acronym}{" "}
          only provides information regarding health insurance coverage and is
          not intended nor implied to substitute professional advice. I am not a
          lawyer and this should not be considered legal advice. I am not a
          doctor and this should not be considered medical advice. Please
          contact the appropriate professional for any personal, financial,
          medical, health, or legal decisions.
        </DialogContentText>
        <DialogContentText sx={disclaimerBlockStyle}>
          I hope {APP_INFO.acronym} helps make you a more knowledgeable health
          insurance consumer. I make no representations about the accuracy,
          content, reliability, completeness, or legality of this information
          for any purpose. I cannot guarantee insurance coverage or financial
          exposure for any health services.
        </DialogContentText>
        <DialogContentText sx={disclaimerBlockStyle}>
          In no event shall the owners of or contributors to {APP_INFO.acronym}{" "}
          be liable for direct, indirect, punitive, incidental, special,
          consequential damages or any damages whatsoever, arising out of or
          connected with the use of this website or the information contained
          herein. {APP_INFO.acronym} contains links to third party websites. I
          cannot control the information provided on those websites and I will
          not take any responsibility for the information or content thereon.
        </DialogContentText>
        <DialogContentText sx={disclaimerBlockStyle}>
          {"In short, I'm trying my best, but I can't deal with legal issues."}
        </DialogContentText>
        <DialogContentText sx={disclaimerBlockStyle}>
          Last updated 12/12/2021
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => closeDisclaimer(true)}>I Accept</Button>
      </DialogActions>
    </Dialog>
  );
}
