import * as yup from 'yup';

export const SourceSchema = yup.object().shape({
  name: yup.string().required('Supplier name is required'),
  taxCode: yup.string().required('Tax code is required'),
  address: yup.string().required('Address is required'),
  phoneNumber: yup.string().required('Phone number is required'),
  email: yup.string()
    .required('Email is required')
    .email('Invalid email format'),
  link: yup.string()
    .url('Invalid URL format')
    .nullable()
    .notRequired()
});