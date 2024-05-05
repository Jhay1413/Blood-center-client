
import * as Yup from 'yup';

export const validationSchemaForAdding = Yup.object({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    sex: Yup.string(),
    age: Yup.number().positive('Age must be positive').integer('Age must be an integer'),
    contactNumber: Yup.string(),
    address: Yup.string(),
 
  });

  export const validationSchemaForEditing = Yup.object({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    sex: Yup.string(),
    age: Yup.number().positive('Age must be positive').integer('Age must be an integer'),
    contactNumber: Yup.string(),
    address: Yup.string(),
   
  });

  export const validationSchemaForRequest = Yup.object({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    sex: Yup.string().required('Sex is required'),
    age: Yup.number().positive('Age must be positive').integer('Age must be an integer'),
    contactNumber: Yup.string().required('Contact Number is required'),
    address: Yup.string().required('Address is required'),
    bloodType:Yup.string().required('BloodType is required')
  });