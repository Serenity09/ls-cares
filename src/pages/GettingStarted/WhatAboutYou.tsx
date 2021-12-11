import { Autocomplete, Box, FormControl, Input, InputAdornment, InputLabel, TextField } from "@mui/material";
import { useState } from "react";

import statesLookup from '../../data/us-states.json';

export default function WhatAboutYou() {
    const [ usState, setUSState ] = useState<string | null>(null);
    const [ usStateDisplay, setUSStateDisplay ] = useState('');
    
    return (
        <Box component="form">
            <FormControl className="what-about-you-input-container" fullWidth={true}>
                <Autocomplete
                    value={usState}
                    onChange={(event: any, newValue: string | null) => {
                        setUSState(newValue);
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
            <FormControl className="what-about-you-input-container" fullWidth={true} sx={{ mb: "2rem" }}>
                <InputLabel htmlFor="age">Age</InputLabel>
                <Input id="age" />
            </FormControl>
            <FormControl className="what-about-you-input-container" fullWidth={true} sx={{ mb: "2rem" }}>
                <InputLabel htmlFor="projectedIncome">Projected Income</InputLabel>
                <Input id="projectedIncome" startAdornment={<InputAdornment position="start">$</InputAdornment>} />
            </FormControl>
        </Box>
    );
}