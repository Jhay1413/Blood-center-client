import { Button, Input, Modal, Space, Table } from "antd";

import { useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DonorInfoArray, postDonorInfo} from "../../../components/Interface/Interface";
import DonorInfoModal from "../Modal/DonorInfoModal";
import { deleteDonor } from "../../../api/AdminAPI/AdminHealthCenterServices";
import DonorEditModal from "../Modal/DonorEditModat";
import { IoAddSharp } from "react-icons/io5";

const DonorPage = () => {

    const [isModalOpen,setIsModalOpen] = useState(false);
    const queryClient = useQueryClient();
    const donorInfos = queryClient.getQueryData<DonorInfoArray>(['donorInfo']);
    const [dataSelectedDelete,setDataSelectedDelete] = useState<postDonorInfo>()
    const [openDeleteModal,setOpenDeleteModal] = useState(false);
    const [searchedData,setSearchData] = useState("");
  
    const [isEditModalOpen,setIsEditModalOpen] = useState(false);
    const [selectedEdit,setSelectedEdit] = useState<postDonorInfo>({
        _id:"",
        firstName:"",
        lastName:"",
        contactNumber:"",
        address: "",
        age:  "",
        sex:"",
        DOB:"",
        bloodType:"",
    })
    const onCloseAdd = () =>{
        setIsModalOpen(false);
    }
    
    const columns =[
       
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
            title: 'Blood Type',
            dataIndex: 'bloodType',
            key: 'bloodType',
        },
        {
            title: 'Date of Birth',
            dataIndex: 'DOB',
            key: 'DOB',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title : 'Actions',
            dataIndex : 'actions',
            key:'actions',
            render: (text:string,record:postDonorInfo)=>(
              <Space size="middle">
                <Button key={text} onClick={()=>promptDelete(record)} danger>Delete</Button>
                <Button key={text} onClick={()=>promptEdit(record)} >Edit</Button>
                
                
              </Space>
      
            )
          }
    ] 

    const promptEdit = (record:postDonorInfo) =>{
        setIsEditModalOpen(true);
        setSelectedEdit(record);
    }
    const onCloseEdit = () =>{
        setIsEditModalOpen(false);
       
    }
    const promptDelete = (record:postDonorInfo) =>{
        setDataSelectedDelete(record);
        setOpenDeleteModal(true);
       
    }
    const mutation_delete =useMutation({
        mutationFn: async (donorInfo:postDonorInfo) => {
          // Log the data before making the API call
          console.log('Data to be sent to the API:', donorInfo);
    
          // Make the API call to post the new todo
          const response = await deleteDonor(donorInfo._id);
    
          // Check for a successful response
          if (response) {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['donorInfo'] });
            return response; // Return the response data if needed
          } else {
            // Handle the API error
            throw new Error('Failed to update data');
          }
        },
        onSuccess: (data) => {

            queryClient.setQueryData(['donorInfo'], (existingData:DonorInfoArray) => {
                return existingData?.filter(data=>data._id != dataSelectedDelete?._id);
              });
           
            setOpenDeleteModal(false);
          console.log('Mutation response data:', data);
        },
        onError: (error) => {
          // Log and handle the error
          console.error('Mutation error:', error);
        },
      });
      const deleteData = () =>{
        if (dataSelectedDelete !== undefined) {
            mutation_delete.mutate(dataSelectedDelete);
          } else {
            console.error('no data selected');
            // Optionally, you can handle this case by showing a message or taking some other action.
          }
        };
    return ( 
        <>
            <div className="w-full p-4 flex-col h-full flex bg-white shadow-md">
                <div className="flex pb-4 flex-col space-y-4">
                    <div className="w-full flex justify-between">
                        <div className="w-full ">
                            <h1 className="text-xl">List of Donors</h1>
                        </div>
                        <div className="w-full justify-center items-center flex">
                        <Input.Search 
                          placeholder='searchbox'
                          onChange={(e)=>{
                            setSearchData(e.target.value.toLowerCase());
                          }}
                          className='md:w-52 p-2'
                        />
                      </div>
                        <div className="w-full flex justify-end">
                            <button className="p-2 bg-violet-500 w-42 rounded-md text-white flex justify-center items-center space-x-2" onClick={()=>setIsModalOpen(true)}>
                                <div className="text-3xl"><IoAddSharp /></div>
                                <div className="text-md">Add Donor</div>
                            </button>
                        </div>
                    </div>
                    <div className="w-full">
                    </div>
                    
                </div>
                <div className="flex w-full">
                    <Table  columns={columns} dataSource={donorInfos?.map((request) =>({...request,key:request._id}))} className="w-full overflow-scroll"/>
                </div>
            </div>
             
            <Modal open={openDeleteModal} onCancel={()=>setOpenDeleteModal(false)} footer={null}>
                <div className="flex justify-center items-center flex-col">
                    <div className="p-4 text-2xl">
                        <h1>Confirm deletion of this data?</h1>
                    </div>
                    <div className="">
                        <button className="p-2 bg-red-500 text-white rounded-md" onClick={deleteData}>Delete</button>
                    </div>
                </div>


            </Modal>
            <DonorInfoModal isModalOpen={isModalOpen}  cancelModal={onCloseAdd}/>
            <DonorEditModal isModalOpen={isEditModalOpen} cancelModal={onCloseEdit} donor={selectedEdit}/>          
        </>
     );
}
 
export default DonorPage;