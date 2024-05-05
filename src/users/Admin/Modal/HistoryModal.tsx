import { Button, Modal, Space, Table } from "antd";
import { PatientInfo, PatientRequestInfo, PatientRequestValues, PhysicianInfo } from "../../../components/Interface/Interface";
import { useQueryClient } from "@tanstack/react-query";
import { downloadRequestFile } from "../../../api/AdminAPI/AdminRequestService";

interface Props {
    onClose : ()=>void
    isModalOpen : boolean,
    patientInfo: PatientInfo | null
}

const HistoryModal = ({isModalOpen,onClose,patientInfo}:Props) => {
    const queryClient = useQueryClient();
    const requestData = queryClient.getQueryData<PatientRequestInfo>(['allRequest']);
  
    const historyData = requestData?.filter(item => item.patient._id === patientInfo?._id)
    const columns = [
      {
        title: 'Request ID',
        dataIndex: '_id',
        key: '_id',
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
        title: 'Physician Id',
        dataIndex: 'physician',
        key: 'physician._id',
        render: ((physician:PhysicianInfo) =>physician?._id)
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
      },
        {
          title : 'Actions',
          dataIndex : 'actions',
          key:'actions',
          render: (text:string,record:PatientRequestValues)=>(
            <Space size="middle">
              <Button onClick={()=>downloadFiles(record._id)} key={text}>Download File</Button>
            
            </Space>
    
          )
        }
    
      ];
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
          
            <Modal open={isModalOpen} onCancel={onClose} width='80%' footer={null}>
              <h1 className="text-2xl font-bold p-4">Patient Information</h1>
                      <div className="grid grid-rows-3 p-4 gap-4 w-full">
                          
                          <div className=" grid grid-cols-4 gap-4">
                              
                              <input type="text" value={patientInfo?.firstName} className="col-span-2 p-2" placeholder="Firstname" disabled/>
                              <input type="text" value={patientInfo?.lastName} className="col-span-2 p-2" placeholder="Lastname" disabled/>
                              <input type="text" value={patientInfo?.age} className="p-2" placeholder="Age" disabled/>
                              <input type="text" value={patientInfo?.sex} className="p-2" placeholder="Sex" disabled/>
                              <input type="text" value={patientInfo?.contactNumber} className="col-span-2 p-2" placeholder="Contact Number" disabled/>
                              <input type="text" value={patientInfo?.address} className="col-span-4 p-2" placeholder="Address" disabled/>
                          </div>
                          <div className="row-span-2 min-w-full">
                              <h1 className="text-2xl font-bold p-4">Patient History</h1>
                              <div className="max-w-full overflow-x-auto">
                                <Table  columns={columns} dataSource = {historyData?.map((data)=>({...data,key:data._id}))} />
                              </div>
              
                          </div>
                      </div>
              </Modal>    
       
        
        </> 
    );
}
 
export default HistoryModal;