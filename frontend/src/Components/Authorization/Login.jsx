import { useState, useMemo } from "react";
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
// import { useFormControl } from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        setEmailError(!validateEmail(event.target.value));
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setPasswordError(event.target.value.length < 6);
    };

    const validateEmail = (email) => {
        // Simple email validation regex
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    function MyFormHelperText() {
        const helperText = useMemo(() => {
            return emailError ? 'Should be a valid email' : 'Enter Email';
        }, [emailError]);

        return <FormHelperText error={emailError}>{helperText}</FormHelperText>;
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form className="w-full max-w-md">
                <div className="mb-6">
                    <FormControl fullWidth variant="outlined" error={emailError}>
                        <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-email"
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            endAdornment={<InputAdornment position="end"><MyFormHelperText /></InputAdornment>}
                        />
                    </FormControl>
                </div>
                <div className="mb-6">
                    <FormControl fullWidth variant="outlined" error={passwordError}>
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
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
                        />
                        <FormHelperText error={passwordError}>Password should be at least 6 characters</FormHelperText>
                    </FormControl>
                </div>
                <div className="flex justify-center">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                        disabled={emailError || passwordError}
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Login;
