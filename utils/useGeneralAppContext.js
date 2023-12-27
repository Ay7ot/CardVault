import { useContext } from "react";
import { GeneralAppContext } from "../context/generalAppContextValue";

export function useGeneralAppContext() {
  return useContext(GeneralAppContext);
}
