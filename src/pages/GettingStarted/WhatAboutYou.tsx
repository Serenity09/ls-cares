import { Autocomplete, Box, Checkbox, FormControl, FormControlLabel, Input, InputAdornment, InputLabel, TextField } from "@mui/material";
import { useState } from "react";

import { getUSStates, getUSStateByAbbreviation, getUSStateByName } from '../../services/usStateService';

import { UseUserInformation } from '../../types/UserInfo';

const MAX_AGE = 150;
const MAX_FAMILY_SIZE = 50;

export default function WhatAboutYou(props: UseUserInformation) {
    const [ usStateValue, setUSStateValue ] = useState<string | null>(getUSStateByAbbreviation(props.userInfo.usState) ? getUSStateByAbbreviation(props.userInfo.usState)!.name : "");
    
    return (
        <Box component="form" sx={{ mt: "2.5rem" }}>
            <FormControl className="what-about-you-input-container" fullWidth={true}>
                <Autocomplete
                    value={usStateValue}
                    onChange={(event: any, newValue: string | null) => {
                        setUSStateValue(newValue);
                        
                        const usState = getUSStateByName(newValue);
                        props.setUserInfo({...props.userInfo, usState: usState ? usState.abbreviation : null})
                    }}
                    id="state"
                    options={getUSStates().map((state) => state.name)}
                    sx={{ mb: "2rem" }}
                    className=""
                    renderInput={(params) => <TextField {...params} label="State" />}
                />
            </FormControl>
            <FormControl className="what-about-you-input-container" fullWidth={true} sx={{ mb: "2.5rem" }}>
                <InputLabel htmlFor="age">Age</InputLabel>
                <Input id="age" value={props.userInfo.age ? props.userInfo.age.toString() : ""} onChange={(evt) => {
                    const parsedAge = parseInt(evt.target.value);

                    if (!isNaN(parsedAge)) {
                        if (parsedAge > 0 && parsedAge <= MAX_AGE)
                            props.setUserInfo({...props.userInfo, age: parsedAge});
                        else if (parsedAge > MAX_AGE)
                            props.setUserInfo({...props.userInfo, age: MAX_AGE});
                    }
                    else
                        props.setUserInfo({...props.userInfo, age: null});
                }} />
            </FormControl>
            <FormControl className="what-about-you-input-container" fullWidth={true} sx={{ mb: "2.5rem" }}>
                <InputLabel htmlFor="projectedIncome">Projected Income</InputLabel>
                <Input id="projectedIncome" value={props.userInfo.projectedIncome ? props.userInfo.projectedIncome.toLocaleString("en-US") : ""} onChange={(evt) => {
                    const parsedProjectedIncome = parseInt(evt.target.value.replace(/,/g, ""));

                    if (!isNaN(parsedProjectedIncome) && parsedProjectedIncome >= 0)
                        props.setUserInfo({...props.userInfo, projectedIncome: parsedProjectedIncome});
                    else
                        props.setUserInfo({...props.userInfo, projectedIncome: null});
                }} startAdornment={<InputAdornment position="start">$</InputAdornment>} />
            </FormControl>
            <FormControl className="what-about-you-input-container" fullWidth={true} sx={{ mb: "2rem" }}>
                <InputLabel htmlFor="family-size">Family Size</InputLabel>
                <Input id="family-size" value={props.userInfo.familySize ? props.userInfo.familySize.toString() : ""} 
                    onChange={(evt) => {
                        const rawFamilySize = evt.target.value;
                        const parsedFamilySize = parseInt(rawFamilySize);

                        if (!isNaN(parsedFamilySize) && parsedFamilySize >= 0) {
                            if (parsedFamilySize <= MAX_FAMILY_SIZE)
                                props.setUserInfo({...props.userInfo, familySize: parsedFamilySize});
                            else
                                props.setUserInfo({...props.userInfo, familySize: MAX_FAMILY_SIZE});
                        }
                        else if (rawFamilySize === "")
                            props.setUserInfo({...props.userInfo, familySize: null});
                    }}
                    onBlur={(evt) => {
                        const parsedFamilySize = parseInt(evt.target.value);

                        if (!isNaN(parsedFamilySize)) {
                            if (parsedFamilySize >= 1 && parsedFamilySize <= MAX_FAMILY_SIZE)
                                props.setUserInfo({...props.userInfo, familySize: parsedFamilySize});
                            else if (parsedFamilySize > MAX_FAMILY_SIZE)
                                props.setUserInfo({...props.userInfo, familySize: MAX_FAMILY_SIZE});
                        }
                        else
                            props.setUserInfo({...props.userInfo, familySize: 1});
                    }}
                />
            </FormControl>
            <FormControl className="what-about-you-input-container" fullWidth={true} sx={{ mb: "2.5rem" }}>
                <FormControlLabel
                    control={
                        <Checkbox checked={props.userInfo.isPregnant} onChange={(evt) => {
                            props.setUserInfo({...props.userInfo, isPregnant: evt.target.checked});
                        }} name="isPregnant" />
                    }
                    label="Are you pregnant?"
                />
            </FormControl>
        </Box>
    );
}