import React, { useEffect, useState, useCallback } from 'react';
import '../style/table.css';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ActionButtons from './ActionButtons';
import Button from '@material-ui/core/Button';
import { Link, useParams } from 'react-router-dom';
import SideBar from '../Components/sidebar';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ButtonAppBar from './titleheading';
import EditIcon from '@material-ui/icons/Edit';
import UpdateIcon from '@material-ui/icons/Update';
import ClearIcon from '@material-ui/icons/Clear';
import axios from 'axios';
import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import { useHistory } from "react-router-dom";
import Paginations from './pagination';
import TablePagination from '@material-ui/core/TablePagination';
import RowSize from './PageSize';
import ReactPaginate from 'react-paginate';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CheckIcon from '@material-ui/icons/Check';



const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: 'grey',
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        height: 20
    },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}



const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },

});

export default function CustomizedTables(props) {
    const [dltRow, setDltRow] = useState([]);
    const [rowsData, setrowsData] = useState([]);
    const [data, dataSet] = useState([])
    const [refresh, setRefresh] = useState(false);
    const [page, setPageSize] = useState(0);
    const [check, setChecked] = useState(false);
    const history = useHistory();
    var row;
    var response;
    const dormint = () => {
        dltRow.map((value) => {
            console.log("values ---------->" + value);
        })

        alert("active cjlicked over there");


    }




    const handleDelete = () => {
        if (dltRow.length != 0) {
            dltRow.map(async (id) => {
                const storage = window.localStorage;
                const token = storage.getItem('token');
                console.log("in callback" + token);
                if (token) {
                    console.log(props.data.deleteUrl + id);
                    var dltResponse = await fetch(props.data.deleteUrl + id, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + token
                        }
                    });
                    console.log(dltResponse);
                }
            })
            console.log("delete called" + window.location.pathname);
            setDltRow([]);
            // history.push(window.location.pathname);   
            fetchMyAPI();
            setRefresh(true);
            // window.location.reload(true);
        }
        else {

            //First select the Row to for delete operation
            alert("empty list ther");

        }

    }
    let { Client_id } = useParams();
    const fetchMyAPI = useCallback(async () => {
        const storage = window.localStorage;
        const token = storage.getItem('token');
        console.log("in callback-------------");
        if (token) {

            try {
                if (Client_id) {
                    response = await fetch('http://localhost:3000/api/issuancehistory/getIssuancehistoryByClientId/' + Client_id, {

                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + token
                        }
                    })
                }
                // else if(props.data.title == "Merchants"){

                // }
                else {
                    console.log("tru=y block");
                    response = await fetch(props.data.fetchUrl, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + token
                        }
                    });
                }
                // console.log("tru=y block");
                // response = await fetch(props.data.fetchUrl, {
                //     method: 'GET',
                //     headers: {
                //         'Content-Type': 'application/json',
                //         'Authorization': 'Bearer ' + token
                //     }
                // });
                response = await response.json();
                console.log(Math.ceil(response.length / 20));
                setPageSize(Math.ceil(response.length / 20));
                dataSet(response.slice(0, 30));
                // if (Client_id) {
                //     let temp = []
                //     data.map(async (item, index) => {

                //         response = await fetch('http://localhost:3000/api/merchants/getMerchantTypeDiscountById/' + item.PaybackPeriod, {

                //             method: 'GET',
                //             headers: {
                //                 'Content-Type': 'application/json',
                //                 'Authorization': 'Bearer ' + token
                //             }
                //         })

                //         response = await response.json()
                //         temp.push(response)
                //     })
                //     let tempData = data.slice()
                //     temp.map((item,index)=>{
                        
                //     })

                // }
            }
            catch (err) {
                NotificationManager.error('Token Expiry issue login again' + err, 'Error!', 5000, () => {
                    // alert('Token Expired');
                });
                console.log(err);
                // history.push("/login");

            }
        }

    }, [data])
    useEffect(() => {

        // store.addNotification({
        //     title: "Wonderful!",
        //     message: "teodosii@react-notifications-component",
        //     type: "success",
        //     insert: "top",
        //     container: "top-right",
        //     animationIn: ["animate__animated", "animate__fadeIn"],
        //     animationOut: ["animate__animated", "animate__fadeOut"],
        //     dismiss: {
        //       duration: 5000,
        //       onScreen: true
        //     }
        //   });


        fetchMyAPI();


    }, [refresh])



    var header = props.header;
    var rows = props.data;
    const theme = useTheme();
    const classes = useStyles();
    var tableRows = data;

    const matches = useMediaQuery(theme.breakpoints.down('sm'));

    const checkValue = (value) => {
        var val = value;
        if (typeof (value) == 'boolean') {

            if (value) {
                val = <CheckIcon />
            }
            else {
                val = <ClearIcon />
            }
        }
        console.log("value is------------------" + val);
        return val;
    }
    return (
        <Box mb={8}>
            <Paper elevation={4}>
                <ReactNotification />
                {console.table(props.data)}
                {/* {/* {console.log("rowsadar")} */}

                <ButtonAppBar heading={props.data.title} />
                { Client_id ? null : <ActionButtons delete={handleDelete} dormint={dormint} url={props.data.addButtonUrl} />}
                <TableContainer component={Paper} style={{ maxHeight: 689 }}>
                    <Table stickyHeader className={classes.table} aria-label="customized table">
                        <TableHead className='asad'>
                            <TableRow  >
                                <StyledTableCell ><Checkbox onChange={() => { setChecked(true); }} inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} /></StyledTableCell>
                                {props.data.clientHeader.map((a) => {
                                    return (<StyledTableCell >{a}</StyledTableCell>)
                                })}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row, index) => (
                                <StyledTableRow key={index}>
                                    <StyledTableCell component="th" scope="row">
                                        <Checkbox
                                            onChange={(e) => {
                                                // alert("checked" + e.target.checked);
                                                if (e.target.checked) {
                                                    console.log("checked");
                                                    dltRow.indexOf(row[props.data.clientColumns[0]]) === -1 ? dltRow.push(row[props.data.clientColumns[0]]) : console.log("This item already exists");
                                                }
                                                else {
                                                    var index = dltRow.indexOf(row[props.data.clientColumns[0]]);
                                                    if (index !== -1) {
                                                        dltRow.splice(index, 1);
                                                    }
                                                    console.log("unchecked");
                                                }
                                                console.log(dltRow);
                                            }
                                            }
                                            defaultChecked={check}
                                            inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                                    </StyledTableCell>
                                    {props.data.clientColumns.map((value) => {
                                        console.log(value + "-----" + typeof (row[value]));
                                        let div = <StyledTableCell component="th" scope="row">
                                            {checkValue(row[value])}
                                        </StyledTableCell>
                                        if (value == "issuanceHistory") {
                                            div = <StyledTableCell component="th" scope="row">
                                                <Link to={props.data.issuanceHistoryUrl + row['id']}>
                                                    <Button className="edittable" variant="outlined" color="primary" size="small">
                                                        <UpdateIcon className="editIcon" size="small" />
                                                    </Button></Link></StyledTableCell>
                                        }
                                        return (
                                            div
                                        )
                                    })}
                                    {/* <StyledTableCell component="th" scope="row">
                                        {row[props.data.clientColumns[0]]}
                                    </StyledTableCell>
                                    {console.log("------------------------------------")};
                                    {console.log("--------asad" + props.data.clientColumns[1].localeCompare("First Name"))}
                                    {props.data.clientColumns[1] == "First Name" && props.data.clientColumns[1] == "Last Name" && <StyledTableCell align="right">{row[props.data.clientColumns[1]] + " " + row[props.data.clientColumns[2]]}</StyledTableCell>}
                                    <StyledTableCell align="right">{row['id']}</StyledTableCell>
                                    <StyledTableCell align="right">{row[props.data.clientColumns[3]]}</StyledTableCell>
                                    <StyledTableCell align="right">{row[props.data.clientColumns[5]]}</StyledTableCell> */}

                                    <StyledTableCell align="right">
                                        <Link to={props.data.editUrl + row['id']}> <Button className="edittable" variant="outlined" color="primary" size="small">
                                            <EditIcon className="editIcon" size="small" />
                                        </Button></Link>
                                        <Link to={props.data.viewUrl + row['id']}> <Button className="edittable" variant="outlined" color="primary" size="small">
                                            <VisibilityIcon />
                                        </Button></Link>
                                    </StyledTableCell>


                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Paginations page={page} />
            </Paper>
            <NotificationContainer />
        </Box>

    );
}
