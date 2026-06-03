import { Button as MuiButton } from "@mui/material";

const Button = ({ name, className = "", onClick, type = "button", disabled = false }) => {
  return (
    <MuiButton
      onClick={onClick}
      type={type}
      disabled={disabled}
      variant="contained"
      color="secondary"
      disableElevation
      className={className}
      sx={{
        mt: 1,
        px: 4,
        py: 1.25,
        borderRadius: 3,
        fontWeight: 600,
        textTransform: "none",
        backgroundColor: "#0f172a",
        "&:hover": {
          backgroundColor: "#1e293b",
        },
      }}
    >
      {name}
    </MuiButton>
  );
};

export default Button;
