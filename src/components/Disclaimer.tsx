import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface DisclaimerSettings {
    open: boolean,
    onClose: Function
}

export default function Disclaimer(props: DisclaimerSettings) {
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={() => props.onClose(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Disclaimer</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            BY CLICKING ON THE “I ACCEPT” BUTTON AFTER THIS AGREEMENT, YOU AGREE TO BE BOUND BY THIS AGREEMENT. IF YOU DO NOT AGREE TO BE BOUND BY THIS AGREEMENT, PLEASE DO NOT CLICK ON THE “I ACCEPT” BUTTON AND DO NOT ACCESS OR USE THE SERVICE.
            BY CLICKING ON THE “I ACCEPT” BUTTON, OR BY ACCESSING OR USING THE SERVICE, YOU REPRESENT AND WARRANT THAT (A) YOU ARE AT LEAST 18 YEARS OLD AND THE AGE OF MAJORITY AND LEGAL CONSENT IN THE JURISDITION IN WHICH YOU LIVE OR RESIDE, AND (B) YOU AGREE TO BE BOUND BY THIS AGREEMENT.
          </DialogContentText>
          <DialogContentText>
            THIS AGREEMENT MAY BE AMENDED OR CHANGED BY US IN OUR DISCRETION AT ANY TIME AS PROVIDED IN THE MEMBER TERMS OF USE.
          </DialogContentText>
          <DialogContentText>
            Last updated 12/1/2021
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