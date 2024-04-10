import { createContext, useContext } from "react";

const AuthContext = createContext(null);

export default function AuthProvider({ children }) {

    

    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}

export const useAuth = () => {

    const context = useContext(AuthContext)

    if(context === undefined){
        throw new Error("useAuth must be used within an AuthProvider")
    }

    return context;
}