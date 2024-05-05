import {Modal, Spin} from 'antd'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Formik, Form, Field,ErrorMessage, FormikProps } from 'formik'
import { validationSchemaForRequest } from '../schema/validationSchema'
import { AddingPatientRequestInfo, PatientInfo } from '../../../components/Interface/Interface'
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../../components/AuthContenxt/AuthContext'
import { addNewRequest } from '../../../api/patientRequestApi'
import { getDocData } from '../context/DocDataContext'
interface RequestModalProps{
    isModalOpen : boolean
    cancelModal:()=>void
    selectedPatient :PatientInfo | ""
}


const RequestModal = ({isModalOpen,cancelModal,selectedPatient}:RequestModalProps) => {

    const formikRef = useRef <FormikProps<AddingPatientRequestInfo> | null>(null)

    const [isLoading,setIsLoading] = useState<boolean>(false);
    const initialValues : AddingPatientRequestInfo = {
        _id:'',
        firstName:'',
        lastName:'',
        sex:'',
        age: '',
        contactNumber: '',
        address:'',
        bloodType:'',
        physician:''
    }
    const [file,setFile] = useState<null | File>(null)
    const{authContext} = useAuth();
    const contextValue = getDocData();
    const userId = authContext?.userId || '';

    useEffect(()=>{
        formikRef.current?.setValues({
            ...formikRef.current?.values,
            ...selectedPatient
        })
     
    },[selectedPatient])

    const handleSubmit = async(values:AddingPatientRequestInfo,{resetForm}:any) =>{
        const formData = new FormData();
        try {
           
            if(values){
                if(file){
                    setIsLoading(true);

                    formData.append('file',file)
                    formData.append('patientId',values._id)
                    formData.append('bloodType',values.bloodType)
                    formData.append('physicianId',userId)
                    const response = await addNewRequest(formData);
                    console.log(response)
                    setIsLoading(false)
                    cancelModal();
                    contextValue?.handleSetIsLoading()
                }
            }
        } catch (error) {
            console.log(error)
        }
        resetForm()
    }
    const clearForm = () =>{
        formikRef.current?.resetForm()
        cancelModal();
    }
 
    return ( 
        <>
            <div className="w-full">
                <Modal open={isModalOpen} onCancel={clearForm} width='50%' footer={null}>
                    <div className='w-full'>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchemaForRequest}
                            onSubmit={ handleSubmit}
                            innerRef={formikRef}
                        >
                            <Form>
                                <div className="flex flex-col">
                                    <h1 className='py-4 text-2xl '>Patients Information</h1>
                                    <div className='grid grid-cols-4 gap-4'>
                                        <div className="flex flex-col col-span-2">
                                            <label>First Name</label>
                                            <Field type="text" name="firstName" className="p-2 border-2 rounded-lg" placeholder="Patients First Name" disabled/>
                                            <ErrorMessage name="firstName" component="div" className="text-red-500" />
                                        </div>
                                        <div className="flex flex-col col-span-2">
                                            <label>Last Name</label>
                                            <Field type="text" name="lastName" className="p-2 border-2 rounded-lg" placeholder="Patients Last Name" disabled/>
                                            <ErrorMessage name="lastName" component="div" className="text-red-500" />
                                        </div>
                                        <div className="flex flex-col">
                                            <label>Sex</label>
                                            <Field type="text" name="sex" className="p-2 border-2 rounded-lg" placeholder="Sex" disabled/>
                                            <ErrorMessage name="sex" component="div" className="text-red-500" />
                                        </div>
                                        <div className="flex flex-col">
                                            <label>Age</label>
                                            <Field type="number" name="age" className="p-2 border-2 rounded-lg" placeholder="Patients Age" disabled/>
                                            <ErrorMessage name="age" component="div" className="text-red-500" />
                                        </div>
                                        <div className="flex flex-col">
                                            <label>Contact Number</label>
                                            <Field type="number" name="contactNumber" className="p-2 border-2 rounded-lg" placeholder="Patients Contact Number" disabled/>
                                            <ErrorMessage name="contactNumber" component="div" className="text-red-500" />
                                        </div>
                                        <div className="flex flex-col">
                                            <label>Address</label>
                                            <Field type="text" name="address" className="p-2 border-2 rounded-lg" placeholder="Patients Address" disabled/>
                                            <ErrorMessage name="address" component="div" className="text-red-500" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <h1 className='py-4 text-2xl'>Blood Information</h1>
                                        <div className='grid grid-cols-4 gap-4'>
                                            <div className="flex flex-col col-span-2">
                                                <label>Blood Type</label>
                                                <Field as="select" className='p-2 border-2' placeholder='Patients First Name' name="bloodType">
                                                    <option >Select Blood Type</option>
                                                    <option value="O">O-</option>
                                                    <option value="O+">O+</option>
                                                    <option value="A">A</option>
                                                    <option value="A+">A+</option>
                                                    <option value="B+">B+</option>
                                                    <option value="AB">AB</option>
                                                </Field>
                                                <ErrorMessage name="bloodType" component="div" className="text-red-500" />
                                            </div>
                                            <div className="flex flex-col">
                                                <label>Upload File</label>
                                                <Field
                                                    type="file"
                                                    name="file"
                                                    className="p-2 border-2 rounded-lg"
                                                    onChange= {(event:ChangeEvent<HTMLInputElement>) => event.target.files ? setFile(event.target.files[0]): null}
                                                />
                                                <ErrorMessage name="file" component="div" className="text-red-500" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="pt-4 w-full flex justify-end">

                                            <button className="px-4 py-2 bg-violet-500 text-white rounded-md" type="submit">{isLoading ? <Spin/> : 'Submit'}</button>
                                        </div>
                                </div>
                            </Form>
                        </Formik>        
                    </div>
                </Modal>
            </div>
        </>
     );
}
 
export default RequestModal;