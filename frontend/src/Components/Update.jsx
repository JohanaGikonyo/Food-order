import { useState } from 'react'
import axios from 'redaxios'
import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import AlertTitle from '@mui/material/AlertTitle';
import { NavLink } from 'react-router-dom';
// import { formStore } from './store';
// import { useStore } from 'zustand';
function Update() {
    const [file, setFile] = useState(null)
    const [name, setName] = useState()
    const [description, setDescription] = useState()
    const [price, setPrice] = useState()
    const [password, setPassword] = useState()
    const [view, setView] = useState(true)
    const [circularProgress, setCircularProgress] = useState(false)
    const [successAlert, setSuccessAlert] = useState(false)
    const [errorAlert, setErrorAlert] = useState(false)
    const [foodCategory, setFoodCategory] = useState('')
    const [isLoading, setIsLoading] = useState(false);





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
            const response = await axios.patch('https://zivato-foods.onrender.com/api/uploadbreakfast', formData);
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
        } finally {
            setIsLoading(false)
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
            const response = await axios.patch('https://zivato-foods.onrender.com/api/uploadlunch', formData);
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
            const response = await axios.patch('https://zivato-foods.onrender.com/api/uploadsuper', formData);
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
        <div className="flex justify-center flex-col items-center h-full bg-gray-100  ">
            <div className='lg:flex items-center justify-around align-middle  min-h-screen  block'>
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
                <div>
                    {view ?
                        <select
                            className="block w-[50%] p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ] sm:mt-5"
                            value={password}
                            onChange={(e) => setFoodCategory(e.target.value)}
                        >
                            <option value="">Choose Category</option>
                            <option value="breakfast">Breakfast</option>
                            <option value="lunch">Lunch</option>
                            <option value="supper">Dinner</option>
                        </select>
                        : ""}
                </div>

                {view ? (
                    <div>
                        {foodCategory === "breakfast" || foodCategory === "" ? <form action="" onSubmit={handleBreakfast} className='flex flex-col gap-10 justify-between items-center m-10'>
                            <h1 className='border-b-2 border-red-500'>BreakFast Food</h1>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                <div className='bg-white p-5 rounded w-auto flex flex-col items-center'>
                                    <div>
                                        <label htmlFor="">Upload Image</label>
                                        <input type="file" value={file} onChange={(e) => { setFile(e.target.files[0]) }} />
                                    </div>
                                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                                        <OutlinedInput
                                            id="outlined-adornment-weight"
                                            aria-describedby="outlined-weight-helper-text"
                                            inputProps={{
                                                'aria-label': 'weight',
                                            }}
                                            value={name}
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
                                            value={price}
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
                                        value={description}
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
                                        <input type="file" value={file} onChange={(e) => { setFile(e.target.files[0]) }} />
                                    </div>
                                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                                        <OutlinedInput
                                            id="outlined-adornment-weight"
                                            aria-describedby="outlined-weight-helper-text"
                                            inputProps={{
                                                'aria-label': 'weight',
                                            }}
                                            value={name}
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
                                            value={price}
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
                                        value={description}
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
                                        <input type="file" value={file} onChange={(e) => { setFile(e.target.files[0]) }} />
                                    </div>
                                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                                        <OutlinedInput
                                            id="outlined-adornment-weight"
                                            aria-describedby="outlined-weight-helper-text"
                                            inputProps={{
                                                'aria-label': 'weight',
                                            }}
                                            value={name}
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
                                            value={price}
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
                                        value={description}
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


                    </div>
                ) : null
                }
                <div className='border-t-2 bg-orange-400 text-white p-1 rounded '><NavLink to="/items"><span><button>View Items</button></span></NavLink></div>
            </div >
        </div >
    );
}

export default Update;
