import { Alert, Box, Button, Divider, Snackbar, Stack, TextField, Typography } from "@mui/material";
import { formDataType, SnackMessage } from "../utils/type";
import { useState } from "react";
import { send } from "emailjs-com";
import { useData } from "../Context/DataContext";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        setsnackbarMessage({ message: "Email Sent successfully", messageType: 1 });
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

  return (
    <Box
      sx={{
        py: 5,
        display: { sm: "flex" },
        flexDirection: "row",
      }}
    >
      <Box flex={2} px={5}>
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
      <Box flex={1} padding={5}>
        {/* <Typography variant="h3" color="primary.dark" fontWeight={"bold"}>
          Contact
        </Typography>
        <Stack spacing={10} paddingTop={10}>
          <TextField variant="filled" label="Name" name="name" />
          <TextField variant="filled" label="Email" name="" type="email" />
          <TextField variant="filled" label="Message" multiline rows={10} />
        </Stack> */}
      </Box>

      <Snackbar
        open={snackbarMessage.messageType !== 0}
        autoHideDuration={3000}
        onClose={() => setsnackbarMessage({ messageType: 0, message: "" })}
      >
        <Alert severity={snackbarMessage.messageType === -1 ? "error" : "success"} icon={false}>
          {snackbarMessage.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Contact;
