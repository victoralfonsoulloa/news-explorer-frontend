import { createContext } from "react";

export interface CurrentUserContextType {
  logged: boolean;
  setLogged: (logged: boolean) => void;
  // Add other user properties when backend is ready
  // user?: User;
  // token?: string;
}

export const CurrentUserContext = createContext<CurrentUserContextType>({
  logged: false, // Default to false for now, will be true when backend is ready
  setLogged: () => {},
});
