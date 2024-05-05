import { Modal, Spin } from "antd";
import { validationSchemaForPhysician } from "../schema/adminValidationSchema"
import { ErrorMessage, Field, Form, Formik } from "formik";
import { addingPhysicianInfo, physicianInfoArray } from "../../../components/Interface/Interface";
import { useState } from "react";
import { addNewPhysician } from "../../../api/AdminAPI/AdminPhysicianRequest";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {

    isModalOpen: boolean
    onClose: () => void

}


const AddPhysicianModal = ({ isModalOpen, onClose }: Props) => {
    const queryClient = useQueryClient();
    const initialValues: addingPhysicianInfo = {
        firstName: '',
        lastName: '',
        sex: '',
        contactNumber: '',
        assignedAt: '',
        email: '',
        password: '',
        userRoles: "Doctor"

    }
    const [isLoading, setIsLoading] = useState<boolean>(false)


    const addData = useMutation({
        mutationFn: async (newPhysician: addingPhysicianInfo) => {
            setIsLoading(true)
            // Log the data before making the API call
            console.log('Data to be sent to the API:', newPhysician);

            // Make the API call to post the new todo
            const response = await addNewPhysician(newPhysician);

            // Check for a successful response
            if (response) {
                // Invalidate and refetch
                queryClient.invalidateQueries({ queryKey: ['physicianInfo'] });
                return response; // Return the response data if needed
            } else {
                // Handle the API errors
            }
        },
        onSuccess: (data) => {
            // Log the response data from the mutation
            queryClient.setQueryData(['physicianInfo'], (existingData: physicianInfoArray) => {
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
    });
    return (
        <>
            <div className="w-full">
                <Modal open={isModalOpen} onCancel={onClose} width='40%' footer={null}>
                    <div className="w-full">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchemaForPhysician}
                            onSubmit={(values: addingPhysicianInfo) => {
                                setIsLoading(true);

                                // Call the mutation function when the form is submitted
                                addData.mutate(values)
                            }}
                        >
                            <Form>
                                <div className="flex flex-col">
                                    <h1 className='py-4 text-2xl '>Physician Information</h1>
                                    <div className='grid grid-cols-4 gap-4'>
                                        <div className="flex flex-col col-span-4">
                                            <label>First Name</label>
                                            <Field type="text" name="firstName" className="p-2 border-2 rounded-lg" placeholder="First Name" />
                                            <ErrorMessage name="firstName" component="div" className="text-red-500" />
                                        </div>
                                        <div className="flex flex-col col-span-4">
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
                                            <Field
                                                as="select"  // Use 'as' prop to specify the type of form element
                                                id="assignedAt"
                                                name="assignedAt"
                                                className="p-2 border-2 rounded-lg"
                                            >
                                                <option value="" disabled>
                                                    Select an option
                                                </option>
                                                <option value="Eastern Visayas Medical Center">Eastern Visayas Medical Center</option>
                                                <option value="Mother Of Mercy Hospital">Mother Of Mercy Hospital	</option>
                                                <option value="Divine Word Hospital">Divine Word Hospital</option>
                                                <option value="Tacloban City's Hospital">Tacloban City's Hospital</option>
                                            </Field>
                                            <ErrorMessage name="assignedAt" component="div" className="text-red-500" />
                                        </div>
                                        <div className="flex flex-col col-span-2">
                                            <label>Email</label>
                                            <Field type="text" name="email" className="p-2 border-2 rounded-lg" placeholder="Email" />
                                            <ErrorMessage name="email" component="div" className="text-red-500" />
                                        </div>
                                        <div className="flex flex-col col-span-2">
                                            <label>Password</label>
                                            <Field type="password" name="password" className="p-2 border-2 rounded-lg" placeholder="password" />
                                            <ErrorMessage name="password" component="div" className="text-red-500" />
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
    );
}

export default AddPhysicianModal;