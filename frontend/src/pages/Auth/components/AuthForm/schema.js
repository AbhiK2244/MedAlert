import * as yup from "yup";

export const signupSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required"),

  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format")
    .test(
      "domain",
      "Email must have a valid domain (e.g., gmail.com)",
      (value) => {
        if (!value) return false;
        // Check that email contains '@' and a domain with at least one dot
        return /^[^@]+@[^@]+\.[^@]+$/.test(value);
      }
    ),

  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
});

export const signinSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format")
    .test(
      "domain",
      "Email must have a valid domain (e.g., gmail.com)",
      (value) => {
        if (!value) return false;
        // Check that email contains '@' and a domain with at least one dot
        return /^[^@]+@[^@]+\.[^@]+$/.test(value);
      }
    ),

  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
});