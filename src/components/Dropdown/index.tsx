import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import "./style.css";

type PROP_TYPE = {
  selectedValue: number | null;
  options: string[];
  handleChange: (event: SelectChangeEvent) => void;
  onClear: () => void;
  label?: string;
};

const DropDown = ({
  selectedValue,
  options,
  handleChange,
  label = "Month",
  onClear,
}: PROP_TYPE) => {
  return (
    <FormControl
      sx={{
        width: "200px",
        height: "50px !important",
        backgroundColor: "#3B8AD9",
        borderRadius: "3px",
        "& .select-form-container": { border: "none !important" },
        "& fieldset": { border: "none !important" },
      }}
    >
      <InputLabel
        id="demo-simple-select-label"
        sx={{ color: "white !important", fontSize: "18px", fontWeight: 700 }}
      >
        {label}
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={String(selectedValue)}
        label={label}
        placeholder={label}
        onChange={handleChange}
        IconComponent={
          String(selectedValue).length > 0
            ? () => (
                <IconButton
                  size="small"
                  onClick={() => {
                    onClear();
                  }}
                >
                  <CancelIcon />
                </IconButton>
              )
            : undefined
        }
        className="select-form-container"
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={index + 1}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DropDown;
