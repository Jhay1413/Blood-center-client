import {  createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../../../components/AuthContenxt/AuthContext";
import {PatientInfoArray, PatientRequestInfo} from "../../../components/Interface/Interface";
import { getAllPatientInfo } from "../../../api/patientApi";
import { getRequestByPhysicianId } from "../../../api/patientRequestApi";



type DocDataContextType = {
    patientInfo : PatientInfoArray | null,
    allRequest : PatientRequestInfo | null,
    isLoading: boolean,
    handleSetIsLoading :()=>void
} | null

export const DocDataContext = createContext<DocDataContextType | null>(null)

type DocDataProps ={
    children : React.ReactNode
}
export const DocDataProvider = ({children}:DocDataProps) =>{
    const[patientInfo,setPatientInfo] = useState<PatientInfoArray | null>([])
    const [allRequest,setAllRequest] = useState<PatientRequestInfo | null>([])
    const [isLoading,setIsLoading] = useState<boolean>(true)

    const {authContext} = useAuth();

    const handleSetIsLoading = () => setIsLoading(!isLoading);
    
    const getRequest = async () =>{
        try {
            if(authContext){
                const response = await getRequestByPhysicianId(authContext?.userId)
                if(response){
                    setAllRequest(response.data)
                }
              
            }
           
        } catch (error) {
            console.log(error)
        }
        
    }
    const getPatient = async() =>{
        try {
            const response = await getAllPatientInfo();
            if(response){
                setPatientInfo(response.data)

            }
          
        } catch (error) {
            console.log(error)
        }
        
    }
    useEffect(()=>{
        const fetchData = async ()=>{
            await getPatient()
            await getRequest()
            setIsLoading(false);
        }
        
        fetchData();
      

    },[isLoading])
       
   

    return(
        <DocDataContext.Provider value={{patientInfo,allRequest,isLoading,handleSetIsLoading}}>
                {children}
        </DocDataContext.Provider>
    )
}
export const getDocData = ():DocDataContextType | null =>{
    const contextValue = useContext(DocDataContext);
   

    return contextValue;
}
