import { Route, Routes } from "react-router-dom";
import AdminPageLayout from "../../users/Admin/Layout/AdminLayout";
import AdminDashboardPage from "../../users/Admin/Pages/AdminDashboard";
import AdminPatientPage from "../../users/Admin/Pages/AdminPatientTable";
import AdminRequestPage from "../../users/Admin/Pages/AdminRequestTable";
import AdminPhysicianPage from "../../users/Admin/Pages/AdminPhysicianTable";
import AdminCenterPage from "../../users/Admin/Pages/AdminCenterTable";
import AdminAccountPage from "../../users/Admin/Pages/AdminAccountTable";
import {
   
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query'
import AdminDataProvider from "../../users/Admin/Queries/AdminData";

import DonorPage from "../../users/Admin/Pages/DonorPage";
const queryClient = new QueryClient()

const InsideAdminRoutes = () => {
    return ( 
        <AdminPageLayout>
            <QueryClientProvider client={queryClient}>
                <AdminDataProvider>
                    <Routes>
                        <Route path="/" element={<AdminDashboardPage/>}/>
                        <Route path="/patientsPage" element={<AdminPatientPage/>}/>
                        <Route path="/requestsPage" element={<AdminRequestPage/>}/>
                        <Route path="/physicianPage" element={<AdminPhysicianPage/>}/>
                        <Route path="/centersPage" element={<AdminCenterPage/>}/>
                        <Route path="/accountsPage" element={<AdminAccountPage/>}/>
                       
                        <Route path="/donorPage" element={<DonorPage/>}/>
                    </Routes>
                </AdminDataProvider>
                
            </QueryClientProvider>
        </AdminPageLayout>
       
     );
}
 
export default InsideAdminRoutes;