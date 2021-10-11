import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper';
import { useHistory } from "react-router-dom";

import axios from 'axios'
import address from '../address'

const useStyles = makeStyles(theme => ({
  layout: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  paper: {
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(8),
      padding: `${theme.spacing(6)}px ${theme.spacing(4)}px`
    }
  },
  submit: {
    margin: theme.spacing(3, 0, 3)
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  }
}))

const LoginForm = (props) => {
  const history = useHistory();
  // const [email, setEmail] = useState('');
  // const [password,setPassword]=useState('');
  useEffect(() => {
    const storage = window.localStorage;
    const token = storage.getItem("token")
    if(token){
      history.push('/client');
    }
  }, [])
  async function activate(event) {
    event.preventDefault();
    // alert("clicked theer");
    console.log(JSON.stringify(formData));
    const { data } = await axios.post(address+'/api/auth/login', formData);
    const accessToken = data.data['accessToken'];
    const role = data.data.isAdmin;
    console.log(data);
    console.log(role);
    //const accessToken = "dada"
    if (accessToken) {
      const storage = window.localStorage;
      storage.setItem('token', accessToken);
      // console.log(role);
      storage.setItem("role", 1);
      history.push('/client');
      console.log("token updated");
    }
    else {
      console.log("Token error here bro");
    }


    // {
    //   method: 'POST', 
    //   body: JSON.stringify(formData),
    //   headers: {
    //     // 'Content-Type': 'application/json'
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //   },
    // }
    // );
    // console.log(response);

  }

  useEffect(() => {

    props.showSidebar(false);
    // alert(window.loca//lStorage.getItem("token"));
    // check for token if token is there then transfer the request to the home page




  }, [])

  const classes = useStyles({})
  const [formData, setFormData] = React.useState({ email: '', password: '' })
  const [submitting, setSubmitting] = React.useState(false)

  return (
    <main className={classes.layout + " loginform"}>
      <Paper className={classes.paper} elevation={2}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Typography component="h1" variant="h4" gutterBottom>
            Login
          </Typography>
          <Typography component="p" gutterBottom>
            Log in to your account dashboard
          </Typography>
        </Box>
        <form method="post" className={classes.form} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            defaultValue={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            defaultValue={formData.password}
            onChange={e => setFormData({ ...formData, password: e.target.value })}
          />
          <Box mt={3} mb={-3}>
            <Button
              onClick={activate}
              disabled={submitting}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {submitting && (
                <CircularProgress size={24} className={classes.buttonProgress} />
              )}
              {submitting ? 'Signing in...' : 'Sign In'}
            </Button>
          </Box>
          <Box >
            <Button
              onClick={() => { history.push("/register") }}
              disabled={submitting}
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
            >
              {submitting && (
                <CircularProgress size={24} className={classes.buttonProgress} />
              )}
              {submitting ? 'Register New User...' : 'Regitser New User'}
            </Button>
          </Box>
        </form>
      </Paper>
    </main>
  )
}

export default LoginForm
