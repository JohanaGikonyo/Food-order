import { useState, useMemo } from "react";
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function SignIn() {
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
        <div>
            <form noValidate autoComplete="off">
                <div style={{ marginBottom: '16px' }}>
                    <FormControl fullWidth variant="outlined" error={emailError} sx={{ marginBottom: '16px' }}>
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
                <div style={{ marginBottom: '16px' }}>
                    <FormControl fullWidth variant="outlined" error={passwordError} sx={{ marginBottom: '16px' }}>
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
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button
                        style={{ backgroundColor: '#2196f3', color: 'white', padding: '10px 20px', borderRadius: '4px', border: 'none', cursor: 'pointer' }}
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

export default SignIn;
