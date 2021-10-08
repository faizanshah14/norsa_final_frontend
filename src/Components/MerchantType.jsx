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
    const [deviceData, setDeviceData] = useState();
    const [merchantTypes, setMerchantTypes] = useState([])
    const [selectedMerchantId, setSelectedMerchantId] = useState();
    const [formData, setFormData] = useState({
        Title: "", id: ""
    })
    const [discountForm, setDiscountForm] = useState([{
        id:"",
        NumberOfMonths: "",
        Interest: "",
        MerchantType_id : selectedMerchantId
    }])
    const history = useHistory();
    let { id } = useParams();

    useEffect(() => {
        selectData('http://localhost:3000/api/merchants/getAllMerchantTypes', 'Title', 'id').then((data) => { setMerchantTypes(data) });
    }, [selectedMerchantId])

    // useEffect(()=>{
    //     selectData('http://localhost:3000/api/merchants/getAllMerchantTypes', 'Title', 'id').then((data)=>{ set})
    // })

    var response;
    const addMerchantType = async (event) => {
        event.preventDefault();
        const storage = window.localStorage;
        const token = storage.getItem("token");

        console.log(formData);
        if (token) {
            response = await fetch('http://localhost:3000/api/merchants/createMerchantType', {
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
        }
        else {
            history.push('/login');
        }
    }
    const addDiscountForm = async (event) => {
        event.preventDefault()
        const storage = window.localStorage;
        const token = storage.getItem("token");

        if (token) {
            discountForm.map(async (item, index) => {
                console.log(item)
                response = await fetch('http://localhost:3000/api/merchants/createMerchantTypeDiscount', {
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
                MerchantType_id : selectedMerchantId

            }
        }
        else {
            newArray[index] = {
                id: "",
                [e.target.name]: e.target.value,
                Interest: newArray[index].Interest,
                MerchantType_id : selectedMerchantId
            }
        }
        setDiscountForm(newArray)
    }
    return (
        <React.Fragment>
            <ReactNotification />
            <div className="form">
                <ButtonAppBar heading={props.heading} />
                <form className="addForm" noValidate>
                    <div>
                        <input name="Title" value={formData && formData['Title']} placeholder="Title" onChange={e => setFormData({ ...formData, Title: e.target.value, id: e.target.value })} required />
                    </div>
                </form>
                <div class="btn-class">
                    <Button onClick={addMerchantType} className="submit" variant="outlined" color="primary" size="small">
                        <Link >Submit</Link>
                    </Button>
                    <Button className="cancel" variant="outlined" color="primary" size="small">
                        <Link to={props.url}>Back</Link>
                    </Button>
                </div>
                <form className="addForm" noValidate>
                    <Select
                        name="Title"
                        placeholder={<div>Merchant Types</div>}
                        options={merchantTypes}
                        maxMenuHeight={150}
                        onChange={e => { setSelectedMerchantId(e.value) }}
                    />
                    {selectedMerchantId &&
                        <div>
                            {discountForm.map((item, index) => (
                                <div>
                                    <input name="NumberOfMonths" value={discountForm && item['NumberOfMonths']} placeholder="Number Of Months" onChange={updateDiscountFormFields(index)} required />
                                    <input name="Interest" value={discountForm && item['Interest']} placeholder="Interest Percentage" onChange={updateDiscountFormFields(index)} required />
                                </div>
                            ))
                            }
                            <Button onClick={addRow} size="small"> Add Row</Button>
                        </div>
                    }
                    <div class="btn-class">
                        <Button onClick={addDiscountForm} className="submit" variant="outlined" color="primary" size="small">
                            <Link >Add</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </React.Fragment>
    );
}
export default Form;
