import { AlertColor } from "@mui/material";
import { useState } from "react";
import { Snackbar, Alert, Button } from "@mui/material";

type TSnackbarProps = {
  message?: string;
  severity?: AlertColor;
  type?: { name: "INFO" | "CHOICE"; function?: () => void; button?: string };
};

const useSnackbar = () => {
  const snackBarInitialState = { state: false };

  const [open, setOpen] = useState<
    TSnackbarProps & {
      state: Boolean;
    }
  >(snackBarInitialState);

  const handleSnackBarOpening = (
    message: string,
    severity: AlertColor,
    type: { name: "INFO" | "CHOICE"; function?: () => void; button?: string }
  ) => {
    setOpen({ state: true, message, severity, type });
  };
  const handleSnackBarClosing = () => {
    setOpen(snackBarInitialState);
  };

  const CustomSnackbar = () => {
    return (
      <>
        {open.state && (
          <Snackbar
            open={true}
            autoHideDuration={open.type?.name === "INFO" ? 6000 : null}
            onClose={handleSnackBarClosing}
          >
            <Alert
              onClose={handleSnackBarClosing}
              severity={open.severity}
              sx={{ width: "100%" }}
            >
              {open.message}
              {open.type?.name === "CHOICE" && (
                <>
                  <Button onClick={open.type?.function}>
                    {open.type?.button}
                  </Button>
                  <Button onClick={handleSnackBarClosing}>Go back</Button>
                </>
              )}
            </Alert>
          </Snackbar>
        )}
      </>
    );
  };

  return { handleSnackBarOpening, CustomSnackbar };
};

export default useSnackbar;
