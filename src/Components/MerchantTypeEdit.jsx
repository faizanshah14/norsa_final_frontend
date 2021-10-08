import { render } from "react-dom";
import { useForm } from "react-cool-form";
import '../style/form.css';
import { Link, useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import ButtonAppBar from './titleheading';
import { CompassCalibrationOutlined, InsertEmoticonSharp, PinDropSharp } from "@material-ui/icons";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { useHistory } from "react-router-dom";
import React, { Component, useState, useEffect } from 'react';
import { FormControl, Input, FormHelperText } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import SideBar from './sidebar';
import axios from 'axios';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';
import Select from 'react-select';
import { selectData } from './helpers';
import ForeignData from './ForeignData';
import { data } from './helpers';


let count = 0;
function Form(props) {
    count++;
    const [formData, setFormData] = useState({
        Title: "", id: ""
    })
    const [discountForm, setDiscountForm] = useState([{
        id: "",
        NumberOfMonths: "",
        Interest: "",
        MerchantType_id: ""
    }])
    const history = useHistory();
    let { id } = useParams();
    var response;

    useEffect(async () => {
        const storage = window.localStorage;
        const token = storage.getItem("token");

        console.log(formData);
        if (token) {
            response = await fetch('http://localhost:3000/api/merchants/getMerchantTypeById/' + id, {

                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            response = await response.json();
            console.log("token");
            NotificationManager.success('Success message', 'Title here');
            setFormData(response)
            const MerchantType_id = id
            response = await fetch('http://localhost:3000/api/merchants/getMerchantTypeDiscountByMerchantType_id/' + MerchantType_id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            response = await response.json();
            let data = []
            response.map((value) => {
                var obj = { id: "", NumberOfMonths: "", Interest: "", MerchantType_id: "" }
                obj.id = value["id"];
                obj.NumberOfMonths = value["NumberOfMonths"]
                obj.Interest = value["Interest"]
                obj.MerchantType_id = value["MerchantType_id"]
                data.push(obj);
            })
            setDiscountForm(data)
        }
        else {
            history.push('/login');
        }
    }, [])



    // useEffect(()=>{
    //     selectData('http://localhost:3000/api/merchants/getAllMerchantTypes', 'Title', 'id').then((data)=>{ set})
    // })


    // const addMerchantType = async (event) => {
    //     event.preventDefault();
    //     const storage = window.localStorage;
    //     const token = storage.getItem("token");

    //     console.log(formData);
    //     if (token) {
    //         response = await fetch('http://localhost:3000/api/merchants/createMerchantType', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': 'Bearer ' + token
    //             },
    //             body: JSON.stringify(formData)
    //         });
    //         response = await response.json();
    //         console.log("token");
    //         NotificationManager.success('Success message', 'Title here');
    //     }
    //     else {
    //         history.push('/login');
    //     }
    // }
    const addDiscountForm = async () => {

        const storage = window.localStorage;
        const token = storage.getItem("token");
        console.log(discountForm)
        if (token) {
            discountForm.map(async (item, index) => {
                console.log(item)
                let api = "upsertMerchantTypeDiscount"
                if (item.id == "") {
                    api = "createMerchantTypeDiscount"
                }
                response = await fetch('http://localhost:3000/api/merchants/' + api, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify(item)
                });
                response = await response.json();
                console.log(response);

                NotificationManager.success('Success message', 'Title here');
                //   history.push(props.url);


            })
        }
    }
    const addRow = (event) => {
        event.preventDefault()
        setDiscountForm([...discountForm, {
        }]);
    }
    const updateDiscountFormFields = index => e => {
        let newArray = [...discountForm]
        if (e.target.name == "Interest") {
            newArray[index] = {
                id: "",
                NumberOfMonths: newArray[index].NumberOfMonths,
                [e.target.name]: e.target.value,
                MerchantType_id: formData.id

            }
        }
        else {
            newArray[index] = {
                id: "",
                [e.target.name]: e.target.value,
                Interest: newArray[index].Interest,
                MerchantType_id: formData.id
            }
        }
        setDiscountForm(newArray)
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        addDiscountForm()
    }
    return (
        <React.Fragment>
            <ReactNotification />
            <div className="form">
                <ButtonAppBar heading={props.heading} />
                <form className="addForm" noValidate>
                    <div>
                        <input disabled name="Title" value={formData && formData['Title']} placeholder="Title" onChange={e => setFormData({ ...formData, Title: e.target.value, id: e.target.value })} required />
                    </div>
                    <div>
                        {discountForm.map((item, index) => (
                            <div>
                                {/* <input name="NumberOfMonths" value={discountForm && item['NumberOfMonths']} placeholder="Number Of Months" onChange={updateDiscountFormFields(index)} required />
                                <input name="Interest" value={discountForm && item['Interest']} placeholder="Interest Percentage" onChange={updateDiscountFormFields(index)} required /> */}
                                <FormControl>
                                    <InputLabel htmlFor="NumberOfMonths">Number Of Months</InputLabel>
                                    <Input id="NumberOfMonths" name="NumberOfMonths" value={discountForm && item['NumberOfMonths']} onChange={updateDiscountFormFields(index)} required aria-describedby="my-helper-text" />
                                    {/* <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}
                                </FormControl><FormControl>
                                    <InputLabel htmlFor="Interest">Interest</InputLabel>
                                    <Input id="Interest" name="Interest" value={discountForm && item['Interest']} onChange={updateDiscountFormFields(index)} required aria-describedby="my-helper-text" />
                                    {/* <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}
                                </FormControl>
                            </div>

                        ))
                        }
                        <Button onClick={addRow} size="small"> Add Row</Button>
                    </div>
                    <div class="btn-class">
                        <Button onClick={handleSubmit} className="submit" variant="outlined" color="primary" size="small">
                            <Link >Submit</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </React.Fragment>
    );
}
export default Form;
