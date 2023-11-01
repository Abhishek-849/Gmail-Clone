import { Dialog,Box ,Typography, styled, InputBase,TextField,Button} from "@mui/material";
import {Close ,DeleteOutline} from "@mui/icons-material";
import { useState } from "react";

import { API_URLS } from "../services/api.url";
import useApi from "../hooks/useApi";

const dialogStyle={
    height:'88%',
    width:'75%',
    maxWidth:'100%',
    maxHeight:'100%',
    boxShadow:'none',
    border:'10px 10px 0 0'
}

const Header=styled(Box)({
    display:"flex",
    justifyContent:'space-between',
    padding:'10px 15px',
    background:'#f2f6fc',
    '& > p':{
        fontSize:14,
        fontWeight:500
    }
})

const RecipientWrapper=styled(Box)({
    display:'flex',
    flexDirection: 'column',
    padding :"0 15px",
    "& >div":{
        fontSize:14,
        borderBottom:'1px solid #F5F5F5'
    }
    
})

const Footer=styled(Box)({
    display:"flex",
    justifyContent:"space-between",
    padding:"10px 15px",
    textAlign:"center",
})

const SendButton=styled(Button)({
    background:'#0B57D0',
    color:'#fff',
    fontWeight:500,
    textTransform:'none',
    borderRadius:18,
    width:100,
})


const ComposeMail=({openDialog,setOpenDialog})=>{

    const [data,setData]=useState({});
    const sentEmailServivce=useApi(API_URLS.saveSentEmail);
    const saveDraftService=useApi(API_URLS.saveDraftEmails);

    const config={
            Host : "smtp.elasticemail.com",
            Username : "cloneproject69@yopmail.com",
            Password : "35434DBB2B51758DFEA9E0E2B7D507ACB929",
            Port:2525
    }

    const closeComposeMail=(e)=>{
        e.preventDefault();
        const payload={
            to:data.to,
            from:'abhishekdwivedi840=9@gmail.com',
            subject:data.subject,
            body:data.body,
            date: new Date(),
            image:"",
            name:"Abhishek",
            starred:false,
            type:'drafts'
         }
         saveDraftService.call(payload);

         if(!saveDraftService.error){
            setOpenDialog(false);
            setData({})
         }else{
            console.log("something");
         }
    }

    const sendMail=(e)=>{
        e.preventDefault();
        if(window.Email){
            window.Email.send({
                ...config,
                 To : data.to,
                 From : 'abhishekdwivedi849@gmail.com',
                 Subject : data.subject,
                 Body : data.body
             }).then(
               message => alert(message)
             );

        }

         const payload={
            to:data.to,
            from:'abhishekdwivedi840=9@gmail.com',
            subject:data.subject,
            body:data.body,
            date: new Date(),
            image:"",
            name:"Abhishek",
            starred:false,
            type:'sent'
         }
         sentEmailServivce.call(payload);

         if(!sentEmailServivce.error){
            setOpenDialog(false);
            setData({})
         }else{
            console.log("something");
         }
        setOpenDialog(false);
    }

    const onValueChange=(e)=>{
        setData({...data ,[e.target.name]:e.target.value})

    }

    return (
        <Dialog  open={openDialog} PaperProps={{sx:dialogStyle}}>
            <Header>
                <Typography>New Message</Typography>
                <Close fontSize="small" onClick={(e)=>closeComposeMail(e)}/>
            </Header>
            <RecipientWrapper>
                <InputBase placeholder="Recipients" name="to" onChange={(e)=>onValueChange(e)}/>
                <InputBase placeholder="Subject" name="subject" onChange={(e)=>onValueChange(e)}   />
            </RecipientWrapper>
            <TextField 
                multiline
                rows={18}
                sx={{'& .MuiOutlinedInput-notchedOutline':{border:'none'}}}
                onChange={(e)=>onValueChange(e)}
                name="body"
            />
            <Footer>
                <SendButton onClick={(e)=>sendMail(e)}>Send</SendButton>
                <DeleteOutline onClick={()=>setOpenDialog(false)} />
            </Footer>
        </Dialog>
    )
}

export default ComposeMail;