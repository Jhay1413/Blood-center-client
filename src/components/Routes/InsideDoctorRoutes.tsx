import { Route, Routes } from "react-router-dom";
import DocDashboardPage from "../../users/Doctors/Pages/DocDashboard";
import DoctorPageLayout from "../../users/Doctors/Layout/DoctorLayout";
import DocRequestPage from "../../users/Doctors/Pages/DocReqTable";
import DocPatientPage from "../../users/Doctors/Pages/DocPatientTable";
import { DocDataProvider } from "../../users/Doctors/context/DocDataContext";

const  InsideDoctorRoutes = () => {
    return ( 
        <DoctorPageLayout>
            <DocDataProvider>
                <Routes>
                    <Route  path="/" element={<DocDashboardPage/>}/>
                    <Route path="/requestPage" element={<DocRequestPage/>}/>
                    <Route path="/patientPage" element={<DocPatientPage/>}/>
                </Routes>
            </DocDataProvider>
           
        </DoctorPageLayout>
        
     );
}
 
export default InsideDoctorRoutes