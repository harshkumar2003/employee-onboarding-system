import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1d4ed8",
    },
    secondary: {
      main: "#0f172a",
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
  },
});

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>,
)
