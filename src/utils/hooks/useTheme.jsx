import { useContext } from "react";
import ThemeProvider from "../context/ThemeProvider";

const useTheme = () => {
    return useContext(ThemeProvider);  
}

export default useTheme;