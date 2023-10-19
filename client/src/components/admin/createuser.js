import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateUser() {

    let Navigate = useNavigate();
    const initialValues = {
        username: "",
        email: "",
        password: "",
        role: "",
    };

    // Validating the inputs:
    const validationSchema = Yup.object().shape({
        username: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().required(),
        role: Yup.string().required(),
    });

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/users", data).then((response) => {
            Navigate("/admin/users");
        });
    };

    return (
        <div className='createPostPage'>
            <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            > 
                <Form className='formContainer'>
                    <label>Username: </label>
                    <ErrorMessage name="username" component="span"/>
                    <Field autocomplete="off" id="inputCreatePost" name="username" placeholder="(Ex.username...)" />
                    <label>Email: </label>
                    <ErrorMessage name="email" component="span"/>
                    <Field autocomplete="off" id="inputCreatePost" name="email" placeholder="(Ex.email...)" />
                    <label>Password: </label>
                    <ErrorMessage name="password" component="span"/>
                    <Field autocomplete="off" id="inputCreatePost" name="password" placeholder="(Ex.password...)" />
                    <label>Role: </label>
                    <ErrorMessage name="role" component="span"/>
                    <Field autocomplete="off" id="inputCreatePost" name="role" placeholder="(Ex.role...)" />
                    <center><button type="submit">Add User</button></center>
                    <center><button onClick={()=> Navigate("../admin/users")}>Back</button></center>
                </Form>
            </Formik>
        </div>
    )
}

export default CreateUser;