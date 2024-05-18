"use client";
import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash, FaExclamation } from "react-icons/fa";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, List, ListItem, ListItemText, ListItemIcon, Snackbar, Alert } from '@mui/material';
import { MdCheckCircle } from 'react-icons/md';
import { setLocalStorageItem } from '@/lib/localStorage';


export default function SignUp() {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [hidePassword, setHidePassword] = useState<boolean>(true);
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
    const [alertSeverity, setAlertSeverity] = useState<string>('error');
    const [alertMessage, setAlertMessage] = useState<string>('Error');

    const passwordRules = [
        'At least 8 characters long',
        'Contains at least one uppercase letter (A-Z)',
        'Contains at least one lowercase letter (a-z)',
        'Contains at least one number (0-9)',
        'Contains at least one special character (e.g.!@#$%^&*)'
    ];

    // validate email function
    const validateEmail = () => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    }

    // validate password function
    const validatePassword = () => {
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return re.test(password);
    }

    const generateAlert = (type: string, message: string) => {
        setAlertSeverity(type);
        setAlertMessage(message);
        setOpenSnackbar(true);
    }

    const handleSignUp = () => {
        // make post request to sign up at api/auth/signup
        if (validateEmail()) {

            if (validatePassword()) {

                if (password === confirmPassword) {

                    // make a post request to sign up
                    fetch('/api/auth/signup', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            name,
                            email,
                            password
                        })
                    }).then(data => data.json())
                        .then(res => {
                            if (res.success) {
                                setLocalStorageItem("token", res.data.token);
                                location.href = "/profile";
                            } else {
                                generateAlert('error', res.message);
                            }
                        })
                }
                else {
                    generateAlert('error', 'Passwords do not match');
                }

            } else {
                generateAlert('error', 'Invalid password');
            }
        } else {
            generateAlert('error', 'Invalid email');
        }

    }

    const handleForgotPassword = () => {
        console.log('forgot password');
    }

    // State to control the dialog's open state
    const [open, setOpen] = useState(false);

    // Function to handle opening the dialog
    const handleClickOpen = () => {
        setOpen(true);
    };

    // Function to handle closing the dialog
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setTimeout(() => {
            if (!hidePassword) {
                setHidePassword(true);
            }
        }, 1500);
    })

    return <div className="w-full h-full flex justify-center items-center select-none">
        <div className="w-[450px] border p-8 mt-32 bg-blue-600 text-white rounded-lg hover:shadow-lg">
            <div className="w-full flex flex-col justify-center items-center mt-[20px] space-y-4">
                <span className="text-[24px]">SIGN-UP</span>
                <span className="text-[14px] text-gray-200">Please enter your login and password!</span>
            </div>
            <div className='w-full flex flex-col justify-center items-center space-y-4 mt-[40px] text-black'>
                <input
                    type="text"
                    className="w-[300px] p-2 rounded"
                    placeholder='Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete='off'
                />
                <input
                    type="text"
                    className="w-[300px] p-2 rounded"
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete='off'
                />
                <div className='flex items-center'>
                    <input
                        type={hidePassword ? 'password' : 'text'}
                        className="w-[300px] p-2 rounded relative left-[17px]"
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete='off'
                    />
                    <div className='w-[20px] relative left-[-30px]' onClick={() => { setHidePassword(!hidePassword) }}>
                        {
                            hidePassword ? <FaEye /> : <FaEyeSlash />
                        }
                    </div>

                    <FaExclamation onClick={handleClickOpen} className='text-red relative left-[-30px]' style={{ color: 'red' }} />
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        maxWidth="sm" // Set maxWidth to control the size
                        fullWidth={false} // Set fullWidth to false to prevent it from covering the entire screen
                    >
                        <DialogTitle>{"Password Requirements"}</DialogTitle>
                        <DialogContent>
                            <List>
                                <ListItem>
                                    <ListItemIcon>
                                        <MdCheckCircle color={password.length >= 8 ? 'green' : 'primary'} />
                                    </ListItemIcon>
                                    <ListItemText primary="At least 8 characters long" />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <MdCheckCircle color={/[A-Z]/.test(password) ? 'green' : 'primary'} />
                                    </ListItemIcon>
                                    <ListItemText primary="Contains at least one uppercase letter (A-Z)" />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <MdCheckCircle color={/[a-z]/.test(password) ? 'green' : 'primary'} />
                                    </ListItemIcon>
                                    <ListItemText primary="Contains at least one lowercase letter (a-z)" />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <MdCheckCircle color={/\d/.test(password) ? 'green' : 'primary'} />
                                    </ListItemIcon>
                                    <ListItemText primary="Contains at least one number (0-9)" />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <MdCheckCircle color={/[@$!%*?&]/.test(password) ? 'green' : 'primary'} />
                                    </ListItemIcon>
                                    <ListItemText primary="Contains at least one special character (@, $, !, %, *, ?, &)" />
                                </ListItem>
                            </List>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>

                </div>
                <input
                    type={hidePassword ? 'password' : 'text'}
                    className="w-[300px] p-2 rounded"
                    placeholder='Confirm Password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoComplete='off'
                />

            </div>
            <div className='w-full flex justify-center mt-[50px] mb-[30px]'>
                <button className='w-[200px] p-2 rounded bg-white-200 border text-black hover:bg-gray-500 hover:text-white' onClick={handleSignUp}>Sign-up</button>
            </div>
            {/* <div className='w-full flex justify-center text-[14px] mt-[30px] mb-[30px] cursor-pointer text-gray-300 hover:text-white'>Forgot password?</div> */}
            <div className='w-full flex justify-center text-[14px]'>Already have an account? <span className='ml-2 text-gray-300 hover:text-white cursor-pointer' onClick={() => location.href = "/signin"}>Sign In</span></div>
        </div>
        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(!openSnackbar)} anchorOrigin={{ 'vertical': 'bottom', 'horizontal': 'right' }}>
            <Alert onClose={() => setOpenSnackbar(!openSnackbar)} severity={alertSeverity==="error"?"error":"success"} sx={{ width: '100%' }}>
                {alertMessage || "This is an error message!"}
            </Alert>
        </Snackbar>
    </div>
}