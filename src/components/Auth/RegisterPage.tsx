import { useState } from "react";
import { registerUser } from "../../api/AuthApi";

interface UserInfo {

    email:string,
    password:string
}

const RegistrationPage = () => {
    const [userInfo,setUserInfo] = useState<UserInfo>({
        email:'',
        password:''
    })

    const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const { name, value } = e.target;

        setUserInfo(prev=>({
            ...prev,
            [name]:value
        }))
    }
    const submitForm = async () =>{
        const response = await registerUser(userInfo);
    }
    return ( 
        <>
            <div className="flex flex-col items-center justify-center space-y-2">
                <h1 className='text-2xl text-red-600 font-bold'>REGISTER ACCOUNT</h1>
                <p className='text-sm text-gray-500'>Account Registration</p>
            </div>
           <div className="w-4/5 flex flex-col items-center justify-center space-y-4">
                <input className="w-full p-2 border-2 rounded-lg" name="name" type="text" placeholder="Username" onChange={handleOnchange} />
                <input className="w-full p-2 border-2 rounded-lg" name="password" type="password" placeholder="Password"  onChange={handleOnchange}/>
                <input className="w-full p-2 border-2 rounded-lg" name="email" type="text" placeholder="Email" onChange={handleOnchange} />
                <button className="w-full p-2 border-2 rounded-lg bg-green-500 text-white" onClick={submitForm} >Register</button>
            </div>
        </>
     );
}
 
export default RegistrationPage;