import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
  ReactNode,
} from "react";

interface AlertContextType {
  openSnackbar: boolean;
  setOpenSnackbar: (val: boolean) => void;
  alertSeverity: string;
  setAlertSeverity: (val: string) => void;
  alertMessage: string;
  setAlertMessage: (val: string) => void;
  alert: (severity: string, message: string) => void;
}

type AlertContextProps = {
  children: ReactNode;
};

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertContextProvider = ({ children }: AlertContextProps) => {
  const [openSnackbar, setOpenSnackbarVal] = useState<boolean>(false);
  const [alertSeverity, setAlertSeverityVal] = useState<string>("error");
  const [alertMessage, setAlertMessageVal] = useState<string>("Error");
  const setOpenSnackbar = (val: boolean) => {
    setOpenSnackbarVal(val);
  };
  const setAlertSeverity = (val: string) => {
    setAlertSeverityVal(val);
  };
  const setAlertMessage = (val: string) => {
    setAlertMessageVal(val);
  };
  const alert = (severity: string, message: string) => {
    setAlertSeverity(severity);
    setAlertMessage(message);
    setOpenSnackbar(true);
  };
  return (
    <AlertContext.Provider
      value={{
        openSnackbar,
        setOpenSnackbar,
        alertSeverity,
        setAlertSeverity,
        alertMessage,
        setAlertMessage,
        alert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export const useAlertContext = (): AlertContextType => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlertContext must be used within a AlertProvider");
  }
  return context;
};
