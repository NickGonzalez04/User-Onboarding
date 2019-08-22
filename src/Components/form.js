import React from 'react';
import {withFormik, Form, Field} from "formik";

function NewUserForm {
    return (
        <Form>
            <Field type="text" name="username" placeholder="Username" />
            <Field type="password" name="password" placeholder="Password" />
            <Field type="email" name="email" placeholder="Email" />
           <button>Submit</button>

           <label>
           <Field type="checkbox" name="tos" checked={values.tos} />
           </label>
        </Form>
    );
}
const FormikNewUserForm = withFormik({
    mapPropsToValues({username, password, tos}){
        return{
            email: email || "",
            password: password || "",
            tos: tos || false
        };
    }
})
export default NewUserForm;