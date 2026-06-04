import { Button as MuiButton } from "@mui/material";

const Button = ({ name, className = "", onClick, type = "button", disabled = false }) => {
  return (
    <MuiButton
      onClick={onClick}
      type={type}
      disabled={disabled}
      variant="contained"
      color="secondary"
      size="small"
      disableElevation
      className={className}
      sx={{
        mt: 0.5,
        px: 2.5,
        py: 1.25,
        minHeight: 38,
        borderRadius: 2.5,
        fontWeight: 700,
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
