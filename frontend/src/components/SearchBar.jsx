import { TextField, InputAdornment } from "@mui/material";
import { Search } from "lucide-react";

const SearchBar = ({value, onChange }) => {
  return (
    <TextField
      fullWidth
      placeholder="Search employees by name, email"
      variant="outlined"
      size="small"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search size={18} color="#64748b" />
          </InputAdornment>
        ),
        
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: 3,
          backgroundColor: "#f8fafc",
          transition: "all 0.2s ease",
          "&:hover": {
            backgroundColor: "#ffffff",
          },
          "&.Mui-focused": {
            backgroundColor: "#ffffff",
            boxShadow: "0 0 0 4px rgba(37, 99, 235, 0.08)",
          },
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "rgba(148, 163, 184, 0.35)",
        },
        "& .MuiInputBase-input": {
          py: 1.4,
        },
      }}
      value={value}
      onChange={onChange}/>
  );
};

export default SearchBar;
