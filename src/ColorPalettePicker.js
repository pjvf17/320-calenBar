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
    /* Col 1 */
    /* 1 */ brown1: "#d08770",
    /* 2 */ red1: "#f28d92",
    /* 2 */ orange1: "#fbad84",
    /* 3 */ yellow1: "#ebcb8b",
    /* 4 */ green1: "#afd3ab",
    /* 5 */ cyan1: "#87c5c4",
    /* 6 */ blue1: "#8cb2d9",
    /* 7 */ purple1: "#ccb3c7",
    /* Col 2 */
    /* 1 */ brown2: "#ab7967",
    /* 2 */ red2: "#d97378",
    /* 2 */ orange2: "#f88649",
    /* 3 */ yellow2: "#fac863",
    /* 4 */ green2: "#80b979",
    /* 5 */ cyan2: "#62b3b2",
    /* 6 */ blue2: "#6699cc",
    /* 7 */ purple2: "#c18bc1",
    /* Col 3 */
    /* 1 */ brown3: "#966a5b",
    /* 2 */ red3: "#b43138",
    /* 2 */ orange3: "#dd5308",
    /* 3 */ yellow3: "#dcb057",
    /* 4 */ green3: "#5f8c5a",
    /* 5 */ cyan3: "#4b8b8a",
    /* 6 */ blue3: "#47739e",
    /* 7 */ purple3: "#946194",
  };
  return (
    <Box sx={{ flexGrow: 1 }} id="colorPalettePickerGrid" theme={colorPaletteTheme}>
      <Grid
        container
        spacing={0.1}
        columnSpacing={0.0005}
        columns={8}
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
