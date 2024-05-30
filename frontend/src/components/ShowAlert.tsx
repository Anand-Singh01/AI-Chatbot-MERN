import Alert from "@mui/material/Alert";
import { useRecoilValue } from "recoil";
import { showAlertAtom } from "../store/alert-atoms";
import { alertType } from "../types";
const ShowAlert = () => {
  const currentAlert = useRecoilValue(showAlertAtom);
  const { severity, message } = currentAlert;
  return (
    <div>
      {severity === alertType.error ? (
        <Alert severity="error">{message}</Alert>
      ) : severity === alertType.success ? (
        <Alert severity="success">{message}</Alert>
      ) : severity === alertType.warning ? (
        <Alert severity="warning">{message}</Alert>
      ) : (
        <Alert severity="info">{message}</Alert>
      )}
    </div>
  );
};

export default ShowAlert;
