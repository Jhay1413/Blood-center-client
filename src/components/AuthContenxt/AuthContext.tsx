
import jwtDecode from 'jwt-decode';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';



export type AuthContextType ={
    userId:string,
    userRoles:string,
    iat:number,
    exp:number
} | null;
const AuthContext =createContext<AuthContextType | null>(null)


type LoadingContextType= {
    isLoading:boolean,
    setIsLoading:React.Dispatch<React.SetStateAction<boolean>>;
}
const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

type AuthProviderProps = {
    children:ReactNode;
}
type JWTPayload =  {
    userId: string,
    userRoles: string,
    iat: number,
    exp:number
} | null
export const AuthProvider = ({children}:AuthProviderProps)=>{
    const [authContextData,setAuthContextData] = useState<AuthContextType>(null)
    const [isLoading,setIsLoading] = useState<boolean>(true);
   
    useEffect(()=>{
        const authToken = localStorage.getItem('token');
        let authTokenDecoded: JWTPayload = null
        if(authToken){
            authTokenDecoded = jwtDecode(authToken);
            const currentTime = Math.floor(Date.now()/1000);
                if(authTokenDecoded && authTokenDecoded.exp > currentTime){
                    console.log(authTokenDecoded);
                    setAuthContextData(authTokenDecoded)
                    
                }else{
                    localStorage.removeItem('token')
                }   
        }else{
            setAuthContextData(null)
        }
        setIsLoading(false);
    },[isLoading])
    return(
        <AuthContext.Provider value={authContextData}>
            <LoadingContext.Provider value={{isLoading,setIsLoading}}>
                {children}
            </LoadingContext.Provider>
        </AuthContext.Provider>
    )
}
export const useAuth = ():{authContext: AuthContextType | null,loadingContext:LoadingContextType | undefined}   => {
    const auth = useContext(AuthContext);
    const isLoading = useContext(LoadingContext)
    return {authContext:auth,loadingContext:isLoading};
  };