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
        <div className="flex justify-center items-center h-full bg-gray-100">
            <div className="lg:flex items-center justify-around align-middle min-h-screen relative block">
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                        <CircularProgress color="secondary" />
                    </div>
                )}
                <div className="absolute top-[35%] z-40">
                    <Stack sx={{ width: '100%', height: '20px' }} spacing={2}>
                        {errorAlert && (
                            <Alert variant="filled" severity="error" onClose={() => { setErrorAlert(prev => !prev); setCircularProgress(false); setPassword(''); }}>
                                Ooops! Something went wrong!
                            </Alert>
                        )}
                        {successAlert && (
                            <Alert variant="filled" severity="success" onClose={() => { setSuccessAlert(prev => !prev), setView(true); }}>
                                Successful. Thank You!
                            </Alert>
                        )}
                    </Stack>
                </div>
                {!view ? (
                    <form onSubmit={handleVerification} className="flex items-center flex-col gap-3 mt-[25%]">
                        <div className="bg-white p-5 rounded w-[25ch] flex flex-col">
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                className="border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                className="btn-submit"
                                type="submit"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                ) : null}
                {view ? (
                    <select
                        className="block w-[50%] p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:mt-5"
                        onChange={(e) => setFoodCategory(e.target.value)}
                    >
                        <option value="">Choose Category</option>
                        <option value="breakfast">Breakfast</option>
                        <option value="lunch">Lunch</option>
                        <option value="supper">Dinner</option>
                    </select>
                ) : null}
                {view ? (
                    <div>
                        {foodCategory === "breakfast" || foodCategory === "" ? (
                            <form onSubmit={handleBreakfast} className="flex flex-col gap-10 justify-between items-center m-10">
                                <h1 className="border-b-2 border-red-500">BreakFast Food</h1>
                                <div className="bg-white p-5 rounded w-auto flex flex-col items-center">
                                    <label htmlFor="image">Upload Image</label>
                                    <input id="image" type="file" onChange={(e) => { setFile(e.target.files[0]) }} />
                                    <input
                                        id="product-name"
                                        className="border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Product Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <input
                                        id="price"
                                        className="border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Price/cost"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                    <textarea
                                        id="description"
                                        className="border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="About the product"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    ></textarea>
                                    <button
                                        className="btn-submit"
                                        type="submit"
                                    >
                                        {circularProgress ? (
                                            <CircularProgress className="h-1 w-1 text-orange-400" />
                                        ) : null}
                                        Submit
                                    </button>
                                </div>
                            </form>
                        ) : null}
                        {/* Similar forms for lunch and supper */}
                        {foodCategory === "lunch" || foodCategory === "" ? (
                            <form onSubmit={handleLunch} className="flex flex-col gap-10 justify-between items-center m-10">
                                <h1 className="border-b-2 border-red-500">Lunch Food</h1>
                                <div className="bg-white p-5 rounded w-auto flex flex-col items-center">
                                    <label htmlFor="image">Upload Image</label>
                                    <input id="image" type="file" onChange={(e) => { setFile(e.target.files[0]) }} />
                                    <input
                                        id="product-name"
                                        className="border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Product Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <input
                                        id="price"
                                        className="border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Price/cost"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                    <textarea
                                        id="description"
                                        className="border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="About the product"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    ></textarea>
                                    <button
                                        className="btn-submit"
                                        type="submit"
                                    >
                                        {circularProgress ? (
                                            <CircularProgress className="h-1 w-1 text-orange-400" />
                                        ) : null}
                                        Submit
                                    </button>
                                </div>
                            </form>
                        ) : null}

                        {foodCategory === "supper" ? (
                            <form onSubmit={handleSupper} className="flex flex-col gap-10 justify-between items-center m-10">
                                <h1 className="border-b-2 border-red-500">Supper Food</h1>
                                <div className="bg-white p-5 rounded w-auto flex flex-col items-center">
                                    <label htmlFor="image">Upload Image</label>
                                    <input id="image" type="file" onChange={(e) => { setFile(e.target.files[0]) }} />
                                    <input
                                        id="product-name"
                                        className="border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Product Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <input
                                        id="price"
                                        className="border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Price/cost"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                    <textarea
                                        id="description"
                                        className="border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="About the product"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    ></textarea>
                                    <button
                                        className="btn-submit"
                                        type="submit"
                                    >
                                        {circularProgress ? (
                                            <CircularProgress className="h-1 w-1 text-orange-400" />
                                        ) : null}
                                        Submit
                                    </button>
                                </div>
                            </form>
                        ) : null}
                    </div>
                )
                    :
                    null}
            </div>
        </div>

    );
}

export default Upload;
