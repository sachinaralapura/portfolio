import {
  Alert,
  Box,
  Button,
  Divider,
  IconButton,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { formDataType, SnackMessage } from "../utils/type";
import { useState } from "react";
import { send } from "emailjs-com";
import { useData } from "../Context/DataContext";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
function Contact() {
  const { contact } = useData();
  const [formData, setFormData] = useState<formDataType>({
    name: "",
    email: "",
    message: "",
  });

  const [snackbarMessage, setsnackbarMessage] = useState<SnackMessage>({
    message: "",
    messageType: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    send(
      contact.emailJs.serviceId,
      contact.emailJs.templateId,
      formData,
      contact.emailJs.publicAPI
    ).then(
      () => {
        setsnackbarMessage({
          message: "Email Sent successfully",
          messageType: 1,
        });
        setFormData({ name: "", email: "", message: "" });
      },
      () => {
        setsnackbarMessage({
          message: "Failed to send the message. Please try again.",
          messageType: -1,
        });
      }
    );
  };

  const clipboardCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setsnackbarMessage({ message: "copied to clipboard", messageType: 1 });
  };

  return (
    <Box
      sx={{
        py: 5,
        display: { sm: "flex" },
        flexDirection: "row",
      }}
    >
      <Box flex={3} px={5}>
        <Stack spacing={10} component={"form"} onSubmit={handleSubmit}>
          <Typography variant="h3" color="primary.dark" fontWeight={"bold"}>
            Contact
          </Typography>
          <TextField
            variant="filled"
            label="Name"
            name="name"
            fullWidth
            value={formData?.name}
            onChange={handleChange}
          />
          <TextField
            variant="filled"
            label="Email"
            name="email"
            type="email"
            value={formData?.email}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            variant="filled"
            label="Message"
            name="message"
            value={formData?.message}
            onChange={handleChange}
            multiline
            fullWidth
            rows={13}
          />
          <Button
            variant="contained"
            disableElevation
            disabled={!formData.email}
            type="submit"
            sx={{ width: "fit-content", px: 5 }}
          >
            Send
          </Button>
        </Stack>
      </Box>
      <Divider orientation="vertical" flexItem />
      <Box flex={2} padding={2}>
        <Stack direction={"column"} spacing={8}>
          {contact.social.map((items) => (
            <Box
              color={"GrayText"}
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: "InactiveBorder",
                padding: 2,
              }}
            >
              <Box sx={{ flex: 1 }} textAlign={"center"}>
                {!items.img ? (
                  <IconButton size="large" href={items.link} color="primary">
                    {items.platform.toLowerCase() === "github" && (
                      <GitHubIcon />
                    )}
                    {items.platform.toLowerCase() === "linkedin" && (
                      <LinkedInIcon />
                    )}
                  </IconButton>
                ) : (
                  <Box
                    component="img"
                    src={items.img}
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%", // Optional: for rounded or circular images
                    }}
                  />
                )}
              </Box>
              <Divider
                flexItem
                orientation="vertical"
                sx={{ marginRight: 3 }}
              />
              <Typography variant="body1" flex={5}>
                {items.link}
              </Typography>
              <Box
                sx={{ flex: 1 }}
                textAlign={"center"}
                onClick={() => {
                  clipboardCopy(items.link);
                }}
              >
                <IconButton size="large" color="primary">
                  <ContentCopyRoundedIcon />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Stack>
      </Box>

      <Snackbar
        open={snackbarMessage.messageType !== 0}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        onClose={() => setsnackbarMessage({ messageType: 0, message: "" })}
      >
        <Alert
          severity={snackbarMessage.messageType === -1 ? "error" : "success"}
          icon={false}
        >
          <Typography variant="h6">{snackbarMessage.message}</Typography>
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Contact;
