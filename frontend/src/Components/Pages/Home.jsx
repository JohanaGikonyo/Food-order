import img1 from './Assets/breakfast3.jpg';
import img2 from './Assets/logo2.png'
import { NavLink } from 'react-router-dom';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { useState } from 'react';
function Home() {
    const [expanded, setExpanded] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [modalImageSrc, setModalImageSrc] = useState(null); // New state to store the clicked image source
    const open = Boolean(anchorEl);

    const handleClick = (event, imageSrc) => {
        event.stopPropagation(); // Stop the propagation of the click event
        setAnchorEl(event.currentTarget);
        setModalImageSrc(imageSrc);
    };
    const handleClickImage = (event, imageSrcs) => {
        event.stopPropagation(); // Stop the propagation of the click event
        // setAnchorEl(event.currentTarget);
        setModalImageSrc(imageSrcs);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setModalImageSrc(null); // Clear the image source when closing modal
    };

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    return (

        < div className=" grid grid-cols-1 sm:grid-cols-2 bg-gray-100 gap-1 justify-between p-0" >
            {/* Left Column with Logo and Motivating Words */}
            <div className="flex flex-col justify-center items-center px-1 py-1 sm:p-12" >
                <div className="text-center mb-8">
                    <div className="flex flex-row items-center">
                        <div id="gallery" className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {/* onClick event now passes image source */}

                            <a href="#" className="group" onClick={(e) => handleClickImage(e, img2)}>
                                <img src={img2} alt="Image 2" className="w-full h-auto group-hover:opacity-50 rounded" />
                            </a>
                        </div>
                        <h1 className="text-4xl font-bold ml-4 text-orange-400">Ziva<span className="text-black">to</span></h1>
                    </div>


                    <span className='flex justify-between gap-4'> <h4 className="text-3xl font-semibold  border-b border-orange-400">Your Food Centre</h4><span><div className="space-y-2">
                        <Button
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                            variant="contained"
                            color="primary"
                        >
                            Dashboard
                        </Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{ 'aria-labelledby': 'basic-button' }}
                        >
                            <MenuItem onClick={handleClose}><NavLink to='/upload'>Admin</NavLink></MenuItem>
                            <MenuItem onClick={handleClose}><NavLink to='/login'>LogIn</NavLink></MenuItem>
                            <MenuItem onClick={handleClose}><NavLink to='/signin'>SignIn</NavLink></MenuItem>
                        </Menu>
                    </div></span></span>
                </div>
                {/* Center Grid Layout */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-8 m-10">
                    {/* First Column */}
                    <div className="flex flex-col space-y-4">
                        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                    Breakfast Refreshs
                                </Typography>
                                { }
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Start your day with our delicious breakfast options.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2bh-content"
                                id="panel2bh-header"
                            >
                                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                    Lunch Meals
                                </Typography>
                                { }
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Satisfy your hunger with our mouth-watering lunch meals.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>


                        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                    Evenning/Supper Meals
                                </Typography>
                                { }
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Enjoy a cozy dinner with our special supper dishes.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>

                    </div>
                    {/* Second Column */}
                    <div className="flex flex-col items-center  justify-center gap-10">

                        <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                    Snacks
                                </Typography>
                                { }
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Treat yourself with our delightful snack items.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>



                        <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                    Drinks
                                </Typography>
                                { }
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Quench your thirst with our refreshing beverage selection.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>

                    </div>
                </div>
                <div className='underline border-b-2 border-orange-400 w-[100%]'>
                    <h1 ><NavLink to="/menu"><button className='border border-orange-400 m-2 p-1'>Get Started</button></NavLink></h1>
                </div>
            </div >

            {/* Right Column with Image */}
            <div className="flex items-center justify-center mx-auto">
                {/* Modal for displaying the clicked image */}
                {modalImageSrc && (
                    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center" onClick={handleClose}>
                        <img src={modalImageSrc} alt="Modal Image" className="max-h-full max-w-full" />
                    </div>
                )}
                <img src={img1} alt="Foods" className="w-[400px] h-[400px] rounded-lg shadow-md object-cover" />
            </div>
        </div >
    );
}

export default Home;
