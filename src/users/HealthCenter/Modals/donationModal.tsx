import { Modal,Form, Input, List, Button} from "antd";


import { DonationInfo, DonationInfoArray, DonorInfoArray, postDonorInfo } from "../../../components/Interface/Interface";
import {  useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../../components/AuthContenxt/AuthContext";
import { addNewDonation } from "../../../api/donationApi";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type props ={
    isModalOpen : boolean
    onClose : ()=>void
    initialValues : DonationInfo

}
const DonationModalHistory = ({isModalOpen,onClose,initialValues}:props) => {
    console.log(initialValues);
    const queryClient = useQueryClient();

    const donorInfos = queryClient.getQueryData<DonorInfoArray>(['donorInfo']);
    const{authContext} = useAuth();
    const userId = authContext?.userId || '';
    const [isLoading,setIsLoading] = useState(false)
    console.log(isLoading);
    const [openSearchModal,setOpenSearchModal] = useState(false);
    const [searchResults, setSearchResults] = useState<DonorInfoArray>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDonor,setSelectedDonor] = useState<postDonorInfo>();

 

    const [bloodType,setBloodType] = useState("");
    console.log(bloodType)
    const [quantity,setQuantity] = useState("");
    const [date,setDate] = useState("");

    const cancelSearchModal = () =>{
        setOpenSearchModal(false);
    }
 
    const handleSearch = (value:string) => {
        const results =donorInfos?.filter(item =>
          item.firstName.toLowerCase().includes(value.toLowerCase())
        );
        setSearchTerm(value);
        if(results){
            setSearchResults(results);
        }
       
      };
      const setCurrentPatientFunction = (data:postDonorInfo) =>{
        setSelectedDonor(data);
        setOpenSearchModal(false);
    }
    const submit = () =>{
      const data:DonationInfo = {
        date:date,
        donor:selectedDonor? selectedDonor._id : "",
        bloodType:selectedDonor? selectedDonor.bloodType : "",
        quantity:quantity,
        bloodCenter:userId
      }
      mutation.mutate(data)
    
    }
      
    const mutation = useMutation({
        mutationFn: async(data:DonationInfo)=>{
            setIsLoading(true);
            
            const response = await addNewDonation(data);

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
                queryClient.setQueryData(['donationList'], (existingData:DonationInfoArray) => {
                    return existingData?.concat(data);
                  });
                  console.log(data);
                  toast.success("Data Successfully Inserted ! ");
                setIsLoading(false);
               onClose();
              console.log('Mutation response data:', data);
              },
              onError: (error) => {
               console.log(error)
            
              },

    })
  
    return ( 
        <>
      
            <Modal open = {isModalOpen} onCancel={onClose} footer={false}>
           
                <Form layout="vertical" className='max-w-full items-center justify-center'>
        
                    <div className='grid grid-cols-4 gap-4 w-full'>
                        <div className='col-span-4 py-4 text-2xl'>
                            <h1>Donation Record Form</h1>
                        </div>
                        <div className="col-span-4">
                            <Button onClick={()=>setOpenSearchModal(true)} className='bg-blue-500 text-white' >Search Patient</Button>
                         </div>
                         <Form.Item label="Date Donated" className='col-span-4'>
                            <Input type="date" name="date_of_visit" onChange={(e)=>setDate(e.target.value)} />
                        </Form.Item>
                        <Form.Item label="First Name" className='col-span-2'>
                            <Input name="first_name" value={selectedDonor?.firstName} readOnly/>
                        </Form.Item>
                        <Form.Item label="Last name"className='col-span-2'>
                            <Input name="last_name"  value={selectedDonor?.lastName} readOnly/>
                        </Form.Item>
                        <Form.Item label="Blood Type"className='col-span-2'>
                            <Input name="bloodType"  value={selectedDonor?.bloodType} onChange={(e)=>setBloodType(e.target.value)} readOnly/>
                        </Form.Item>
                        <Form.Item label="Quantity" className='col-span-2'>
                            <Input name="quantity"  onChange={(e)=>setQuantity(e.target.value)}/>
                        </Form.Item>
         
                    </div>
                    <Form.Item>
                        <Button className='bg-blue-500 text-white' onClick={submit}>SAVE</Button>
                    </Form.Item>

                </Form>
            </Modal>
            <Modal open={openSearchModal} onCancel={cancelSearchModal}>
            <Input.Search
                placeholder="Search"
                value={searchTerm}
                onChange={e => handleSearch(e.target.value)}
            />
            <List
                dataSource={searchResults || []}
                renderItem={item => <List.Item className="hover:bg-gray-100 " onClick={() => setCurrentPatientFunction(item)}>{item.firstName} {item.lastName}</List.Item>}
            />

        </Modal>
        </>
     );
}
 
export default DonationModalHistory;