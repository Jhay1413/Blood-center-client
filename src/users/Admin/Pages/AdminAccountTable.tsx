import { Table } from "antd";
import { useState } from "react";
import RegisterCenterModal from "../Modal/AddNewCenterAccount";
import { useQueryClient } from "@tanstack/react-query";
import { AccountArray, HealthCenterAccountArray, healthCenterInfoArray } from "../../../components/Interface/Interface";
import { IoAddSharp } from "react-icons/io5";
import AddPhysicianForm from "../Modal/AddPhysicianForm";



const AdminAccountPage = () => {
  const queryClient = useQueryClient();
  const healthCenterData = queryClient.getQueryData<healthCenterInfoArray>(['healthCenterInfo']);
  const healthCenterAccount = queryClient.getQueryData<HealthCenterAccountArray>(['healthCenterAccount']);
  const doctorAccount = queryClient.getQueryData<AccountArray>(['physicianAccounts']);
  const [tableValue, setTableValue] = useState<String>("DoctorTable")
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isDocModalOpen,setIsDocModalOpen] = useState<boolean>(false)
  //TABLE COLUMNS
  const healthCenterColumns = [

    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Password',
      dataIndex: 'password',
      key: 'password',
    }



  ];
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTableValue(event.target.value)
  }
  const cancelModal = () => {
    setIsModalOpen(!isModalOpen)
  }
  const cancelDocModal = () => {
    setIsDocModalOpen(!isDocModalOpen)
  }

  return (
    <>
      <div className="pt-2 pb-7">
        <select className="p-2" onChange={handleSelectChange}>
          <option value="DoctorTable">Doctor Accocunt</option>
          <option value="CenterTable">Center Accocunt</option>
        </select>
      </div>
      {tableValue == "DoctorTable" &&
        <div className="w-full p-4 flex-col h-full flex bg-white shadow-md">
          <div className="flex pb-4 flex-col space-y-4">
            <div className="w-full flex justify-between">
              <div className="w-full ">
                <h1 className="text-xl">Doctors Accounts</h1>
              </div>
              

            </div>

            <div className="w-full">

            </div>
          </div>
          <div className="flex w-full">
            <Table columns={healthCenterColumns} dataSource={doctorAccount?.map((account) => ({ ...account, key: account._id }))} className="w-full overflow-scroll" />
            
          </div>
        </div>
      }
      {tableValue == "CenterTable" &&
        <div className="w-full p-4 flex-col h-full flex bg-white shadow-md">
          <div className="flex pb-4 flex-col space-y-4">
            <div className="w-full flex justify-between">
              <div className="w-full ">
                <h1 className="text-xl">Blood Center Accounts</h1>
              </div>
              <div className="w-full flex justify-end">

                <button className="p-2 text-white flex items-center justify-center bg-blue-500" onClick={() => setIsModalOpen(true)}>
                  <div className="text-3xl"><IoAddSharp /></div>
                  <div className="text-md">Add Account</div>
                </button>
              </div>

            </div>

            <div className="w-full">

            </div>
          </div>
          <div className="flex w-full">
            <Table columns={healthCenterColumns} dataSource={healthCenterAccount?.map((accocunt) => ({ ...accocunt, key: accocunt?._id }))} className="w-full overflow-scroll" />
          </div>
          <RegisterCenterModal isModalOpen={isModalOpen} onClose={cancelModal} datalist={healthCenterData} />
        </div>

      }

    </>
  );
}

export default AdminAccountPage;