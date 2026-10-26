import { createContext, useContext, useState } from "react";

const ErrorContext = createContext();

export function ErrorProvider({children}){
    const [error,setError] = useState(null);

    const showError = (message)=>{
        setError(message);
    }

    const clearError = (message)=>{
        setError(null);
    }

    return(
        <ErrorContext.Provider value={{error, showError, clearError}}>
            {children}
        </ErrorContext.Provider>
    )
};

export function useError(){
    return useContext(ErrorContext);
}