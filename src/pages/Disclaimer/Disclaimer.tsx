import * as React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { createStyles, makeStyles } from '@mui/styles';
import { useState } from 'react';

const useStyles = makeStyles(() =>
  createStyles({
    disclaimerContent: {
      "& p:not(:first-child)": {
        marginTop: '1rem'
      }
    },
    disclaimerBlock: {
      marginTop: '1rem'
    }
  }));

export default function Disclaimer() {
  const classes = useStyles();

  const [ isDisclaimerOpen, setIsDisclaimerOpen ] = useState(true);
  const [ acceptedDisclaimer, setAcceptedDisclaimer ] = useState(true);

  const closeDisclaimer = function(acceptedDisclaimer: boolean) {
    if (acceptedDisclaimer)
      setIsDisclaimerOpen(false);
    else
      setAcceptedDisclaimer(false);
  }

  return (
    <div>
      <Dialog
        open={isDisclaimerOpen}
        onClose={() => closeDisclaimer(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Disclaimer</DialogTitle>
        <DialogContent className={classes.disclaimerContent}>
          <DialogContentText className={classes.disclaimerBlock}>
            The information available on Livestream Cares (LSC) may include inaccuracies, omissions, and other errors. LSC only provides information regarding health insurance coverage and is not intended nor implied to substitute professional advice. We are not lawyers and this should not be considered legal advice. We are not doctors and this should not be considered medical advice. Please contact the appropriate professional for any personal, financial, medical, health, or legal decisions.
          </DialogContentText>
          <DialogContentText className={classes.disclaimerBlock}>
            We hope LSC helps make you a more knowledgeable health insurance consumer. We make no representations about the accuracy, content, reliability, completeness, or legality of this information for any purpose. We cannot guarantee insurance coverage or financial exposure for any health services.
          </DialogContentText>
          <DialogContentText className={classes.disclaimerBlock}>
            In no event shall the owners of or contributors to LSC be liable for direct, indirect, punitive, incidental, special, consequential damages or any damages whatsoever, arising out of or connected with the use of this website or the information contained herein. LSC contains links to third party websites. We cannot control the information provided on those websites and we will not take any responsibility for the information or content thereon.
          </DialogContentText>
          <DialogContentText className={classes.disclaimerBlock}>
            Last updated 12/10/2021
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => closeDisclaimer(true)} autoFocus>I Accept</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}