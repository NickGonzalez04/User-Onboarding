import React from 'react';
import {withFormik, Form, Field} from "formik";
import * as yup from "yup";

function NewUserForm {
    return (
        <Form>
            <Field type="text" name="username" placeholder="Username" />
            <Field type="email" name="email" placeholder="Email" />
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

    })
})(NewUserForm);
export default FormikNewUserForm;