import {  Modal, Spin } from "antd";
import {Form, ErrorMessage, Field, Formik } from "formik";
import { useState } from "react";
import { validationSchemaForHealthCneter } from "../schema/adminValidationSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewCenterInfo } from "../../../api/AdminAPI/AdminHealthCenterServices";
import { PreHealthCenterInfo, healthCenterInfoArray } from "../../../components/Interface/Interface";

interface Props  {
    isModalOpen:boolean
    onClose: ()=>void
}
interface HealthCenter {
    name:   string,
    address: string,
    contact: string,
    bloodTypeInventory: {
        A_positive: number | null,
        A_negative: number | null,
        B_positive: number | null,
        B_negative: number | null,
        AB_positive: number | null,
        AB_negative: number | null,
        O_positive: number | null,
        O_negative: number | null,
    },
}

const HealthCenterModal = ({isModalOpen,onClose}:Props) =>{
    const queryClient = useQueryClient();
    const [isLoading,setIsLoading] = useState(false)
    const initialValues = {
        name: '',
        address: '',
        contact: '',
        bloodTypeInventory: {
            A_positive: null,
            A_negative: null,
            B_positive: null,
            B_negative: null,
            AB_positive: null,
            AB_negative: null,
            O_positive: null,
            O_negative: null,
        },
    };

    const mutation = useMutation({
        mutationFn: async(newHealthCenter:PreHealthCenterInfo)=>{
            setIsLoading(true);

            const response = await addNewCenterInfo(newHealthCenter);

            if (response) {
                // Invalidate and refetch
                queryClient.invalidateQueries({ queryKey: ['healthCenterInfo'] });
                return response; // Return the response data if needed
              } else {
                // Handle the API error
                throw new Error('Failed to update data');
              }
            },
            onSuccess: (data) => {
                // Log the response data from the mutation
                queryClient.setQueryData(['healthCenterInfo'], (existingData:healthCenterInfoArray) => {
                  return existingData?.concat(data);
                });
                setIsLoading(false)
                onClose();
                console.log('Mutation response data:', data);
              },
              onError: (error) => {
                // Log and handle the error
                console.error('Mutation error:', error);
              },

    })
    return (
        <>
              <div className="w-full">
            <Modal open={isModalOpen} onCancel={onClose} width='25%' footer={null}>
                    <div className="w-full">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchemaForHealthCneter}
                            onSubmit={(values:HealthCenter) => {
                                setIsLoading(true);
                
                                // Call the mutation function when the form is submitted
                                mutation.mutate(values)
                              }}
                        >
                            <Form>
                                <div className="flex flex-col">
                                    <h1 className='py-4 text-2xl '>Blood Center Information</h1>
                                    <div className='grid grid-cols-3 gap-4'>
                                    <div className="flex flex-col col-span-3">
                                            <label htmlFor="name">Name</label>
                                            <Field type="text" id="name" name="name" placeholder="name" className="p-2 border-2 rounded-lg"/>
                                            <ErrorMessage name="name" component="div" className="text-red-500" />
                                        </div>
                                        <div className="flex flex-col col-span-3">
                                            <label htmlFor="contact">Contact</label>
                                            <Field type="text" id="contact" name="contact" placeholder="contacts" className="p-2 border-2 rounded-lg"/>
                                            <ErrorMessage name="contact" component="div" className="text-red-500" />
                                        </div>
                                        <div className="flex flex-col col-span-3">
                                            <label htmlFor="address">Address</label>
                                            <Field type="text" id="address" name="address" placeholder="address" className="p-2 border-2 rounded-lg"/>
                                            <ErrorMessage name="address" component="div" className="text-red-500"  />
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
    )
}
export default HealthCenterModal