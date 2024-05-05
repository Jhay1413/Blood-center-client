import { Button, Input, Space, Table } from "antd";
import { PatientInfo, PatientRequestInfo, PatientRequestValues, PhysicianInfo } from "../../../components/Interface/Interface";
import {  useQueryClient } from "@tanstack/react-query";
import { downloadRequestFile } from "../../../api/AdminAPI/AdminRequestService";
import { useState } from "react";

import moment from 'moment';


const AdminRequestPage = () => {
  const queryClient = useQueryClient();
  const requestData = queryClient.getQueryData<PatientRequestInfo>(['allRequest']);
  const [searchedData,setSearchData] = useState("");

    //TABLE COLUMNS
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
            .includes(value.toLowerCase()) ||
            String(record.status)
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
            <Button key={text} onClick={()=>downloadFiles(record._id)}>Download File</Button>
            
            
          </Space>
  
        )
      }
  
    ];
    const downloadFiles = async(id:string) =>{
      try {
        const response = await downloadRequestFile(id);
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    }
  
  

    
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
 
export default AdminRequestPage;