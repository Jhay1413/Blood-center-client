import { FaArrowRightToBracket } from 'react-icons/fa6';
import { IoMdApps,IoIosList} from 'react-icons/io';
import { getDocData } from '../context/DocDataContext';
import { IoNotificationsSharp } from 'react-icons/io5';


interface HeaderPageProps{
    
    onClick : ()=> void;
}
const DoctorHeaderPage = ({onClick}:HeaderPageProps) => {
 
  

    return ( 
        <>
            <div className="w-full flex text-2xl flex flex-row justify-between">
                <div className="w-full flex justify-start items-center w-full text-gray-700 text-2xl">
                    <div className="px-2 py-2 lg:hidden">
                        <button className='flex items-center ' onClick={onClick} >
                            <IoIosList/>
                        </button>
                        
                    </div>
                 
                </div>
                <div className="w-full flex flex-row justify-end items-center space-x-4">
           
                <IoMdApps/>
                <button><IoNotificationsSharp /></button>

                </div>
          
          
           </div>
        </>
     );
}
 
export default DoctorHeaderPage;