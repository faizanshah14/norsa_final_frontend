import logo from './logo.svg';
import './App.css';
import BasicTable from './Components/table';
import React, { Component, useState, Suspense, lazy, useEffect } from 'react';
import Home from './Components/Home';
import { Route, Switch } from 'react-router-dom';
import Form from './Components/form';
import SideBar from './Components/sidebar';
import ButtonAppBar from './Components/titleheading';
import ClientTables from './Components/client';
import landingPage from './Components/LandingPage';
import Register from './Components/Registration';
import LoginForm from './Components/login';
import EditForm from './Components/EditClient';
import DeviceAddForm from './Components/Deviceadd';
import DeviceEditForm from './Components/DeviceEdit';
import MerchantsAdd from './Components/MerchantsAdd';
import MerchantType from './Components/MerchantType';
import MerchantsEdit from './Components/MerchantsEdit';
import AddNfcCard from './Components/addNfcCard';
import EditNfcCard from './Components/EditNfcCard';
import AddIssuanceHistory from './Components/AddIssuanceHistory';
import EditIssuanceHistory from './Components/EditIsuuanceHistory';
import MerchantTypeAdd from './Components/MerchantTypeAdd'
import MerchantTypeEdit from './Components/MerchantTypeEdit'


function App() {

  var clientHeader = ['Code', 'Nomber kliente', 'ID', 'In-aktivo', 'Group', 'Actions'];
  var clientHeaderEng = ['c_code', 'c_name', 'c_familyName', 'c_address', 'c_identificationNo', 'c_badPayer', ''];
  var dealerHeader = ['Code', 'Nomber kliente', 'ID/sedula', 'Kredito Maksimo', 'Group', 'Actions'];
  // var data = [['1-a001', 'antonia,nilza', '', 'Yes', 'm'], ['1-a003', 'albert,shermine', '1964090414', 'No', 'm'], ['1-a006', 'antersyn,rignald', '1950320212', 'No', 'm'], ['1-a007', 'antonia,joiseline c', '1976032204', 'Yes', 'm']];
  // const Form = lazy(() => import('./Components/form'));
  var data = {

    client: {
      deleteUrl: 'http://localhost:3000/api/clients/deleteClient/',
      fetchUrl: 'http://localhost:3000/api/clients/getAllClients',
      title: 'Kliente',
      clientHeader: ['Code', 'First Name', 'Last Name', 'Email', 'Contact No', 'Works At', 'Fax Number', 'Max Borrow Amount','Status','Issuance History','Actions',],
      clientColumns: ['Code', 'FirstName', 'LastName', 'Email', 'ContactNo', 'WorksAt', 'FaxNumber', 'MaxBorrowAmount','Status','issuanceHistory'],
      editUrl: "/editclient/",
      viewUrl: "/viewclient/",
      addButtonUrl: '/addclient',
      issuanceHistoryUrl: '/issuancehistory/',
      url:'/client'
    },
    nfcCard: {
      deleteUrl: 'http://localhost:3000/api/nfcCard/deleteNfcCard/',
      fetchUrl: 'http://localhost:3000/api/nfcCard/getAllNfcCards',
      title: 'NfC Cards',
      clientHeader: [ 'Nomber', 'Status', 'Actions'],
      clientColumns: ['number','status'],
      editUrl: "/editnfccard/",
      viewUrl: "/viewnfccard/",
      addButtonUrl: '/addnfccard',
      url:'/nfccard'
    },
    device: {
      deleteUrl: 'http://localhost:3000/api/device/deleteDevice/',
      fetchUrl: 'http://localhost:3000/api/device/getAllDevices',
      title: 'Device',
      clientHeader: ['Name/Number','Status', 'Actions'],
      clientColumns: ['nameNumber','status'],
      editUrl: "/editdevice/",
      viewUrl: "/viewdevice/",
      addButtonUrl: '/adddevice',
      url:'/device'
    },
    merchants: {
      deleteUrl: 'http://localhost:3000/api/merchants/deleteMerchant/',
      fetchUrl: 'http://localhost:3000/api/merchants/getAllMerchants',
      title: 'Merchants',
      clientHeader: ['Code', 'Name','AccountNo','BankName', 'Actions'],
      clientColumns: ['Code','Name','AccountNo','BankName'],
      editUrl: "/editmerchants/",
      viewUrl: "/viewmerchants/",
      addButtonUrl: '/addmerchants',
      url:"/merchants"
    },
    merchantType: {
      deleteUrl: 'http://localhost:3000/api/merchants/deleteMerchantType/',
      fetchUrl: 'http://localhost:3000/api/merchants/getAllMerchantTypes',
      title: 'Merchant Type',
      clientHeader: [ 'Title','Actions'],
      clientColumns: [ 'Title'],
      editUrl: "/editmerchantType/",
      viewUrl: "/viewmerchantType/",
      addButtonUrl: '/addmerchantType',
      url:"/merchants"
    },
    issuanceHistory: {
      deleteUrl: 'http://localhost:3000/api/issuancehistory/deleteIssuancehistory/',
      fetchUrl: 'http://localhost:3000/api/issuancehistory/getAllIssuancehistories',
      title: 'Issuance History',
      clientHeader: ['Date','Client',  'Amount','Payment Period','Nfc Card','Merchant ID','Actions'],
      clientColumns: ['id','Client_id','Amount','PaybackPeriod','NfcCard_id','Merchants_id'],
      editUrl: "/editissuancehistory/",
      viewUrl: "/viewissuancehistory/",
      addButtonUrl: '/adddissuancehistory',
      url:'/issuancehistory'
    },
    payments:{
      deleteUrl: 'http://localhost:3000/api/issuancehistory/deleteIssuancehistory/',
      fetchUrl: 'http://localhost:3000/api/issuancehistory/getAllIssuancehistoriesByAmountPaid',
      title: 'Pending Payments',
      clientHeader: ['Client_Id', 'Date Deposit', 'Amount Paid', 'Actions'],
      clientColumns: ['Client_id','DateDeposit','AmountPaid'],
      editUrl: "/editissuancehistory/",
      viewUrl: "/viewissuancehistory/",
      addButtonUrl: '/adddissuancehistory',
      url:'/payments'
    }
  }
  var dealerData = [['1-a001', 'antonia,nilza', '', 'Yes', 'm'], ['1-a003', 'albert,shermine', '1964090414', 'No', 'm'], ['1-a006', 'antersyn,rignald', '1950320212', 'No', 'm'], ['1-a007', 'antonia,joiseline c', '1976032204', 'Yes', 'm']];
  var merchantHeader = ['Code', 'Nomber', 'Bank', 'Rekening', 'In-Aktivo', 'Actions'];
  var merchantData = [['sm005', 'mangusa rio', 'MCB', '13045206', 'Yes'], ['sm006', 'colon,supermarket', 'MCB', '17841503', 'Yes'], ['sm008', 'cost u alias', 'MCB', '14478301', 'Yes'], ['sm016', 'tony romas', 'Check', '', 'Yes']];
  const [show, setShow] = useState(false);

  const showSideBar = (value) => {
    setShow(value);
  }
  return (
    <div className="App">
      {show && <SideBar />}
      {/* <EditForm/> */}
      {/* <Route exact path='/add'>
        <Suspense fallback={<span>loader</span>}>
          <Form />
        </Suspense>
      </Route> */}
      {/* <landingPage /> */}
      <Route exact path="/" ><LoginForm showSidebar={showSideBar}/></Route>
      <Route exact path="/login" ><LoginForm showSidebar={showSideBar} /></Route>
      <Route exact path="/register" ><Register showSidebar={showSideBar} /></Route>
      <Route exact path="/merchant" >{<Home editUrl={'/editclient'} showSidebar={showSideBar} data={merchantData} header={merchantHeader} url={"/addmerchant"} title="Negoshi" />}</Route>
      <Route exact path='/dealer' component={(props) => <Home editUrl={'/editclient'} showSidebar={showSideBar} data={dealerData} header={dealerHeader} url="/adddealer" title={'Rebenbedor'} {...props} />} />
      <Route exact path='/client' component={(props) => <Home editUrl={"/editclient/"} viewUrl={"/viewclient/"} showSidebar={showSideBar} data={data.client} header={clientHeader} url='/addclient' title={'Kliente'}  {...props} />} />
      <Route exact path='/nfccard' component={(props) => <Home editUrl={"/editclient/"} viewUrl={"/viewclient/"} showSidebar={showSideBar} data={data.nfcCard} header={clientHeader} url='/addclient' title={'Kliente'}  {...props} />} />
      <Route exact path='/device' component={(props) => <Home editUrl={"/editclient/"} viewUrl={"/viewclient/"} showSidebar={showSideBar} data={data.device} header={clientHeader} url='/addclient' title={'Kliente'}  {...props} />} />
      <Route exact path='/merchants' component={(props) => <Home editUrl={"/editclient/"} viewUrl={"/viewclient/"} showSidebar={showSideBar} data={data.merchants} header={clientHeader} url='/addclient' title={'Kliente'}  {...props} />} />
      <Route exact path='/merchantType' component={(props) => <Home editUrl={"/editclient/"} viewUrl={"/viewclient/"} showSidebar={showSideBar} data={data.merchantType} header={clientHeader} url='/addclient' title={'Kliente'}  {...props} />} />
      <Route exact path='/issuancehistory/:Client_id' component={(props) => <Home editUrl={"/editclient/"} viewUrl={"/viewclient/"} showSidebar={showSideBar} data={data.issuanceHistory} header={clientHeader} url='/addclient' title={'Kliente'}  {...props} />} />
      <Route exact path='/payments' component={(props) => <Home editUrl={"/editclient/"} viewUrl={"/viewclient/"} showSidebar={showSideBar} data={data.payments} header={clientHeader} url='/addclient' title={'Kliente'}  {...props} />} />

      {/* <Route exact path="/addmerchant" ><Form  showSidebar={showSideBar} url='/merchant' heading="Negoshi"/></Route>
      <Route exact path="/addclient" ><Form editUrl={'/editClient'}  url='/client' heading="Kliente"/></Route>
      <Route exact path="/adddealer/:id" ><Form editUrl={'/editDealer'}    url='/dealer' heading="Rebenbedor"/></Route> */}
      <Route exact path="/addclient" ><Form url='/client' heading="Kliente" /></Route>
      <Route exact path="/editclient" ><EditForm editUrl={'/editMerchant'} url='/client' heading="Kliente" /></Route>
      <Route exact path="/adddevice" ><DeviceAddForm url='/device' heading="Device" /></Route>
      <Route exact path="/addnfccard" ><AddNfcCard url='/nfccard' heading="Nfc Card" /></Route>
      <Route exact path="/adddissuancehistory">< AddIssuanceHistory url='/issuancehistory' heading="Issue Card" /></Route>
      <Route exact path="/editdevice/:id" ><DeviceEditForm view={false} editUrl={'/editclient'} url='/device' heading="Device" /></Route>
      <Route exact path="/viewdevice/:id" ><DeviceEditForm view={true} editUrl={'/editclient'} url='/device' heading="Device" /></Route>
      <Route exact path="/editissuancehistory/:id" ><EditIssuanceHistory view={false} editUrl={'/editclient'} url='/issuancehistory' heading="Kliente" /></Route>
      <Route exact path="/viewissuancehistory/:id" ><EditIssuanceHistory view={true} editUrl={'/editclient'} url='/issuancehistory' heading="Kliente" /></Route>
      <Route exact path="/editnfccard/:id" ><EditNfcCard view={false} editUrl={'/editclient'} url='/nfccard' heading="Kliente" /></Route>
      <Route exact path="/viewnfccard/:id" ><EditNfcCard view={true} editUrl={'/editclient'} url='/nfccard' heading="Kliente" /></Route>
      <Route exact path="/addmerchants" ><MerchantsAdd url='/merchants' heading="Merchants" /></Route>
      <Route exact path="/addmerchantType" ><MerchantTypeAdd url='/merchantType' heading="Merchants" /></Route>

      <Route exact path="/editmerchantType/:id" ><MerchantTypeEdit url='/client' heading="Merchant Type" /></Route>
      <Route exact path="/editmerchants/:id" ><MerchantsEdit view={false} editUrl={'/editmerchants'} url='/merchants' heading="Kliente" /></Route>
      <Route exact path="/viewmerchants/:id" ><MerchantsEdit view={true} editUrl={'/editmerchants'} url='/merchants' heading="Kliente" /></Route>
      <Route exact path="/editclient/:id" ><EditForm view={false} editUrl={'/editclient'} url='/client' heading="Kliente" /></Route>
      <Route exact path="/editdealer/:id" ><EditForm editUrl={'/editDealer'} url='/dealer' heading="Rebenbedor" /></Route>
      <Route exact path="/viewclient/:id" ><EditForm view={true} editUrl={'/editclient'} url='/client' heading="Kliente" /></Route>
    </div>
  );
}

export default App;
