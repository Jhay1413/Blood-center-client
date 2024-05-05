import { Button, Input, Space, Table } from "antd";
import HealthCenterModal from "../Modal/AddHealthCenter";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { HealthCenterInfo, healthCenterInfoArray } from "../../../components/Interface/Interface";
import StocksModal from "../Modal/StocksModal";
import { IoAddSharp } from "react-icons/io5";


const AdminCenterPage = () => {
  const queryClient = useQueryClient();
  const healthCenterData = queryClient.getQueryData<healthCenterInfoArray>(['healthCenterInfo']);
  const [isModalOpen,setIsModalOpen] = useState(false);
  const [isModalStockOpen,setIsModalStockOpen] = useState(false);
  const [selectedData,setSelectedData] = useState<HealthCenterInfo>()
  const [searchedData,setSearchData] = useState("");

  const cancelModal = () =>{
    setIsModalOpen(!isModalOpen)
  }
  const cancelStockModal = () =>{
    setIsModalStockOpen(!isModalStockOpen)
  }
   
    //TABLE COLUMNS
      const columns = [
   
        {
          title: ' Name',
          dataIndex: 'name',
          key: 'name',
          filteredValue: [searchedData],
          onFilter:(value:any,record:any)=>{
          return (
            String(record.name)
            .toLowerCase()
            .includes(value.toLowerCase()))
        }
        
        },
        {
          title: 'Contact Number',
          dataIndex: 'contact',
          key: 'contact',
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title : 'Actions',
          dataIndex : 'actions',
          key:'actions',
          render: (text:string,record:HealthCenterInfo)=>(
            <Space size="middle">
              <Button onClick={()=>handleSelectData(record)}>View Stocks</Button>
              <Button type="primary" danger key ={text} disabled>Delete</Button>
            </Space>
    
          )
        }
      ];
      const handleSelectData = (record:HealthCenterInfo) =>{
        setSelectedData(record)
        setIsModalStockOpen(!isModalStockOpen)
      }

    
    return ( 
        <>
            <div className="w-full p-4 flex-col h-full flex bg-white shadow-md">
                <div className="flex pb-4 flex-col space-y-4">
                    <div className="w-full flex justify-between">
                      <div className="w-full ">
                        <h1 className="text-xl">List of Blood Center</h1>
                      </div>
                      <div className="w-full justify-center items-center flex">
                        <Input.Search 
                          placeholder='searchbox'
                          onChange={(e)=>{
                            setSearchData(e.target.value.toLowerCase());
                          }}
                          className='md:w-52 p-2'
                        />
                      </div>
                      <div className="w-full flex justify-end">
                        <button className="p-2 bg-violet-500 w-42 rounded-md text-white flex justify-center items-center space-x-2" onClick = {cancelModal}>
                                <div className="text-3xl"><IoAddSharp /></div>
                                <div className="text-md">Add Center</div>
                            </button>
                      </div>
                    
                    </div>
                  
                  
                </div>
                <div className="flex w-full">
                    <Table  columns={columns} dataSource={ healthCenterData?.map((healthCenter)=>({...healthCenter,key:healthCenter?._id}))} className="w-full overflow-scroll "/>
                </div>
            </div>
            <HealthCenterModal isModalOpen={isModalOpen} onClose={cancelModal}/>
            <StocksModal isModalOpen={isModalStockOpen} onClose={cancelStockModal} data ={selectedData} />
        </>
     );
}
 
export default AdminCenterPage;