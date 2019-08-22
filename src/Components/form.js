import React from 'react';
import {withFormik, Form, Field} from "formik";
import * as yup from "yup";
import axios from "axios";

function NewUserForm ({values, errors, touched}){
    return (
        <Form>
            <Field type="text" name="username" placeholder="Username" />
            {/* error-reporting */}
            {touched.email && errors.email && <p>{errors.email}</p>} 
            <Field type="email" name="email" placeholder="Email" />
             {/* error-reporting */}
             {touched.password && errors.password && <p>{errors.password}</p>} 
            <Field type="password" name="password" placeholder="Password" />
           <button>Submit</button>

           <label>
           <Field type="checkbox" name="tos" checked={values.tos} />
           </label>
        </Form>
    );
}
const FormikNewUserForm = withFormik({
    mapPropsToValues({username, password, email, tos}){
        return{
            username: username || "",
            password: password || "",
            email: email || "",
            tos: tos || false
        };
    },

    validationSchema: yup.object().shape({
        email: yup.string()
        .email("Email is not valid")
        .required("Email is required"),
        password: yup.string()
        .min(8, "Password must be a minimum of 8 characters or longer")
        .required("Password is required")

    }),
    handleSubmit(values, {resetForm, setErrors, setSubmitting}) {
        if (values.email == "alreadytaken@atb,dev"){
            setErrors({email: "That email is already taken"}); 
        } else {
            axios
            .post("https://reqres.in/api/users", values)
            .then(res =>{
                console.log(res);
                resetForm();
                setSubmitting(false);
            })
            .catch(err => {
                console.log(err);
                setSubmitting(false);
            });
        }
        console.log(values);
    }
})(NewUserForm);
export default FormikNewUserForm;