"use client";
import React, { useEffect } from "react";
import { LoadingProvider, useLoadingContext } from "./context/Loading";
import { UserProvider, useUser } from "./context/User";
import { useAlertContext, AlertContextProvider } from "./context/Alert";
import Loading from "./components/Loading";
import SessionExpired from "./components/SessionExpired";
import { Snackbar, Alert } from "@mui/material";

function ChildWithLoading({ children }: { children: React.ReactNode }) {
  const { loading } = useLoadingContext();
  return (
    <div>
      {children}
      {loading && <Loading />}
    </div>
  );
}

function ChildWithSessionExpired({ children }: { children: React.ReactNode }) {
  const { user, expiredSession, fetchUser } = useUser();
  const pagesAllowedWithoutLogin = [
    process.env.NEXT_PUBLIC_DOMAIN + "/signin", // login
    process.env.NEXT_PUBLIC_DOMAIN + "/signup", // signup
    process.env.NEXT_PUBLIC_DOMAIN + "/", // home page
    process.env.NEXT_PUBLIC_DOMAIN + "/codes",
  ];
  return (
    <div>
      {expiredSession &&
      !pagesAllowedWithoutLogin.includes(location.href.toString()) ? (
        <SessionExpired />
      ) : (
        <div>{children}</div>
      )}
    </div>
  );
}

const ChildWithSnackbar = ({ children }: { children: React.ReactNode }) => {
  const { openSnackbar, setOpenSnackbar, alertSeverity, alertMessage } =
    useAlertContext();
  return (
    <div>
      {children}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(!openSnackbar)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(!openSnackbar)}
          severity={alertSeverity === "error" ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {alertMessage || "This is an error message!"}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default function ParentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AlertContextProvider>
      <UserProvider>
        <LoadingProvider>
          <ChildWithLoading>
            <ChildWithSessionExpired>
              <ChildWithSnackbar>{children}</ChildWithSnackbar>
            </ChildWithSessionExpired>
          </ChildWithLoading>
        </LoadingProvider>
      </UserProvider>
    </AlertContextProvider>
  );
}
