import img1 from './Assets/breakfast3.jpg';
import { NavLink } from 'react-router-dom';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
function Home() {
    return (
        <div className=" grid grid-cols-1 sm:grid-cols-2 bg-gray-100 gap-1 justify-center">
            {/* Left Column with Logo and Motivating Words */}
            <div className="flex flex-col justify-center items-center px-4 py-8 sm:p-12">
                <div className="text-center mb-8">
                    <h1 className="text-5xl font-bold mb-4 text-orange-400">Ziva<span className="text-black">to</span></h1>
                    <h4 className="text-3xl font-semibold  border-b border-orange-400">Your Food Centre</h4>
                </div>
                {/* Center Grid Layout */}
                <div className="grid grid-cols-2 gap-8">
                    {/* First Column */}
                    <div className="flex flex-col items-center justify-around">
                        <div className="bg-white p-6 rounded-lg shadow-md mb-4">
                            <h2 className="text-lg font-semibold mb-2 text-blue-400">Breakfast</h2>
                            <p className="text-gray-600 text-lg">Start your day with our delicious breakfast options.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md mb-4">
                            <h2 className="text-lg font-semibold mb-2">Lunch</h2>
                            <p className="text-gray-600 text-lg">Satisfy your hunger with our mouth-watering lunch meals.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md mb-4">
                            <h2 className="text-lg font-semibold mb-2">Dinner</h2>
                            <p className="text-gray-600 text-lg">Enjoy a cozy dinner with our special supper dishes.</p>
                        </div>
                    </div>
                    {/* Second Column */}
                    <div className="flex flex-col items-center  justify-center">
                        <div className="bg-white p-6 rounded-lg shadow-md mb-4">
                            <h2 className="text-lg font-semibold mb-2">Snacks</h2>
                            <p className="text-gray-600 text-lg">Treat yourself with our delightful snack items.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md mb-4">
                            <h2 className="text-lg font-semibold mb-2 text-blue-400">Drinks</h2>
                            <p className="text-gray-600 text-lg">Quench your thirst with our refreshing beverage selection.</p>
                        </div>
                    </div>
                </div>
                <div className='mt-10'>
                    <button className='border border-orange-400 p-1 rounded'><NavLink to='/menu'>Get Started <span className='text-orange-400'><ArrowForwardOutlinedIcon /></span></NavLink></button></div>
            </div>
            {/* Right Column with Image */}
            <div className="flex items-center justify-center mx-auto">
                <img src={img1} alt="Food" className="w-[100%] h-[75%] rounded-lg shadow-md object-cover" />
            </div>
        </div>
    );
}

export default Home;
