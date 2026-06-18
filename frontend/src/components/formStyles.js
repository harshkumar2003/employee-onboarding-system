export const gradientBarSx = {
  height: 4,
  background: "linear-gradient(90deg, #2563eb 0%, #06b6d4 55%, #14b8a6 100%)",
};

export const eyebrowSx = {
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "1px",
  color: "#9ca3af",
  textTransform: "uppercase",
};

export const cardSx = {
  borderRadius: "24px",
  border: "1px solid #e5e7eb",
  overflow: "hidden",
  position: "relative",
  background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
  boxShadow: "0 14px 40px rgba(15, 23, 42, 0.06)",
};

export const inputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "16px",
    backgroundColor: "#fff",
    minHeight: 56,
    "& fieldset": {
      borderColor: "#e5e7eb",
    },
    "&:hover fieldset": {
      borderColor: "#cbd5e1",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#2563eb",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#64748b",
  },
  "& .MuiFormHelperText-root": {
    marginLeft: 0,
  },
};

export const primaryButtonSx = {
  borderRadius: "12px",
  px: 3,
  py: 1.05,
  minHeight: 44,
  fontSize: 13,
  fontWeight: 800,
  letterSpacing: "0.15px",
  boxShadow: "none",
  bgcolor: "#1d4ed8",
  "&:hover": {
    bgcolor: "#1e40af",
    boxShadow: "none",
  },
};

export const sectionCardSx = {
  p: { xs: 1.5, md: 1.75 },
  borderRadius: 2.5,
  border: "1px solid",
  borderColor: "divider",
  bgcolor: "rgba(37, 99, 235, 0.025)",
};

export const helperTitleSx = {
  fontSize: 11,
  fontWeight: 800,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  lineHeight: 1.2,
};

export const helperTextSx = {
  fontSize: 12,
  lineHeight: 1.45,
};
