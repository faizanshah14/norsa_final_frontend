import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import Select from 'react-select';
import ReactPaginate from 'react-paginate';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
           
        },
    },
}));
//you can use the component react paginate
export default function PaginationRounded(props) {
    const changeRows = (event,pageNo) => {
        // NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);

    // alert("rows changed" + pageNo);
    //    console.log(event.target.querySelector('button'));
    // console.log(event.target.firstChild)
    //     if(!event.target.innerText){
    //     var check = event.currentTarget.firstChild.firstChild.getAttribute("d");
    //     if (check.includes("M10")) {
    //         console.log("ri8 function here");

    //     }
    //     else{

    //    console.log("left function here bro");

    //     }
    // }
    //    console.log(event);
    }
    const classes = useStyles();

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]


    return (
        <div className={classes.root + " pagination"}>

            <Pagination onChange={changeRows} count={props.page}  siblingCount={5} size="large" variant="outlined" shape="rounded" />
            {/* <Select options={options} /> */}
        </div>
    );
}
