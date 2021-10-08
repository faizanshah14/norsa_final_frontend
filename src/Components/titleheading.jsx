import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

export default function DenseAppBar({heading}) {
  const classes = useStyles();

  return (
    <div className={`${classes.root} titlehead`}>
      <AppBar position="static">
        <Toolbar variant="dense">
         {console.log("form"+heading)}
          <Typography variant="h5" color="inherit">
            {heading}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
