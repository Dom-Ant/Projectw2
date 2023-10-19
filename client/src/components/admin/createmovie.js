import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateMovie() {

    let Navigate = useNavigate();
    const initialValues = {
        title: "",
        genre: "",
        duration: "",
        poster_url: "",
        synopsis: "",
    };

    // Validating the inputs:
    const validationSchema = Yup.object().shape({
        title: Yup.string().required(),
        genre: Yup.string().required(),
        duration: Yup.number().min(1).required(),
        poster_url: Yup.string().url('Invalid URL').required(),
        synopsis: Yup.string().required(),
    });

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/movies", data).then((response) => {
            Navigate("/admin/movies");
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
                    <label>Title: </label>
                    <ErrorMessage name="title" component="span"/>
                    <Field autocomplete="off" id="inputCreatePost" name="title" placeholder="(Ex.title...)" />
                    <label>Genre: </label>
                    <ErrorMessage name="genre" component="span"/>
                    <Field autocomplete="off" id="inputCreatePost" name="genre" placeholder="(Ex.action...)" />
                    <label>Duration: </label>
                    <ErrorMessage name="duration" component="span"/>
                    <Field autocomplete="off" id="inputCreatePost" name="duration" placeholder="(Ex.110...)" />
                    <label>Poster URL: </label>
                    <ErrorMessage name="poster_url" component="span"/>
                    <Field autocomplete="off" id="inputCreatePost" name="poster_url" placeholder="(Ex. http://example.com/image.jpg...)" />
                    <label>Synopsis: </label>
                    <ErrorMessage name="synopsis" component="span"/>
                    <Field autocomplete="off" id="inputCreatePost" name="synopsis" placeholder="Brief summary..." />
                    <center><button type="submit">Add Movie</button></center>
                    <center><button onClick={()=> Navigate("../admin/movies")}>Back</button></center>
                </Form>
            </Formik>
        </div>
    )
}

export default CreateMovie;