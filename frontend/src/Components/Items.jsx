import { useEffect, useState } from 'react';
import axios from 'redaxios';
import loading1 from './Assets/loading1.json';
import Lottie from "react-lottie";
import FormHelperText from '@mui/material/FormHelperText';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Navbar from './Navigate/Navbar';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import AlertTitle from '@mui/material/AlertTitle';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate, NavLink } from 'react-router-dom'
// import { formStore } from './store';
function Items() {
    const [file, setFile] = useState(null)
    const [name, setName] = useState()
    const [description, setDescription] = useState()
    const [price, setPrice] = useState()
    const [idToUpdate, setIdToUpdate] = useState()
    const [viewUpdateForm, setViewUpdateForm] = useState(false)
    const [breakfast, setBreakfast] = useState([]);
    const [lunch, setLunch] = useState([]);
    const [supper, setSupper] = useState([]);
    const [successAlert, setSuccessAlert] = useState(false)
    const [errorAlert, setErrorAlert] = useState(false)
    // const [view, setView] = useState(true)
    const [circularProgress, setCircularProgress] = useState(false)
    const [foodCategory, setFoodCategory] = useState('')
    const [isLoading, setIsLoading] = useState(false);

    const [breakfastLoading, setBreakfastLoading] = useState(false);
    const [lunchLoading, setLunchLoading] = useState(false);
    const [supperLoading, setSupperLoading] = useState(false);
    const history = useNavigate()
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
        const fetchItems = async () => {
            try {
                const response = await axios.get('https://zivato-foods.onrender.com/api/getbreakfast/');
                setBreakfast(response.data);
            } catch (error) {
                console.error('An error occurred', error);
            }
        };

        const Lunch = async () => {
            try {
                const response = await axios.get('https://zivato-foods.onrender.com/api/getlunch/');
                setLunch(response.data);
            } catch (error) {
                console.error('An error occurred', error);
            }
        };

        const Super = async () => {
            try {
                const response = await axios.get('https://zivato-foods.onrender.com/api/getsupper/');
                setSupper(response.data);
            } catch (error) {
                console.error('An error occurred', error);
            }
        };

        Super();
        Lunch();
        fetchItems();
    }, []);



    const handleDeleteBreakfast = async (id) => {
        try {
            setBreakfastLoading(true);
            const response = await axios.post(`https://zivato-foods.onrender.com/api/deletebreakfast/${id}`);
            if (response.data === "deleted") {
                history('/menu')
                setSuccessAlert(true)

            }
            else {
                setErrorAlert(true)

            }

        } catch (error) {
            console.error('An error occurred', error);
            setErrorAlert(true)
        } finally {
            setBreakfastLoading(false);
        }

    }

    const handleDeleteLunch = async (id) => {
        try {
            setLunchLoading(false);
            const response = await axios.post(`https://zivato-foods.onrender.com/api/deletelunch/${id}`);
            if (response.data === "deleted") {
                setSuccessAlert(true)
                history('/menu')
            }
            else {
                setErrorAlert(true)

            }
        } catch (error) {
            console.error('An error occurred', error);

        } finally {
            setLunchLoading(false);
        }

    }

    const handleDeleteSupper = async (id) => {
        try {
            setSupperLoading(true)
            const response = await axios.post(`https://zivato-foods.onrender.com/api/deletesupper/${id}`);
            if (response.data === "deleted") {
                history('/menu')
                setSuccessAlert(true)

            }
            else {
                setErrorAlert(true)

            }
        } catch (error) {
            console.error('An error occurred', error);
        } finally {
            setLunchLoading(false);
        }

    }

    const handleUpdate = (item) => {
        // history('/update');
        setViewUpdateForm(prev => { !prev });
        setIdToUpdate(item.id);
        setFile(item.file);
        setName(item.name);
        setPrice(item.price);
        setDescription(item.description);

    }





    const handleBreakfast = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        try {
            const formData = new FormData();
            formData.append('file', e.target.files[0]);
            formData.append('name', name);
            formData.append('description', description);
            formData.append('price', price);
            console.log(formData)
            setCircularProgress(true)
            const response = await axios.patch(`https://zivato-foods.onrender.com/api/updatebreakfast${idToUpdate}`, formData);
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
        setIsLoading(true)

        try {
            const formData = new FormData();
            formData.append('file', e.target.files[0]);
            formData.append('name', name);
            formData.append('description', description);
            formData.append('price', price);
            console.log(formData)
            setCircularProgress(true)
            const response = await axios.patch(`https://zivato-foods.onrender.com/api/updatelunch${idToUpdate}`, formData);
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

    const handleSupper = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        try {
            const formData = new FormData();
            formData.append('file', e.target.files[0]);
            formData.append('name', name);
            formData.append('description', description);
            formData.append('price', price);
            console.log(formData)
            setCircularProgress(true)
            const response = await axios.patch(`https://zivato-foods.onrender.com/api/updatesuper${idToUpdate}`, formData);
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

    return (
        <div>
            <Navbar />
            {/* Success and Error Alerts */}
            <div className=" top-[35%] z-40 h-50 w-[50%] sticky">
                <Stack sx={{ width: '100%', height: '20px' }} spacing={2}>
                    {errorAlert && (
                        <Alert variant="filled" severity="error" onClose={() => setErrorAlert(false)}>
                            <AlertTitle>Error</AlertTitle>
                            There was an error.
                        </Alert>
                    )}
                    {successAlert && (
                        <Alert variant="filled" severity="success" onClose={() => setSuccessAlert(false)}>
                            <AlertTitle>Success</AlertTitle>
                            Operation successful.
                        </Alert>
                    )}
                </Stack>
            </div>

            {!viewUpdateForm ?


                <div className='flex flex-col justify-around p-5 relative' >

                    <div className='m-10'>
                        <h1 className="text-3xl font-bold mb-5">Breakfast Refreshments</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {breakfast.length > 0 ? (
                                breakfast.map((item) => (
                                    <div key={item.id} className='bg-white shadow-md rounded-md p-5 relative'>
                                        <img src={`https://zivato-foods.onrender.com/${item.file}`} alt="" className='w-full h-40 object-cover mb-3' />
                                        <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
                                        <div className="flex justify-between items-center mb-2">
                                            <h3 className="text-red-500 font-semibold text-lg">Kshs. {item.price}</h3>
                                            <div className='flex flex-row items-center justify-between'>
                                                <button className="bg-orange-400 text-white py-1 px-3 rounded" onClick={() => { handleUpdate(item) }}>update</button>

                                                <button className={`bg-blue-400 text-white py-1 px-3 rounded flex flex-row`} onClick={() => { handleDeleteBreakfast(item.id) }}> {breakfastLoading ? <Box sx={{ display: 'flex' }} >
                                                    <CircularProgress className='h-1 w-1 text-orange-400' />
                                                </Box> : ""}  Delete</button></div>
                                        </div>

                                        <p className="text-sm">{item.description}</p>
                                    </div >
                                ))
                            ) : (
                                <div>
                                    <Lottie
                                        options={{
                                            loop: true,
                                            autoplay: true,
                                            animationData: loading1,
                                            rendererSettings: {
                                                preserveAspectRatio: "xMidYMid slice",
                                            },
                                        }}
                                        width={100}
                                        height={100}
                                    />
                                </div>
                            )
                            }
                        </div >
                    </div >
                    {/* Lunch Food */}
                    < div className="m-10" >
                        <h1 className="text-3xl font-bold mb-5">Lunch Food</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {lunch.length > 0 ? (
                                lunch.map((item) => (
                                    <div key={item.id} className='bg-white shadow-md rounded-md p-5 relative'>
                                        <img src={`https://zivato-foods.onrender.com/${item.file}`} alt="" className='w-full h-40 object-cover mb-3' />
                                        <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
                                        <div className="flex justify-between items-center mb-2">
                                            <h3 className="text-red-500 font-semibold text-lg">Kshs. {item.price}</h3>
                                            <div className='flex flex-row items-center justify-between'>
                                                <button className="bg-orange-400 text-white py-1 px-3 rounded" onClick={() => { handleUpdate(item) }}>update</button>
                                                <button className={`bg-blue-400 text-white py-1 px-3 rounded flex flex-row`} onClick={() => { handleDeleteLunch(item.id) }}> {lunchLoading ? <Box sx={{ display: 'flex' }} >
                                                    <CircularProgress className='h-1 w-1 text-orange-400' />
                                                </Box> : ""}  Delete</button></div>
                                        </div>

                                        <p className="text-sm">{item.description}</p>
                                    </div>
                                ))
                            ) : (
                                <div>
                                    <Lottie
                                        options={{
                                            loop: true,
                                            autoplay: true,
                                            animationData: loading1,
                                            rendererSettings: {
                                                preserveAspectRatio: "xMidYMid slice",
                                            },
                                        }}
                                        width={100}
                                        height={100}
                                    />
                                </div>
                            )}
                        </div>
                    </div >
                    {/* Supper Orders */}
                    < div className="m-10" >
                        <h1 className="text-3xl font-bold mb-5">Supper Orders</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {supper.length > 0 ? (
                                supper.map((item) => (
                                    <div key={item.id} className='bg-white shadow-md rounded-md p-5 relative'>
                                        <img src={`https://zivato-foods.onrender.com/${item.file}`} alt="" className='w-full h-40 object-cover mb-3' />
                                        <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
                                        <div className="flex justify-between items-center mb-2">
                                            <h3 className="text-red-500 font-semibold text-lg">Kshs. {item.price}</h3>
                                            <div className='flex flex-row items-center justify-between'>
                                                <button className="bg-orange-400 text-white py-1 px-3 rounded" onClick={() => { handleUpdate(item) }}>update</button>

                                                <button className={`bg-blue-400 text-white py-1 px-3 rounded flex flex-row`} onClick={() => { handleDeleteSupper(item.id) }}> {supperLoading ? <Box sx={{ display: 'flex' }} >
                                                    <CircularProgress className='h-1 w-1 text-orange-400' />
                                                </Box> : ""}  Delete</button>
                                            </div>
                                        </div>

                                        <p className="text-sm">{item.description}</p>
                                    </div>
                                ))
                            ) : (
                                <div>
                                    <Lottie
                                        options={{
                                            loop: true,
                                            autoplay: true,
                                            animationData: loading1,
                                            rendererSettings: {
                                                preserveAspectRatio: "xMidYMid slice",
                                            },
                                        }}
                                        width={100}
                                        height={100}
                                    />
                                </div>
                            )}
                        </div>
                    </div >
                </div >


                :


                <div className="flex justify-center flex-col items-center h-full bg-gray-100  ">
                    <div className='lg:flex items-center justify-around align-middle  min-h-screen  block'>
                        {isLoading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                                { }
                            </div>
                        )}
                        {/* <div className="absolute  top-[35%]  z-40 ">
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
                        <div> */}

                        <select
                            className="block w-[50%] p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ] sm:mt-5"

                            onChange={(e) => setFoodCategory(e.target.value)}
                        >
                            <option value="">Choose Category</option>
                            <option value="breakfast">Breakfast</option>
                            <option value="lunch">Lunch</option>
                            <option value="supper">Dinner</option>
                        </select>

                    </div>


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
                        </form> : ""}


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


                    <div className='border-t-2 bg-orange-400 text-white p-1 rounded '><NavLink to="/items"><span><button>View Items</button></span></NavLink></div>
                </div >

            }


        </div >
    );
}

export default Items;
