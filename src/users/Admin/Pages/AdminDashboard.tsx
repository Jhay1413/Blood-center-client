import {  useQueryClient } from "@tanstack/react-query";
import { FaChild ,FaHandHoldingHeart,FaHouseMedicalFlag,FaPerson,FaUserDoctor,FaWpforms} from "react-icons/fa6";

import { DonationInfoArray, DonorInfoArray, PatientInfoArray, PatientRequestInfo, healthCenterInfoArray, physicianInfoArray } from "../../../components/Interface/Interface";
const AdminDashboardPage = () => {
 
    const queryClient = useQueryClient();
    const requestData = queryClient.getQueryData<PatientRequestInfo>(['allRequest']);
    const donationData = queryClient.getQueryData<DonationInfoArray>(['donationList']);
   
    const patientData = queryClient.getQueryData<PatientInfoArray>(['patientInfo']);
    const physicianData = queryClient.getQueryData<physicianInfoArray>(['physicianInfo']);
    const donorData = queryClient.getQueryData<DonorInfoArray>(['donorInfo']);
    const centersData = queryClient.getQueryData<healthCenterInfoArray>(['healthCenterInfo']);
  
    return ( 
        <div className="flex flex-col space-y-4">
            <div className="w-full grid grid-cols-3  gap-4 h-40 text-gray-400 ">
                <div className="flex bg-white shadow-md rounded-md flex-col h-40">
                <div className="w-full p-4 flex justify-between items-center">
                        <div className="text-lg">
                            <h1>Patient</h1>
                        </div>
                        <div className="text-2xl p-2 bg-green-300 rounded-xl text-white">
                            <FaChild/>
                        </div>
                </div>
                <div className="items-center justify-center flex text-4xl">
                        <h1>{patientData?.length}</h1>
                </div>
                </div>
                <div className="flex bg-white shadow-md rounded-md flex-col ">
                    <div className="w-full p-4 flex justify-between items-center">
                            <div className="text-lg">
                                <h1>Request</h1>
                            </div>
                            <div className="text-2xl p-2 bg-blue-300 rounded-xl text-white">
                                <FaWpforms/>
                            </div>
                    </div>
                    <div className="items-center justify-center flex text-4xl">
                            <h1>{requestData?.length}</h1>
                    </div>
                </div>
                <div className="flex bg-white shadow-md rounded-md flex-col ">
                    <div className="w-full p-4 flex justify-between items-center">
                            <div className="text-lg">
                                <h1>Donation</h1>
                            </div>
                            <div className="text-2xl p-2 bg-red-300 rounded-xl text-white">
                            <FaHandHoldingHeart />
                            </div>
                    </div>
                    <div className="items-center justify-center flex text-4xl">
                            <h1>{donationData?.length}</h1>
                    </div>
                </div>
                <div className="flex bg-white shadow-md rounded-md flex-col ">
                    <div className="w-full p-4 flex justify-between items-center">
                            <div className="text-lg">
                                <h1>Physician</h1>
                            </div>
                            <div className="text-2xl p-2 bg-emerald-300 rounded-xl text-white">
                            <FaUserDoctor />
                            </div>
                    </div>
                    <div className="items-center justify-center flex text-4xl">
                            <h1>{physicianData?.length}</h1>
                    </div>
                </div>
                <div className="flex bg-white shadow-md rounded-md flex-col h-40">
                    <div className="w-full p-4 flex justify-between items-center">
                            <div className="text-lg">
                                <h1>Donor</h1>
                            </div>
                            <div className="text-2xl p-2 bg-lime-300 rounded-xl text-white">
                            <FaPerson />
                            </div>
                    </div>
                    <div className="items-center justify-center flex text-4xl">
                            <h1>{donorData?.length}</h1>
                    </div>
                </div>
                <div className="flex bg-white shadow-md rounded-md flex-col h-40">
                    <div className="w-full p-4 flex justify-between items-center">
                            <div className="text-lg">
                                <h1>Blood Centers</h1>
                            </div>
                            <div className="text-2xl p-2 bg-amber-300 rounded-xl text-white">
                            <FaHouseMedicalFlag />
                            </div>
                    </div>
                    <div className="items-center justify-center flex text-4xl">
                            <h1>{centersData?.length}</h1>
                    </div>
                </div>
               
               
                
            </div>
        </div>
     );
}
 
export default AdminDashboardPage;