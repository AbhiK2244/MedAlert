import * as yup from "yup";

export const userProfileSchema = yup.object().shape({
  // Personal Details
  fullName: yup.string().required("Full name is required"),
  age: yup
  .number()
  .typeError("Age must be a number") 
  .integer("Age must be an integer")
  .positive("Age should be positive")
  .required("Age is required"),
  gender: yup.string().required("Gender is required"),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),

  // Current Health
  height: yup
    .number()
    .required("Height is required")
    .typeError("Height must be a number")
    .positive("Height should be positive"),
  weight: yup
    .number()
    .typeError("Weight must be a number")
    .positive("Weight should be positive")
    .required("Weight is required"),
  bpLevel: yup.string().required("Blood pressure level is required"),
  sugarLevel: yup.string().required("Sugar level is required"),

  // Optional fields
  medications: yup.string().optional(),
  additionalDetails: yup.string().optional(),
  allergies: yup.string().optional(),
});
