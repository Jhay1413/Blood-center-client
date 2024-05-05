import axios from 'axios';
const accountsApi = import.meta.env.VITE_ADMIN_API_ACCOUNTS;

export const getAllAccountInfo = async ()=>{

    try {
        const response = await axios.get(`${accountsApi}/getAllCenterAccount`);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export const addPhysicanAccount = async (data:any) =>{
    // const response = await axios.post(`${accountsApi}/addPhysicianAccount`,data);
    console.log(data)
    // return response.data
}