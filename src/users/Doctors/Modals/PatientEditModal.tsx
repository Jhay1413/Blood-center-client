import { Modal, Spin } from "antd";
import { ErrorMessage, Field, Form, Formik, FormikProps } from "formik";
import { validationSchemaForEditing } from "../schema/validationSchema";
import { useEffect, useRef, useState } from "react";
import { toast } from 'react-toastify';
import { PatientInfo } from "../../../components/Interface/Interface";
import { editPatientInfo } from "../../../api/patientApi";
import { getDocData } from "../context/DocDataContext";

interface PatientEditModalProps {
    PatientInfo: PatientInfo
    isModalOpen: boolean
    cancelModal: () => void
}


const PatientEditModal = ({ PatientInfo, isModalOpen, cancelModal }: PatientEditModalProps) => {
    const initialValues: PatientInfo = {
        _id: '',
        firstName: '',
        lastName: '',
        sex: '',
        age: '',
        contactNumber: '',
        address: '',
    }
    const contextValue = getDocData();
    useEffect(() => {
        formikRef.current?.setValues(PatientInfo)
    }, [PatientInfo])

    const [isLoading, setIsLoading] = useState(false)
    const formikRef = useRef<FormikProps<PatientInfo> | null>(null)

    const handleSubmit = async (values: PatientInfo, { resetForm }: any) => {
        try {
            const response = await editPatientInfo(values);
            console.log(response)
            resetForm();
            cancelModal();
            contextValue?.handleSetIsLoading();
            showToast();
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const onCloseModal = () => {
        formikRef.current?.resetForm();
        cancelModal();
    }
    const showToast = () => {
        toast.success("Success Update !")
    }

    return (
        <>
            <div className="w-full">
                <Modal open={isModalOpen} onCancel={onCloseModal} width='50%' footer={null}>
                    <div className='w-full'>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchemaForEditing}
                            onSubmit={handleSubmit}
                            innerRef={formikRef}
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
                                            <Field as="select" name="sex" className="p-2 border-2 rounded-lg" placeholder="Sex">
                                                <option >Select Gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                            </Field>
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
                                    <button className="px-4 py-2 bg-violet-500 text-white rounded-md" type="submit">{isLoading ? <Spin /> : "Submit"}</button>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </Modal>
            </div>
        </>
    )

}
export default PatientEditModal;