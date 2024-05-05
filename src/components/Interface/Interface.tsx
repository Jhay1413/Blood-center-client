
export interface AddingPatientInfo {
    firstName: string;
    lastName: string;
    sex: string;
    age: number | '';
    contactNumber: number | '';
    address: string;
   
}
export interface AddingPatientInfoWithUserRoles {
    firstName: string;
    lastName: string;
    sex: string;
    age: number | '';
    contactNumber: number | '';
    address: string;
   
}
export interface AddingPatientRequestInfo{
    _id:string,
    firstName:string,
    lastName:string,
    sex:string,
    age:number | '',
    contactNumber:number | '',
    address:string,
    bloodType:string,
    physician: string
}
export type PatientInfo = {
    _id:string,
    firstName : string,
    lastName : string,
    sex: string,
    age: number |'',
    contactNumber: number | '',
    address: string,
}
export type PatientInfoArray = PatientInfo[] | null

export type PhysicianInfo = {
    contactNumber: string;
    firstName: string;
    lastName: string;
    sex:string;
    assignedAt:string;
    _id: string;
}
export type addingPhysicianInfo = {
    contactNumber: string;
    firstName: string;
    lastName: string;
    sex:string;
    assignedAt:string;
    email:string;
    password:string;
    userRoles:string;
}
export type physicianInfoArray = PhysicianInfo[] | null

export type PatientRequestValues = {
    _id:string
    bloodType : string ,
    bucket: string ,
    fileKey: string,
    patient : PatientInfo,
    physician:PhysicianInfo,
    approvedBy:HealthCenterInfo
    Date :string | "",
    status : string | ""
} 
export type PatientRequestInfo = PatientRequestValues[] | null

export type AccountInfo = {
    _id:string,
    email:string,
    password:string,
    userRoles:string,
    userId:string
}
export type AccountArray = AccountInfo[] | null

export type PreHealthCenterInfo = {
   
    name : string,
    address:string,
    contact:string,
    bloodTypeInventory: {
        A_positive:number | null | undefined
        A_negative:number | null | undefined
        B_positive:number | null | undefined
        B_negative:number | null | undefined
        AB_positive:number | null | undefined
        AB_negative:number | null | undefined
        O_positive:number | null | undefined
        O_negative:number | null | undefined
    },
}
export type HealthCenterInfo = {
    _id:string
    name : string,
    address:string,
    contact:string,
    bloodTypeInventory: {
        A_positive:number | null | undefined
        A_negative:number | null | undefined
        B_positive:number | null | undefined
        B_negative:number | null | undefined
        AB_positive:number | null | undefined
        AB_negative:number | null | undefined
        O_positive:number | null | undefined
        O_negative:number | null | undefined
    },
}
export type healthCenterInfoArray = HealthCenterInfo[]| null

export type preHealthCenterAccount = {
    email: string | "";
    password: string | "";
    confirmPassword: string | "";
    userRoles: string
    userId: string
}
export type postHealthCenterAccount = {
    _id: string
    email: string | "";
    password: string | "";
    userRoles: string
    userId: string
}
export type HealthCenterAccountArray = postHealthCenterAccount [] | null

export type preDonorInfo = {
  
    firstName:string,
    lastName:string,
    contactNumber:string,
    address: string,
    age: number | "",
    sex:string,
    DOB:string,
    bloodType:string,
    email: string,
    password: string,
    confirmPassword: string,
}
export type postDonorInfo = {
    _id:string,
    firstName:string,
    lastName:string,
    contactNumber:string,
    address: string,
    age: number | "",
    sex:string,
    DOB:string,
    bloodType:string,
}

export type DonorInfoArray = postDonorInfo [] | null

export type preActivityInfo = {
    activity:string
    dateFrom:string,
    dateTo:string,
    time:string
    status:string
    address:string
    location:{
        latitude:number | ""
        longitude:number | ""
    }
    bloodCenter:string
}
export type postActivityInfo = {
    _id:string,
    dateFrom:string,
    dateTo:string,
    time:string
    status:string
    location:{
        latitude:number | ""
        longitude:number | ""
    }
    bloodCenter:HealthCenterInfo
}
export type ActivityInfoArray = postActivityInfo[] | null

export type DonationInfo = {
    donor:string,
    bloodType:string,
    quantity:string,
    date:string,
    bloodCenter:string
}
export type postDonationInfo = {
    _id:string,
    donor:postDonorInfo,
    bloodType:string,
    quantity:string,
    date:string,
    bloodCenter:HealthCenterInfo
}
export type DonationInfoArray = postDonationInfo[] | null