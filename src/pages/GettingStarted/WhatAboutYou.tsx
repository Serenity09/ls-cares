import { Autocomplete, Box, FormControl, Input, InputAdornment, InputLabel, TextField } from "@mui/material";
import { useState } from "react";

import statesLookup from '../../data/us-states.json';

interface WhatAboutYouFormState {
    usState: string | null,
    age : number | null,
    projectedIncome: number | null
}

export default function WhatAboutYou() {
    const [ usStateDisplay, setUSStateDisplay ] = useState('');
    const [ formState, setFormState ] = useState<WhatAboutYouFormState>({
        usState: null,
        age: null,
        projectedIncome: null
    });
    
    return (
        <Box component="form" sx={{ mt: "2.5rem" }}>
            <FormControl className="what-about-you-input-container" fullWidth={true}>
                <Autocomplete
                    value={formState.usState}
                    onChange={(event: any, newValue: string | null) => {
                        setFormState({...formState, usState: newValue})
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
                <Input id="age" value={formState.age ? formState.age.toString() : ""} onChange={(evt) => {
                    const parsedAge = parseInt(evt.target.value);

                    if (!isNaN(parsedAge)) {
                        if (parsedAge > 0 && parsedAge <= 150)
                            setFormState({...formState, age: parsedAge});
                        else if (parsedAge > 150)
                            setFormState({...formState, age: 150});
                    }
                    else
                        setFormState({...formState, age: null});
                }} />
            </FormControl>
            <FormControl className="what-about-you-input-container" fullWidth={true} sx={{ mb: "2.5rem" }}>
                <InputLabel htmlFor="projectedIncome">Projected Income</InputLabel>
                <Input id="projectedIncome" value={formState.projectedIncome ? formState.projectedIncome.toLocaleString("en-US") : ""} onChange={(evt) => {
                    const parsedProjectedIncome = parseInt(evt.target.value.replace(/,/g, ""));

                    if (!isNaN(parsedProjectedIncome))
                        setFormState({...formState, projectedIncome: parsedProjectedIncome});
                    else
                        setFormState({...formState, projectedIncome: null});
                }} startAdornment={<InputAdornment position="start">$</InputAdornment>} />
            </FormControl>
        </Box>
    );
}