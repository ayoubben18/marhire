import * as React from "react";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

export default function NumberSlider({ value, min, max, onChange, label, unit }) {
  const [sliderValue, setSliderValue] = React.useState(Number(value) || min);

  React.useEffect(() => {
    setSliderValue(Number(value) || min);
  }, [value, min]);

  const handleSliderChange = (_, newValue) => {
    setSliderValue(newValue);
    onChange && onChange(newValue);
  };

  const handleInputChange = (e) => {
    let v = Number(e.target.value.replace(/[^\d]/g, ""));
    if (isNaN(v)) v = min;
    v = Math.max(min, Math.min(max, v));
    setSliderValue(v);
    onChange && onChange(v);
  };

  return (
    <Box sx={{ width: 320, p: 2, borderRadius: 2, bgcolor: "white" }}>
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          label={label || "Value"}
          size="small"
          value={sliderValue}
          onChange={handleInputChange}
          InputProps={{
            endAdornment: unit ? <span style={{ marginLeft: 2 }}>{unit}</span> : null,
          }}
          sx={{
            flex: 1,
            "& input": { fontWeight: 400, fontSize: "11pt" },
            borderRadius: 2,
          }}
        />
      </Box>
      <Slider
        value={sliderValue}
        min={min}
        max={max}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
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
