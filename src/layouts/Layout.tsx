import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";

import AppBar from "./AppBar";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

type LayoutProps = {
  children?: ReactJSXElement;
};
export default function Layout(props: LayoutProps) {
  return (
    <>
      <CssBaseline />
      <AppBar />
      <Container maxWidth="lg" component="main" sx={{ mt: "2rem" }}>
        {props.children}
      </Container>
    </>
  );
}
