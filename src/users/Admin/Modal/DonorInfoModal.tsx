import { Modal, Spin } from "antd";
import { ErrorMessage, Field, Formik,Form} from "formik";



import 'react-toastify/dist/ReactToastify.css';
import { DonorInfoArray,  preDonorInfo } from "../../../components/Interface/Interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewDonorInfo } from "../../../api/AdminAPI/AdminHealthCenterServices";
import { useState } from "react";
import { validationSchemaForAdding } from "../schema/adminValidationSchema";


interface DonorModalProps{
    isModalOpen : boolean
    cancelModal:()=>void
   
}   

const DonorInfoModal = ({isModalOpen,cancelModal}:DonorModalProps) => {
    const queryClient = useQueryClient();
  

    const[isLoading,setIsLoading] = useState(false)
    const initialValues : preDonorInfo = {
        firstName:"",
        lastName:"",
        contactNumber:"",
        address: "",
        age:  "",
        sex:"",
        DOB:"",
        bloodType:"",
        email: '',
        password: '',
        confirmPassword: '',
    }
   
    const clearForm = () =>{
     
        cancelModal();
    }
    const mutation = useMutation({
        mutationFn: async (donorInfo:preDonorInfo) => {
          // Log the data before making the API call
          console.log('Data to be sent to the API:', donorInfo);
    
          // Make the API call to post the new todo
          const response = await addNewDonorInfo(donorInfo);
    
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
                return existingData?.concat(data);
              });
            setIsLoading(false);
            cancelModal();
          console.log('Mutation response data:', data);
        },
        onError: (error) => {
          // Log and handle the error
          console.error('Mutation error:', error);
        },
      });
    
    return ( 
        <>
            <div className="w-full">
                <Modal open={isModalOpen} onCancel={clearForm} width='50%' footer={null}>
                    <div className='w-full'>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchemaForAdding}
                            onSubmit={(values:preDonorInfo) => {
                                setIsLoading(true);
                                
                                // Call the mutation function when the form is submitted
                                mutation.mutate(values)
                              }}
                            >
                             
                            <Form>
                                <div className="flex flex-col">
                                    <h1 className='py-4 text-2xl '>Donor Information</h1>
                                    <div className='grid grid-cols-4 gap-4'>
                                        <div className="flex flex-col col-span-2">
                                            <label>First Name</label>
                                            <Field type="text" name="firstName" className="p-2 border-2 rounded-lg" placeholder="Donor First Name" />
                                            <ErrorMessage name="firstName" component="div" className="text-red-500" />
                                        </div>
                                        <div className="flex flex-col col-span-2">
                                            <label>Last Name</label>
                                            <Field type="text" name="lastName" className="p-2 border-2 rounded-lg" placeholder="Donor Last Name" />
                                            <ErrorMessage name="lastName" component="div" className="text-red-500" />
                                        </div>
                                        <div className="flex flex-col">
                                            <label>Sex</label>
                                            <Field type="text" name="sex" className="p-2 border-2 rounded-lg" placeholder="Sex" />
                                            <ErrorMessage name="sex" component="div" className="text-red-500" />
                                        </div>
                                        <div className="flex flex-col">
                                            <label>Age</label>
                                            <Field type="number" name="age" className="p-2 border-2 rounded-lg" placeholder="Donor Age" />
                                            <ErrorMessage name="age" component="div" className="text-red-500" />
                                        </div>
                                        <div className="flex flex-col">
                                            <label>Contact Number</label>
                                            <Field type="number" name="contactNumber" className="p-2 border-2 rounded-lg" placeholder="Donor Contact Number" />
                                            <ErrorMessage name="contactNumber" component="div" className="text-red-500" />
                                        </div>
                                        <div className="flex flex-col">
                                            <label>Address</label>
                                            <Field type="text" name="address" className="p-2 border-2 rounded-lg" placeholder="Donor Address" />
                                            <ErrorMessage name="address" component="div" className="text-red-500" />
                                        </div>
                                        <div className="flex flex-col">
                                        <label>Blood Type</label>
                                                <Field as="select" className='p-2 border-2' placeholder='Patients First Name' name="bloodType">
                                                    <option >Select Blood Type</option>
                                                    <option value="O">O</option>
                                                    <option value="O+">O+</option>
                                                    <option value="A">A</option>
                                                    <option value="A+">A+</option>
                                                    <option value="B+">B+</option>
                                                    <option value="AB">AB</option>
                                                </Field>
                                                <ErrorMessage name="bloodType" component="div" className="text-red-500" />
                                        </div>
                                        
                                        <div className="flex flex-col">
                                            <label>Date of Birth</label>
                                            <Field type="text" name="DOB" className="p-2 border-2 rounded-lg" placeholder="Dat of birth" />
                                            <ErrorMessage name="DOB" component="div" className="text-red-500" />
                                        </div>
                                    </div>
                                    
                                    <h1 className='py-4 text-2xl '>Donor Account</h1>
                                    <div className='grid grid-cols-4 gap-4'>
                                        <div className="flex flex-col col-span-2">
                                            <label>Email Address</label>
                                            <Field type="text" name="email" className="p-2 border-2 rounded-lg" placeholder="Email" />
                                            <ErrorMessage name="email" component="div" className="text-red-500" />
                                        </div>
                                        <div className="flex flex-col col-span-1">
                                            <label>Password</label>
                                            <Field type="password" name="password" className="p-2 border-2 rounded-lg" placeholder="Password" />
                                            <ErrorMessage name="password" component="div" className="text-red-500" />
                                        </div>
                                        <div className="flex flex-col col-span-1">
                                            <label>Confirm Password</label>
                                            <Field type="password" name="confirmPassword" className="p-2 border-2 rounded-lg" placeholder="Confirm Password" />
                                            <ErrorMessage name="confirmPassword" component="div" className="text-red-500" />
                                        </div>
                                    </div>
                                    
                                </div>
                                <div className="pt-4 w-full flex justify-end">
                                    <button className="px-4 py-2 bg-violet-500 text-white rounded-md" type="submit">{isLoading?<Spin/> : "Submit"}</button>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </Modal>
            </div>
        </>
     );
}
 
export default DonorInfoModal;