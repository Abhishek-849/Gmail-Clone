import { useOutletContext,useParams } from "react-router-dom";
import { API_URLS } from "../services/api.url";
import useApi from '../hooks/useApi'
import { useEffect,useState } from "react";
import { Checkbox,Box,List,ListItems } from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import Email from "./Email";
import NoMails from "./common/NoMails";
import { EMPTY_TABS } from "../constants/constant";


const Emails=()=>
{
    const [selectdEmails,setSelectedEmails]=useState([]);
    const [refereshScren,setRefreshScreen]=useState(false);

    const moveEmailsToBinService=useApi(API_URLS.moveEmailsToBin);
    const deleteEmailService=useApi(API_URLS.deleteEmail);
    const {openDrawer}=useOutletContext();

    const {type}=useParams();



    const getEmailService=useApi(API_URLS.getEmailFromType);
    useEffect(()=>{
        getEmailService.call({},type);

    },[type,refereshScren])

    const selectAllEmails=(e)=>{
        if(e.target.checked){
           const emails= getEmailService?.response?.map(email=>email._id);
            setSelectedEmails(emails);
        }else{
            setSelectedEmails([]);

        }
    }

    const deleteSelectedEmails=(e)=>{
        if(type==='bin'){
                deleteEmailService.call(selectdEmails);
        }else{
            moveEmailsToBinService.call(selectdEmails);
        }
        setRefreshScreen(prevState=>!prevState);
    }

    return (
        <Box style={openDrawer ? {marginLeft:250,width:'calc(100%-250px)'}:{width:'100%'}}> 
            <Box style={{padding:"20px 10px 0 10px",display:'flex',alignItems:'center'}}>
                <Checkbox size="small" onChange={(e)=>selectAllEmails(e)}/>
                <DeleteOutline onClick={(e)=>deleteSelectedEmails(e)}/>

            </Box>
            <List>
                {
                    getEmailService?.response?.map(email=>(
                        <Email
                            key={email._id}
                            email={email}
                            selectdEmails={selectdEmails}
                            setRefreshScreen={setRefreshScreen}
                            setSelectedEmails={setSelectedEmails}
                        />
                    ))
                }
            </List>
            {
                getEmailService?.response?.length === 0 &&
                    <NoMails message={EMPTY_TABS[type]} />
            }
        </Box>
    )
}

export default Emails;