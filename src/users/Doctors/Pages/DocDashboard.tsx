import { FaChild ,FaWpforms} from "react-icons/fa6";
import { getDocData } from "../context/DocDataContext";
import { useAuth } from "../../../components/AuthContenxt/AuthContext";
const DocDashboardPage = () => {

    const contextValue = getDocData();
    const {authContext} = useAuth();
    console.log(contextValue);

    return ( 
        <div className="w-full grid grid-cols-4  gap-4 h-40 text-gray-400 ">
            <div className="flex bg-white shadow-md rounded-md flex-col col-span-2">
               <div className="w-full p-4 flex justify-between items-center">
                    <div className="text-lg">
                        <h1>Patient</h1>
                    </div>
                    <div className="text-2xl p-2 bg-green-300 rounded-xl text-white">
                        <FaChild/>
                    </div>
               </div>
               <div className="items-center justify-center flex text-4xl">
                    <h1>{contextValue?.patientInfo?.length}</h1>
               </div>
            </div>
            <div className="flex bg-white shadow-md rounded-md flex-col col-span-2 ">
               <div className="w-full p-4 flex justify-between items-center">
                    <div className="text-lg">
                        <h1>Request</h1>
                    </div>
                    <div className="text-2xl p-2 bg-blue-300 rounded-xl text-white">
                        <FaWpforms/>
                    </div>
               </div>
               <div className="items-center justify-center flex text-4xl">
                    <h1>{contextValue?.allRequest?.length}</h1>
               </div>
            </div>
        </div>
     );
}
 
export default DocDashboardPage;