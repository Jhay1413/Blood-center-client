import { NavLink } from "react-router-dom";
import { FaHouseChimney, FaRegFolderOpen,FaPerson, FaXmark,FaUserDoctor,FaRectangleList,FaHouseMedicalCircleCheck} from "react-icons/fa6";
import { useState } from "react";
import { IoExit } from "react-icons/io5";

interface AdminPageNavigationProps {
    onClick : ()=>void
}
const AdminPageNavigation = ({onClick}:AdminPageNavigationProps) => {
    const [showDropdownRequests,setsShowDropdownRequests] = useState(false);

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
                    <h1 className="text-blue-900 font-bold text-4xl ">Admin</h1>
                </div>
                <div className="w-full">
                    <ul className="w-full flex flex-col text-gray-400 text-md space-y-2">
                        <li className="w-full rounded-md hover:bg-gray-200 ">
                            <NavLink
                                to="/admin/"
                             
                                className={({ isActive}) =>
                                    `w-full p-2 block ${isActive ? "bg-violet-200 text-violet-500 w-full rounded-md" : ""}
                                `}>
                                    <div className="flex flex-row w-full justify-start items-center space-x-2">
                                        <div className="flex items-center justify-center text-xl">
                                            < FaHouseChimney/>
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <h1>Home</h1>
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
                                to="/admin/patientsPage"
                                className={({ isActive}) =>
                                    `w-full p-2 block ${isActive ? "bg-violet-200 text-violet-500 w-full rounded-md" : ""}
                                `}>
                                    <div className="flex flex-row w-full justify-start items-center space-x-4">
                                        <div className="flex items-center justify-center text-xl">
                                            < FaPerson/>
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <h1>Patients</h1>
                                        </div>
                                        
                                    </div>
                                    
                            </NavLink>
                        </li>   
                        <li className="w-full rounded-md ">
                            <NavLink
                                to=""
                                onClick = {()=>setsShowDropdownRequests(!showDropdownRequests)}
                                className="w-full p-2 block"
                                >
                                    <div className="flex flex-row w-full justify-start items-center space-x-4">
                                        <div className="flex items-center justify-center text-xl">
                                            <  FaRegFolderOpen/>
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <h1>Requests</h1>
                                        </div>
                                        
                                    </div>
                                    
                            </NavLink>
                            {showDropdownRequests && (
                                <ul className="w-full flex flex-col text-gray-400 text-md space-y-2 pl-10">
                                    <li className="w-full rounded-md hover:bg-gray-200 ">
                                        <NavLink
                                            to="/admin/requestsPage"
                                  
                                            className={({ isActive}) =>
                                                `w-full p-2 block ${isActive ? "bg-violet-200 text-violet-500 w-full rounded-md" : ""}
                                        `}>
                                            <div className="flex flex-row w-full justify-start items-center space-x-4">
                                                <div className="flex items-center justify-center text-md">
                                                    <h1>All Requests</h1>
                                                </div>
                                            </div>
                                        
                                        </NavLink>
                                    </li>
                                   
                                </ul>
                            )}
                        </li>
                       
                        <li className="w-full rounded-md hover:bg-gray-200 ">
                            <NavLink
                               to="/admin/physicianPage"
                                className={({ isActive}) =>
                                    `w-full p-2 block ${isActive ? "bg-violet-200 text-violet-500 w-full rounded-md" : ""}
                                `}>
                                    <div className="flex flex-row w-full justify-start items-center space-x-4">
                                        <div className="flex items-center justify-center text-xl">
                                            < FaUserDoctor/>
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <h1>Physicians</h1>
                                        </div>
                                        
                                    </div>
                                    
                            </NavLink>
                        </li>
                        <li className="w-full rounded-md hover:bg-gray-200 ">
                            <NavLink
                               to="/admin/centersPage"
                                className={({ isActive}) =>
                                    `w-full p-2 block ${isActive ? "bg-violet-200 text-violet-500 w-full rounded-md" : ""}
                                `}>
                                    <div className="flex flex-row w-full justify-start items-center space-x-4">
                                        <div className="flex items-center justify-center text-xl">
                                            <FaHouseMedicalCircleCheck/>
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <h1>Blood Centers</h1>
                                        </div>
                                        
                                    </div>
                            </NavLink>
                        </li>
                        <li className="w-full rounded-md hover:bg-gray-200 ">
                            <NavLink
                                to="/admin/donorPage"
                                className={({ isActive}) =>
                                    `w-full p-2 block ${isActive ? "bg-violet-200 text-violet-500 w-full rounded-md" : ""}
                                `}>
                                    <div className="flex flex-row w-full justify-start items-center space-x-4">
                                        <div className="flex items-center justify-center text-xl">
                                            < FaPerson/>
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <h1>Donor</h1>
                                        </div>
                                        
                                    </div>
                                    
                            </NavLink>
                        </li>   
                        <li className="w-full rounded-md hover:bg-gray-200 ">
                            <NavLink
                                 to="/admin/accountsPage"
                                className={({ isActive}) =>
                                    `w-full p-2 block ${isActive ? "bg-violet-200 text-violet-500 w-full rounded-md" : ""}
                                `}>
                                    <div className="flex flex-row w-full justify-start items-center space-x-4">
                                        <div className="flex items-center justify-center text-xl">
                                            < FaRectangleList/>
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <h1>Accounts</h1>
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
 
export default AdminPageNavigation;