import Alert from "@mui/material/Alert";const ErrorMessage = ({ text }) => {
  return (
    <>
      <Alert severity="error" style={{ margin: "10px 0px 20px 0px" }}>
        {text}
      </Alert>
    </>
  );
};

export default ErrorMessage;
