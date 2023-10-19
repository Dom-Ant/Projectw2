import React from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Header from '../components/Header';

const RegistrationPage = () => {
    const registrationSchema = Yup.object({
        username: Yup.string().required("Username is required"),
        email: Yup.string().email("Invalid email format").required("Email is required"),
        password: Yup.string().required("Password is required"),
        role: Yup.string().required("Role is required").oneOf(['User', 'Admin', 'Manager'], "Need to select a role"),
    });

    const handleRegister = async (values) => {
        try {
            await axios.post('http://localhost:3001/users/register', values);
            alert('Registration successful. Please login.');
        } catch (error) {
            console.error("Error during registration:", error);
            alert('Error during registration. Please try again.');
        }
    };

    return (
        <>
        <Header />
        <div className="registerContainer">
            <Formik
                initialValues={{ username: '', email: '', password: '', role: '' }}
                validationSchema={registrationSchema}
                onSubmit={handleRegister}
            >
                <Form>
                    <h2>Register</h2>
                    <div className="input-group">
                        <Field name="email" type="text" placeholder="Email" />
                        <ErrorMessage name="email" />
                        <Field name="username" type="text" placeholder="Username" />
                        <ErrorMessage name="username" />
                        <Field name="password" type="password" placeholder="Password" />
                        <ErrorMessage name="password" />
                        <Field name="role" as="select">
                            <option value="" label="Select a role" />
                            <option value="User" label="User" />
                            <option value="Manager" label="Manager" />
                            <option value="Admin" label="Admin" />
                        </Field>
                        <ErrorMessage name="role" />
                    </div>
                    <div className="button-group">
                        <button type="submit">Register</button>
                    </div>
                </Form>
            </Formik>
        </div>
        </>
    );
};

export default RegistrationPage;