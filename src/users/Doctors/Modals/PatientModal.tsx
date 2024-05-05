import { Modal, Spin } from "antd";
import { ErrorMessage, Field, Formik,Form} from "formik";
import {  validationSchemaForAdding } from "../schema/validationSchema";

import { useState } from "react";
import { AuthContextType } from "../../../components/AuthContenxt/AuthContext";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getDocData } from "../context/DocDataContext";
import { AddingPatientInfo } from "../../../components/Interface/Interface";
import { insertPatientInfo } from "../../../api/patientApi";


interface PatientModalProps{
    isModalOpen : boolean
    cancelModal:()=>void
    authData :AuthContextType
}   

const PatientModal = ({isModalOpen,cancelModal,authData}:PatientModalProps) => {
    console.log(authData)
    const[isLoading,setIsLoading] = useState(false)
    const initialValues : AddingPatientInfo = {
        firstName:   '',
        lastName: '',
        sex:  '',
        age: '',
        contactNumber: '',
        address:  '',
    }
    const contextValue = getDocData();
    const showToast  = () =>{
        toast.success('Data Successfully inserted !');
    }
    const handleSubmit = async (values:AddingPatientInfo,{resetForm} : any) =>{
        try {
            setIsLoading(true);
          
         
           
            const response = await insertPatientInfo(values);
            console.log(response)
            showToast();
        } catch (error) {
            console.error("Error Registering User", error);
        }
        setIsLoading(false);
        resetForm()
        cancelModal();
        contextValue?.handleSetIsLoading()
    }
    const clearForm = () =>{
     
        cancelModal();
    }
    return ( 
        <>
            <div className="w-full">
                <Modal open={isModalOpen} onCancel={clearForm} width='50%' footer={null}>
                    <div className='w-full'>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchemaForAdding}
                            onSubmit={ handleSubmit}
                       
                            >
                             
                            <Form>
                                <div className="flex flex-col">
                                    <h1 className='py-4 text-2xl '>Patients Information</h1>
                                    <div className='grid grid-cols-4 gap-4'>
                                        <div className="flex flex-col col-span-2">
                                            <label>First Name</label>
                                            <Field type="text" name="firstName" className="p-2 border-2 rounded-lg" placeholder="Patients First Name" />
                                            <ErrorMessage name="firstName" component="div" className="text-red-500" />
                                        </div>
                                        <div className="flex flex-col col-span-2">
                                            <label>Last Name</label>
                                            <Field type="text" name="lastName" className="p-2 border-2 rounded-lg" placeholder="Patients Last Name" />
                                            <ErrorMessage name="lastName" component="div" className="text-red-500" />
                                        </div>
                                        <div className="flex flex-col">
                                            <label>Sex</label>
                                            <Field type="text" name="sex" className="p-2 border-2 rounded-lg" placeholder="Sex" />
                                            <ErrorMessage name="sex" component="div" className="text-red-500" />
                                        </div>
                                        <div className="flex flex-col">
                                            <label>Age</label>
                                            <Field type="number" name="age" className="p-2 border-2 rounded-lg" placeholder="Patients Age" />
                                            <ErrorMessage name="age" component="div" className="text-red-500" />
                                        </div>
                                        <div className="flex flex-col">
                                            <label>Contact Number</label>
                                            <Field type="number" name="contactNumber" className="p-2 border-2 rounded-lg" placeholder="Patients Contact Number" />
                                            <ErrorMessage name="contactNumber" component="div" className="text-red-500" />
                                        </div>
                                        <div className="flex flex-col">
                                            <label>Address</label>
                                            <Field type="text" name="address" className="p-2 border-2 rounded-lg" placeholder="Patients Address" />
                                            <ErrorMessage name="address" component="div" className="text-red-500" />
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
 
export default PatientModal;