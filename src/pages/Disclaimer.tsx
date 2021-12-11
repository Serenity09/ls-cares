import * as React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { createStyles, makeStyles } from '@mui/styles';
interface DisclaimerSettings {
    open: boolean,
    onClose: Function
}

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

export default function Disclaimer(props: DisclaimerSettings) {
  const classes = useStyles();

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={() => props.onClose(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Disclaimer</DialogTitle>
        <DialogContent className={classes.disclaimerContent}>
          {/* <DialogContentText id="alert-dialog-description">
            BY CLICKING ON THE “I ACCEPT” BUTTON AFTER THIS AGREEMENT, YOU AGREE TO BE BOUND BY THIS AGREEMENT. IF YOU DO NOT AGREE TO BE BOUND BY THIS AGREEMENT, PLEASE DO NOT CLICK ON THE “I ACCEPT” BUTTON AND DO NOT ACCESS OR USE THE SERVICE.
            BY CLICKING ON THE “I ACCEPT” BUTTON, OR BY ACCESSING OR USING THE SERVICE, YOU REPRESENT AND WARRANT THAT (A) YOU ARE AT LEAST 18 YEARS OLD AND THE AGE OF MAJORITY AND LEGAL CONSENT IN THE JURISDITION IN WHICH YOU LIVE OR RESIDE, AND (B) YOU AGREE TO BE BOUND BY THIS AGREEMENT.
          </DialogContentText>
          <DialogContentText>
            THIS AGREEMENT MAY BE AMENDED OR CHANGED BY US IN OUR DISCRETION AT ANY TIME AS PROVIDED IN THE MEMBER TERMS OF USE.
          </DialogContentText>
          <DialogContentText>
            Last updated 12/1/2021
          </DialogContentText> */}
          
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
          <Button onClick={() => props.onClose(false)}>Disagree</Button>
          <Button onClick={() => props.onClose(true)} autoFocus>I Accept</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}