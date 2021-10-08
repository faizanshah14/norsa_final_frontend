import BasicTable from './table';
import React,{Component,useState} from 'react';
import Form from './form';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SideBar from './sidebar';
import { PinDropSharp } from '@material-ui/icons';
import logo from '../images/logo.png';


function LandingPage() {



    
  const[show,setshow]=useState(true);


  const toggle=()=>{

   setshow(!show);


  }

  return (
    <div className="landingPage">
      
    
      <div>  <img className="logo" src={logo} />  </div>
    </div>
  );
}

export default LandingPage;
