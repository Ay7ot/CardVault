import { useContext } from "react";
import { GeneralAppContext } from "../context/GeneralAppContext";

export function useGeneralAppContext() {
  return useContext(GeneralAppContext);
}
