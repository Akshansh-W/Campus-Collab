import { Children, createContext, useContext, useState } from "react";

const StudentContext = createContext();
export const StudentProvider = ({children})=>{
    const [student,setStudent] = useState({
        studentEmail : "",
        studentPassword : "",
        studentName : "",
        rollNumber : "",
        currentYear : "",
        department : "",
        technicalInterests : [],
    });
    return(
        <StudentContext.Provider value={{student,setStudent}}>
            {children}
        </StudentContext.Provider>
    )
}

export const useStudent = ()=> useContext(StudentContext);