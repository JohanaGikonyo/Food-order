import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined';
import CopyrightOutlinedIcon from '@mui/icons-material/CopyrightOutlined';

function Footer() {
    return (
        <footer className="py-4 px-6 border-t border-b mt-5 sm:flex sm:items-center sm:justify-between">
            <div className="flex flex-col items-center sm:flex-row">
                <span className='flex flex-row'>
                    <CopyrightOutlinedIcon className="h-6 w-6 mr-1 sm:mr-2" />
                    <p className="text-sm">Copyright {new Date().getFullYear()}, All rights Reserved.</p></span>
            </div>
            <div className="flex flex-col items-center sm:flex-row">
                <a href="mailto:johanagikonyo552@gmail.com" className="flex items-center">
                    <ContactMailOutlinedIcon className="h-5 w-5 mr-1 sm:mr-2" />
                    <span className="text-sm">johanagikonyo552@gmail.com</span>
                </a>
            </div>
        </footer>
    );
}

export default Footer;
