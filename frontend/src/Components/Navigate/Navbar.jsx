import { NavLink } from "react-router-dom"
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import { countStore } from "../store";
function Navbar() {
    const { count } = countStore();

    return (
        <div className="flex flex-row justify-between p-10 m-0 items-center sticky top-0 z-50 bg-white">
            <div className="text-orange-400 font-bold text-3xl">Ziva<span className="text-black">to</span></div>
            <div className="flex flex-row justify-evenly gap-10">
                <div className="flex flex-row items-center justify-between gap-5">
                    <NavLink to='/'><button className="flex  items-center gap-2   p-2 rounded-[15px]">Home</button></NavLink>
                    <NavLink to='/menu'><button className="flex  items-center gap-2   p-2 rounded-[15px]">Menu</button></NavLink >
                    <NavLink to='/service'><button className="flex  items-center gap-2  p-2 rounded-[15px]">Service</button ></NavLink >

                </div >
                <div className="flex  justify-between items-center gap-5">
                    <NavLink to='/search'><button className="flex  items-center gap-2  p-2 rounded-[15px]"><SearchOutlinedIcon /></button></NavLink>
                    <NavLink to="/cart"><button className="flex  items-center gap-2  p-2 rounded-[15px] relative "><ShoppingCartOutlinedIcon /><button className="absolute top-0 right-0  m-0.5 bg-orange-400 rounded-[100%] p-0.5">{count}</button></button></NavLink>
                </div>
                <div className="flex flex-row justify-between items-center gap-10 bg-slate-800 rounded p-2">
                    <NavLink to='/signin'><button className="flex  items-center gap-2 text-white border p-2 rounded-[15px]"><span><GroupAddOutlinedIcon /></span>SignIn</button></NavLink>
                    <NavLink to='/login'><button className="flex  items-center gap-2 text-white border p-2 rounded-[10px] bg-orange-500"><span><LoginOutlinedIcon /></span>LogIn</button></NavLink>
                    <NavLink to="/upload"><button className="flex  items-center gap-2 text-white border p-2 rounded-[15px]">Upload</button></NavLink>
                </div>


            </div >
        </div >
    )
}

export default Navbar