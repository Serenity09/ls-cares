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
} from "@mui/material";

import {
  getUSStates,
  getUSStateByAbbreviation,
  getUSStateByName,
} from "../../services/usStateService";
import { useUserContext } from "../../user/UserContext";

const MAX_AGE = 150;
const MAX_FAMILY_SIZE = 50;

export default function WhatAboutYou() {
  const { user, setUser } = useUserContext();
  const [usStateValue, setUSStateValue] = useState<string | null>(
    getUSStateByAbbreviation(user.usState)
      ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        getUSStateByAbbreviation(user.usState)!.name
      : ""
  );

  return (
    <Box component="form" sx={{ mt: "2.5rem" }}>
      <FormControl className="what-about-you-input-container" fullWidth={true}>
        <Autocomplete
          value={usStateValue}
          onChange={(event: React.SyntheticEvent, newValue: string | null) => {
            setUSStateValue(newValue);

            const usState = getUSStateByName(newValue);
            setUser({
              ...user,
              usState: usState ? usState.abbreviation : null,
            });
          }}
          id="state"
          options={getUSStates().map((state) => state.name)}
          sx={{ mb: "2rem" }}
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
              if (parsedAge > 0 && parsedAge <= MAX_AGE)
                setUser({ ...user, age: parsedAge });
              else if (parsedAge > MAX_AGE) setUser({ ...user, age: MAX_AGE });
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
              if (parsedFamilySize <= MAX_FAMILY_SIZE)
                setUser({
                  ...user,
                  familySize: parsedFamilySize,
                });
              else
                setUser({
                  ...user,
                  familySize: MAX_FAMILY_SIZE,
                });
            } else if (rawFamilySize === "")
              setUser({ ...user, familySize: null });
          }}
          onBlur={(evt) => {
            const parsedFamilySize = parseInt(evt.target.value);

            if (!isNaN(parsedFamilySize)) {
              if (parsedFamilySize >= 1 && parsedFamilySize <= MAX_FAMILY_SIZE)
                setUser({
                  ...user,
                  familySize: parsedFamilySize,
                });
              else if (parsedFamilySize > MAX_FAMILY_SIZE)
                setUser({
                  ...user,
                  familySize: MAX_FAMILY_SIZE,
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
