import { selectedItemsStore, countStore } from "./store";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import { useState, useEffect } from "react";

function Cart() {
    const { selected } = selectedItemsStore();
    const [number, setNumber] = useState({});
    const { increment, decrement } = countStore();
    const [cost, setCost] = useState(0)

    const handleAdd = (id) => {
        setNumber((prev) => ({
            ...prev,
            [id]: (prev[id] || 1) + 1
        }));
        increment();
    };

    const handleMinus = (id) => {
        const updated = Math.max((number[id] || 0) - 1, 0)
        setNumber((prev) => (
            {
                ...prev,
                [id]: updated

            }
        ));
        decrement()
        if (updated === 0) {
            // Remove item from the selected array in the global state
            selectedItemsStore.setState((state) => ({
                selected: state.selected.filter((item) => item.id !== id)
            }));
        }
        if (selected.length === 0) {
            countStore.setState(0)

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
        <div className="flex flex-row  ">

            <div className="flex gap-5 w-1/2 flex-wrap">
                {selected.map((item) => (
                    <div key={item.id} className='flex flex-col items-center justify-between bg-white shadow-md shadow-slate-500 z-40 p-5 w-1/3 relative'>
                        <img src={`http://localhost:3000/${item.file}`} alt="" className='w-[75%] h-20 object-cover' />
                        <h3>{item.name}</h3>
                        <h4>{item.price}</h4>


                        <span span className="flex items-start">
                            <button className='border border-orange-500 rounded p-1 m-1' onClick={() => handleAdd(item.id)}>
                                <AddOutlinedIcon />
                            </button>

                            <span><h1>{number[item.id] || 1}</h1></span>

                            <button className='border border-orange-500 rounded p-1 m-1' onClick={() => handleMinus(item.id)}>
                                <RemoveOutlinedIcon />
                            </button>
                        </span>
                    </div>
                ))}
            </div>
            <div className="flex flex-col items-center"><span ><h2 className="flex flex-row items-center">Total Cost : <h1 className="text-orange-400">{cost}</h1></h2></span></div>
        </div >
    );
}

export default Cart;
