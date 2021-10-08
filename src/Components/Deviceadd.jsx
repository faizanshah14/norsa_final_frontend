import { render } from "react-dom";
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
import React, { Component, useState, useEffect } from 'react';
import SideBar from './sidebar';
import axios from 'axios';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';
import Select from 'react-select';
import ForeignData from './ForeignData';
import {data} from './helpers'


let count = 0;

function Form(props) {
  count++;
  const [formData, setFormData] = useState({
    "nameNumber":"",
    batteryStatus:"",
    status:"",
    id:""
   
   


  })
  const history = useHistory();
  let { id } = useParams();
  var response;
  var token;

  const addClient = async (event) => {
    event.preventDefault();
    const storage = window.localStorage;
    token=storage.getItem("token");
    console.log(formData);
    if (token) {
      response = await fetch('http://localhost:3000/api/device/upsertDevice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },

        body: JSON.stringify(formData)

      });

      response = await response.json();
      console.log("token");
  
      NotificationManager.success('Success message', 'Title here');
      history.push(props.url);
    }


  }


  useEffect(async () => {
    // store.addNotification({
    //   title: "Wonderful!",
    //   message: "Form Submitted Successfully",
    //   type: "info",
    //   container: "top-right",
    //   dismiss: {
    //     duration: 5000,
      
    //   }
    // });
    const storage = window.localStorage;
    token=storage.getItem("token");
    if (!token) {
      console.log("in null");
      history.push('/login');
    }
    else {

      // // formId=props.match.params.id;
      // response = await fetch('http://localhost:3000/api/clients/getClientById/' + id, {

      //   method: 'GET',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': 'Bearer ' + token
      //   }


      // })
       
      // response=await response.json();
      // setFormData(response);
      
      // console.log(response);
    }



  },[]);

  // const { form, use } = useForm({
  //   defaultValues: { firstName: "", lastName: "", framework: "" },
  //   onSubmit: (values) => alert(JSON.stringify(values, undefined, 2))
  // // });
  // const errors = use("errors");

  return (
    <React.Fragment>
        <ReactNotification />
        {console.log("your data is--------------------------")}
       {console.log(data)}
      <div className="form">
    
        <ButtonAppBar heading={props.heading} />
        <form className="addForm" noValidate>

       

          <div>
            <input name="nameNumber" value={formData && formData['nameNumber']} placeholder="Device Name/Number" onChange={e => setFormData({ ...formData, "nameNumber": e.target.value })} required />

          </div>
          <div>
            <input name="batteryStatus" value={formData && formData.batteryStatus} placeholder="Battery Status" onChange={e => setFormData({ ...formData, batteryStatus: e.target.value })} required />

          </div>
      
          <div>
            <input name="id" value={formData && formData.id} placeholder="Device Id"  onChange={e => setFormData({ ...formData, id: e.target.value })} required />

          </div>

         



          
      

          <div>
            <FormControlLabel
              control={
                <Checkbox
          
                  onChange={(e) => { console.log(e.target.checked); setFormData({ ...formData, Status: e.target.checked }) }}
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                  name="status"
                />
              }
              label="In Aktivo"
            />
          </div>

        








        </form>
      
        <div class="btn-class">
        <Button onClick={addClient} className="submit" variant="outlined" color="primary" size="small">
          <Link >Submit</Link>
        </Button>
        <Button className="cancel" variant="outlined" color="primary" size="small">
          <Link to={props.url}>Back</Link>
        </Button>
        </div>
      </div>
 
    </React.Fragment>
  );
}

export default Form;
