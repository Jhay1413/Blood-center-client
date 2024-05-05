import {  useQueryClient } from "@tanstack/react-query";
import { Button, Input, Space, Table } from "antd";
import { PatientInfo, PatientInfoArray } from "../../../components/Interface/Interface";
import {  useState } from "react";

import HistoryModalCenter from "../Modals/HistoryModal";


const CenterPatientPage = () => {
  const queryClient = useQueryClient();
  const patientData = queryClient.getQueryData<PatientInfoArray>(['patientInfo']);
  const [isModalOpen,setIsModalOpen] = useState<boolean>(false);
  const [selectedRecord ,setSelectedRecord ] = useState<PatientInfo | null>(null)
  const [searchedData,setSearchData] = useState("");  
      const columns = [
    
        {
          title: 'First Name',
          dataIndex: 'firstName',
          key: 'firstName',
          filteredValue: [searchedData],
          onFilter:(value:any,record:any)=>{
            return (
              String(record.firstName)
              .toLowerCase()
              .includes(value.toLowerCase()) ||
              String(record.lastName)
              .toLowerCase()
              .includes(value.toLowerCase()))
          }
        },
        {
          title: 'Last Name',
          dataIndex: 'lastName',
          key: 'lastName',
        },
        {
          title: 'Sex',
          dataIndex: 'sex',
          key: 'sex',
        },

        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'Contact Number',
          dataIndex: 'contactNumber',
          key: 'contactNumber',
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title : 'Actions',
          dataIndex : 'actions',
          key:'actions',
          render: (text:string,record:PatientInfo)=>(
            <Space size="middle">
              <Button onClick={()=>openHistory(record)} key={text}>View History</Button>
            </Space>
    
          )
        }

      ];
    const openHistory = (record:PatientInfo) =>{
      setSelectedRecord(record)
      
      setIsModalOpen(!isModalOpen)
    }
    const onCloseModal = () =>{
      setIsModalOpen(!isModalOpen)
    }
    return ( 
        <>
          <div className="w-full p-4 flex-col h-full flex bg-white shadow-md">
            <div className="flex pb-4 flex-col space-y-4">
                <div className="w-full flex justify-between">
                  <div className="w-full ">
                    <h1 className="text-xl">List of Patients</h1>
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

                <Table  columns={columns} dataSource={ patientData?.map((patient)=>({...patient,key:patient?._id}))} className="w-full overflow-scroll"/>
            </div>
        </div>
        <HistoryModalCenter isModalOpen = {isModalOpen} onClose = {onCloseModal} patientInfo={selectedRecord}/>
            
        </>
     );
}
 
export default CenterPatientPage;