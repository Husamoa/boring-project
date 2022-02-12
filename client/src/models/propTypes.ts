import User from "./user";
import {AlertProps} from "@mui/material";

export interface ProfileProps {
    auth: User,
    handleToken?: (token:any) => void,
    loginUser?: (data:any) => void,
    registerUser?: (data:any) => void,
    updateProfile?: (data:any) => void
}

export interface CustomAlertProps extends AlertProps {
    severity: "error" | "success" | "info" | "warning" | undefined,
    onClose: () => void,
}
