import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import { PinDropSharp } from '@material-ui/icons';
import RowSize from './PageSize';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const toggle=()=>{



}

export default function ActionButtons(props) {
  const classes = useStyles();

  return (
    <div className={classes.root+" actionButtons"}>
    
    <Link to={props.url} > <Button className="gridadd" variant="outlined" color="primary" size="small">
     Add
      </Button></Link>
      <Link to='#'> <Button onClick={props.dormint}  className="active" variant="outlined" color="primary" size="small">
      Active
      </Button>
      </Link>
      <Link >
      <Button  onClick={props.delete} className="gridDelete" variant="outlined" color="primary" size="small">
      <Link >Delete</Link>
      </Button> </Link>
      {/* <RowSize/> */}
      
     
     
    </div>
  );
}
