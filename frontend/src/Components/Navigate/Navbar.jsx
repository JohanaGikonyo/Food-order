import { NavLink } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
// import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { countStore } from "../store";

function Navbar() {
    const { count } = countStore();
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

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

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));
    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        width: '100%',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
    }));

    return (
        <div className="flex flex-row justify-between pb-5 pt-5 m-0 items-center sticky top-0 z-50 bg-white">
            <div className="text-orange-400 font-bold text-3xl">Ziva<span className="text-black">to</span></div>
            <div className="flex flex-row items-center justify-between gap-10">
                <div className="hidden lg:flex lg:flex-row lg:items-center lg:justify-between lg:gap-5 ">
                    <NavLink to='/'><button className="flex items-center gap-2 p-2 rounded-[15px]">Home</button></NavLink>
                    <NavLink to='/menu'><button className="flex items-center gap-2 p-2 rounded-[15px]">Menu</button></NavLink>
                    {/* <NavLink to='/service'><button className="flex items-center gap-2 p-2 rounded-[15px]">Service</button></NavLink> */}
                </div>
                <div className="flex items-center gap-5">
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search><NavLink to="/cart"><button className="flex items-center gap-2 p-2 rounded-[15px] relative"><ShoppingCartOutlinedIcon /><button className="absolute top-0 right-0 m-0.5 bg-orange-400 rounded-[100%] p-0.5">{count}</button></button></NavLink>
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
                        {/* <NavLink to='/service' onClick={() => setMenuOpen(false)}><button className="flex items-center gap-2 text-black border p-2 rounded-[15px]">Service</button></NavLink>*/}
                        <NavLink to='/signin' onClick={() => setMenuOpen(false)}><button className="flex items-center gap-2 text-black border p-2 rounded-[15px]"><span><GroupAddOutlinedIcon /></span>SignIn</button></NavLink>
                        <NavLink to='/login' onClick={() => setMenuOpen(false)}><button className="flex items-center gap-2 text-black border p-2 rounded-[10px] bg-orange-500"><span><LoginOutlinedIcon /></span>LogIn</button></NavLink>
                        <NavLink to="/upload" onClick={() => setMenuOpen(false)}><button className="flex items-center gap-2 text-black border p-2 rounded-[15px]">Upload</button></NavLink>
                    </div>
                )
            }
        </div >
    );
}

export default Navbar;
