import { Typography } from "@mui/material";

export default function Intro() {
    return (
        <>
            {/* <Typography variant="h1">
                Intro
            </Typography> */}
            {/* <Typography variant="h1">
                Figuring out what to do with the American healthcare system sucks, so that's basically why this guide exists. 
            </Typography> */}
            <Typography variant="h1" sx={{ display: "inline-block" }}>
                Navigating
            </Typography>
            <Typography variant="h2" sx={{ display: "inline"}}> the American healthcare system sucks, so that's basically why this guide exists. </Typography>
        </>
    );
}