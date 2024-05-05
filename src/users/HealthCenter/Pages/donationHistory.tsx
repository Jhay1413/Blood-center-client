import { Button, Input, Space, Table } from "antd";
import { useState } from "react";
import { DonationInfo, DonationInfoArray, postDonationInfo, postDonorInfo } from "../../../components/Interface/Interface";

import DonationModalHistory from "../Modals/donationModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDonationById } from "../../../api/donationApi";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoAddSharp } from "react-icons/io5";
const DonationHistory = () => {
  const queryClient = useQueryClient();
  const donationData = queryClient.getQueryData<DonationInfoArray>(['donationList']);
    const [searchData,setSearchData] = useState("");
    const [isModalOpen,setIsModalOpen] = useState(false);
    const [initialValues,setInitialValues] = useState<DonationInfo>({
      donor:"",
      bloodType:"",
      quantity:"",
      date:"",
      bloodCenter:""
    })
    const [loading,setIsLoading] = useState(false);
    console.log(loading)
    const onClose = () =>{
      setIsModalOpen(false);
    }
    const columns = [
   
        {
          title: 'First Name',
          dataIndex: 'donor',
          key: 'donor.firstName',
          render: ((donor:postDonorInfo) =>donor?.firstName),
          filteredValue: [searchData],
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
         {
          title : 'Actions',
          dataIndex : 'actions',
          key:'actions',
          render: (text:string,record:postDonationInfo)=>(
            <Space size="middle">
              <Button onClick={()=>deleteRecord(record)} danger key={text}>Delete</Button>
            </Space>
    
          )
        }
       

      ];
      const deleteRecord = (record:postDonationInfo) =>{
        deleteMutation.mutate(record._id)
      }
      const deleteMutation = useMutation({
        mutationFn: async(id:string)=>{

            console.log(id);
            setIsLoading(true);
            
            const response = await deleteDonationById(id);

            if (response) {
                // Invalidate and refetch
                queryClient.invalidateQueries({ queryKey: ['donationList'] });
                return response; // Return the response data if needed
              } else {
                // Handle the API error
                throw new Error('Failed to update data');
              }
            },
            onSuccess: (data) => {
              console.log(data);
              setInitialValues({
                donor:"",
                bloodType:"",
                quantity:"",
                date:"",
                bloodCenter:""
              })
              queryClient.setQueryData(['donationList'], (existingData:DonationInfoArray) => {
                return existingData?.filter(item => item._id !== data.data._id);
              });
              toast.success("Data Successfully Delete ! ");
              setIsLoading(false)
           
              },
              onError: (error) => {
                // Log and handle the error
                console.error('Mutation error:', error);
              },

    })
    return ( 

        <>
          
            <div className="w-full p-4 flex-col flex bg-white shadow-md">
                <div className="flex pb-4 flex-col space-y-4">
                    <div className="w-full flex justify-between">
                      <div className="w-full ">
                        <h1 className="text-xl">List of Patients</h1>
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
                      <button className="p-2 bg-violet-500 w-46 rounded-md text-white flex justify-center items-center space-x-2" onClick={()=>setIsModalOpen(true)}>
                                <div className="text-3xl"><IoAddSharp /></div>
                                <div className="text-md">Add Donation</div>
                            </button>
                      </div>
                     
                    
                    </div>
                  
                    <div className="w-full">
    
                    </div>
                    
                </div>
                <div className="flex w-full">

                <Table  columns={columns} dataSource = {donationData?.map((data)=>({...data,key:data._id}))}className="w-full overflow-scroll"/>
            </div>
        </div> 
        <DonationModalHistory isModalOpen={isModalOpen} onClose={onClose} initialValues={initialValues}/>    
        </>
       
     );
}
 
export default DonationHistory;