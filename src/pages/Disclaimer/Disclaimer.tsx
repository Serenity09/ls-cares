import { useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Cookies from 'js-cookie';

const disclaimerContentStyle = {
  "& p:not(:first-child)": {
    marginTop: '1rem'
  }
}
const disclaimerBlockStyle = {
  marginTop: '1rem'
}

//store user's disclaimer selection in a cookie
const ACCEPTED_DISCLAIMER_COOKIE_NAME = "acceptedDisclaimer";
const VERSION = 1;
const DISCLAIMER_EXPIRATION = 0; //in days

let defaultDisclaimerOpen = true;
try {
  const cookie = Cookies.get(ACCEPTED_DISCLAIMER_COOKIE_NAME);

  if (cookie !== undefined) {
    const acceptedDisclaimerCookie = JSON.parse(cookie?? "{}");
    const acceptedDisclaimerDate = new Date(acceptedDisclaimerCookie.date);

    if (acceptedDisclaimerCookie.version === VERSION 
        && new Date(acceptedDisclaimerDate.getFullYear(), acceptedDisclaimerDate.getMonth(), acceptedDisclaimerDate.getDate() + DISCLAIMER_EXPIRATION, acceptedDisclaimerDate.getHours(), acceptedDisclaimerDate.getMinutes(), acceptedDisclaimerDate.getSeconds()) >= new Date())
      defaultDisclaimerOpen = false;
    else
      Cookies.remove(ACCEPTED_DISCLAIMER_COOKIE_NAME);
  }
}
catch (err) { }

export default function Disclaimer() {
  const [ isDisclaimerOpen, setIsDisclaimerOpen ] = useState(defaultDisclaimerOpen);

  const closeDisclaimer = function(acceptedDisclaimer: boolean) {
    if (acceptedDisclaimer) {
      setIsDisclaimerOpen(false);

      Cookies.set(ACCEPTED_DISCLAIMER_COOKIE_NAME, JSON.stringify({
        date: new Date(),
        version: 1
      }));
    }
  }

  return (
    <Dialog
      open={isDisclaimerOpen}
      onClose={() => closeDisclaimer(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Disclaimer</DialogTitle>
      <DialogContent sx={disclaimerContentStyle}>
        <DialogContentText sx={disclaimerBlockStyle}>
          The information available on Livestream Cares (LSC) may include inaccuracies, omissions, and other errors. LSC only provides information regarding health insurance coverage and is not intended nor implied to substitute professional advice. We are not lawyers and this should not be considered legal advice. We are not doctors and this should not be considered medical advice. Please contact the appropriate professional for any personal, financial, medical, health, or legal decisions.
        </DialogContentText>
        <DialogContentText sx={disclaimerBlockStyle}>
          We hope LSC helps make you a more knowledgeable health insurance consumer. We make no representations about the accuracy, content, reliability, completeness, or legality of this information for any purpose. We cannot guarantee insurance coverage or financial exposure for any health services.
        </DialogContentText>
        <DialogContentText sx={disclaimerBlockStyle}>
          In no event shall the owners of or contributors to LSC be liable for direct, indirect, punitive, incidental, special, consequential damages or any damages whatsoever, arising out of or connected with the use of this website or the information contained herein. LSC contains links to third party websites. We cannot control the information provided on those websites and we will not take any responsibility for the information or content thereon.
        </DialogContentText>
        <DialogContentText sx={disclaimerBlockStyle}>
          In short, we're trying our best, but we can't deal with legal issues.
        </DialogContentText>
        <DialogContentText sx={disclaimerBlockStyle}>
          Last updated 12/12/2021
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => closeDisclaimer(true)} autoFocus>I Accept</Button>
      </DialogActions>
    </Dialog>
  );
}