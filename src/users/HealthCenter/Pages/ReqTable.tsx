import { Button, Input, Space, Table } from "antd";
import { HealthCenterInfo, PatientInfo, PatientRequestInfo, PatientRequestValues, PhysicianInfo } from "../../../components/Interface/Interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { approveRequestAPI, downloadRequestFile } from "../../../api/AdminAPI/AdminRequestService";
import { useState } from "react";
import moment from 'moment';
import { useAuth } from "../../../components/AuthContenxt/AuthContext";


const CenterRequestPage = () => {
  const queryClient = useQueryClient();
  const requestData = queryClient.getQueryData<PatientRequestInfo>(['allRequest']);
  console.log(requestData);
  const [searchedData,setSearchData] = useState("");
  const{authContext} = useAuth();
  const userId = authContext?.userId || '';    //TABLE COLUMNS
    const columns = [
      {
        title: 'Request ID',
        dataIndex: 'requestId',
        key: 'requestId',
        filteredValue: [searchedData],
        onFilter:(value:any,record:any)=>{
          return (
            String(record.patient.firstName)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
            String(record.lastName)
            .toLowerCase()
            .includes(value.toLowerCase()))
        }
      },
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
        title: 'Physician',
        dataIndex: 'physician',
        key: 'physician.firstName',
        render: ((physician:PhysicianInfo) =>physician?.firstName)
      },
      {
        title: 'Approved By',
        dataIndex: 'approvedBy',
        key: 'approvedBy.name',
        render: ((healthCenter:HealthCenterInfo) =>healthCenter?.name)
      },
      {
        title: 'Date', 
        dataIndex: 'Date',
        key: 'Date',
        sorter: (a:any, b:any) => moment(a.Date).unix() - moment(b.Date).unix(),
      },
      {
        title : 'Actions',
        dataIndex : 'actions',
        key:'actions',
        render: (text:string,record:PatientRequestValues)=>(
          <Space size="middle">
            <Button onClick={()=>downloadFiles(record._id)} key={text}>Download File</Button>
            {record.status === "Approved" ? <Button onClick={() => mutation.mutate(record._id)} disabled>Approve</Button> :  <Button onClick={() => mutation.mutate(record._id)}>Approve</Button>}
          
            
          </Space>
  
        )
      }
  
    ];
    const downloadFiles = (id:string) =>{
      try {
        const response =  downloadRequestFile(id);
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    }
   
   const mutation = useMutation({
      mutationFn: async (newTodo:string) => {
        // Log the data before making the API call
        console.log('Data to be sent to the API:', newTodo);
  
        // Make the API call to post the new todo
        const response = await approveRequestAPI(newTodo,userId);
  
        // Check for a successful response
        if (response) {
          // Invalidate and refetch
          queryClient.invalidateQueries({ queryKey: ['allRequest'] });
          return response; // Return the response data if needed
        } else {
          // Handle the API error
          throw new Error('Failed to update data');
        }
      },
      onSuccess: (data) => {
       
        console.log('Mutation response data:', data);
      },
      onError: (error) => {
        // Log and handle the error
        console.error('Mutation error:', error);
      },
    });
  

    
    return ( 
        <>
            <div className="w-full p-4 flex-col h-full flex bg-white shadow-md">
          
                <div className="flex pb-4 flex-col space-y-4">
                    <div className="w-full flex justify-between">
                      <div className="w-full ">
                        <h1 className="text-xl">List of Request</h1>
                      </div>
                      <Input.Search 
                    placeholder='searchbox'
                    onChange={(e)=>{
                      setSearchData(e.target.value.toLowerCase());
                    }}
                    className='md:w-52 p-2'
                    />

                    </div>
                  
                    <div className="w-full">
    
                    </div>
                    
                </div>
                <div className="flex w-full">
                    <Table  columns={columns} dataSource={requestData?.map((request) =>({...request,key:request._id}))} className="w-full overflow-scroll"/>
                </div>
            </div>
         
        </>
     );
}
 
export default CenterRequestPage;