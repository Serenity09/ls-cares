import { Box, Typography } from "@mui/material";

export default function Intro() {
  return (
    <Box sx={{ mb: "2rem" }}>
      <Typography variant="h1" component="span">
        Navigating
      </Typography>
      <Typography variant="h2" component="span">
        {
          " the United States healthcare system sucks, so that's basically why this guide exists."
        }
      </Typography>
    </Box>
  );
}
