import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import GroupIcon from '@material-ui/icons/Group';
import AssignmentReturnIcon from '@material-ui/icons/AssignmentReturn';
import ScreenShareIcon from '@material-ui/icons/ScreenShare';
import PhonelinkSetupIcon from '@material-ui/icons/PhonelinkSetup';
import StorefrontIcon from '@material-ui/icons/Storefront';
import StoreMallDirectoryIcon from '@material-ui/icons/StoreMallDirectory';
import PaymentIcon from '@material-ui/icons/Payment';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import { MdAndroid } from 'react-icons/md'
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import HelpIcon from '@material-ui/icons/Help';
import ContactsIcon from '@material-ui/icons/Contacts';
import InfoIcon from '@material-ui/icons/Info';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import PersonIcon from '@material-ui/icons/Person';
import StoreIcon from '@material-ui/icons/Store';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import { CameraRoll } from '@material-ui/icons';
import address from '../address'
// import { ValueContainer } from 'react-select/src/components/containers';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function PersistentDrawerLeft(props) {

  const [menu, setMenu] = useState([]);

  useEffect(() => {

    const roll = window.localStorage.getItem("role");
    console.log("side bar roll" + roll);
    switch (roll) {
      case "0":
        alert("0 here bro");
        setMenu(["Rebenbedor", "Menu-1", "Menu-2"]);
        break;
      case "1":
        // alert("1 here bro");admin
        setMenu([
          { title: "Kliente", url: '/client' },
          { title: "Card Issuance", url: "/adddissuancehistory" },
          { title: "Payments", url: "/payments" },
          { title: "NFC Card", url: "/nfccard" },
          { title: "Device", url: "/device" },
          { title: "Merchants", url: "/merchants" },
          { title: "Merchant Type", url: "/merchantType" },
          // { title: "Transaction History", url: "#" },
        ]);
        break;
      case "2":
        alert("2 here bro");
        setMenu([" Negoshi", "Menu-1", "Menu-2"]);
        break;




    }



  }, []);


  const logout = async () => {


    const storage = window.localStorage;
    const token = storage.getItem('token');
    console.log('token in sognout' + storage.getItem('token'));
    if (storage.getItem('token')) {

      storage.removeItem('token');
    }
    const response = await axios.get(address+'/api/auth/logout', {

      headers: {

        'Authorization': 'Bearer ' + token
      }



    });



  }
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          {/* <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          className={clsx(classes.menuButton)}
        >
          {/* <MenuIcon /> 
        </IconButton> */}

          <Typography className="header" variant="h6" noWrap>
            <img className="logo" src={logo} />
          </Typography>

          <Link className="signout" to='/login'> <Button onClick={logout} className="gridadd" variant="outlined" color="primary" size="small">
            Sign Out
          </Button></Link>
          {/* <Link className="signin" to='#'> <Button className="gridadd" variant="outlined" color="primary" size="small">
          Sign In
        </Button></Link> */}



        </Toolbar>
      </AppBar>
      {/* <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    > */}

      <Divider />
      <List style={{ paddingTop: "100px" }}>

        {menu.map((value) => {
          let icon = null
          if (value.title == "Device") {
            icon = <PhonelinkSetupIcon />
          }
          else if (value.title == "Kliente") {
            icon = <GroupIcon />
          }
          else if (value.title == "Merchant Type") {
            icon = < StorefrontIcon />
          }
          else if (value.title == "Merchants") {
            icon = <StoreMallDirectoryIcon />
          }
          else if (value.title == "NFC Card") {
            icon = <PaymentIcon />
          }
          else if (value.title == "Card Issuance") {
            icon = <ScreenShareIcon />
          }
          else if (value.title == "Payments") {
            icon = <AssignmentReturnIcon />
          }
          return (
            <Link to={value.url}>  <ListItem button key='Client'>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText >{value.title} </ListItemText >
            </ListItem>
            </Link>
          )
        })}

        {/* <Link to='/Client'>  <ListItem button key='Client'>
            <ListItemIcon><GroupIcon /></ListItemIcon>
            <ListItemText >Kliente </ListItemText >
          </ListItem>
          </Link>

          <Link to='/Dealer'><ListItem button key='Dealer'>
            <ListItemIcon><PersonIcon /></ListItemIcon>
            <ListItemText >Rebenbedor  </ListItemText >
          </ListItem>
          </Link>
          <Link to='/Merchant'>
            <ListItem button key='Merchant'>
              <ListItemIcon><StoreIcon /></ListItemIcon>
              <ListItemText > Negoshi</ListItemText >
            </ListItem>
          </Link> */}
      </List>
      <Divider />
      <List>
        {/* <Link to='/login'>
          <ListItem button key='Merchant'>
            <ListItemIcon><StoreIcon /></ListItemIcon>
            <ListItemText > Login</ListItemText >
          </ListItem>
        </Link>


        <Link to='/logout'>
          <ListItem button key='Merchant'>
            <ListItemIcon><StoreIcon /></ListItemIcon>
            <ListItemText > Sign Up</ListItemText >
          </ListItem>
        </Link> */}
      </List>
      {/* </Drawer> */}
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: true,
        })}
      >
        {/* <div className={classes.drawerHeader} />
        {/* <Typography paragraph>
         Hello here
        </Typography>
        <Typography paragraph>
        hello
        </Typography> */}
      </main>
    </div>
  );
}
