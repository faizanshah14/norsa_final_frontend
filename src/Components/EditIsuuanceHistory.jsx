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
import {selectData} from './helpers';


let count = 0;

function Form(props) {
    count++;
     const[merchantData,setMerchantData]=useState([]);
  const[clientData,setClientData]=useState([]);
  const[nfcCardData,setCardData]=useState([]);
    const [formData, setFormData] = useState({
        DateTime: "", Amount: "", PaybackPeriod: "", TypeOfReturnPayment: "",
        DateDeposit: "", Client_id: "",
        NfcCard_id: "", Merchants_id: "",
        id: "", status: ""

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
            response = await fetch('http://localhost:3000/api/issuancehistory/upsertIssuancehistory', {
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
        selectData('http://localhost:3000/api/clients/getAllClients', 'FirstName', 'id').then((data) => { setClientData(data) });
        selectData('http://localhost:3000/api/merchants/getAllMerchants', 'Name', 'id').then((data) => { setMerchantData(data) });
        selectData('http://localhost:3000/api/nfcCard/getAllNfcCards', 'number', 'id').then((data) => { setCardData(data) });
        const storage = window.localStorage;
        token = storage.getItem("token");
        if (!token) {
            console.log("in null");
            history.push('/login');
        }
        else {
            // formId=props.match.params.id;
            response = await fetch('http://localhost:3000/api/issuancehistory/getIssuancehistoryById/' + id, {

                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }


            })

            response = await response.json();
            setFormData(response);
            console.log("your response is" + id + props.view);
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
                        <InputLabel htmlFor="DateTime">Date</InputLabel>
                        <Input id="DateTime" name="DateTime" value={formData && formData['DateTime']} onChange={e => setFormData({ ...formData, DateTime: e.target.value })} required readOnly={props.view} aria-describedby="my-helper-text" />
                        {/* <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}
                    </FormControl>


                    <FormControl>
                        <InputLabel htmlFor="Amount">Amount</InputLabel>
                        <Input id="Amount" name="Amount" readOnly={props.view} value={formData && formData.Amount} onChange={e => setFormData({ ...formData, Amount: e.target.value })} readOnly={props.view} required />
                        {/* <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}
                    </FormControl>


                    <FormControl>
                        <InputLabel htmlFor="PaybackPeriod">Payment Period</InputLabel>
                        <Input id="PaybackPeriod" name="PaybackPeriod" readOnly={props.view} value={formData && formData.PaybackPeriod } placeholder="Last Name" onChange={e => setFormData({ ...formData, PaybackPeriod: e.target.value })} required />
                        {/* <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}
                    </FormControl>

                    <FormControl>
                        <InputLabel htmlFor="TypeOfReturnPayment">Type Of Payment</InputLabel>
                        <Input id="TypeOfReturnPayment" name="TypeOfReturnPayment" readOnly={props.view} value={formData && formData.TypeOfReturnPayment} placeholder="Works No" onChange={e => setFormData({ ...formData, TypeOfReturnPayment: e.target.value })} required />
                        {/* <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}
                    </FormControl>

                    <FormControl>
                        <InputLabel htmlFor="DateDeposit">Date Deposit</InputLabel>
                        <Input id="DateDeposit" readOnly={props.view} name="DateDeposit" value={formData && formData.DateDeposit} placeholder="DateDeposit" onChange={e => setFormData({ ...formData, DateDeposit: e.target.value })} required />
                        {/* <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}
                    </FormControl>



                    <FormControl>
                        <InputLabel htmlFor="Client_id">Client id</InputLabel>
                        <Input id="Client_id" readOnly={props.view} name="Client_id" value={formData && formData.Client_id} placeholder="Works At" onChange={e => setFormData({ ...formData, Client_id: e.target.value })} required />
                        {/* <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}
                    </FormControl>




                    <FormControl>
                        <InputLabel htmlFor="NfcCard_id">NfcCard id</InputLabel>
                        <Input id="NfcCard_id" readOnly={props.view} name="NfcCard_id" value={formData && formData.NfcCard_id} placeholder="NfcCard_id" onChange={e => setFormData({ ...formData, NfcCard_id: e.target.value })} required />
                        {/* <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}
                    </FormControl>



                    <FormControl>
                        <InputLabel htmlFor="Merchants_id">Merchants Id</InputLabel>
                        <Input id="Merchants_id" name="Merchants_id" readOnly={props.view} value={formData && formData.Merchants_id} placeholder="Email" onChange={e => setFormData({ ...formData, Merchants_id: e.target.value })} required />
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
