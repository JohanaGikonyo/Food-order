import { useEffect, useState } from 'react';
import axios from 'redaxios';
import loading1 from './Assets/loading1.json';
import Lottie from "react-lottie";
import { countStore, selectedItemsStore } from './store';
import Rating from '@mui/material/Rating';
import Navbar from './Navigate/Navbar';
// import Typography from '@mui/material/Typography';
function Menu() {
    const [breakfast, setBreakfast] = useState([]);
    const [lunch, setLunch] = useState([]);
    const [supper, setSupper] = useState([]);
    const [clickedItems, setClickedItems] = useState([]);
    const { increment } = countStore();
    const { select, selected } = selectedItemsStore();
    const [itemRatings, setItemRatings] = useState({});
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
        const fetchItems = async () => {
            try {
                const response = await axios.get('https://food-order-app3.onrender.com/api/getbreakfast/');
                setBreakfast(response.data);
            } catch (error) {
                console.error('An error occurred', error);
            }
        };

        const Lunch = async () => {
            try {
                const response = await axios.get('https://food-order-app3.onrender.com/api/getlunch/');
                setLunch(response.data);
            } catch (error) {
                console.error('An error occurred', error);
            }
        };

        const Super = async () => {
            try {
                const response = await axios.get('https://food-order-app3.onrender.com/api/getsupper/');
                setSupper(response.data);
            } catch (error) {
                console.error('An error occurred', error);
            }
        };

        Super();
        Lunch();
        fetchItems();
    }, []);

    const handleCount = () => {
        increment();
    };

    const handleItemClicked = (id) => {
        setClickedItems([...clickedItems, id]);
    };

    const isItemClicked = (id) => {
        return clickedItems.includes(id);
    };

    const isItemSelected = (id) => {
        return selected.some(item => item.id === id);
    };

    const selectedItem = (item) => {
        select(item);
    };


    const handleRatingChange = (newValue, itemId) => {
        setItemRatings(prevState => ({
            ...prevState,
            [itemId]: newValue
        }));
    };

    return (
        <div>
            <Navbar />
            <div className='flex flex-col justify-around p-5' >
                <div className='m-10'>
                    <h1 className="text-3xl font-bold mb-5">Breakfast Refreshments</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {breakfast.length > 0 ? (
                            breakfast.map((item) => (
                                <div key={item.id} className='bg-white shadow-md rounded-md p-5 relative'>
                                    <img src={`https://food-order-app3.onrender.com/${item.file}`} alt="" className='w-full h-40 object-cover mb-3' />
                                    <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="text-red-500 font-semibold text-lg">Kshs. {item.price}</h3>
                                        {isItemSelected(item.id) ? (
                                            <button className="bg-orange-400 text-white py-1 px-3 rounded">Added</button>
                                        ) : (
                                            <button className={`bg-orange-400 text-white py-1 px-3 rounded ${isItemClicked(item.id) ? 'hidden' : ''}`} onClick={() => { handleCount(); handleItemClicked(item.id); selectedItem(item) }}>Add To Cart</button>
                                        )}
                                    </div>
                                    <Rating
                                        name={`rating-${item.id}`} // Unique name for each rating component
                                        value={itemRatings[item.id] || 5} // Use stored rating or default to 0
                                        onChange={(event, newValue) => handleRatingChange(newValue, item.id)} // Pass item id to handleRatingChange
                                    />
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
                </div>
                {/* Lunch Food */}
                <div className="m-10">
                    <h1 className="text-3xl font-bold mb-5">Lunch Food</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {lunch.length > 0 ? (
                            lunch.map((item) => (
                                <div key={item.id} className='bg-white shadow-md rounded-md p-5 relative'>
                                    <img src={`https://food-order-app3.onrender.com/${item.file}`} alt="" className='w-full h-40 object-cover mb-3' />
                                    <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="text-red-500 font-semibold text-lg">Kshs. {item.price}</h3>
                                        {isItemSelected(item.id) ? (
                                            <button className="bg-orange-400 text-white py-1 px-3 rounded">Added</button>
                                        ) : (
                                            <button className={`bg-orange-400 text-white py-1 px-3 rounded ${isItemClicked(item.id) ? 'hidden' : ''}`} onClick={() => { handleCount(); handleItemClicked(item.id); selectedItem(item) }}>Add To Cart</button>
                                        )}
                                    </div>
                                    <div className='flex flex-row justify-between items-center'>
                                        <Rating
                                            name={`rating-${item.id}`} // Unique name for each rating component
                                            value={itemRatings[item.id] || 4} // Use stored rating or default to 0
                                            onChange={(event, newValue) => handleRatingChange(newValue, item.id)} // Pass item id to handleRatingChange
                                        />
                                        <p className="text-sm">{item.description}</p>
                                    </div>
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
                </div>
                {/* Supper Orders */}
                <div className="m-10">
                    <h1 className="text-3xl font-bold mb-5">Supper Orders</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {supper.length > 0 ? (
                            supper.map((item) => (
                                <div key={item.id} className='bg-white shadow-md rounded-md p-5 relative'>
                                    <img src={`https://food-order-app3.onrender.com/${item.file}`} alt="" className='w-full h-40 object-cover mb-3' />
                                    <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="text-red-500 font-semibold text-lg">Kshs. {item.price}</h3>
                                        {isItemSelected(item.id) ? (
                                            <button className="bg-orange-400 text-white py-1 px-3 rounded">Added</button>
                                        ) : (
                                            <button className={`bg-orange-400 text-white py-1 px-3 rounded ${isItemClicked(item.id) ? 'hidden' : ''}`} onClick={() => { handleCount(); handleItemClicked(item.id); selectedItem(item) }}>Add To Cart</button>
                                        )}
                                    </div>
                                    <div className='flex flex-row justify-between items-center'>
                                        <Rating
                                            name={`rating-${item.id}`} // Unique name for each rating component
                                            value={itemRatings[item.id] || 3} // Use stored rating or default to 0
                                            onChange={(event, newValue) => handleRatingChange(newValue, item.id)} // Pass item id to handleRatingChange
                                        />
                                        <p className="text-sm">{item.description}</p>
                                    </div>
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
                </div>
            </ div></div>
    );
}

export default Menu;
