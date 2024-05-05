import axios from 'axios'
const PatientApi = import.meta.env.VITE_ADMIN_API_PATIENTROUTES


export const getAllPatientInfo = async()=>{
    try {
        const response = await axios.get(`${PatientApi}/getAllPatient`);
        return response.data
    } catch (error) {
        return error
    }
}