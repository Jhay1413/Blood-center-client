import { Button, Input, Space, Table } from "antd";
import PatientModal from "../Modals/PatientModal";
import { getDocData } from "../context/DocDataContext";
import RequestModal from "../Modals/RequestModal";
import { useAuth } from "../../../components/AuthContenxt/AuthContext";
import PatientEditModal from "../Modals/PatientEditModal";
import { PatientInfo } from "../../../components/Interface/Interface";
import { useState } from "react";
import { deletePatientnfo } from "../../../api/patientApi";
import { IoAddSharp } from "react-icons/io5";


const DocPatientPage = () => {


    //HOOKS
    const [isModalOpen,setIsModalOpen] = useState<boolean>(false)
    const [searchedData,setSearchData] = useState<string>('');
    const [selectedPatient,setSelectedPatient] = useState<PatientInfo> ({
      _id: '',
      firstName: '',
      lastName: '',
      sex: '',
      age: '',
      contactNumber: '',
      address: '',
    })
    const [openRequestModal,setOpenRequestModal] = useState<boolean>(false);
    const [openEditModal,setOpenEditModal] = useState<boolean>(false);
    const contextValue = getDocData()
    const {authContext} = useAuth()
    
    
   
    //FILTERED DATA FOR TABLE SEARCH
    const filteredPatients = searchedData 
                              ? contextValue?.patientInfo?.filter(patient=>String(patient?._id).toLowerCase().includes(searchedData) || String(patient?.firstName).toLowerCase().includes(searchedData)) || [] 
                              : contextValue?.patientInfo || []
   
    //TABLE COLUMNS
      const columns = [
      
        {
          title: 'First Name',
          dataIndex: 'firstName',
          key: 'firstName',
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

          key:'actions',
          render: (record:PatientInfo)=>(
            <Space size="middle">
              <Button onClick={()=>requestBlood(record)}>Request</Button>
              <Button className="bg-green-500 text-white" onClick={()=>editPatient(record) } >Edit</Button>
              <Button type="primary" onClick={()=>onDelete(record)} danger>Delete</Button>
            </Space>

          )
        }

      ];


    //FUNCTIONS
      const requestBlood = (value:PatientInfo) =>{
      
        setSelectedPatient(value)
        setOpenRequestModal(!openRequestModal)
      } 
      const editPatient = (value:PatientInfo)=>{
        setSelectedPatient(value)
        setOpenEditModal(!openEditModal)
      } 
      const onCloseEdit = () =>{
        setOpenEditModal(!openEditModal)
        setSelectedPatient({
          _id: '',
          firstName: '',
          lastName: '',
          sex: '',
          age: '',
          contactNumber: '',
          address: '',
        })
      }
      const onDelete = async(record:PatientInfo) =>{
        try {
          const response = await deletePatientnfo(record._id);
          console.log(response)
          contextValue?.handleSetIsLoading();
        } catch (error) {
          console.log(error);
        }
      }
      const onCloseAdd = () =>{
        setIsModalOpen(!isModalOpen)
      }
      const onCancelRequestModal = () =>{
        setOpenRequestModal(!openRequestModal)
      }
      const onOpen = () =>{
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
                      <div className="w-full flex justify-end">
                      <button className="p-2 bg-violet-500 w-42 rounded-md text-white flex justify-center items-center space-x-2" onClick={onOpen}>
                                <div className="text-3xl"><IoAddSharp /></div>
                                <div className="text-md">Add Patient</div>
                      </button>
                      </div>
                    
                    </div>
                  
                    <div className="w-full">
                      <Input.Search 
                        placeholder='Search id,name'
                        onChange={(e)=>{
                          setSearchData(e.target.value.toLowerCase());
                        }}
                      className='md:w-full '
                      />
                    </div>
                    
                </div>
                <div className="flex w-full">
                    <Table  columns={columns} dataSource={filteredPatients?.map(patient=>({...patient,key:patient?._id}))} className="w-full overflow-scroll"/>
                </div>
            </div>
            <RequestModal isModalOpen={openRequestModal} cancelModal={onCancelRequestModal} selectedPatient = {selectedPatient}/>
            <PatientModal isModalOpen={isModalOpen} cancelModal={onCloseAdd}  authData={authContext} />
            <PatientEditModal isModalOpen={openEditModal} cancelModal={onCloseEdit} PatientInfo = {selectedPatient} />
        </>
     );
}
 
export default DocPatientPage;