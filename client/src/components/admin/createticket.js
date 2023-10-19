import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateTicket() {

    let navigate = useNavigate();
    const initialValues = {
        showtime_id: "",
        ticket_price: "",
        seat_number: "",
        user_id: "",
        payment_status: "",
    };

    // Validating the inputs:
    const validationSchema = Yup.object().shape({
        showtime_id: Yup.string().required(),
        ticket_price: Yup.string().required(),
        seat_number: Yup.string().required(),
        user_id: Yup.string().required(),
        payment_status: Yup.string().oneOf(['Paid', 'Available'], 'Invalid payment status').required(),
    });

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/tickets", data).then((response) => {
            navigate("/admin/tickets");
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
                    <label>Showtime id: </label>
                    <ErrorMessage name="showtime_id" component="span"/>
                    <Field autocomplete="off" id="inputCreatePost" name="showtime_id" placeholder="(Ex.1...)" />
                    <label>Ticket price: </label>
                    <ErrorMessage name="ticket_price" component="span"/>
                    <Field autocomplete="off" id="inputCreatePost" name="ticket_price" placeholder="(Ex.12...)" />
                    <label>Seat number: </label>
                    <ErrorMessage name="seat_number" component="span"/>
                    <Field autocomplete="off" id="inputCreatePost" name="seat_number" placeholder="(Ex.5...)" />
                    <label>User id: </label>
                    <ErrorMessage name="user_id" component="span"/>
                    <Field autocomplete="off" id="inputCreatePost" name="user_id" placeholder="(Ex.1...)" />
                    <label>Payment Status: </label>
                    <ErrorMessage name="payment_status" component="span"/>
                    <Field autocomplete="off" id="inputCreatePost" as="select" name="payment_status">
                        <option value="" label="Select status" />
                        <option value="Paid" label="Paid" />
                        <option value="Available" label="Available" />
                    </Field>
                    <center><button type="submit">Add Ticket</button></center>
                    <center><button onClick={()=> navigate("../admin/tickets")}>Back</button></center>
                </Form>
            </Formik>
        </div>
    )
}

export default CreateTicket;