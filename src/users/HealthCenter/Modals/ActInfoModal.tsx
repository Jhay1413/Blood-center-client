import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Modal, Spin } from "antd";
import { ErrorMessage, Field, Form, Formik,  } from "formik";
import { useState } from "react";
import { ActivityInfoArray, preActivityInfo } from "../../../components/Interface/Interface";
import { addNewActivities } from "../../../api/AdminAPI/AdminHealthCenterServices";
import { validationSchemaForAddingActivity } from "../schema/validationSchema";

import { FaRegMap} from "react-icons/fa6";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.css'
import MapComponent from "./MapsComponent";
import { useAuth } from "../../../components/AuthContenxt/AuthContext";

interface ActivityModalProps{
    isModalOpen : boolean
    cancelModal:()=>void
   
} 
const ActivityInfoModal = ({isModalOpen,cancelModal}:ActivityModalProps) => {
    const queryClient = useQueryClient();
    const [openMapModal,setOpenMapModal] = useState(false);
    const{authContext} = useAuth();
    const userId = authContext?.userId || '';

    const[isLoading,setIsLoading] = useState(false)
    const initialValues : preActivityInfo = {
        activity:"",
        time:"",
        dateFrom: "",
        dateTo:"",
        status:"",
        address:"",
        location:{
            latitude:"",
            longitude:""
        },
        bloodCenter:userId
    }
   
    const clearForm = () =>{
     
        cancelModal();
    }
    const cancelMapModal = () =>{
        setOpenMapModal(false);
    }
    const mutation = useMutation({
        mutationFn: async (activityInfo:preActivityInfo) => {
          // Log the data before making the API call
          console.log('Data to be sent to the API:', activityInfo);
    
          // Make the API call to post the new todo
          const response = await addNewActivities(activityInfo);
    
          // Check for a successful response
          if (response) {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['activityInfo'] });
            return response; // Return the response data if needed
          } else {
            // Handle the API error
            throw new Error('Failed to update data');
          }
        },
        onSuccess: (data) => {
            
            queryClient.setQueryData(['activityInfo'], (existingData:ActivityInfoArray) => {
                return existingData?.concat(data);
              });
              toast.success("Data Successfully Inserted ! ");
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
                            validationSchema={validationSchemaForAddingActivity}
                            onSubmit={(values:preActivityInfo) => {
                                setIsLoading(true);
                                
                                // Call the mutation function when the form is submitted
                                mutation.mutate(values)
                              }}
                            >
                             {({ setFieldValue }) => (
                            <Form>
                                <div className="flex flex-col">
                                    <h1 className='py-4 text-2xl '>Activity Information</h1>
                                    <div className='grid grid-cols-4 gap-4'>
                                        <div className="flex flex-col col-span-2">
                                            <label>Activity</label>
                                            <Field type="text" name="activity" className="p-2 border-2 rounded-lg" placeholder="Activity" />
                                            <ErrorMessage name="activity" component="div" className="text-red-500" />
                                        </div>
                                       
                                        <div className="flex flex-col">
                                            <div className="flex justify-between">
                                                <label>Time</label>
                                                <label className="text-gray-400">Hour:min AM/PM</label>
                                            </div>
                                           
                                            <Field type="text" name="time" className="p-2 border-2 rounded-lg" placeholder="Hour:min AM/PM" />
                                            <ErrorMessage name="time" component="div" className="text-red-500" />
                                        </div>
                                        
                                        <div className="flex flex-col">
                                            <label>Status</label>
                                            <Field
                                                as="select"  // Use "select" as the type
                                                name="status"
                                                className="p-2 border-2 rounded-lg"
                                            >
                                                <option value="pending" label="Pending" />
                                                <option value="pending" label="Pending" />
                                                
                                               
                
                                                {/* Add more options as needed */}
                                            </Field>
                                            <ErrorMessage name="status" component="div" className="text-red-500" />
                                        </div>
                                        <div className="flex flex-col">
                                            <label>Date from</label>
                                            <Field type="date" name="dateFrom" className="p-2 border-2 rounded-lg" placeholder="Donor date" />
                                            <ErrorMessage name="age" component="div" className="text-red-500" />
                                        </div>
                                        <div className="flex flex-col">
                                            <label>Date to</label>
                                            <Field type="date" name="dateTo" className="p-2 border-2 rounded-lg" placeholder="Donor date" />
                                            <ErrorMessage name="age" component="div" className="text-red-500" />
                                        </div>
                                        <div className="flex flex-col">
                                            <label>Address</label>
                                            <Field type="text" name="address" className="p-2 border-2 rounded-lg" placeholder="Activity address" />
                                            <ErrorMessage name="age" component="div" className="text-red-500" />
                                        </div>
                                     
                                     
                                        <div className="flex flex-col hidden">
                                            <label>Latitude</label>
                                            <Field type="text" name="location.latitude" className="p-2 border-2 rounded-lg" placeholder="Location"  />
                                           
                                            <ErrorMessage name="location.latitude" component="div" className="text-red-500" />
                                        </div>
                                        <div className="flex flex-col hidden">
                                            <label>Longitude</label>
                                            <Field type="text" name="location.longitude" className="p-2 border-2 rounded-lg" placeholder="Location" />
                                           
                                            <ErrorMessage name="location.longitude" component="div" className="text-red-500" />
                                        </div>
                                        <div className="flex flex-col">
                                            <label>Select Area</label>
                                            <div className="flex flex-row justify-start space-x-4">
                                                
                                                <div className="text-2xl flex justify-center border-2 p-1"  onClick={()=>setOpenMapModal(true)}>
                                                    <FaRegMap  />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-4 w-full flex justify-end">
                                    <button className="px-4 py-2 bg-violet-500 text-white rounded-md" type="submit">{isLoading?<Spin/> : "Submit"}</button>
                                </div>
                                {openMapModal ? <MapComponent isModalOpen ={openMapModal} cancelModal={cancelMapModal} setFieldValue = {setFieldValue} /> : "" }
                                
                            </Form>
                             )}
                        </Formik>
                    </div>
                </Modal>
            </div>
        </>
     );
}
 
export default ActivityInfoModal;

