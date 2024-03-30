import { selectedItemsStore, countStore } from "./store";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import { useState, useEffect } from "react";
import Navbar from "./Navigate/Navbar";

function Cart() {
    const { selected } = selectedItemsStore();
    const [number, setNumber] = useState({});
    const { increment, decrement } = countStore();
    const [cost, setCost] = useState(0);

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

    return (
        <div>
            <Navbar />
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
                <div className="md:border-l md:border-orange-400 md:p-5 bg-white md:w-1/4 flex justify-center items-center">
                    <span>
                        <h2 className="text-xl font-semibold">Total Cost: <span className="text-orange-400">{cost}</span></h2>
                    </span>
                </div>
            </div></div>
    );
}

export default Cart;
