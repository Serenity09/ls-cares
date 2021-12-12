import { Autocomplete, Box, FormControl, Input, InputAdornment, InputLabel, TextField } from "@mui/material";
import { useState } from "react";

import statesLookup from '../../data/us-states.json';
import IUseUserInfo from '../../interfaces/IUseUserInfo';

export default function WhatAboutYou(props: IUseUserInfo) {
    const [ usStateDisplay, setUSStateDisplay ] = useState('');
    
    return (
        <Box component="form" sx={{ mt: "2.5rem" }}>
            <FormControl className="what-about-you-input-container" fullWidth={true}>
                <Autocomplete
                    value={props.userInfo.usState}
                    onChange={(event: any, newValue: string | null) => {
                        props.setUserInfo({...props.userInfo, usState: newValue})
                    }}
                    inputValue={usStateDisplay}
                    onInputChange={(event, newInputValue) => {
                        setUSStateDisplay(newInputValue);
                    }}
                    id="state"
                    options={statesLookup.map((state) => state.name)}
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
                        if (parsedAge > 0 && parsedAge <= 150)
                            props.setUserInfo({...props.userInfo, age: parsedAge});
                        else if (parsedAge > 150)
                            props.setUserInfo({...props.userInfo, age: 150});
                    }
                    else
                        props.setUserInfo({...props.userInfo, age: null});
                }} />
            </FormControl>
            <FormControl className="what-about-you-input-container" fullWidth={true} sx={{ mb: "2.5rem" }}>
                <InputLabel htmlFor="projectedIncome">Projected Income</InputLabel>
                <Input id="projectedIncome" value={props.userInfo.projectedIncome ? props.userInfo.projectedIncome.toLocaleString("en-US") : ""} onChange={(evt) => {
                    const parsedProjectedIncome = parseInt(evt.target.value.replace(/,/g, ""));

                    if (!isNaN(parsedProjectedIncome))
                        props.setUserInfo({...props.userInfo, projectedIncome: parsedProjectedIncome});
                    else
                        props.setUserInfo({...props.userInfo, projectedIncome: null});
                }} startAdornment={<InputAdornment position="start">$</InputAdornment>} />
            </FormControl>
        </Box>
    );
}