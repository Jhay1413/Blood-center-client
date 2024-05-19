import { useEffect, useState } from 'react';
import { useAuth } from '../AuthContenxt/AuthContext';
import { useNavigate } from 'react-router-dom';
import { generateCode, loginUser, resetPassword } from '../../api/AuthApi';
import { toast } from 'react-toastify';


export interface Credentials {
    email:string,
    password:string
}

 const LoginPage = () => {
    const [credential, setCredential] = useState<Credentials>({
        email: '',
        password: ''
    });
    const [roles,setRoles] = useState<string>("");
    const {authContext,loadingContext} = useAuth();
    const [forgotPass,setForgotPass] = useState<boolean>(false); 
    const navigate = useNavigate();
    
    useEffect(()=>{
        if(authContext?.userRoles == 'Doctor'){
            navigate('/doc')
        }
        else if(authContext?.userRoles == 'Admin'){
            navigate('/admin')
        }
        else if(authContext?.userRoles == 'BloodCenter'){
            navigate('/center')
        }
    },[authContext])

    const submitLogin = async(e:any) => {
        e.preventDefault()
        try {
            if(roles === "Doctor"){
                const response = await loginUser({...credential,roles});
                if(response && response.status != 400){
                    
                    localStorage.setItem('token',response.data.token);
                    loadingContext?.setIsLoading(!loadingContext.isLoading)
                    navigate('/doc')
                }
                else{
                        toast.error("Check username or password");
                }
            }
            else if(roles === "HealthCenter"){
                const response = await loginUser({...credential,roles});
                console.log(response);
                if(response && response.status != 400){
                    
                    localStorage.setItem('token',response.data.token);
                    loadingContext?.setIsLoading(!loadingContext.isLoading)
                    navigate('/center')
                }
                else{
                    toast.error("Check username or password");
                }
            }
            else if(roles === "Admin"){
                const response = await loginUser({...credential,roles});
                if(response && response.status != 400){
                    localStorage.setItem('token',response.data.token);
                    loadingContext?.setIsLoading(!loadingContext.isLoading)
                    navigate('/admin')
                }
                else{
                    toast.error("Check username or password");
                }
            }
    
        } catch (error) {
            console.log(error)
        }
      
    }
    
    const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredential(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const handleRolesChange = (e:React.ChangeEvent<HTMLSelectElement>)=>{
        setRoles(e.target.value)
    }
    return (
        <>
            {forgotPass 
            ?
                <ForgotPassPage/>
            :
                <>
                    <div className="flex flex-col items-center justify-center space-y-2 w-full">
                        <h1 className='text-2xl text-red-600 font-bold'>LOGIN ACCOUNT</h1>
                        <p className='text-sm text-gray-500'>Secure Login to Your Account</p>
                    </div>
                    <div className='flex justify-center w-3/4 items-center'>
                        <select className='text-gray-700 p-1 rounded-md bg-gray-100' name="roles" onChange={(e)=>handleRolesChange(e)}>
                            <option value="">Select Roles</option>
                            <option value="Admin">Admin</option>
                            <option value="HealthCenter">Blood Center</option>
                            <option value="Doctor">Doctor</option>
                        </select>
                    </div>
                    <div className='flex flex-col items-center justify-center space-y-4 w-3/4'>
                        <input type='text' name ="email"className='p-2 w-full rounded-md border-2' onChange={handleOnchange}  placeholder="Email" disabled = {roles === ""}/>
                        <input type='password' name ="password" className='p-2 w-full rounded-md border-2' onChange={handleOnchange} placeholder='Password' disabled = {roles === ""}/>

                    </div>
                
                    <div className='w-3/4'>
                        <button className="w-full p-2 border-2 rounded-lg bg-green-500 text-white" onClick={submitLogin}>Login</button>
                    </div>
                    <div className='flex justify-start w-3/4'>
                        <button className="text-gray-600" onClick = {()=>setForgotPass(true)}>Forgot Password? </button>    
                    </div>
                        </>  
            }
            
        </>
    );
};


const ForgotPassPage = () =>{

    const [email,setEmail] = useState("");
    const [resCode,setResCode] = useState("");
    const [inputtedCode,setInputtedCode] = useState("");
    const [resetForm,setResetForm] = useState(false);

    const codeMailer = async() =>{
       
        try {
            const response = await generateCode(email);
            if(response && response.status == 200){
                setResCode(response.data.uniqueCode)
                toast.success("Code has been sent !");
            }
        } catch (error) {
            console.log(error);
        }

    }

    const submitForm = () =>{
        if(resCode == inputtedCode){
            setResetForm(true);
        }
        else{
            toast.error("Incorrect Code !");
        }
    }

    return (
        <>
        {resetForm  ? <ResetPasswordForm email = {email}/> :
           <>
           
           <div className="flex flex-col items-center justify-center space-y-2 w-full">
             <h1 className='text-2xl text-red-600 font-bold'>Forgot Password</h1>
             <p className='text-sm text-gray-500'>Secure Login to Your Account</p>
         </div>
        
         <div className='flex flex-col items-center justify-center space-y-4 w-3/4'>
             <input type='text' name ="email"className='p-2 w-full rounded-md border-2' onChange = {(e)=>setEmail(e.target.value)} placeholder="Enter Email"/>
             <div className='grid grid-cols-4 w-full pr-2'>
                 <input type='text' name ="code" className='p-2 w-full rounded-md border-2 col-span-3' onChange = {(e)=>setInputtedCode(e.target.value)}placeholder='code'/>
                 <button className='w-full text-md bg-blue-500 w-3/4 rounded-md ml-2 text-white' onClick = {codeMailer}>Get Code</button>
             </div>
 
         </div>
    
         <div className='w-3/4'>
             <button className="w-full p-2 border-2 rounded-lg bg-green-500 text-white" onClick={submitForm}>Submit</button>
         </div>
           </>
        }
       
    </>
    )
}

interface ResetFormProps {
    email : string

}
const ResetPasswordForm = ({email}:ResetFormProps) =>{
    const [newPassword,setNewPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");


    const resetPasswordFunc = async () =>{
        try {
            const response = await resetPassword(email,newPassword);
            if(response && response.status == 200){
                toast.success(response.data.message);
            }
            else{
                toast.success(response?.data.message);
            }
        } catch (error) {
            console.log(error);
        }

    }

    return(
        <>

         <div className="flex flex-col items-center justify-center space-y-2 w-full">
            <h1 className='text-2xl text-red-600 font-bold'>Reset Password Form</h1>
            <p className='text-sm text-gray-500'>Secure Login to Your Account</p>
        </div>
       
        <div className='flex flex-col items-center justify-center space-y-4 w-3/4'>
            <input type='password' name ="email" className='p-2 w-full rounded-md border-2' placeholder="New Password" onChange={(e)=>setNewPassword(e.target.value)}/>
        
            <input type='password' name ="code" className='p-2 w-full rounded-md border-2 col-span-3' placeholder='Confirm password' onChange={(e)=>setConfirmPassword(e.target.value)}/>
            {newPassword == confirmPassword ? "" : <h1 className='text-red-500'>The password does not match. </h1> }
            
         
        </div>
   
        <div className='w-3/4'>
            <button className={`w-full p-2 border-2 rounded-lg ${newPassword !== confirmPassword ? `bg-gray-300 text-white` :`bg-green-500 text-white`}`}   disabled = {newPassword !== confirmPassword} onClick={resetPasswordFunc}>Submit</button>
        </div>
        </>
    )

}
export default LoginPage