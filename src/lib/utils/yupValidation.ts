import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

// form validation rules with Yup validation schema
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm Password is required"),
  acceptTerms: Yup.bool().oneOf([true], "Accept Ts & Cs is required"),
});

export const formOptions = { resolver: yupResolver(validationSchema) };