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
import { selectData } from './helpers';
import DeviceEditForm from './DeviceEdit';
import ForeignData from './ForeignData';
import { data } from './helpers';


let count = 1;

function Form(props) {
  count++;
  const [merchantData, setMerchantData] = useState([]);
  const [clientData, setClientData] = useState([]);
  const [PaybackPeriod, setPaybackPeriod] = useState([]);
  const [nfcCardData, setCardData] = useState(true);
  const [show, setShow] = useState([]);
  const [formData, setFormData] = useState({
    DateTime: "", Amount: "", PaybackPeriod: "", TypeOfPayment: "",
    DateDeposit: null, Client_id: "",
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
      console.log(response);

      NotificationManager.success('Success message', 'Title here');
      //   history.push(props.url);
    }


  }
  const getPaybackPeriod = async (id) => {

    alert(id)
    const storage = window.localStorage;
    const token = storage.getItem("token");

    var response = await fetch('http://localhost:3000/api/merchants/getMerchantById/' + id, {

      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
    response = await response.json();
    const MerchantType_id = response.MerchantType_id
    response = await fetch('http://localhost:3000/api/merchants/getMerchantTypeDiscountByMerchantType_id/' + MerchantType_id, {

      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
    response = await response.json();
    console.log("selected data----sdfs----------------");
    console.log(response)
    let data = []
    response.map((value) => {
      var obj = { label: "", value: "" }
      obj.label = value["NumberOfMonths"];
      obj.value = value["id"];
      data.push(obj);
    })
    setPaybackPeriod(data)
    // setPaybackPeriod(tempData)
  }


  useEffect(async () => {
    console.log("--------------------------------in effect---------------");
    // store.addNotification({
    //   title: "Wonderful!",
    //   message: "Form Submitted Successfully",
    //   type: "info",
    //   container: "top-right",
    //   dismiss: {
    //     duration: 5000,
    //   }
    // });

    selectData('http://localhost:3000/api/clients/getAllClients', 'FirstName', 'id').then((data) => { console.log(data); setClientData(data) });
    selectData('http://localhost:3000/api/merchants/getAllMerchants', 'Name', 'id').then((data) => { setMerchantData(data) });
    selectData('http://localhost:3000/api/nfcCard/getAllNfcCards', 'number', 'id').then((data) => { setCardData(data) });
    const storage = window.localStorage;

    token = storage.getItem("token");
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



  }, [formData]);

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



          <div>
            <input name="DateTime" value={formData && formData['DateTime']} placeholder="Date" onChange={e => setFormData({ ...formData, DateTime: e.target.value, id: e.target.value })} required />



          </div>
          <div>
            <input name="Amount" value={formData && formData.Amount} placeholder="Amount" onChange={e => setFormData({ ...formData, Amount: e.target.value })} required />

          </div>
          <Select
            name="Client_id"
            placeholder={<div>Client Name</div>}
            options={clientData}
            maxMenuHeight={150}
            onChange={e => {
              console.log("hello boss" + e.value); setFormData({ ...formData, Client_id: e.value })
            }}

          />

          {formData.Client_id && <ForeignData heading="Client Detail" data={data} title="client" id={formData.Client_id} />}

          {/* <ForeignData data={data} title="client"/> */}


          {/* <div>
            <input name="TypeOfPayment" value= {formData && formData.TypeOfPayment} placeholder="Type Of Payment" onChange={e => setFormData({ ...formData, TypeOfPayment: e.target.value })} required />

          </div> */}

          <Select
            name="NfcCard_id"
            placeholder={<div>NFC Card Id</div>}
            options={nfcCardData}
            maxMenuHeight={150}
            onChange={e => setFormData({ ...formData, NfcCard_id: e.value })}

          />



          {formData.NfcCard_id && <ForeignData heading="Nfc Card Detail" data={data} title="nfcCard" id={formData.NfcCard_id} />}


          <Select
            name="Merchants_id"
            placeholder={<div>Merchant Id</div>}
            options={merchantData}
            maxMenuHeight={150}
            onChange={e => { setFormData({ ...formData, Merchants_id: e.value }); getPaybackPeriod(e.value) }}

          />


          {/* <div>
            <input name="DateDeposit" value={formData && formData.DateDeposit} placeholder="Date Deposit" onChange={e => setFormData({ ...formData, DateDeposit: e.target.value })} required />

          </div>  */}
          {formData.Merchants_id && <ForeignData data={data} heading="Merchant Detail" title="merchants" id={formData.Merchants_id} />}
          <Select
            name="PaybackPeriod"
            placeholder={<div>Number Of Months</div>}
            options={PaybackPeriod}
            maxMenuHeight={150}
            onChange={e => {
              console.log("hello boss" + e.value); setFormData({ ...formData, PaybackPeriod: e.value })
            }}

          />

          <div>
            <FormControlLabel
              control={
                <Checkbox

                  onChange={(e) => { console.log(e.target.checked); setFormData({ ...formData, Status: e.target.checked }) }}
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                  name="Status"
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
