import * as yup from "yup";


export const signupSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
    email: yup.string().required("is required"),
})
