import { useEffect, useState } from 'react';
import axios from 'redaxios';
import loading1 from './Assets/loading1.json'
import Lottie from "react-lottie";
import { countStore, selectedItemsStore } from './store';



function Products() {
    const [breakfast, setBreakfast] = useState([]);
    const [lunch, setLunch] = useState([])
    const [supper, setSupper] = useState([])
    const [clickedItems, setClickedItems] = useState([])
    const { increment } = countStore();
    const { select } = selectedItemsStore()

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/getbreakfast/');
                setBreakfast(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('An error occurred', error);
            }
        };
        const Lunch = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/getlunch/');
                setLunch(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('An error occurred', error);
            }
        };
        const Super = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/getsupper/');
                setSupper(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('An error occurred', error);
            }
        };
        Super()
        Lunch()
        fetchItems();
    }, []);
    const handleCount = () => {
        increment()

    };
    const handleItemClicked = (id) => {
        setClickedItems([...clickedItems, id])
    }

    const isItemClicked = (id) => {
        // Ensure clickedItems is an array before calling includes
        return Array.isArray(clickedItems) && clickedItems.includes(id);
    };
    const selectedItem = (item) => {
        select(item)
    }

    return (
        < div className='flex flex-col justify-around  p-5 ' >

            <div className='m-10'>
                <h1>Break Refreshments</h1>
                <div className="flex justify-between gap-10">

                    {breakfast.length > 0 ? (
                        breakfast.map((item) => (
                            <div key={item.id} className='flex flex-col items-center justify-between bg-white shadow-md shadow-slate-500 z-40 p-5 w-1/3 relative'>
                                <img src={`http://localhost:3000/${item.file}`} alt="" className='w-[75%] h-20 object-cover' />
                                <h2>{item.name}</h2>
                                <button className='absolute top-[50%] left-1 text-red-500 text-xl rounded p-0.5'><h3><span>kshs.</span>  {item.price}</h3></button>
                                <h4>{item.description}</h4>
                                <button className={`${isItemClicked(item.id) ? 'hidden' : ""}bg-orange-400 text-white p-1 rounded absolute right-1 bottom-1`} onClick={() => { handleCount(); handleItemClicked(item.id); selectedItem(item) }}>Add To Cart</button>
                                <button className={`${!isItemClicked(item.id) ? "hidden " : ''}bg-orange-400 text-white p-1 rounded absolute right-1 bottom-1 `} >Added</button>
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
                </div></div >
            <div className="m-10">
                <h1>Lunch Food</h1>
                <div className="flex justify-around gap-10 p-5">

                    {lunch.length > 0 ? (
                        lunch.map((item) => (

                            <div key={item.id} className='flex flex-col items-center justify-between bg-white shadow-md shadow-slate-500 z-40 p-5 w-1/3 relative'>
                                <img src={`http://localhost:3000/${item.file}`} alt="" className='w-[75%] h-20 object-cover' />
                                <h2>{item.name}</h2>
                                <button className='absolute top-[50%] left-1 text-red-500 text-xl rounded p-0.5'><h3><span>kshs.</span>  {item.price}</h3></button>
                                <h4>{item.description}</h4>
                                <button className={`${isItemClicked(item.id) ? 'hidden' : ""}bg-orange-400 text-white p-1 rounded absolute right-1 bottom-1`} onClick={() => { handleCount(); handleItemClicked(item.id); selectedItem(item) }}>Add To Cart</button>
                                <button className={`${!isItemClicked(item.id) ? "hidden " : ''}bg-orange-400 text-white p-1 rounded absolute right-1 bottom-1 `} >Added</button>
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
                </div></div>
            <div className="m-10">
                <h1>Supper Orders</h1>
                <div className="flex justify-between gap-10">
                    {supper.length > 0 ? (
                        supper.map((item) => (
                            <div key={item.id} className='flex flex-col items-center justify-between bg-white shadow-md shadow-slate-500 z-40 p-5 w-1/3 relative'>
                                <img src={`http://localhost:3000/${item.file}`} alt="" className='w-[75%] h-20 object-cover' />
                                <h2>{item.name}</h2>
                                <button className='absolute top-[50%] left-1 text-red-500 text-xl rounded p-0.5'><h3><span>kshs.</span>  {item.price}</h3></button>
                                <h4>{item.description}</h4>
                                <button className={`${isItemClicked(item.id) ? 'hidden' : ""}bg-orange-400 text-white p-1 rounded absolute right-1 bottom-1`} onClick={() => { handleCount(); handleItemClicked(item.id); selectedItem(item) }}>Add To Cart</button>
                                <button className={`${!isItemClicked(item.id) ? "hidden " : ''}bg-orange-400 text-white p-1 rounded absolute right-1 bottom-1 `} >Added</button>
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
                </div></div>
        </div >

    );

}

export default Products;
