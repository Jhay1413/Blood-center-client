import axios from 'axios'
const RequestApi = import.meta.env.VITE_ADMIN_API_REQUESTROUTES
export const getAllPatientRequest = async()=>{
    try {
        const response = await axios.get(`${RequestApi}/getAllRequest`);
        return response.data
    } catch (error) {
        return error
    }
}
export const downloadRequestFile = async (id:string)=>{
    try {
        const response = await axios.get(`${RequestApi}/downloadRequestFile/${id}`, {
            responseType: 'blob', // Ensure the response is treated as binary data
          });
          if(response){
            const suggestedFilename = response.headers['x-suggested-filename']
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', suggestedFilename); //or any other extension
            document.body.appendChild(link);
            link.click();
          }
       
          return response
    } catch (error) {
        console.log(error)
    }
}
export const approveRequestAPI = async(id:string,userId:string)=>{
    try {
       
        const response = await axios.put(`${RequestApi}/approvedRequest/${id}`,{userId});
        return response
    } catch (error) {
        return error
    }
}