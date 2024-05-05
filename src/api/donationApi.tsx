import axios from 'axios'
import { DonationInfo } from '../components/Interface/Interface';

const donationApi = import.meta.env.VITE_API_DONATIONS;


export const addNewDonation = async (data:DonationInfo) =>{
    try {
        const response = await axios.post(`${donationApi}/addNewDonation`,data);
        return response.data
    } catch (error) {
        console.log(error);
    }
}
export const getAllDonation = async () =>{
    try {
        const response = await axios.get(`${donationApi}/getAllDonations`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
export const deleteDonationById = async (id:string)=>{
    try {
        const response = await axios.delete(`${donationApi}/deleteDonation/${id}`);
        return response.data
    } catch (error) {
        console.log(error);
    }
}