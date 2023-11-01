import {Drawer,styled} from '@mui/material';
import SideBarContet from './SideBarContent';


const SideBar =({openDrawer})=>{
    return(
        <Drawer anchor='left' open={openDrawer} hideBackdrop={true} ModalProps={{
            keepMounted:true
        }} variant='persistent' sx={{'& .MuiDrawer-paper' : {
            marginTop:"64px",
            width:250,
            background:"#F5F5F5",
            bordrtRight:'none',
            height:'calc(100vh-64px)'

        }}}>
            <SideBarContet />
        </Drawer>
    )
}

export default SideBar;