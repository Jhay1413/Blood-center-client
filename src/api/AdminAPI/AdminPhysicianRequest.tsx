import axios from 'axios'
import { addingPhysicianInfo } from '../../components/Interface/Interface';

const RequestApi = import.meta.env.VITE_ADMIN_API_PHYSICIANROUTES


export const getAllPhysicianAccount = async () =>{
    try {
        const response = await axios.get(`${RequestApi}/getAllPhysicianAccount`)
        return response.data
    } catch (error) {
        console.log(error);
    }
}
export const getAllPhysician = async () =>{
    try {
        const response = await axios.get(`${RequestApi}/getAllPhysician`);
        return response.data
    } catch (error) {
        console.log(error)
    }
}
export const addNewPhysician = async (data:addingPhysicianInfo) =>{
    try {
        const response = await axios.post(`${RequestApi}/addNewPhysician`,data)
        return response.data
    } catch (error) {
        console.log(error)
    }
}
export const editPhysician = async(id:string)=>{
    try {
        const response = await axios.put(`${RequestApi}/editPhysicianInfo/${id}`);
        return response.data
    } catch (error) {
        console.log(error)
    }
}
export const deletePhysician = async(id:string)=>{
    try {
        const response = await axios.delete(`${RequestApi}/deletePhysicianInfo/${id}`);
        return response.data
    } catch (error) {
        console.log(error)
    }
}