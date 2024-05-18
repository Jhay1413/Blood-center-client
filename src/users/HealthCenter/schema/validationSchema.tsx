
import * as Yup from 'yup';

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
   
  });

  export const validationSchemaForRequest = Yup.object({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    sex: Yup.string().required('Sex is required'),
    age: Yup.number().positive('Age must be positive').integer('Age must be an integer'),
    contactNumber: Yup.string().required('Contact Number is required'),
    address: Yup.string().required('Address is required'),
    bloodType:Yup.string().required('BloodType is required'),
    quantity:Yup.string().required('Quantity is required')
  });
  export const validationSchemaForAddingActivity = Yup.object({
    activity: Yup.string().required('activity is required'),
    location: Yup.object().shape({
      latitude: Yup.string().required('Latitude is required'),
      longitude: Yup.string().required('Longitude is required')
    }),
    time: Yup.string().required('time is required'),
    date: Yup.date(),
    status: Yup.string().required('status is required'),

  });