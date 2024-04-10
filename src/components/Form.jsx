import { useForm } from "react-hook-form"
import { DevTool } from '@hookform/devtools'
import { Button, Stack } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import EyeIcon from "../assets/EyeIcon.svg"
import EyeSlash from "../assets/EyeSlash.svg"
import 'react-toastify/dist/ReactToastify.css';
import './Password.css';


const FormContainer = () => {

    const [userData, setUserData] = useState(null);
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const navigate = useNavigate();
    const { userid } = useParams();

    const form = useForm({
        defaultValues: {
            firstName: '',
            lastName:  '',
            email: '',
            password: '',
            confirmPassword: '',
        }
    });


    const { register, control, handleSubmit, setValue, formState, watch, reset } = form;
    const { errors } = formState;

   

    const togglePassword = () => {
        setShowPassword(!showPassword)
    }

    const toggleConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword)
    }

    const addNewUser = async (data) => {
        try {
            await axios.post('http://localhost:8000/users', data);
            toast.success("User added successfully !!");
            reset();
        } catch (error) {
            toast.error(error.response.data);
        }
    }

    const updateUser = async (data, id) => {
        const editData = {
            firstName : data.firstName,
            lastName : data.lastName,
            email: data.email,
            password: data.password,
            confirmPassword: userData.confirmPassword,
        }
        try {
            await axios.put(`http://localhost:8000/users/${id}`, editData);
            toast.success("User updated successfully !!");
            reset();
        } catch (error) {
            toast.error(error.message);
        }
    }

    const onSubmit = (data) => {
        userid ? updateUser(data, userid) : addNewUser(data);
    }

    const handleBackPage = () => {
        navigate(-1);
    }



    useEffect(() => {
        const fetchData = async (id) => {
            try {
                const resp = await axios.get(`http://localhost:8000/users/${id}`);
                setUserData(resp?.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        userid && fetchData(userid);
    }, [userid])

    useEffect(() => {
        if (Object?.entries?.(userData || {}).length) {
            setValue('firstName', userData.firstName)
            setValue('lastName', userData.lastName)
            setValue('email', userData.email);
        }
    }, [userData])

    return (
        <div>
            <h1>react-hook-form</h1>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>

                <div className="form-control">
                    <label htmlFor='firstName'>FirstName</label>
                    <input
                        type='text'
                        id='firstName'
                        {...register("firstName", {
                            required: 'FirstName is required',
                            minLength: {
                                value: 3,
                                message: "FirstName must be at least 3 characters"
                              },
                              maxLength: {
                                value: 10,
                                message: "FirstName cannot exceed 20 characters"
                              }
                            
                        })}
                        value={watch('firstName')}
                    />
                    <p className="error">{errors.firstName?.message}</p>
                </div>

                <div className="form-control">
                    <label htmlFor='lastName'>LastName</label>
                    <input
                        type='text'
                        id='lastName'
                        {...register("lastName", {
                            required: 'LastName is required',
                            minLength: {
                                value: 3,
                                message: "LastName must be at least 3 characters"
                              },
                              maxLength: {
                                value: 10,
                                message: "LastName cannot exceed 20 characters"
                              }
                            
                        })}
                    />
                    <p className="error">{errors.lastName?.message}</p>
                </div>

                <div className="form-control">
                    <label htmlFor='email'>Email</label>
                    <input
                        type='email'
                        id='email'
                        {...register("email", {
                            required: {
                                value: true,
                                message: 'Email is required'
                            },
                            pattern: {
                                value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                message: 'Invalid email format'
                            },
                            // validate: {
                            //     emailAvailable: async (fieldValue) => {
                            //         const response = await fetch(`http://localhost:8000/users?email${fieldValue}`);
                            //         const data = await response.json();
                            //         return data.length === 0  || "Email already exists";
                            //     }
                            // }
                        })}
                    />
                    <p className="error">{errors.email?.message}</p>
                </div>

                <div className="form-control">
                    <label htmlFor='password'>Password</label>
                    <div className="password-input-container">
                        <input
                            type={showPassword ? "text" : "password"}
                            id='password'
                            className="password-input"
                            {...register("password", {
                                required: {
                                    value: true,
                                    message: "Password is must"
                                }
                            })}
                        />
                        <img 
                            src={showPassword ? EyeIcon : EyeSlash} 
                            onClick={togglePassword} 
                            alt="Eye Icon" 
                            className="toggle-password-btn"
                        />
                    </div>
                    <p className="error">{errors.password?.message}</p>
                </div>

                {!userid && <div className="form-control">
                    <label htmlFor='confirmPassword'>Confirm Password</label>
                    <div className="password-input-container">
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            id='confirmPassword'
                            {...register("confirmPassword", {
                                required: {
                                    value: true,
                                    message: "confirmPassword is must"
                                },
                                validate: (value) => {
                                    if (watch('password') != value) {
                                        return "Your passwords do no match";
                                    }
                                }
                            })}
                        />
                        <img 
                            src={showConfirmPassword ? EyeIcon : EyeSlash} 
                            onClick={toggleConfirmPassword} 
                            alt="Eye Icon" 
                            className="toggle-password-btn"
                        />
                    </div>
                    <p className="error">{errors.confirmPassword?.message}</p>
                </div>}

                <Stack spacing={2} direction={'row'}>
                    <Button type="submit" variant="contained" size="small" >
                        Submit
                    </Button>
                    <Button variant="outlined" size="small" onClick={handleBackPage}>
                        Back
                    </Button>
                </Stack>
            </form>
            <ToastContainer />
            {/* <DevTool control={control} /> */}
        </div>
    )
}

export default FormContainer