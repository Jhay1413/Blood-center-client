import { Modal, Table } from "antd";
import { DonationInfoArray, HealthCenterInfo } from "../../../components/Interface/Interface";
import { useQueryClient } from "@tanstack/react-query";

type Props ={
    isModalOpen:boolean
    onClose:()=>void
    data:HealthCenterInfo | null | undefined
}

const StocksModal = ({isModalOpen,onClose,data}:Props) => {
    const datasource = [{data}]
   
    const queryClient = useQueryClient();
    const donationData = queryClient.getQueryData<DonationInfoArray>(['donationList']);
   
    const filteredDonation = donationData?.filter(datas=>datas.bloodCenter._id === data?._id);

    const oPositive =filteredDonation?.filter(donor => donor.bloodType === 'O+');
    const oNegative =filteredDonation?.filter(donor => donor.bloodType === 'O-');
    const aPositive=filteredDonation?.filter(donor => donor.bloodType === 'A+');
    const aNegative =filteredDonation?.filter(donor => donor.bloodType === 'A-');
    const bPositive =filteredDonation?.filter(donor => donor.bloodType === 'B+');
    const bNegative =filteredDonation?.filter(donor => donor.bloodType === 'B-');
    const abPositive =filteredDonation?.filter(donor => donor.bloodType === 'AB+');
    const abNegative =filteredDonation?.filter(donor => donor.bloodType === 'AB-');

   
    const columns = [
        {
            title: 'A Positive',
            dataIndex: 'bloodTypeInventory',
            key: 'A_positive',
            render: (() =>aPositive?.reduce((sum, item) => sum +  parseInt(item.quantity, 10), 0))
        },
        
        {
            title: 'A Negative',
            dataIndex: 'bloodTypeInventory',
            key: 'A_negative',
            render: (() =>aNegative?.reduce((sum, item) => sum +  parseInt(item.quantity, 10), 0))
        },
        {
            title: 'B Positive',
            dataIndex: 'bloodTypeInventory',
            key: 'B_positive',
            render: (() =>bPositive?.reduce((sum, item) => sum +  parseInt(item.quantity, 10), 0))
        },
        {
            title: 'B Negative',
            dataIndex: 'bloodTypeInventory',
            key: 'B_negative',
            render: (() =>bNegative?.reduce((sum, item) => sum +  parseInt(item.quantity, 10), 0))
        },
        {
            title: 'AB Positive',
            dataIndex: 'bloodTypeInventory',
            key: 'AB_positive',
            render: (() =>abPositive?.reduce((sum, item) => sum +  parseInt(item.quantity, 10), 0))
        },
        {
            title: 'AB Negative',
            dataIndex: 'bloodTypeInventory',
            key: 'AB_negative',
            render: (() =>abNegative?.reduce((sum, item) => sum +  parseInt(item.quantity, 10), 0))
        },
        {
            title: 'O Positive',
            dataIndex: 'bloodTypeInventory',
            key: 'O_positive',
            render: (() =>oPositive?.reduce((sum, item) => sum +  parseInt(item.quantity, 10), 0))
        },
        {
            title: 'O Negative',
            dataIndex: 'bloodTypeInventory',
            key: 'O_negative',
            render: (() =>oNegative?.reduce((sum, item) => sum +  parseInt(item.quantity, 10), 0))
        },
    ]
    return ( 
        <>
            <Modal open={isModalOpen} onCancel={onClose} width='80%' footer={null}>
            <h1 className="text-2xl font-bold p-4">Heealth Center Information</h1>
                    <div className="grid grid-rows-3 p-4 gap-4 w-full">
                        
                        <div className=" grid grid-cols-4 gap-4">
                           
                            <input type="text" value={data?.name} className="col-span-2 p-2" placeholder="Firstname" disabled/>
                            <input type="text" value={data?.contact} className="p-2" placeholder="Lastname" disabled/>
                            <input type="text" value={data?.address} className="col-span-2 p-2" placeholder="Age" disabled/>
                           
                        </div>
                        <div className="row-span-2 min-w-full">
                              <h1 className="text-2xl font-bold p-4">Blood Inventory</h1>
                              <div className="max-w-full overflow-x-auto">
                                <Table  columns={columns} dataSource = {datasource.map((data)=>({...data.data,key:data.data?._id}))} className="w-full overflow-scroll"/>
                            </div>
                    
                        </div>
                    </div>
            </Modal>    
        

        </>
     );
}
 
export default StocksModal;