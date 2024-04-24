import { useEffect, useState } from 'react';
import axios from 'redaxios';
import loading1 from '../Assets/loading1.json';
import Lottie from "react-lottie";
import { countStore, selectedItemsStore, AllItems } from './store';
import Rating from '@mui/material/Rating';
import Navbar from '../Navigate/Navbar';

function Menu() {
    const [breakfast, setBreakfast] = useState([]);
    const [lunch, setLunch] = useState([]);
    const [supper, setSupper] = useState([]);
    const [clickedItems, setClickedItems] = useState([]);
    const { increment } = countStore();
    const { select, selected } = selectedItemsStore();
    const [itemRatings, setItemRatings] = useState({});
    const allItemsStore = AllItems();
    const { setAllItems } = allItemsStore;

    useEffect(() => {
        const fetchItems = async (url, setState) => {
            try {
                const response = await axios.get(url);
                setState(response.data);
                setAllItems(prevItems => [...prevItems, ...response.data]);
            } catch (error) {
                console.error('An error occurred', error);
            }
        };

        const Lunch = async () => {
            await fetchItems('http://localhost:3000/api/getlunch/', setLunch);
        };

        const Super = async () => {
            await fetchItems('http://localhost:3000/api/getsupper/', setSupper);
        };

        const fetchAllItems = async () => {
            await fetchItems('http://localhost:3000/api/getbreakfast/', setBreakfast);
            await Super();
            await Lunch();
        };

        fetchAllItems();

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [setAllItems]);

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

    const renderMenuItems = (items, category) => (
        <div className="m-10">
            <h1 className="text-3xl font-bold mb-5">{category}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {items.length > 0 ? (
                    items.map((item) => (
                        <div key={item.id} className='bg-white shadow-md rounded-md p-5 relative'>
                            <img src={`http://localhost:3000/${item.file}`} alt="" className='w-full h-40 object-cover mb-3' />
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
    );

    return (
        <div>
            <Navbar />
            <div className='flex flex-col justify-around p-5' >
                {renderMenuItems(breakfast, 'Breakfast Refreshments')}
                {renderMenuItems(lunch, 'Lunch Food')}
                {renderMenuItems(supper, 'Supper Orders')}
            </div>
        </div>
    );
}

export default Menu;
