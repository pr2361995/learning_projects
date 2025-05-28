import { redirect } from "react-router-dom";

export function getToken() {
    return localStorage.getItem("token");
}

export function getAuthToken() {
    const token = localStorage.getItem("token");

    if(!token){
        return;
    }

    const duration = getTokenDuration();
    
    if(duration <= 0){
        return "EXPIRED";
    }

    return token;
}

export function getAuthChecker(){
    const token = getToken()
    if(!token)
        return redirect("/auth")
    return null;
}

export function getTokenDuration() {
    const expiration = localStorage.getItem("expiration"),
    expDate     = new Date(expiration),
    now         = new Date(),
    duration    = expDate.getTime() - now.getTime();
    return duration;
}