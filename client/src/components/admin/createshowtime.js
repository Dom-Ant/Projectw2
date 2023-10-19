import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateShowtime() {

    let navigate = useNavigate();
    const initialValues = {
        movie_id: "",
        room_id: "",
        show_date: "",
        show_time: "",
    };

    // Validating the inputs:
    const validationSchema = Yup.object().shape({
        movie_id: Yup.string().required(),
        room_id: Yup.string().required(),
        show_date: Yup.string().required(),
        show_time: Yup.string().required(),
    });

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/showtimes", data).then((response) => {
            navigate("/admin/showtimes");
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
                    <label>movie_id: </label>
                    <ErrorMessage name="movie_id" component="span"/>
                    <Field autocomplete="off" id="inputCreatePost" name="movie_id" placeholder="(Ex.1...)" />
                    <label>room_id: </label>
                    <ErrorMessage name="room_id" component="span"/>
                    <Field autocomplete="off" id="inputCreatePost" name="room_id" placeholder="(Ex.1...)" />
                    <label>show_date: </label>
                    <ErrorMessage name="show_date" component="span"/>
                    <Field autocomplete="off" id="inputCreatePost" name="show_date" placeholder="(Ex.2024-01-01...)" />
                    <label>show_time: </label>
                    <ErrorMessage name="show_time" component="span"/>
                    <Field autocomplete="off" id="inputCreatePost" name="show_time" placeholder="(Ex.16:00...)" />
                    <center><button type="submit">Add Showtime</button></center>
                    <center><button onClick={()=> navigate("../admin/showtimes")}>Back</button></center>
                </Form>
            </Formik>
        </div>
    )
}

export default CreateShowtime;