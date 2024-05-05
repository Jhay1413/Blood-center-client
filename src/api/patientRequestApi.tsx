import axios from 'axios'

const RequestApi = import.meta.env.VITE_API_REQUESTROUTES
export const addNewRequest = async (data:FormData)=>{
    try {
        const response = await axios.post(`${RequestApi}/addNewRequest`, data,{
            headers:{
                'Content-Type':'multipart/form-data'
                }
            });
        return response;
    } catch (error) {
        console.log(error)
    }

}
export const getRequestByPhysicianId = async (id:string)=>{
    try {
        const response = await axios.get(`${RequestApi}/getAllRequest/${id}`);
        return response
    } catch (error) {
        
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
export const deleteRequest = async (id:string)=>{
    try {
        const response = await axios.delete(`${RequestApi}/deleteRequest/${id}`);
        return response;
    } catch (error) {
        console.log(error);
    }
}