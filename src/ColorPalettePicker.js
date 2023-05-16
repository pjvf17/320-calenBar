import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import colorPaletteTheme from "./ColorPalettePicker.css"

const Item = styled(Paper)(({ theme, color }) => ({
  backgroundColor: color,
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function ColorPalettePicker({onChange}) {
  const palette = {
    oceanicNextLightBrown: "#966a5b",
    oceanicNextRed: "#ec5f67",
    nordAurora3: "#ebcb8b",
    nordAurora4: "#a3be8c",
    nordAurora1: "#bf616a",
    oceanicNextLightOrange: "#db804d",
    nordAurora5: "#b48ead",
    
    oceanicNextBrown: "#ab7967",
    oceanicNextOrange: "#f99157",
    oceanicNextYellow: "#fac863",
    oceanicNextGreen: "#99c794",
    oceanicNextCyan: "#62b3b2",
    oceanicNextBlue: "#6699cc",
    oceanicNextPurple: "#c594c5",
    
    nordAurora2: "#d08770",
    oceanicNextLightRed: "#d0545b",
    oceanicNextLightYellow: "#dcb057",
    oceanicNextLightGreen: "#87af82",
    oceanicNextLightCyan: "#569e9d",
    oceanicNextLightBlue: "#5a87b4",
    oceanicNextLightPurple: "#ad82ad",
  };
  return (
    <Box sx={{ flexGrow: 1 }} id="colorPalettePickerGrid" theme={colorPaletteTheme}>
      <Grid
        container
        spacing={0.1}
        columnSpacing={0.0005}
        columns={7}
      >
        {Object.entries(palette).map(([key,value]) => (
          <Grid item xs={1} key={key} onClick={() => onChange(value)}>
            <IconButton>
              <Item color={value}></Item>
            </IconButton>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
