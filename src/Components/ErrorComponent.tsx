import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ErrorComponent() {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/", { replace: true });
    }, 1000);
    return () => clearTimeout(timer);
  });
  return (
    <Box textAlign="center" mt={5}>
      <Typography variant="h4" color="error" gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant="body1">
        You will be redirected to the home page in 5 seconds...
      </Typography>
    </Box>
  );
}

export default ErrorComponent;
