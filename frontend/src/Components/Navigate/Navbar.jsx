import { NavLink } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { countStore } from "../Pages/store";

function Navbar() {
    const { count } = countStore();
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
    // const { allItems } = AllItems();

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleMenuToggle = () => {
        setMenuOpen(prev => !prev);
    };

    // useEffect(() => {
    //     async function fetchData() {
    //         try {
    //             const response = await fetch('https://zivato-foods.onrender.com/api/getbreakfast/');
    //             const data = await response.json();
    //             setAllItems(data);
    //         } catch (error) {
    //             console.error('An error occurred', error);
    //         }
    //     }
    //     fetchData();
    // }, [setAllItems]);

    return (
        <div className="flex flex-row justify-between pb-5 pt-5 m-0 items-center sticky top-0 z-50 bg-white">
            <div className="text-orange-400 font-bold text-3xl">Ziva<span className="text-black">to</span></div>
            <div className="flex flex-row items-center justify-between gap-10">
                <div className="hidden lg:flex lg:flex-row lg:items-center lg:justify-between lg:gap-5 ">
                    <NavLink to='/'><button className="flex items-center gap-2 p-2 rounded-[15px]">Home</button></NavLink>
                    <NavLink to='/menu'><button className="flex items-center gap-2 p-2 rounded-[15px]">Menu</button></NavLink>
                    {/* <NavLink to='/service'><button className="flex items-center gap-2 p-2 rounded-[15px]">Service</button></NavLink> */}
                </div>
                <div className="flex items-center ">
                    <Stack spacing={1} sx={{
                        width: 150

                    }
                    } >


                        < TextField

                            label="Search Item"
                            InputProps={{

                                type: 'search',
                            }}
                        />


                    </Stack>
                    <NavLink to="/cart" className="relative">
                        <button className="flex items-center gap-2 p-2 rounded-[15px]">
                            <ShoppingCartOutlinedIcon />
                            <span className="absolute top-0 right-0 m-0.5 bg-orange-400 rounded-[100%] p-0.5">{count}</span>
                        </button>
                    </NavLink>
                </div>
                <div className="hidden lg:flex lg:justify-between gap-5 items-center">
                    <NavLink to='/signin' onClick={() => setMenuOpen(false)}><button className="flex items-center gap-2 text-black border p-2 rounded-[15px]"><span><GroupAddOutlinedIcon /></span>SignIn</button></NavLink>
                    <NavLink to='/login' onClick={() => setMenuOpen(false)}><button className="flex items-center gap-2 text-black border p-2 rounded-[10px] bg-orange-500"><span><LoginOutlinedIcon /></span>LogIn</button></NavLink>
                    <NavLink to="/upload" onClick={() => setMenuOpen(false)}><button className="flex items-center gap-2 text-black border p-2 rounded-[15px]">Admin</button></NavLink>
                </div>
                <div className="flex items-center gap-5">
                    <button onClick={handleMenuToggle} className="sm:hidden flex items-center gap-2 p-2 rounded-[15px] transition-transform transform hover:scale-110">{menuOpen ? <CloseIcon /> : <MenuIcon />}</button>
                </div>
            </div>
            {
                menuOpen && (
                    <div ref={menuRef} className="sm:hidden flex flex-col items-center justify-center gap-5 bg-gray-200 p-5 absolute top-[70px] right-0 left-0 z-50 transition-transform transform scale-110">
                        <NavLink to='/' onClick={() => setMenuOpen(false)}><button className="flex items-center gap-2 text-black border p-2 rounded-[15px]  border-b-2 w-[100%]">Home</button></NavLink>
                        <NavLink to='/menu' onClick={() => setMenuOpen(false)}><button className="flex items-center gap-2 text-black border p-2 rounded-[15px]">Menu</button></NavLink>
                        {/* <NavLink to='/service' onClick={() => setMenuOpen(false)}><button className="flex items-center gap-2 text-black border p-2 rounded-[15px]">Service</button></NavLink> */}
                        <NavLink to='/signin' onClick={() => setMenuOpen(false)}><button className="flex items-center gap-2 text-black border p-2 rounded-[15px]"><span><GroupAddOutlinedIcon /></span>SignIn</button></NavLink>
                        <NavLink to='/login' onClick={() => setMenuOpen(false)}><button className="flex items-center gap-2 text-black border p-2 rounded-[10px] bg-orange-500"><span><LoginOutlinedIcon /></span>LogIn</button></NavLink>
                        <NavLink to="/upload" onClick={() => setMenuOpen(false)}><button className="flex items-center gap-2 text-black border p-2 rounded-[15px]">Admin</button></NavLink>
                    </div>
                )
            }
        </div >
    );
}

export default Navbar;
