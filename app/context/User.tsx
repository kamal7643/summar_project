import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { getLocalStorageItem } from "@/lib/localStorage";

interface UserContextType {
  user: any;
  expiredSession: boolean;
  fetchUser: () => void;
}

type UserContextProps = {
  children: ReactNode;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: UserContextProps) => {
  const [user, setUser] = useState<any>(null);
  const [expiredSession, setExpiredSession] = useState<boolean>(false);
  const fetchUser = useCallback(async () => {
    try {
      const response = await fetch("/api/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getLocalStorageItem("token", ""),
        },
      });
      const data = await response.json();
      // console.log(data);
      if (data.success) {
        setUser(data.data);
      } else {
        setExpiredSession(true);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <UserContext.Provider value={{ user, expiredSession, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
