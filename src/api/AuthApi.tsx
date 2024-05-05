import axios from 'axios'

const AuthApi = import.meta.env.VITE_API_AUTHROUTES
const resetPasswordApi = import.meta.env.VITE_API_RESETPASSWORD;
interface UserInfo {

    email:string,
    password:string
}

export const registerUser = async (data:UserInfo)=>{
    try {
        const response = await axios.post(`${AuthApi}/register`,data);
        return response
    } catch (error) {
        console.log("Error on Registration API")
    }
}
export const loginUser = async(data:any)=>{
    try {
        const response = await axios.post(`${AuthApi}/login`,data);
        return response
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return error.response;
        }
    }
}
export const generateCode = async(email:string)=>{
    try {
        const response = await axios.post(`${resetPasswordApi}/genEmailCode`,{email:email});
        return response
    } catch (error) {
        console.log(error);
    }
} 
export const resetPassword = async(email:string,password:string)=>{
    try {
        console.log("asdasd");
        const response = await axios.post(`${resetPasswordApi}/resetPassword`,{email:email,newPassword:password});
        return response
    } catch (error) {
        console.log(error);
    }
} 