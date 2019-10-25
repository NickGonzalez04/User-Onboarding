import React, {useState, useEffect} from 'react';
import {withFormik, Form, Field} from "formik";
import * as yup from "yup";
import axios from "axios";

const NewUserForm = ({values, errors, touched, status}) =>{
    const [users, setUsers] = useState([]);
        console.log("this is touched", touched);
        useEffect(()=>{
            if (status) {
                console.log(status);
                setUsers([...users, status]);
            }
        }, [status]);

    return (
        <div className="User-form">
        <h1>New User Form</h1>
        <Form>
            <Field type="text" name="username" placeholder="Username" />
            {/* error-reporting */}
            {touched.email && errors.email && <p>{errors.email}</p>} 
            <Field type="email" name="email" placeholder="Email" />
             {/* error-reporting */}
             {touched.password && errors.password && <p>{errors.password}</p>} 
            <Field type="password" name="password" placeholder="Password" />

            <label className="age-approval-box">
           <h6>Check if you're 18 years or older:</h6>
            {/* error-reporting */}
            {touched.agecheckbox && errors.agecheckbox && <p>{errors.agecheckbox}</p>}
           <Field className="check" type="checkbox" name="agecheckbox" checked={values.agecheckbox} />
           </label>
        

            <Field component="select" className="gender" name="gender">
                <option>Selector Gender</option>
                <option value="Male">Male</option>
                <option value="Female ">Female </option>
                <option value="Optional">Other</option>
            </Field>
            <Field component="select" className="position" name="role">
                <option>Selection A Position</option>
                <option value="Web Developer">Web Developer</option>
                <option value="Full Stack Developer ">Full Stack Developer </option>
                <option value="Data Scientist">Data Scientist</option>
            </Field>
            <Field component="textarea" className="textbox" type="text"  name="notes"  placeholder="Reason for becoming a user...."/>
           <button>Submit</button>
           <label className="check-box">
           <h3>Agree To Terms Of Service</h3>
            {/* error-reporting */}
            {touched.checkbox && errors.checkbox && <p>{errors.checkbox}</p>}
           <Field className="check" type="checkbox" name="checkbox" checked={values.checkbox} />
           </label>
        </Form>
        <div className="user-container">
            {users.map(user => {
                return (
                    <div className="role-box" key={user.data.id}>
                        <p>{user.data.username}</p>
                        <p>{user.data.email}</p>
                        <p>{user.data.role}</p>
                    </div>
                )
            })}
        </div>
        </div>
    );
};
const FormikNewUserForm = withFormik({
    mapPropsToValues({username, password, email, checkbox}){
        return{
            username: username || "",
            password: password || "",
            email: email || "",
            checkbox: checkbox || false
        };
    },

    validationSchema: yup.object().shape({
        email: yup.string()
        .email("Email is not valid")
        .required("**Email is required**"),
        password: yup.string()
        .min(8, "Password must be a minimum of 8 characters or longer")
        .required("**Password is required**"),

    }),
    handleSubmit(values, {resetForm, setErrors, setStatus}) {
        if (values.email == "waffle@syrup.com"){
            setErrors({email: "That email is already taken"}); 
        } else {
            axios
            .post("https://reqres.in/api/users", values)
            .then(res =>{
                console.log(res);
                resetForm();
                setStatus(res);
                
            })
            .catch(err => {
                console.log(err);
               
            });
        }
        console.log(values);
    }
})(NewUserForm);
export default FormikNewUserForm;