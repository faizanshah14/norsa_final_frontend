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
// import Select from 'react-select';
import { InputLabel } from '@material-ui/core';
import { FormControl, Input, FormHelperText } from '@material-ui/core';


let count = 0;

function Form(props) {
    count++;
    const [formData, setFormData] = useState({
        id:"",Code: "", Name: "", MerchantType_id:"" ,AccountNo:"" ,BankName:""
    
      })
    const history = useHistory();
    let { id } = useParams();
    var response;
    var token;

    const addClient = async (event) => {
        event.preventDefault();
        const storage = window.localStorage;
        token = storage.getItem("token");
        console.log(formData);
        if (token) {
            response = await fetch('http://localhost:3000/api/merchants/upsertMerchant', {
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
            response = await fetch('http://localhost:3000/api/merchants/getMerchantById/' + id, {

                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }


            })

            response = await response.json();
            setFormData(response);
            console.log("your response is"+id+props.view);
            console.log(response);
        }



    }, []);

    // const { form, use } = useForm({
    //   defaultValues: { firstName: "", lastName: "", framework: "" },
    //   onSubmit: (values) => alert(JSON.stringify(values, undefined, 2))
    // // });
    // const errors = use("errors");

    return (
        <React.Fragment>
            <ReactNotification />
            <div className="form">

                <ButtonAppBar heading={props.heading} />
                <form className="addForm" noValidate>

                    <FormControl>
                        <InputLabel htmlFor="Code">Code</InputLabel>
                        <Input id="Code" name="Code"  value={formData && formData['Code']} onChange={e => setFormData({ ...formData, Code: e.target.value, id: e.target.value })} required readOnly={props.view}  aria-describedby="my-helper-text" />
                        {/* <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}
                    </FormControl>


                    <FormControl>
                        <InputLabel htmlFor="Name">Name</InputLabel>
                        <Input id="Name" name="Name" readOnly={props.view} value={formData && formData.Name} onChange={e => setFormData({ ...formData, Name: e.target.value })} readOnly={props.view} required />
                        {/* <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}
                    </FormControl>


                    <FormControl>
                        <InputLabel htmlFor="BankName">Address</InputLabel>
                        <Input id="BankName" name="BankName" readOnly={props.view} value={formData && formData.BankName} placeholder="Address" onChange={e => setFormData({ ...formData, BankName: e.target.value })} required />
                        {/* <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}
                    </FormControl>

                    <FormControl>
                        <InputLabel htmlFor="AccountNo">Address</InputLabel>
                        <Input id="AccountNo" name="AccountNo" readOnly={props.view} value={formData && formData.AccountNo} placeholder="Address" onChange={e => setFormData({ ...formData, AccountNo: e.target.value })} required />
                        {/* <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}
                    </FormControl>
              
                    <FormControl>
                        <InputLabel htmlFor="Code">Address</InputLabel>
                        <Input id="Code" name="Code" readOnly={props.view} value={formData && formData.Code} placeholder="Address" onChange={e => setFormData({ ...formData, Code: e.target.value })} required />
                        {/* <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}
                    </FormControl>
              
                    <FormControl>
                        <InputLabel htmlFor="MerchantType_id">Device Id</InputLabel>
                        <Input id="MerchantType_id" readOnly={props.view} name="MerchantType_id" value={formData && formData.MerchantType_id} placeholder="MerchantType_id" onChange={e => setFormData({ ...formData, MerchantType_id: e.target.value })} required />
                        {/* <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}
                    </FormControl>
       


               



                    <div>
                        <FormControlLabel
                            control={
                                <Checkbox

                                    onChange={(e) => { console.log(e.target.checked); setFormData({ ...formData, Status: e.target.checked }) }}
                                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                    checkedIcon={<CheckBoxIcon fontSize="small" />}
                                    name="Status"
                                    readOnly={props.view}
                                />
                            }
                            label="In Aktivo"
                        />
                    </div>

                    <div>
                        <input name="id" readOnly={props.view} value={formData && formData.id} placeholder="Id" type="hidden" onChange={e => setFormData({ ...formData, id: e.target.value })} required />

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
