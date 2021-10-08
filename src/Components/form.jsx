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
import AsyncSelect from 'react-select/async';
import { data } from './helpers';
import ForeignData from './ForeignData';
import address from "../address";


let count = 0;
var selectBoxData;

function Form(props) {
  count++;
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]
  const [boxData, setData] = useState("");
  const [dealerData, setDealerData] = useState();
  const [formData, setFormData] = useState({
    Code: "", FirstName: "", LastName: "", WorkNo: "",
    ContactNo: "", WorksAt: "",
    Email: "", FaxNumber: "",
    Status: "",
    MaxBorrowAmount: "", Dealer_id: ""




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
      response = await fetch(address+'/api/clients/getClientById/' + formData.Code, {

        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }


      })

      response = await response.json();
      if(response){
        alert("Client already exist")
        return;
      }
      response = await fetch(address+'/api/clients/upsertClient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },

        body: JSON.stringify(formData)

      });

      response = await response.json();
      console.log("token");
      if (response.message) {
        alert(response.message)
      }
      else {
        NotificationManager.success('Success message', 'Title here');
      }
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
    token = storage.getItem("token");



    if (!token) {
      console.log("in null");
      history.push('/login');

    }
    else {

      selectData(address+'/api/clients/getAllClients', 'Code', 'id').then((data) => { setDealerData(data) });


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



          <div>
            <input name="Code" value={formData && formData['Code']} placeholder="Skelta Code" onChange={e => setFormData({ ...formData, Code: e.target.value, id: e.target.value })} required />



          </div>
          <div>
            <input name="FirstName" value={formData && formData.FirstName} placeholder="First Nomber" onChange={e => setFormData({ ...formData, FirstName: e.target.value })} required />

          </div>
          <div>
            <input name="LastName" value={formData && formData.LastName} placeholder="Last Nomber" onChange={e => setFormData({ ...formData, LastName: e.target.value })} required />

          </div>
          {/* <div>
            <input name="Date" placeholder="Date" required />

          </div> */}

          <div>
            <input name="WorkNo" value={formData && formData.WorkNo} placeholder="Tel Trabou" onChange={e => setFormData({ ...formData, WorkNo: e.target.value })} required />

          </div>


          <div>
            <input name="ContactNo" value={formData && formData.ContactNo} placeholder="Tell Cellular" onChange={e => setFormData({ ...formData, ContactNo: e.target.value })} required />

          </div>


          <div>
            <input name="WorksAt" value={formData && formData.WorksAt} placeholder="Ta traha na" onChange={e => setFormData({ ...formData, WorksAt: e.target.value })} required />

          </div>




          <div>
            <input name="FaxNumber" value={formData && formData.faxNumber} placeholder="Fax" onChange={e => setFormData({ ...formData, FaxNumber: e.target.value })} required />

          </div>



          <div>
            <input name="Email" value={formData && formData.Email} placeholder="Email" onChange={e => setFormData({ ...formData, Email: e.target.value })} required />

          </div>
          <div>
            <input name="MaxBorrowAmount" value={formData && formData.MaxBorrowAmount} placeholder="Kredito Maksimo" onChange={e => setFormData({ ...formData, MaxBorrowAmount: e.target.value })} required />

          </div>


          {/* <div>
            <input name="Dealer_id" value={formData && formData.Dealer_id} placeholder="Dealers " onChange={e => setFormData({ ...formData, Dealer_id: e.target.value })} required />

          </div> */}
          <Select
            name="Client_id"
            placeholder={<div>Rebendadors</div>}
            options={dealerData}
            maxMenuHeight={150}
            onChange={e => {
              console.log("hello boss" + e.value); setFormData({ ...formData, Dealer_id: e.value })
            }}
          />

          {formData.Dealer_id && <ForeignData heading="Dealer Detail" data={data} title="client" id={formData.Dealer_id} />}

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


          <div>
            <input name="id" value={formData && formData.id} placeholder="Id" type="hidden" onChange={e => setFormData({ ...formData, id: e.target.value })} required />

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
