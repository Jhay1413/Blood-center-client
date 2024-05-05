import { Button, Input, Modal, Space, Table } from "antd";
import { useState } from "react";
import {  getDocData } from "../context/DocDataContext";
import { PatientInfo, PatientRequestValues, PhysicianInfo } from "../../../components/Interface/Interface";
import { deleteRequest, downloadRequestFile } from "../../../api/patientRequestApi";
import moment from 'moment';
const DocRequestPage = () => {

  const [searchedData,setSearchData] = useState("");
  const [isModalOpen,setIsModalOpen] = useState(false);
  const [onCloseModal,setOnCloseModal] = useState(false);
  const [selectedId,setSeletecId] = useState("");

  const contextValue = getDocData()

  const onCloseModalFunc = () =>{
    setIsModalOpen(false);
  }
  const columns = [
    {
      title: 'Request ID',
      dataIndex: 'requestId',
      key: 'requestId',
      filteredValue: [searchedData],
      onFilter:(value:any,record:any)=>{
        return (
          String(record?.patient?.firstName)
          .toLowerCase()
          .includes(value.toLowerCase()) ||
          String(record?.lastName)
          .toLowerCase()
          .includes(value.toLowerCase()) ||
          String(record?.status)
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
          <Button onClick={()=>downloadFiles(record._id)} key={text}>Download File</Button>
          <Button type="primary" onClick={()=>preDeleteButton(record._id)} danger>Delete File</Button>
        </Space>

      )
    }

  ];
const preDeleteButton = (id:string) =>{
    setSeletecId(id);
    setIsModalOpen(true);

}
const downloadFiles = async(id:string) =>{
  
  try {
    const response = await downloadRequestFile(id);
    console.log(response);
  } catch (error) {
    console.log(error)
  }
}

  return ( 
    <>
      <div className="w-full p-4 flex-col flex  bg-white shadow-md">
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
        
        <div className="flex">
            <Table columns={columns} dataSource={contextValue?.allRequest?.map(request=>({...request,key:request._id}))} className="w-full"/>
            <DeleteModal isModalOpen={isModalOpen} onCloseModalFunc={onCloseModalFunc} selectedId={selectedId}/>        
        </div>

      </div>
        
    </>
  );
}

interface DeleteModalProps{
  isModalOpen : boolean
  onCloseModalFunc:()=>void
  selectedId: string

}

const DeleteModal = ({isModalOpen,onCloseModalFunc,selectedId}:DeleteModalProps) => {
  const contextValue = getDocData()
  const deleteRecord =async(id:string)=>{
    try {
      const response = await deleteRequest(id);
      console.log(response);
      contextValue?.handleSetIsLoading();
      onCloseModalFunc();;
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
          <>
               <Modal open={isModalOpen} onCancel={onCloseModalFunc} width='40%' footer={null}>
                  <div className="flex flex-col justify-center items-center w-full">
                      <h1 className="text-2xl">Confirm to delete the data?</h1>
                      <div className="flex w-1/2 justify-center items-center space-x-6 p-4 text-2xl">
                        <button className="w-full bg-red-600 text-white p-1" onClick={()=>deleteRecord(selectedId)}>Confirm</button>
                        <button className="w-full bg-green-600 text-white p-1">Cancel</button>
                      </div>
                  </div>
              </Modal>
          </>
  )

}
export default DocRequestPage;