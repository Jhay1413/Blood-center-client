import axios from 'axios'
import {  AddingPatientInfoWithUserRoles, PatientInfo } from '../components/Interface/Interface';
const PatientApi = import.meta.env.VITE_API_PATIENTROUTES


export const insertPatientInfo = async(data:AddingPatientInfoWithUserRoles)=>{
    try {
      
        const response = await axios.post(`${PatientApi}/insertPatientInfo`,data);
        return response.data
    } catch (error) {
        console.log('Error on insertPatient Api !')
    }
}
export const getAllPatientInfo = async()=>{
    try {
        const response = await axios.get(`${PatientApi}/getAllPatient`);
        return response
    } catch (error) {
        
    }
}
export const editPatientInfo = async (data:PatientInfo)=>{
    try {
        const response = await axios.put(`${PatientApi}/editPatientInfo/${data._id}`,data)
        return response;
    } catch (error) {
        console.log(error);
    }
}
export const deletePatientnfo = async(id:string)=>{
    try {
        const response = await axios.delete(`${PatientApi}/deletePatientInfo/${id}`);
        return response;
    } catch (error) {
        
    }
}