import { NavLink } from "react-router-dom";
import { FaHouseChimney, FaRegFolderOpen,FaPerson, FaXmark, FaCalendarPlus, FaDatabase, FaHandHoldingMedical} from "react-icons/fa6";
import { useState } from "react";
import { IoExit } from "react-icons/io5";

interface CenterPageNavigationProps {
    onClick : ()=>void
}
const CenterPageNavigation = ({onClick}:CenterPageNavigationProps) => {
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
                    <h1 className="text-blue-900 font-bold text-4xl ">Center</h1>
                </div>
                <div className="w-full">
                    <ul className="w-full flex flex-col text-gray-400 text-md space-y-2">
                        <li className="w-full rounded-md hover:bg-gray-200 ">
                            <NavLink
                                to="/center/"
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
                                to="/center/patientsPage"
                                className={({ isActive}) =>
                                    `w-full p-2 block ${isActive ? "bg-violet-200 text-violet-500 w-full rounded-md" : ""}
                                `}>
                                    <div className="flex flex-row w-full justify-start items-center space-x-4">
                                        <div className="flex items-center justify-center text-xl">
                                            < FaPerson/>
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <h1>Patient Table</h1>
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
                                            to="/center/requestsPage"
                                  
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
                                to="/center/Activities"
                                className={({ isActive}) =>
                                    `w-full p-2 block ${isActive ? "bg-violet-200 text-violet-500 w-full rounded-md" : ""}
                                `}>
                                    <div className="flex flex-row w-full justify-start items-center space-x-4">
                                        <div className="flex items-center justify-center text-xl">
                                            < FaHandHoldingMedical />
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <h1>Activities</h1>
                                        </div>
                                        
                                    </div>
                                    
                            </NavLink>
                        </li>   
                        <li className="w-full rounded-md hover:bg-gray-200 ">
                            <NavLink
                                to="/center/DonationHistory"
                                className={({ isActive}) =>
                                    `w-full p-2 block ${isActive ? "bg-violet-200 text-violet-500 w-full rounded-md" : ""}
                                `}>
                                    <div className="flex flex-row w-full justify-start items-center space-x-4">
                                        <div className="flex items-center justify-center text-xl">
                                            < FaCalendarPlus />
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <h1>Donations</h1>
                                        </div>
                                        
                                    </div>
                                    
                            </NavLink>
                        </li>  
                        <li className="w-full rounded-md hover:bg-gray-200 ">
                            <NavLink
                                to="/center/Inventory"
                                className={({ isActive}) =>
                                    `w-full p-2 block ${isActive ? "bg-violet-200 text-violet-500 w-full rounded-md" : ""}
                                `}>
                                    <div className="flex flex-row w-full justify-start items-center space-x-4">
                                        <div className="flex items-center justify-center text-xl">
                                            <FaDatabase/>
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <h1>Inventory</h1>
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
 
export default CenterPageNavigation;