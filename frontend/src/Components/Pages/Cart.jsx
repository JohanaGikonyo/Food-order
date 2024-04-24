import { selectedItemsStore, countStore } from "./store";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';
import { useState, useEffect } from "react";
import Navbar from "../Navigate/Navbar";

function Cart() {
    const { selected } = selectedItemsStore();
    const [number, setNumber] = useState({});
    const { increment, decrement } = countStore();
    const [cost, setCost] = useState(0);
    const [circularProgress, setCircularProgress] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false)
    const [errorAlert, setErrorAlert] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState()

    const handleAdd = (id) => {
        setNumber((prev) => ({
            ...prev,
            [id]: (prev[id] || 1) + 1
        }));
        increment();
    };

    const handleMinus = (id) => {
        const updated = Math.max((number[id] || 0) - 1, 0)
        setNumber((prev) => ({
            ...prev,
            [id]: updated
        }));
        decrement();
        if (updated === 0) {
            // Remove item from the selected array in the global state
            selectedItemsStore.setState((state) => ({
                selected: state.selected.filter((item) => item.id !== id)
            }));
        }
        if (selected.length === 0) {
            countStore.setState(0);
        }
    };

    // Calculate total cost whenever the number of items changes
    useEffect(() => {
        let totalCost = 0;
        selected.forEach(item => {
            totalCost += (number[item.id] || 1) * item.price;
        });
        setCost(totalCost);
    }, [number, selected]);
    const handleSubmit = () => {
        setCircularProgress(true)
        if (phoneNumber.length < 10) {
            setErrorAlert(true)

        }

    }
    return (
        <div>
            <Navbar />
            <div className="absolute  top-[35%]  z-40 ">
                <Stack sx={{ width: '100% ', height: '20px' }} spacing={2}>
                    {errorAlert ? <Alert variant="filled" severity="error" onClose={() => { setErrorAlert(prev => !prev); history('/login'); setPhoneNumber("") }}>
                        <AlertTitle>Error</AlertTitle>
                        user Exists LogIn
                    </Alert> : ""}
                    {successAlert ? <Alert variant="filled" severity="success" onClose={() => { setSuccessAlert(prev => !prev), history('/menu') }}>
                        <AlertTitle>Success</AlertTitle>
                        Welcome!
                    </Alert> : ""}

                </Stack>
            </div>
            <div className="flex flex-col md:flex-row md:h-full">

                <div className="overflow-y-auto flex-1 p-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
                        {cost === 0 ? <h1 className="col-span-full text-center">No items In the Cart</h1> : selected.map((item) => (
                            <div key={item.id} className="flex flex-col items-center justify-between bg-white shadow-md rounded-md p-5 relative">
                                <img src={`https://zivato-foods.onrender.com/${item.file}`} alt="" className="w-[75%] h-40 object-cover mb-3" />
                                <h3 className="text-lg font-semibold">{item.name}</h3>
                                <h4 className="text-red-500 font-semibold mb-3">Kshs. {item.price}</h4>
                                <div className="flex items-center">
                                    <button className="border border-orange-500 rounded p-1 m-1" onClick={() => handleAdd(item.id)}>
                                        <AddOutlinedIcon />
                                    </button>
                                    <span className="text-lg font-semibold mx-2">{number[item.id] || 1}</span>
                                    <button className="border border-orange-500 rounded p-1 m-1" onClick={() => handleMinus(item.id)}>
                                        <RemoveOutlinedIcon />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="md:border-l md:border-orange-400 md:p-5 sm:border-l  bg-white md:w-1/4 flex flex-col justify-center items-center">
                    <span>
                        <h2 className="text-xl font-semibold">Total Cost: <span className="text-orange-400">{cost}</span></h2>
                    </span>

                    <form className="w-full max-w-md" onSubmit={handleSubmit}>
                        <h1 className="text-xl p-3">Initiate PayMent</h1>
                        <div className="mb-6">
                            <FormControl fullWidth className="mb-4">
                                <InputLabel htmlFor="outlined-adornment-email" ></InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-email"
                                    type="number"
                                    // value={email}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    endAdornment={<InputAdornment position="end">Enter your phone number</InputAdornment>}
                                    className="w-full"
                                />
                            </FormControl>
                        </div>
                        <button
                            className="bg-slate-200   hover:text-blue-500 text-orange-400 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline  text-xl flex flex-row gap-5 items-center justify-between"
                            type="submit"

                        >
                            {circularProgress ? <Box sx={{ display: 'flex' }} >
                                <CircularProgress className='h-1 w-1 text-orange-400' />
                            </Box> : ""}Pay
                        </button>
                    </form>
                </div>
            </div >
        </div >
    );
}

export default Cart;
