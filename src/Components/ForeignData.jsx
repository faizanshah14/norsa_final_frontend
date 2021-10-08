import React,{useState} from 'react'
import { useForm } from "react-cool-form";
import '../style/form.css';
import { Link, useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import ButtonAppBar from './titleheading';
import { CompassCalibrationOutlined, PinDropSharp } from "@material-ui/icons";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { useHistory } from "react-router-dom";
import SideBar from './sidebar';
import axios from 'axios';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';
import { InputLabel } from '@material-ui/core';
import { FormControl, Input, FormHelperText } from '@material-ui/core';
import { useEffect } from 'react';
import Paper from '@material-ui/core/Paper';

export default function ForeignData(props){


    var data=props.data[props.title];
    var columns=data["clientColumns"];
    const [formData, setFormData] = useState({})
    const history = useHistory();
    let { id } = useParams();
    var response;
    var token;

  


    useEffect(async () => {
        console.log("---------------------------------------------------------abc-----------");
        // store.addNotification({
        //     title: "Wonderful!",
        //     message: "Form Submitted Successfully",
        //     type: "info",
        //     container: "top-right",
        //     dismiss: {
        //         duration: 5000,

        //     }
        // });
        const storage = window.localStorage;
        token = storage.getItem("token");
        if (!token) {
            console.log("in null");
            history.push('/login');

        }
        else {

            // formId=props.match.params.id;
            console.log("--------------------------------------------------------");
            console.log("in data"+props.data[props.title]["getUrl"]+"-----"+props.title);
            console.log(props.data[props.title]);

            response = await fetch(props.data[props.title]["getUrl"]+ props.id, {

                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }


            })
            console.log("in fetch---------------------------------------------------------");
            response = await response.json();
            setFormData(response);
            console.log("your response is" + id + props.view);
            console.log(response);
        }



    }, [props.id]);

return(


 <div  className="foreignData" component={Paper}>
    {/* {console.log("your data is-----------------------------------------------------"+props.id)}
    {console.log(formData)} */}


<ButtonAppBar heading={props.heading} />

{columns.map((col,index)=>{

return(
 
//     <FormControl>
//                         <InputLabel htmlFor={""+col}>{col}</InputLabel>
//                         <Input id={col} name={col} readOnly="true"   value={formData[col]}   />
                    
//  </FormControl> 
 <FormControl>
 <InputLabel  htmlFor={"my-input"+index}>{col}</InputLabel>
 <Input id={"my-input"+index} aria-describedby="my-helper-text" value={formData[col] || ""} />
 
</FormControl>


)
console.log(col);


})}



 


 
</div>


)



}