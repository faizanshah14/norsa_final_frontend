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
        Code: "", FirstName: "", LastName: "", WorkNo: "",
        ContactNo: "", WorksAt: "",
        Email: "", FaxNumber: "",
        Status: "",
        MaxBorrowAmount: "",  Dealer_id: "",




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
            response = await fetch('http://localhost:3000/api/clients/upsertClient', {
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
            history.push('/login');
        }
        else {
            // formId=props.match.params.id;
            response = await fetch('http://localhost:3000/api/clients/getClientById/' + id, {

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
                        <InputLabel htmlFor="FirstName">FirstName</InputLabel>
                        <Input id="FirstName" name="FirstName" readOnly={props.view} value={formData && formData.FirstName} onChange={e => setFormData({ ...formData, FirstName: e.target.value })} readOnly={props.view} required />
                        {/* <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}
                    </FormControl>


                    <FormControl>
                        <InputLabel htmlFor="LastName">LastName</InputLabel>
                        <Input id="LastName" name="LastName" readOnly={props.view} value={formData && formData.LastName} placeholder="Last Name" onChange={e => setFormData({ ...formData, LastName: e.target.value })} required />
                        {/* <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}
                    </FormControl>
              
                    <FormControl>
                        <InputLabel htmlFor="WorkNo">Work No</InputLabel>
                        <Input id="WorkNo" name="WorkNo" readOnly={props.view} value={formData && formData.WorkNo} placeholder="Works No" onChange={e => setFormData({ ...formData, WorkNo: e.target.value })} required />
                        {/* <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}
                    </FormControl>
              
                    <FormControl>
                        <InputLabel htmlFor="ContactNo">Contact No</InputLabel>
                        <Input id="ContactNo" readOnly={props.view} name="ContactNo" value={formData && formData.ContactNo} placeholder="Tele Phone No" onChange={e => setFormData({ ...formData, ContactNo: e.target.value })} required />
                        {/* <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}
                    </FormControl>
       

               
                    <FormControl>
                        <InputLabel htmlFor="WorksAt">Works At</InputLabel>
                        <Input id="WorksAt" readOnly={props.view} name="WorksAt" value={formData && formData.WorksAt} placeholder="Works At" onChange={e => setFormData({ ...formData, WorksAt: e.target.value })} required />
                        {/* <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}
                    </FormControl>

                   


                    <FormControl>
                        <InputLabel htmlFor="FaxNumber">Fax Number</InputLabel>
                        <Input id="FaxNumber" readOnly={props.view} name="FaxNumber"  value={formData && formData.FaxNumber} placeholder="" onChange={e => setFormData({ ...formData, FaxNumber: e.target.value })} required />
                        {/* <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}
                    </FormControl>

   
   
                    <FormControl>
                        <InputLabel htmlFor="Email">Email</InputLabel>
                        <Input id="Email" name="Email"  readOnly={props.view} value={formData && formData.Email} placeholder="Email" onChange={e => setFormData({ ...formData, Email: e.target.value })} required />
                        {/* <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}
                    </FormControl>


                    
                    <FormControl>
                        <InputLabel htmlFor="MaxBorrowAmount">Max Borrow Amount</InputLabel>
                        <Input id="MaxBorrowAmount" name="MaxBorrowAmount" readOnly={props.view} value={formData && formData.MaxBorrowAmount} placeholder="Maz Borrow Amount" onChange={e => setFormData({ ...formData, MaxBorrowAmount: e.target.value })} required />
                        {/* <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor=" Dealer_id">Dealer</InputLabel>
                        <Input id=" Dealer_id" name=" Dealer_id" readOnly={props.view} value={formData && formData.Dealer_id} placeholder="Dealer Id" onChange={e => setFormData({ ...formData,  Dealer_id: e.target.value })} required />
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
