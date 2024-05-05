import { Table } from "antd";
import { FaChild ,FaHandHoldingHeart,FaHouseMedical,FaWpforms} from "react-icons/fa6";
import { ActivityInfoArray, DonationInfoArray, PatientInfo, PatientInfoArray, PatientRequestInfo, postDonorInfo } from "../../../components/Interface/Interface";
import { useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import { useAuth } from "../../../components/AuthContenxt/AuthContext";
const CenterDashboardPage = () => {
    const{authContext} = useAuth();
  const userId = authContext?.userId || '';
  
    const queryClient = useQueryClient();
    const requestData = queryClient.getQueryData<PatientRequestInfo>(['allRequest']);
    const activities = queryClient.getQueryData<ActivityInfoArray>(['activityInfo']);
    const newReqData = requestData?.slice(0,3);
    const donationData = queryClient.getQueryData<DonationInfoArray>(['donationList']);
    const filteredDonation = donationData?.filter(data=>data.bloodCenter._id === userId)
    const patientData = queryClient.getQueryData<PatientInfoArray>(['patientInfo']);
    const newDonationData = donationData?.slice(0,3)
    const columns = [
      
        {
          title: 'First Name',
          dataIndex: 'patient',
          key: 'patient.firstName',
          render: ((patient:PatientInfo) =>patient?.firstName)
        },
        {
          title: 'Last Name',
          dataIndex: 'patient',
          key: 'patient.lastName',
          render: ((patient:PatientInfo) =>patient?.lastName)
        },
        {
          title: 'Blood Type',
          dataIndex: 'bloodType',
          key: 'bloodType',
        },
        {
          title: 'Quantity', 
          dataIndex: 'bloodQuantity',
          key: 'bloodQuantity',
        },
        {
          title: 'Status', 
          dataIndex: 'status',
          key: 'status',
        },
        
        {
          title: 'Date', 
          dataIndex: 'Date',
          key: 'Date',
          sorter: (a:any, b:any) => moment(a.Date).unix() - moment(b.Date).unix(),
        }
    
      ];
      const columnsForDonation = [
    
        {
          title: 'First Name',
          dataIndex: 'donor',
          key: 'donor.firstName',
          render: ((donor:postDonorInfo) =>donor?.firstName)
        },
        {
          title: 'Last Name',
          dataIndex: 'donor',
          key: 'donor.lastName',
          render: ((donor:postDonorInfo) =>donor?.lastName)
        },
        {
          title: 'Blood Type',
          dataIndex: 'bloodType',
          key: 'bloodType',
        },
        {
          title: 'Blood Quantity (bag)',
          dataIndex: 'quantity',
          key: 'quantity',
        },

        {
          title: 'Donation Date',
          dataIndex: 'date',
          key: 'date',
        },
       

      ];
    return ( 
        <div className="flex flex-col space-y-4">
            <div className="w-full grid grid-cols-4  gap-4 h-40 text-gray-400 ">
                <div className="flex bg-white shadow-md rounded-md flex-col ">
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
                                <h1>Blood Donated</h1>
                            </div>
                            <div className="text-2xl p-2 bg-red-300 rounded-xl text-white">
                                <FaHandHoldingHeart />
                            </div>
                    </div>
                    <div className="items-center justify-center flex text-4xl">
                            <h1>{filteredDonation?.length}</h1>
                    </div>
                </div>
                <div className="flex bg-white shadow-md rounded-md flex-col ">
                    <div className="w-full p-4 flex justify-between items-center">
                            <div className="text-lg">
                                <h1>Activities</h1>
                            </div>
                            <div className="text-2xl p-2 bg-blue-300 rounded-xl text-white">
                                <FaHouseMedical />
                            </div>
                    </div>
                    <div className="items-center justify-center flex text-4xl">
                            <h1>{activities?.length}</h1>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-5 gap-4">
                <div className="col-span-3 bg-white p-2">
                    <div className="text-md flex justify-end p-2">
                        <h1>Recent Request</h1>
                    </div>
                   
                    <Table  columns={columns} dataSource={newReqData?.map((request) =>({...request,key:request._id}))} className="w-full overflow-scroll text-4xl" />
                </div>
                <div className="col-span-2 bg-white p-2">
                <div className="text-md flex justify-end">
                        <h1>Recent Donation</h1>
                    </div>
                <Table  columns={columnsForDonation} dataSource = {newDonationData?.map((data)=>({...data,key:data._id}))}className="w-full overflow-scroll"/>
                </div>
                   
            </div>
           
        </div>
        
     );
}
 
export default CenterDashboardPage;