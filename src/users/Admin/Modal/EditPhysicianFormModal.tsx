import { ErrorMessage, Field, Formik } from "formik";
import { validationSchemaForPhysician } from "../schema/adminValidationSchema";
import { PhysicianInfo} from "../../../components/Interface/Interface";
import { useState } from "react";
import { Form, Modal, Spin } from "antd";

interface Props {

    isEditModalOpen:boolean
    onClose : ()=>void
    selectedData : PhysicianInfo

}
const EditPhysicianModal = ({isEditModalOpen,onClose,selectedData}:Props)  => {
    const [isLoading,setIsLoading] = useState(false);
   
    return ( 
        <>
            <div className="w-full">
            <Modal open={isEditModalOpen} onCancel={onClose} width='50%' footer={null}>
                    <div className="w-full">
                        <Formik
                            initialValues={selectedData}
                            validationSchema={validationSchemaForPhysician}
                            onSubmit={(values:PhysicianInfo) => {
                                setIsLoading(true);
                                console.log(values);
                
                                // Call the mutation function when the form is submitted
                          
                              }}
                        >
                            <Form>
                                <div className="flex flex-col">
                                    <h1 className='py-4 text-2xl '>Physician Information</h1>
                                    <div className='grid grid-cols-4 gap-4'>
                                        <div className="flex flex-col col-span-2">
                                            <label>First Name</label>
                                            <Field type="text" name="firstName" className="p-2 border-2 rounded-lg" placeholder="First Name" />
                                            <ErrorMessage name="firstName" component="div" className="text-red-500" />
                                        </div>
                                        <div className="flex flex-col col-span-2">
                                            <label>Last Name</label>
                                            <Field type="text" name="lastName" className="p-2 border-2 rounded-lg" placeholder="Last Name" />
                                            <ErrorMessage name="lastName" component="div" className="text-red-500" />
                                        </div>
                                        <div className="flex flex-col">
                                            <label>Sex</label>
                                            <Field type="text" name="sex" className="p-2 border-2 rounded-lg" placeholder="Sex" />
                                            <ErrorMessage name="sex" component="div" className="text-red-500" />
                                        </div>
                                        <div className="flex flex-col">
                                            <label>Contact Number</label>
                                            <Field type="number" name="contactNumber" className="p-2 border-2 rounded-lg" placeholder="Contact Number" />
                                            <ErrorMessage name="contactNumber" component="div" className="text-red-500" />
                                        </div>
                                        <div className="flex flex-col col-span-2">
                                            <label>Assigned At:</label>
                                            <Field type="string" name="assignedAt" className="p-2 border-2 rounded-lg" placeholder="Assigned At" />
                                            <ErrorMessage name="assignedAt" component="div" className="text-red-500" />
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
 
export default EditPhysicianModal;