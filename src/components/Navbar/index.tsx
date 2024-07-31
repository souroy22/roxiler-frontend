import { ChangeEvent } from "react";
import DropDown from "../Dropdown";
import {
  Box,
  InputAdornment,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./style.css";

type PROP_TYPE = {
  inputValue: string;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  selectedValue: number | null;
  options: string[];
  handleChange: (event: SelectChangeEvent) => void;
  onClear: () => void;
  label?: string;
};

const Navbar = ({
  inputValue,
  handleInputChange,
  selectedValue,
  options,
  handleChange,
  label = "Month",
  onClear,
}: PROP_TYPE) => {
  return (
    <Box className="navbar-container">
      <Box className="navbar-left-section">Admin</Box>
      <Box className="navbar-right-section">
        <DropDown
          selectedValue={selectedValue}
          options={options}
          handleChange={handleChange}
          onClear={onClear}
          label={label}
        />
        <TextField
          value={inputValue}
          onChange={handleInputChange}
          className="text-input"
          placeholder="search..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "white" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            border: "none",
            outline: "none",
            "& fieldset": {
              border: "none",
            },
            "& input": {
              color: "white",
              border: "none",
              outline: "none",
              transition: "all 0.4s ease-in-out",
              "&:hover": { border: "none", outline: "none" },
              "&:focus": { width: "250px", border: "none", outline: "none" },
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default Navbar;
