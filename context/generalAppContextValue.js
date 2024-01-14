import { createContext } from "react";

export const GeneralAppContext = createContext({
  session: null,
  user: null,
  isNewUser: false,
  username: "",
});
