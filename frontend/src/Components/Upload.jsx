import { useState } from 'react'
import axios from 'redaxios'
import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
function Upload() {
    const [file, setFile] = useState(null)
    const [name, setName] = useState()
    const [description, setDescription] = useState()
    const [price, setPrice] = useState()
    const [password, setPassword] = useState()
    const [showPassword, setShowPassword] = useState(false);
    const [view, setView] = useState(false)

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleVerification = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:3000/api/verify', { password })
            alert(response.data)
            if (response.data === "verified") {
                setView(true)

            }
            else {
                alert("Incorrect password!")
            }

        } catch (error) {
            console.error("An error Occurred", error)

        }


    }
    const handleBreakfast = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('name', name);
            formData.append('description', description);
            formData.append('price', price);
            console.log(formData)

            const response = await axios.post('http://localhost:3000/api/uploadbreakfast', formData);
            console.log(response.data);

            alert(response.data);
        } catch (error) {
            console.error("An error occurred", error);
            alert("An error occured", error)
        }
    }
    const handleLunch = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('name', name);
            formData.append('description', description);
            formData.append('price', price);
            console.log(formData)

            const response = await axios.post('http://localhost:3000/api/uploadlunch', formData);
            console.log(response.data);

            alert(response.data);
        } catch (error) {
            console.error("An error occurred", error);
            alert("An error occured", error)
        }
    }
    const handleSupper = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('name', name);
            formData.append('description', description);
            formData.append('price', price);
            console.log(formData)

            const response = await axios.post('http://localhost:3000/api/uploadsuper', formData);
            console.log(response.data);

            alert(response.data);
        } catch (error) {
            console.error("An error occurred", error);
            alert("An error occured", error)
        }
    }
    return (
        <div className='flex items-center justify-around align-middle'>
            {!view ? <form onSubmit={handleVerification} className='flex items-center flex-col gap-3 '>

                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        onChange={(e) => { setPassword(e.target.value) }}
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
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
                        label="Password"
                    />
                </FormControl>
                <button className='border p-1 rounded text-white bg-orange-600'><input type='submit' value="Submit" /></button>
            </form>
                : " "}
            {view ? <div>
                <form action="" onSubmit={handleBreakfast} className='flex flex-col gap-10 justify-between items-center'>
                    <h1 className='border-b-2 border-red-500'>BreakFast Food</h1>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <div className='bg-slate-200 p-5 rounded w-auto flex flex-col items-center'>
                            <div>
                                <label htmlFor="">Upload Image</label>
                                <input type="file" onChange={(e) => { setFile(e.target.files[0]) }} />
                            </div>
                            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                                <OutlinedInput
                                    id="outlined-adornment-weight"
                                    aria-describedby="outlined-weight-helper-text"
                                    inputProps={{
                                        'aria-label': 'weight',
                                    }}
                                    onChange={(e) => { setName(e.target.value) }}
                                />
                                <FormHelperText id="outlined-weight-helper-text">Product Name</FormHelperText>
                            </FormControl>
                            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                                <OutlinedInput
                                    id="outlined-adornment-weight"
                                    endAdornment={<InputAdornment position="end">ksh.</InputAdornment>}
                                    aria-describedby="outlined-weight-helper-text"
                                    inputProps={{
                                        'aria-label': 'weight',
                                    }}
                                    onChange={(e) => { setPrice(e.target.value) }}
                                />
                                <FormHelperText id="outlined-weight-helper-text">Price/cost</FormHelperText>
                            </FormControl>
                            <TextField
                                label="About the product"
                                id="outlined-start-adornment"
                                sx={{ m: 1, width: '25ch' }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">Text:</InputAdornment>,
                                }}
                                onChange={(e) => { setDescription(e.target.value) }}
                            />
                            <button className='border p-1 rounded text-white bg-orange-600 w-[15%]'><input type='submit' value="Submit" /></button>
                        </div>
                    </Box>

                </form>
                <form action="" onSubmit={handleLunch} className='flex flex-col gap-10 justify-between items-center m-10'>
                    <h1 className='border-b-2 border-red-500'>Lunch Food</h1>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <div className='bg-slate-200 p-5 rounded w-auto flex flex-col items-center'>
                            <div>
                                <label htmlFor="">Upload Image</label>
                                <input type="file" onChange={(e) => { setFile(e.target.files[0]) }} />
                            </div>
                            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                                <OutlinedInput
                                    id="outlined-adornment-weight"
                                    aria-describedby="outlined-weight-helper-text"
                                    inputProps={{
                                        'aria-label': 'weight',
                                    }}
                                    onChange={(e) => { setName(e.target.value) }}
                                />
                                <FormHelperText id="outlined-weight-helper-text">Product Name</FormHelperText>
                            </FormControl>
                            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                                <OutlinedInput
                                    id="outlined-adornment-weight"
                                    endAdornment={<InputAdornment position="end">ksh.</InputAdornment>}
                                    aria-describedby="outlined-weight-helper-text"
                                    inputProps={{
                                        'aria-label': 'weight',
                                    }}
                                    onChange={(e) => { setPrice(e.target.value) }}
                                />
                                <FormHelperText id="outlined-weight-helper-text">Price/cost</FormHelperText>
                            </FormControl>
                            <TextField
                                label="About the product"
                                id="outlined-start-adornment"
                                sx={{ m: 1, width: '25ch' }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">Text:</InputAdornment>,
                                }}
                                onChange={(e) => { setDescription(e.target.value) }}
                            />
                            <button className='border p-1 rounded text-white bg-orange-600'><input type='submit' value="Submit" /></button>
                        </div>
                    </Box>

                </form>
                <form action="" onSubmit={handleSupper} className='flex flex-col gap-10 justify-between items-center m-10'>
                    <h1 className='border-b-2 border-red-500'>Supper Food</h1>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <div className='bg-slate-200 p-5 rounded w-auto flex flex-col items-center'>
                            <div>
                                <label htmlFor="">Upload Image</label>
                                <input type="file" onChange={(e) => { setFile(e.target.files[0]) }} />
                            </div>
                            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                                <OutlinedInput
                                    id="outlined-adornment-weight"
                                    aria-describedby="outlined-weight-helper-text"
                                    inputProps={{
                                        'aria-label': 'weight',
                                    }}
                                    onChange={(e) => { setName(e.target.value) }}
                                />
                                <FormHelperText id="outlined-weight-helper-text">Product Name</FormHelperText>
                            </FormControl>
                            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                                <OutlinedInput
                                    id="outlined-adornment-weight"
                                    endAdornment={<InputAdornment position="end">ksh.</InputAdornment>}
                                    aria-describedby="outlined-weight-helper-text"
                                    inputProps={{
                                        'aria-label': 'weight',
                                    }}
                                    onChange={(e) => { setPrice(e.target.value) }}
                                />
                                <FormHelperText id="outlined-weight-helper-text">Price/cost</FormHelperText>
                            </FormControl>
                            <TextField
                                label="About the product"
                                id="outlined-start-adornment"
                                sx={{ m: 1, width: '25ch' }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">Text:</InputAdornment>,
                                }}
                                onChange={(e) => { setDescription(e.target.value) }}
                            />
                            <button className='border p-1 rounded text-white bg-orange-600'><input type='submit' value="Submit" /></button>

                        </div>

                    </Box>
                </form>
            </div>
                : " "
            }


        </div >
    )
}

export default Upload