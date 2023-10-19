import React from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {Link, useNavigate} from 'react-router-dom';
import Header from '../components/Header';
import '../App.css';
import jwtDecode from 'jwt-decode';

const LoginPage = () => {
    const loginSchema = Yup.object({
        username: Yup.string().required("Username is required"),
        password: Yup.string().required("Password is required"),
    });

    const navigate = useNavigate();

    const handleLogin = async (values) => {
        try {
            const response = await axios.post('http://localhost:3001/users/login', values);
            if (response.data.success) {
                alert('Login successful');
                localStorage.setItem('token', response.data.token);

                const userRole = jwtDecode(response.data.token).role;

                if (userRole === 'Admin' || userRole === 'Manager') {
                    navigate('/admin');
                } else if (userRole === 'User') {
                    navigate('/movies');
                } else {
                    alert('Invalid role');
                }
            } else {
                alert('Invalid credentials');
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert('Error during login. Please try again.');
        }
    };

    return (
        <>
        <Header />
        <div className="loginContainer">
            <Formik
                initialValues={{ username: '', password: '' }}
                validationSchema={loginSchema}
                onSubmit={handleLogin}
            >
                <Form>
                    <h2>Login</h2>
                    <div className="input-group">
                        <Field name="username" type="text" placeholder="Username" />
                        <ErrorMessage name="username" />
                        <Field name="password" type="password" placeholder="Password" />
                        <ErrorMessage name="password" />
                    </div>
                    <div className="button-group">
                        <button type="submit">Login</button>
                        <button>
                            <Link to="/register">Register</Link>
                        </button>
                    </div>
                </Form>
            </Formik>
        </div>
        </>
    );
};

export default LoginPage;