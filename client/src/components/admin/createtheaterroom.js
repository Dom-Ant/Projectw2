import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateTheaterRoom() {

    let navigate = useNavigate();
    const initialValues = {
        name: "",
        seat_capacity: "",
        venue_id: "",
    };

    // Validating the inputs:
    const validationSchema = Yup.object().shape({
        name: Yup.string().required(),
        seat_capacity: Yup.string().required(),
        venue_id: Yup.number().required().positive().integer(),
    });

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/theaterrooms", data).then((response) => {
            navigate("/admin/theaterrooms");
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
                    <label>Name: </label>
                    <ErrorMessage name="name" component="span"/>
                    <Field autocomplete="off" id="inputCreatePost" name="name" placeholder="(Ex.Theater...)" />
                    <label>Seat Capacity: </label>
                    <ErrorMessage name="seat_capacity" component="span"/>
                    <Field autocomplete="off" id="inputCreatePost" name="seat_capacity" placeholder="(Ex.20...)" />
                    <label>Venue ID: </label>
                    <ErrorMessage name="venue_id" component="span"/>
                    <Field autocomplete="off" id="inputCreatePost" name="venue_id" placeholder="(Ex.1...)" />
                    <center><button type="submit">Add Theater Room</button></center>
                    <center><button onClick={()=> navigate("../admin/theaterrooms")}>Back</button></center>
                </Form>
            </Formik>
        </div>
    )
}

export default CreateTheaterRoom;