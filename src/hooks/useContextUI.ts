import { useContext } from "react";
import ContextUI from "../context";

export default function useContextUI() {
    return useContext(ContextUI);
};