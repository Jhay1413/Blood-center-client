import { NavLink } from "react-router-dom";
import { FaHouseChimney, FaRegFolderOpen,FaPerson, FaXmark} from "react-icons/fa6";
import { IoExit } from "react-icons/io5";

interface DoctorPageNavigationProps {
    onClick : ()=>void
}
const DoctorPageNavigation = ({onClick}:DoctorPageNavigationProps) => {

    const logout = () =>{
        localStorage.removeItem('token')

        window.location.reload();
    }
    return ( 
        <>
           <div className="w-full h-full flex-col">
                <div className="flex justify-end text-4xl text-gray-400 lg:hidden">
                    <button onClick={onClick}>
                        <FaXmark/>
                    </button>
                </div>
                <div className="items-center flex p-4">
                    <h1 className="text-blue-900 font-bold text-4xl ">Doctor</h1>
                </div>
                <div className="w-full">
                    <ul className="w-full flex flex-col text-gray-400 text-md space-y-2">
                        <li className="w-full rounded-md hover:bg-gray-200 ">
                            <NavLink
                                to="/doc/"
                                className={({ isActive}) =>
                                    `w-full p-2 block ${isActive ? "bg-violet-200 text-violet-500 w-full rounded-md" : ""}
                                `}>
                                    <div className="flex flex-row w-full justify-start items-center space-x-2">
                                        <div className="flex items-center justify-center text-xl">
                                            < FaHouseChimney/>
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <h1>Dashboard</h1>
                                        </div>
                                        
                                    </div>
                                  
                            </NavLink>
                        </li>   
                       
                    </ul>
                    <div className="w-full py-4 pl-2 ">
                        <h1 className="text-gray-400 text-xs">PAGES</h1>
                    </div>
                    <ul className="w-full flex flex-col text-gray-400 text-md space-y-2">
                        <li className="w-full rounded-md hover:bg-gray-200 ">
                            <NavLink
                                to="/doc/patientPage"
                                className={({ isActive}) =>
                                    `w-full p-2 block ${isActive ? "bg-violet-200 text-violet-500 w-full rounded-md" : ""}
                                `}>
                                    <div className="flex flex-row w-full justify-start items-center space-x-4">
                                        <div className="flex items-center justify-center text-xl">
                                            < FaPerson/>
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <h1>Patient Page</h1>
                                        </div>
                                        
                                    </div>
                                    
                            </NavLink>
                        </li>   
                        <li className="w-full rounded-md hover:bg-gray-200 ">
                            <NavLink
                                to="/doc/requestPage"
                                className={({ isActive}) =>
                                    `w-full p-2 block ${isActive ? "bg-violet-200 text-violet-500 w-full rounded-md" : ""}
                                `}>
                                    <div className="flex flex-row w-full justify-start items-center space-x-4">
                                        <div className="flex items-center justify-center text-xl">
                                            <  FaRegFolderOpen/>
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <h1>Request Page</h1>
                                        </div>
                                        
                                    </div>
                                    
                            </NavLink>
                        </li>   
                    </ul>
                </div>
                <div className="w-full py-4 pl-2 ">
                <h1 className="text-gray-400 text-xs">Action</h1>
            </div>
                    <ul className="w-full flex flex-col text-gray-400 text-md space-y-2">
                        <button onClick={logout}>
                        <li className="w-full rounded-md hover:bg-gray-200 p-2 ">
                          
                          <div className="flex flex-row w-full justify-start items-center space-x-4">
                              <div className="flex items-center justify-center text-xl">
                                  <IoExit />
                              </div>
                              <div className="flex items-center justify-center">
                                  <h1>Logout</h1>
                              </div>
                              
                          </div>
                          
                 
              </li>   
                        </button>
                       
                        </ul>
           </div>
           
        </>
     );
}
 
export default DoctorPageNavigation;