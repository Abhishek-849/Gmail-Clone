import {Box,Typography,Checkbox,styled} from '@mui/material';
import {Star ,StarBorder} from '@mui/icons-material';
import {useNavigate} from 'react-router-dom';
import {routes} from '../routes/routes';
import useApi from '../hooks/useApi';
import { API_URLS } from '../services/api.url';

const Wrapper=styled(Box)({
    padding:'0 0 0 10px',
    background:'#f2f6fc',
    display:'flex',
    alignItems:'center',
    cursor:'pointer',
    '&>div ':{
        display:'flex',
        width:'100%',
        '&>p':{
            fontSize:14
        }
    }

});

const Indicator=styled(Typography)({
    fontSize:'12px |important',
    background:'#ddd',
    color:'#222',
    padding:'0 4px',
    borderRadius:4,
    marginRight:6

});

const Date=styled(Typography)({
    marginLeft:'auto',
    marginRight:20,
    fontSize:12,
    color:'#5f6368',

});


const Email=({email,selectdEmails,setRefreshScreen,setSelectedEmails})=>{

    const navigate=useNavigate();

    const toggleStarredServeice =useApi(API_URLS.toggleStarredEmail);

    const toggleStarredMail=()=>{
        toggleStarredServeice.call({id:email._id,value:!email.starred})
        setRefreshScreen(prevState => !prevState);
    }

    const onValueChange=()=>{
        if(selectdEmails.includes(email._id)){
            setSelectedEmails(precState=>precState.filter(id=>id!=email._id)); 
        }else{
            setSelectedEmails(precState=>[...precState,email._id])
        }
    }

    return (
       <Wrapper>
            <Checkbox 
            fontSize='small'
            checked={selectdEmails.includes(email._id)}
            onChange={()=> onValueChange()}
             />
             {
                email.starred? <Star fontSize="small" style={{marginRight:10,color:'#FFF200'}}  onClick={() =>toggleStarredMail()}/> :
                <StarBorder fontSize='small' style={{marginRight:10}} onClick={() =>toggleStarredMail()}/>
             }
            
            <Box onClick={()=>navigate(routes.view.path,{state:{email:email}})}>
                <Typography style={{width:200,overflow:'hidden'}}>{email.name}</Typography>
                <Indicator >Inbox</Indicator>
                <Typography>{email.subject} {email.body && '-'} {email.body}</Typography>
                <Date>
                    {(new window.Date(email.date)).getDate()}
                    {(new window.Date(email.date)).toLocaleString('default', {month:'long'})}
                </Date>
            </Box>
            
       </Wrapper>
    )
}

export default Email;