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
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import AlertTitle from '@mui/material/AlertTitle';
import { NavLink } from 'react-router-dom';
// // import { useStore } from 'zustand';
// import { formStore } from './store';
function Upload() {
    const [file, setFile] = useState(null)
    const [name, setName] = useState()
    const [description, setDescription] = useState()
    const [price, setPrice] = useState()
    const [password, setPassword] = useState()
    const [showPassword, setShowPassword] = useState(false);
    const [view, setView] = useState(false)
    const [circularProgress, setCircularProgress] = useState(false)
    const [successAlert, setSuccessAlert] = useState(false)
    const [errorAlert, setErrorAlert] = useState(false)
    const [foodCategory, setFoodCategory] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    // const history = useNavigate()

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleVerification = async (e) => {
        e.preventDefault()
        setIsLoading(true);
        try {
            setCircularProgress(true)
            const response = await axios.post('https://zivato-foods.onrender.com/api/verify', { password })
            if (response.data === "verified") {
                setCircularProgress(false)
                setSuccessAlert(true)



            }
            else {
                setCircularProgress(false)
                setErrorAlert(true)

            }


        } catch (error) {
            console.error(error)
            setErrorAlert(true)
            setCircularProgress(false)

        } finally {
            setIsLoading(false);
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
            setCircularProgress(true)
            const response = await axios.post('https://zivato-foods.onrender.com/api/uploadbreakfast', formData);
            console.log(response.data);
            if (response.data === "uploaded") {
                setCircularProgress(false)
                setSuccessAlert(true)
            }
            else {
                setCircularProgress(false)
                setErrorAlert(true)
            }
        } catch (error) {
            console.error("An error occurred", error);
            setErrorAlert(true)
            setCircularProgress(false)
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
            setCircularProgress(true)
            const response = await axios.post('https://zivato-foods.onrender.com/api/uploadlunch', formData);
            console.log(response.data);
            if (response.data === "uploaded") {
                setCircularProgress(false)
                setSuccessAlert(true)

            }
            else {
                setCircularProgress(false)
                setErrorAlert(true)
            }
        } catch (error) {
            console.error("An error occurred", error);
            setErrorAlert(true)
            setCircularProgress(false)
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
            setCircularProgress(true)
            const response = await axios.post('https://zivato-foods.onrender.com/api/uploadsuper', formData);
            console.log(response.data);

            if (response.data === "uploaded") {
                setCircularProgress(false)
                setSuccessAlert(true)
            }
            else {
                setCircularProgress(false)
                setErrorAlert(true)
            }
        } catch (error) {
            console.error("An error occurred", error);
            setErrorAlert(true)
            setCircularProgress(false)
        }
    }


    return (
        <div className="lg:flex lg:justify-center flex-col justify-around items-center h-full bg-gray-100 p-20 lg:p-0 lg:m-0">
            <div className='lg:flex items-center justify-around align-middle  min-h-screen relative block'>
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                        <CircularProgress color="secondary" />
                    </div>
                )}
                <div className="absolute  top-[35%]  z-40 ">
                    <Stack sx={{ width: '100% ', height: '20px' }} spacing={2}>
                        {errorAlert ? <Alert variant="filled" severity="error" onClose={() => { setErrorAlert(prev => !prev); setCircularProgress(false); setPassword("") }}>
                            <AlertTitle>Error</AlertTitle>
                            Ooops! Something went wrong!
                        </Alert> : ""}
                        {successAlert ? <Alert variant="filled" severity="success" onClose={() => { setSuccessAlert(prev => !prev), setView(true) }}>
                            <AlertTitle>Success</AlertTitle>
                            Successful. Thank You!
                        </Alert> : ""}

                    </Stack>
                </div>
                {!view ? (
                    <form onSubmit={handleVerification} className='flex items-center flex-col gap-3 mt-[25%]'>
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
                        <button
                            className="bg-slate-200   hover:text-blue-500 text-orange-400 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline  text-xl flex flex-row gap-5 items-center justify-between"
                            type="submit"

                        >
                            Submit
                        </button></form>
                ) : null}
                {view ?
                    <select
                        className="block w-[50%] p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ] sm:mt-5"
                        onChange={(e) => setFoodCategory(e.target.value)}
                    >
                        <option value="">Choose Category</option>
                        <option value="breakfast">Breakfast</option>
                        <option value="lunch">Lunch</option>
                        <option value="supper">Dinner</option>
                    </select>
                    : ""}

                {view ? (
                    <div>
                        {foodCategory === "breakfast" || foodCategory === "" ? <form action="" onSubmit={handleBreakfast} className='flex flex-col gap-10 justify-between items-center m-10'>
                            <h1 className='border-b-2 border-red-500'>BreakFast Food</h1>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                <div className='bg-white p-5 rounded w-auto flex flex-col items-center'>
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
                                    <button
                                        className="bg-slate-200   hover:text-blue-500 text-orange-400 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline  text-xl flex flex-row gap-5 items-center justify-between"
                                        type="submit"

                                    >
                                        {circularProgress ? <Box sx={{ display: 'flex' }} >
                                            <CircularProgress className='h-1 w-1 text-orange-400' />
                                        </Box> : ""}  Submit
                                    </button></div>
                            </Box>
                        </form> : " "}


                        {foodCategory === "lunch" ? <form action="" onSubmit={handleLunch} className='flex flex-col gap-10 justify-between items-center m-10'>
                            <h1 className='border-b-2 border-red-500'>Lunch Food</h1>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                <div className='bg-white p-5 rounded w-auto flex flex-col items-center'>
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
                                    <button
                                        className="bg-slate-200   hover:text-blue-500 text-orange-400 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline  text-xl flex flex-row gap-5 items-center justify-between"
                                        type="submit"

                                    >
                                        {circularProgress ? <Box sx={{ display: 'flex' }} >
                                            <CircularProgress className='h-1 w-1 text-orange-400' />
                                        </Box> : ""}  Submit
                                    </button></div>
                            </Box>
                        </form> : ""}

                        {foodCategory === "supper" ? <form action="" onSubmit={handleSupper} className='flex flex-col gap-10 justify-between items-center m-10'>
                            <h1 className='border-b-2 border-red-500'>Supper Food</h1>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                <div className='bg-white p-5 rounded w-auto flex flex-col items-center'>
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
                                    <button
                                        className="bg-slate-200   hover:text-blue-500 text-orange-400 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline  text-xl flex flex-row gap-5 items-center justify-between"
                                        type="submit"

                                    >
                                        {circularProgress ? <Box sx={{ display: 'flex' }} >
                                            <CircularProgress className='h-1 w-1 text-orange-400' />
                                        </Box> : ""}  Submit
                                    </button></div>
                            </Box>
                        </form> : ""}

                        <div className='border-t-2 border-orange-400'><NavLink to="/items"><span><button>View Items</button></span></NavLink></div>
                    </div>
                ) : null
                }

            </div >
        </div >
    );
}

export default Upload;
