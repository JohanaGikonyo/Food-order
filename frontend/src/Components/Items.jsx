import { useEffect, useState } from 'react';
import axios from 'redaxios';
import loading1 from './Assets/loading1.json';
import Lottie from "react-lottie";
// import { countStore, selectedItemsStore } from './store';
import Navbar from './Navigate/Navbar';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import AlertTitle from '@mui/material/AlertTitle';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom'
// import { formStore } from './store';
function Items() {
    const [file, setFile] = useState(null)
    const [name, setName] = useState()
    const [description, setDescription] = useState()
    const [price, setPrice] = useState()
    const [breakfast, setBreakfast] = useState([]);
    const [lunch, setLunch] = useState([]);
    const [supper, setSupper] = useState([]);
    const [successAlert, setSuccessAlert] = useState(false)
    const [errorAlert, setErrorAlert] = useState(false)

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
    // const handleUpdateBreakfast = async (id) => {
    //     try {
    //         const response = await axios.post(`https://zivato-foods.onrender.com/api/updatebreakfast/${id}`);
    //         if (response.data === "updated") {
    //             history('/items')
    //             setSuccessAlert(true)
    //         }
    //         else {
    //             setErrorAlert(true)
    //         }
    //     } catch (error) {
    //         console.error('An error occurred', error);
    //     }

    // }
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
        history('/update');
        setFile(item.file);
        setName(item.name);
        setPrice(item.price);
        setDescription(item.description);
    }

    return (
        <div>
            <Navbar />

            <div className='flex flex-col justify-around p-5 relative' >
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
        </div >
    );
}

export default Items;
