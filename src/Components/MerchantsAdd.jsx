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
import ForeignData from './ForeignData';
import { data } from './helpers';
import address from "../address"

let count = 0;

function Form(props) {
  count++;
  const [deviceData, setDeviceData] = useState();
  const [formData, setFormData] = useState({
    id: "", Code: "", Name: "", MerchantType_id: "", AccountNo: "", BankName: ""
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
      response = await fetch(address+'/api/merchants/upsertMerchant', {
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
      // history.push(props.url);
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
    selectData(address+'/api/merchants/getAllMerchantTypes', 'Title', 'id').then((data) => { setDeviceData(data) });
    const storage = window.localStorage;
    token = storage.getItem("token");
    if (!token) {
      console.log("in null");
      history.push('/login');
    }
    else {

      // // formId=props.match.params.id;
      // response = await fetch(address+'/api/clients/getClientById/' + id, {

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
            <input name="Name" value={formData && formData.Name} placeholder="Name" onChange={e => setFormData({ ...formData, Name: e.target.value })} required />
          </div>
          <div>
            <input name="AccountNo" value={formData && formData.AccountNo} placeholder="AccountNo" onChange={e => setFormData({ ...formData, AccountNo: e.target.value })} required />
          </div>
          <div>
            <input name="BankName" value={formData && formData.BankName} placeholder="BankName" onChange={e => setFormData({ ...formData, BankName: e.target.value })} required />
          </div>
          <Select
            name="MerchantType_id"
            placeholder={<div>Merchant Id</div>}
            options={deviceData}
            maxMenuHeight={150}
            onChange={e => { console.log(e); setFormData({ ...formData, MerchantType_id: e.value }) }}
          />
          
          {formData.MerchantType_id && <ForeignData heading="Merchant Type" data={data} title="merchantstype" id={formData.MerchantType_id} />}
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
