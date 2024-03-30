import { useState, useMemo } from "react";
import { useNavigate, NavLink } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';
import axios from 'redaxios'
function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [circularProgress, setCircularProgress] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false)
    const [errorAlert, setErrorAlert] = useState(false)
    const history = useNavigate();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        setEmailError(!validateEmail(event.target.value));
    };

    const handlePasswordChange = (event) => {
        const newPassword = event.target.value;
        setPassword(newPassword);
        setPasswordError(newPassword.length < 6 || !/^[a-zA-Z]+$/.test(newPassword));
    };


    const validateEmail = (email) => {
        // Simple email validation regex
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    function MyFormHelperText() {
        const helperText = useMemo(() => {
            return emailError ? 'Should be a valid email' : 'Enter Email';
        }, []); // Removed emailError from dependency array

        return <FormHelperText error={emailError}>{helperText}</FormHelperText>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setCircularProgress(true)
            const response = await axios.post('http://localhost:3000/api/signin', { email, password })
            if (response.data === "user exists") {
                setCircularProgress(false)
                setErrorAlert(true)

            }
            else {
                setCircularProgress(false)
                setSuccessAlert(true)

            }


        } catch (error) {
            console.error(error)


        }
    }

    return (
        <div className="flex justify-center items-center h-screen relative">
            <div className="absolute  top-[35%]  z-40 ">
                <Stack sx={{ width: '100% ', height: '20px' }} spacing={2}>
                    {errorAlert ? <Alert variant="filled" severity="error" onClose={() => { setErrorAlert(prev => !prev); history('/login'); setPassword("") }}>
                        <AlertTitle>Error</AlertTitle>
                        user Exists LogIn
                    </Alert> : ""}
                    {successAlert ? <Alert variant="filled" severity="success" onClose={() => { setSuccessAlert(prev => !prev), history('/menu') }}>
                        <AlertTitle>Success</AlertTitle>
                        Welcome!
                    </Alert> : ""}

                </Stack>
            </div>

            <form className="w-full max-w-md" onSubmit={handleSubmit}>
                <h1 className="text-4xl p-3">SignIn</h1>
                <div className="mb-6">
                    <FormControl fullWidth error={emailError} className="mb-4">
                        <InputLabel htmlFor="outlined-adornment-email" shrink={!!email}>{!email ? 'Email' : ''}</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-email"
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            endAdornment={<InputAdornment position="end"><MyFormHelperText /></InputAdornment>}
                            className="w-full"
                        />
                    </FormControl>
                </div>
                <div className="mb-6">
                    <FormControl fullWidth error={passwordError} className="mb-4">
                        <InputLabel htmlFor="outlined-adornment-password" shrink={!!password}>{!password ? 'Password' : ''}</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={handlePasswordChange}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            className="w-full"
                        />
                        <FormHelperText error={passwordError}>Password should be at least 6 Characters only. </FormHelperText>
                    </FormControl>
                </div>
                <div className="flex flex-wrap items-center gap-10 justify-center">
                    <button
                        className="bg-slate-200   hover:text-blue-500 text-orange-400 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline  text-xl flex flex-row gap-5 items-center justify-between"
                        type="submit"
                        disabled={emailError || passwordError}
                    >
                        {circularProgress ? <Box sx={{ display: 'flex' }} >
                            <CircularProgress className='h-1 w-1 text-orange-400' />
                        </Box> : ""}  Submit
                    </button><br />
                    <small className="text-blue-400 underline"><NavLink to='/login'>logIn</NavLink></small>
                </div>
            </form>
        </div>
    );
}

export default SignIn;
