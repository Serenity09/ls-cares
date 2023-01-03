import { useState } from "react";
import {
  Autocomplete,
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";

import {
  getUSStates,
  getUSStateByAbbreviation,
  getUSStateByName,
} from "../../services/usStateService";
import { useUserContext } from "../../user/UserContext";

export default function WhatAboutYou() {
  const { user, setUser } = useUserContext();
  const [usStateValue, setUSStateValue] = useState<string | null>(
    getUSStateByAbbreviation(user.usState)
      ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        getUSStateByAbbreviation(user.usState)!.name
      : ""
  );

  //TODO
  //need to break this up into two parts, first input state and family size, then input below for individual or below + other for family
  return (
    <Box component="form" sx={{ mt: "2.5rem" }}>
      <Typography variant="body1">Info about you is optional and is only used to give you more useful info about common insurance options. Your data is private: nothing is stored, nothing is shared.</Typography>

      <FormControl className="what-about-you-input-container" fullWidth={true} sx={{mt: "1rem"}}>
        <Autocomplete
          value={usStateValue}
          onChange={(event: React.SyntheticEvent, newValue: string | null) => {
            setUSStateValue(newValue);

            const usState = getUSStateByName(newValue);
            setUser({
              ...user,
              usState: usState ? usState.name : null,
            });
          }}
          id="state"
          options={getUSStates().map((state) => state.name)}
          sx={{ mb: "1rem" }}
          className=""
          renderInput={(params) => <TextField {...params} label="State" />}
        />
      </FormControl>
      <FormControl
        className="what-about-you-input-container"
        fullWidth={true}
        sx={{ mb: "2.5rem" }}
      >
        <InputLabel htmlFor="age">Age</InputLabel>
        <Input
          id="age"
          value={user.age ? user.age.toString() : ""}
          onChange={(evt) => {
            const parsedAge = parseInt(evt.target.value);

            if (!isNaN(parsedAge)) {
              if (parsedAge > 0) setUser({ ...user, age: parsedAge });
            } else setUser({ ...user, age: null });
          }}
        />
      </FormControl>
      <FormControl
        className="what-about-you-input-container"
        fullWidth={true}
        sx={{ mb: "2.5rem" }}
      >
        <InputLabel htmlFor="projectedIncome">Projected Income</InputLabel>
        <Input
          id="projectedIncome"
          value={
            user.projectedIncome
              ? user.projectedIncome.toLocaleString("en-US")
              : ""
          }
          onChange={(evt) => {
            const parsedProjectedIncome = parseInt(
              evt.target.value.replace(/,/g, "")
            );

            if (!isNaN(parsedProjectedIncome) && parsedProjectedIncome >= 0)
              setUser({
                ...user,
                projectedIncome: parsedProjectedIncome,
              });
            else setUser({ ...user, projectedIncome: null });
          }}
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
        />
      </FormControl>
      <FormControl
        className="what-about-you-input-container"
        fullWidth={true}
        sx={{ mb: "2rem" }}
      >
        <InputLabel htmlFor="family-size">Family Size</InputLabel>
        <Input
          id="family-size"
          value={user.familySize ? user.familySize.toString() : ""}
          onChange={(evt) => {
            const rawFamilySize = evt.target.value;
            const parsedFamilySize = parseInt(rawFamilySize);

            if (!isNaN(parsedFamilySize) && parsedFamilySize >= 0) {
              setUser({
                ...user,
                familySize: parsedFamilySize,
              });
            } else if (rawFamilySize === "")
              setUser({ ...user, familySize: null });
          }}
          onBlur={(evt) => {
            const parsedFamilySize = parseInt(evt.target.value);

            if (!isNaN(parsedFamilySize)) {
              if (parsedFamilySize >= 1)
                setUser({
                  ...user,
                  familySize: parsedFamilySize,
                });
            } else setUser({ ...user, familySize: 1 });
          }}
        />
      </FormControl>
      <FormControl
        className="what-about-you-input-container"
        fullWidth={true}
        sx={{ mb: "2.5rem" }}
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={user.isPregnant}
              onChange={(evt) => {
                setUser({
                  ...user,
                  isPregnant: evt.target.checked,
                });
              }}
              name="isPregnant"
            />
          }
          label="Are you pregnant?"
        />
      </FormControl>
    </Box>
  );
}
