import BasicTable from './table';
import React, { Component, useState, useEffect } from 'react';
import Form from './form';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SideBar from './sidebar';
import { PinDropSharp } from '@material-ui/icons';
import { useHistory } from "react-router-dom";


function Home({ title, url, header, data, showSidebar, editUrl, viewUrl }) {

  const history = useHistory();


  const [show, setshow] = useState(true);

  useEffect(() => {
    showSidebar(true);
    const storage = window.localStorage;
    if (!storage.getItem("token")) {
      console.log("in null");
      history.push('/login');
    }
    else {
      console.log("token is there");
    }
  })
  const toggle = () => {
    setshow(!show);

  }

  return (
    <React.Fragment>
      {/* <SideBar /> */}
      <div className="Home">
        {console.log("edit ur is" + editUrl)}
        <BasicTable editUrl={editUrl} viewUrl={viewUrl} data={data} header={header} url={url} title={title} />
      </div>
    </React.Fragment>
  );
}

export default Home;
