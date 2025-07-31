import * as React from "react";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";

export default function PriceRangeSlider({ value, min, max, onChange }) {
  // value = [minValue, maxValue]
  const [range, setRange] = React.useState(value || [min, max]);

  const handleSliderChange = (_, newValue) => {
    setRange(newValue);
    onChange && onChange(newValue);
  };

  const handleInputChange = (idx, val) => {
    let v = Number(val.replace(/[^\d]/g, ""));
    if (isNaN(v)) v = idx === 0 ? min : max;
    const newRange = [...range];
    newRange[idx] = Math.max(min, Math.min(max, v));
    // Enforce min/max relationship:
    if (idx === 0 && newRange[0] > newRange[1]) newRange[0] = newRange[1];
    if (idx === 1 && newRange[1] < newRange[0]) newRange[1] = newRange[0];
    setRange(newRange);
    onChange && onChange(newRange);
  };

  // If parent controls, update state
  React.useEffect(() => {
    if (value) setRange(value);
  }, [value]);

  return (
    <Box sx={{ width: 320, p: 2, borderRadius: 2, bgcolor: "white" }}>
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          label="Min"
          size="small"
          value={range[0]}
          onChange={e => handleInputChange(0, e.target.value)}
          InputProps={{
            startAdornment: <InputAdornment position="start">€</InputAdornment>,
          }}
          sx={{
            flex: 1,
            "& input": { fontWeight: 400, fontSize: "11pt" },
            borderRadius: 2,
          }}
        />
        <TextField
          label="Max"
          size="small"
          value={range[1] === max ? `${max.toLocaleString()}+` : range[1]}
          onChange={e => handleInputChange(1, e.target.value.replace("+", ""))}
          InputProps={{
            startAdornment: <InputAdornment position="start">€</InputAdornment>,
          }}
          sx={{
            flex: 1,
            "& input": { fontWeight: 400, fontSize: "11pt" },
            borderRadius: 2,
          }}
        />
      </Box>
      <Slider
        getAriaLabel={() => "Price range"}
        value={range}
        min={min}
        max={max}
        onChange={handleSliderChange}
        valueLabelDisplay="off"
        sx={{
          color: "#1c584e",
          height: 4,
          "& .MuiSlider-thumb": {
            width: 30,
            height: 30,
            backgroundColor: "#1c584e",
            border: "3px solid #fff",
            "&:focus, &:hover, &.Mui-active": {
              boxShadow: "0 0 0 6px #e0f7fa",
            },
          },
          "& .MuiSlider-rail": { opacity: 1, backgroundColor: "#1c584e" },
        }}
      />
    </Box>
  );
}
