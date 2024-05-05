import axios from 'axios'
import { PreHealthCenterInfo,postDonorInfo,preActivityInfo,preDonorInfo,preHealthCenterAccount } from '../../components/Interface/Interface';
const centersApi = import.meta.env.VITE_ADMIN_API_HEALTHCENTERROUTES



export const getAllCenterInfo = async()=>{
    try {
        const response = await axios.get(`${centersApi}/getAllCenter`);
        return response.data
    } catch (error) {
        return error
    }
}
export const addNewCenterInfo = async(data:PreHealthCenterInfo)=>{
    try {
        const response = await axios.post(`${centersApi}/addNewCenter`,data)
        return response.data
    } catch (error) {
        return error
    }
}

export const addNewAccount = async(data:preHealthCenterAccount)=>{
    try {
        const response = await axios.post(`${centersApi}/registerUser`,data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
export const getAllCenterAccount = async() =>{
    try {
        const response = await axios.get(`${centersApi}/getAllCenterAccount`);
        return response.data;
    } catch (error) {
        
    }
}
//Activities services
export const addNewActivities = async(data:preActivityInfo)=>{
    try {
        const response = await axios.post(`${centersApi}/addNewActivity`,data)
        return response.data
    } catch (error) {
        return error
    }
}
export const getAllActivities= async()=>{
    try {
        const response = await axios.get(`${centersApi}/getActivities`)
        return response.data
    } catch (error) {
        return error
    }
}
export const deleteActivitiesById = async (id:string) =>{
    try {
        const response = await axios.delete(`${centersApi}/deleteActivities/${id}`);
        return response.data
    } catch (error) {
      console.log(error);  
    }
}
//Donor services

export const addNewDonorInfo = async(data:preDonorInfo)=>{
    try {
        const response = await axios.post(`${centersApi}/addNewDonor`,data)
        return response.data
    } catch (error) {
        return error
    }
}
export const getAllDonorInfo= async()=>{
    try {
        const response = await axios.get(`${centersApi}/getDonors`)
        return response.data
    } catch (error) {
        return error
    }
}
export const deleteDonor = async(id:string)=>{
    try {
        const response = await axios.delete(`${centersApi}/deleteDonor/${id}`)
        return response.data
    } catch (error) {
        return error
    }
}
export const editDonor = async(values:postDonorInfo)=>{
    try {
        const response = await axios.put(`${centersApi}/updateDonor`,values);
        return response
    } catch (error) {
        console.log(error);
    }
}