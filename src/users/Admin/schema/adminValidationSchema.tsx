
import * as Yup from 'yup';


  export const validationSchemaForPhysician = Yup.object({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    sex: Yup.string(),
    age: Yup.number().positive('Age must be positive').integer('Age must be an integer'),
    contactNumber: Yup.string(),
    assignedAt: Yup.string(),
   
  });

export const validationSchemaForHealthCneter = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    address: Yup.string().required('Address is required'),
    contact: Yup.string().required('Contact is required'),
    
});
export const validationSchemaForRegister = Yup.object({
  email: Yup.string().email('Invalid email address'),
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match'),
});

export const validationSchemaForAdding = Yup.object({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  sex: Yup.string(),
  age: Yup.number().positive('Age must be positive').integer('Age must be an integer'),
  contactNumber: Yup.string(),
  address: Yup.string(),
  DOB: Yup.string(),
  bloodType: Yup.string().required('Blood Type is required'),
  email: Yup.string().email('Invalid email address'),
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match'),
});
export const validationSchemaForEditing = Yup.object({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  sex: Yup.string(),
  age: Yup.number().positive('Age must be positive').integer('Age must be an integer'),
  contactNumber: Yup.string(),
  address: Yup.string(),
  DOB: Yup.string(),
  bloodType: Yup.string().required('Blood Type is required'),
  
});