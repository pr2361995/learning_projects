import { redirect } from "react-router-dom";

export async function logoutAction({params}) {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    return redirect("/");
}