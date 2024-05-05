import { useQueryClient } from "@tanstack/react-query";

import { DonationInfoArray } from "../../../components/Interface/Interface";
import { useAuth } from "../../../components/AuthContenxt/AuthContext";

const BloodInventory = () => {
    const{authContext} = useAuth();
    const userId = authContext?.userId || '';
    
    const queryClient = useQueryClient();
    const donationData = queryClient.getQueryData<DonationInfoArray>(['donationList']);
    const filteredDonation = donationData?.filter(data=>data.bloodCenter._id === userId);
    const oPositive =filteredDonation?.filter(donor => donor.bloodType === 'O+');
    const oNegative =filteredDonation?.filter(donor => donor.bloodType === 'O-');
    const aPositive=filteredDonation?.filter(donor => donor.bloodType === 'A+');
    const aNegative =filteredDonation?.filter(donor => donor.bloodType === 'A-');
    const bPositive =filteredDonation?.filter(donor => donor.bloodType === 'B+');
    const bNegative =filteredDonation?.filter(donor => donor.bloodType === 'B-');
    const abPositive =filteredDonation?.filter(donor => donor.bloodType === 'AB+');
    const abNegative =filteredDonation?.filter(donor => donor.bloodType === 'AB-');

 


    console.log(abPositive);
    return ( 
        <>
             <div className="w-full grid grid-cols-4  gap-4 min-h-max text-gray-400 ">
                <div className="flex bg-white shadow-md rounded-md flex-col p-2 h-40">
                    <div className="w-full p-4 flex justify-between items-center">
                            <div className="text-lg">
                                <h1>Total</h1>
                            </div>
                            <div className="text-xl p-2 rounded-xl text-red-500 font-bold">
                                <h1>{oNegative?.reduce((sum, item) => sum +  parseInt(item.quantity, 10), 0)}</h1>
                            </div>
                    </div>
                    <div className="items-center justify-center flex text-4xl">
                            <h1>O-</h1>
                    </div>
                </div>
                <div className="flex bg-white shadow-md rounded-md flex-col p-2 h-40">
                    <div className="w-full p-4 flex justify-between items-center">
                            <div className="text-lg">
                                <h1>Total</h1>
                            </div>
                            <div className="text-xl p-2 rounded-xl text-red-500 font-bold">
                            <h1>{oPositive?.reduce((sum, item) => sum +  parseInt(item.quantity, 10), 0)}</h1>
                            </div>
                    </div>
                    <div className="items-center justify-center flex text-4xl">
                            <h1>O+</h1>
                    </div>
                </div>
                <div className="flex bg-white shadow-md rounded-md flex-col p-2 h-40">
                    <div className="w-full p-4 flex justify-between items-center">
                            <div className="text-lg">
                                <h1>Total</h1>
                            </div>
                            <div className="text-xl p-2 rounded-xl text-red-500 font-bold">
                            <h1>{aNegative?.reduce((sum, item) => sum +  parseInt(item.quantity, 10), 0)}</h1>
                            </div>
                    </div>
                    <div className="items-center justify-center flex text-4xl">
                            <h1>A-</h1>
                    </div>
                </div>
                <div className="flex bg-white shadow-md rounded-md flex-col p-2 h-40">
                    <div className="w-full p-4 flex justify-between items-center">
                            <div className="text-lg">
                                <h1>Total</h1>
                            </div>
                            <div className="text-xl p-2 rounded-xl text-red-500 font-bold">
                            <h1>{aPositive?.reduce((sum, item) => sum +  parseInt(item.quantity, 10), 0)}</h1>
                            </div>
                    </div>
                    <div className="items-center justify-center flex text-4xl">
                            <h1>A+</h1>
                    </div>
                </div>
                <div className="flex bg-white shadow-md rounded-md flex-col p-2 h-40">
                    <div className="w-full p-4 flex justify-between items-center">
                            <div className="text-lg">
                                <h1>Total</h1>
                            </div>
                            <div className="text-xl p-2 rounded-xl text-red-500 font-bold">
                            <h1>{bNegative?.reduce((sum, item) => sum +  parseInt(item.quantity, 10), 0)}</h1>
                            </div>
                    </div>
                    <div className="items-center justify-center flex text-4xl">
                            <h1>B-</h1>
                    </div>
                </div>
                <div className="flex bg-white shadow-md rounded-md flex-col p-2 h-40">
                    <div className="w-full p-4 flex justify-between items-center">
                            <div className="text-lg">
                                <h1>Total</h1>
                            </div>
                            <div className="text-xl p-2 rounded-xl text-red-500 font-bold">
                                <h1>  <h1>{bPositive?.reduce((sum, item) => sum +  parseInt(item.quantity, 10), 0)}</h1></h1>
                            </div>
                    </div>
                    <div className="items-center justify-center flex text-4xl">
                            <h1>B+</h1>
                    </div>
                </div>
                <div className="flex bg-white shadow-md rounded-md flex-col p-2 h-40">
                    <div className="w-full p-4 flex justify-between items-center">
                            <div className="text-lg">
                                <h1>Total</h1>
                            </div>
                            <div className="text-xl p-2 rounded-xl text-red-500 font-bold">
                            <h1>{abNegative?.reduce((sum, item) => sum +  parseInt(item.quantity, 10), 0)}</h1>
                            </div>
                    </div>
                    <div className="items-center justify-center flex text-4xl">
                            <h1>AB-</h1>
                    </div>
                </div>
                <div className="flex bg-white shadow-md rounded-md flex-col p-2 h-40">
                    <div className="w-full p-4 flex justify-between items-center">
                            <div className="text-lg">
                                <h1>Total</h1>
                            </div>
                            <div className="text-xl p-2 rounded-xl text-red-500 font-bold">
                                <h1>{abPositive?.reduce((sum, item) => sum +  parseInt(item.quantity, 10), 0)}</h1>
                            </div>
                    </div>
                    <div className="items-center justify-center flex text-4xl">
                            <h1>AB+</h1>
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default BloodInventory;