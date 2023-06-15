import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import useStyles from "./styles";
import {Avatar, Button, Container, Grid, Paper, Typography} from "@material-ui/core";
import {LockOutlined} from "@material-ui/icons";
import Input from "./Input";
import {useNavigate} from "react-router-dom";
import {handleAuth} from "../../redux/auth";
import apiAxios from "../../api";

const initialState = {name: "", lastname: "", email: "", password: "", confirmPassword: ""}
const Auth = () => {
   const classes = useStyles()
   const [isSignup, setIsSignup] = useState(true)
   const [showPassword, setShowPassword] = useState(false)
   const [formData, setFormData] = useState(initialState)
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const handleSubmit = (e) => {
      e.preventDefault()
      if (isSignup) {
         apiAxios.post("/auth/register", formData).then(({data}) => {
            dispatch(handleAuth({token: data.access_token}))
            navigate("/")
         })
      } else {
         apiAxios.post("/auth/login", formData).then(({data}) => {
            dispatch(handleAuth({token: data.access_token}))
            navigate("/")
         })
      }
   }
   const handleChange = (e) => {
      e.preventDefault()
      setFormData({...formData, [e.target.name]: e.target.value})
   }

   const switchMode = () => {
      setIsSignup((prevIsSignup) => !prevIsSignup)
      setShowPassword(false)
   }

   const handleShowPassword = () => setShowPassword((prevShowPass) => !prevShowPass)
   return (
      <Container component={"main"} maxWidth={"xs"}>
         <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
               <LockOutlined/>
            </Avatar>
            <Typography variant={"h5"}>{isSignup ? "Sign up" : "Sign in"}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
               <Grid container spacing={2}>
                  {isSignup && (
                     <>
                        <Input name="name" label={"First name"} handleChange={handleChange} autoFocus half/>
                        <Input name="lastname" label={"Last name"} handleChange={handleChange} half/>
                     </>
                  )}
                  <Input name={"email"} label={"Email address"} handleChange={handleChange} type={"email"}/>
                  <Input name={"password"} label={"Password"} handleChange={handleChange} className={classes.confirmButton}
                         type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                  {isSignup && <Input name={"confirmPassword"} label={"Confirm password"} handleChange={handleChange} type={"password"} className={classes.confirmButton}/>}
               </Grid>
               <Button type={"submit"} variant={"contained"} fullWidth color={"primary"} className={"mt-5 mb-5"} style={{marginTop:"20px"}}>
                  {isSignup ? "Sign up" : "Sign in"}
               </Button>
               <Grid container justifyContent={"flex-end"} >
                  <Grid item>
                     <Button onClick={switchMode}>
                        {isSignup ? "Already have an account ? Sign in" : "Don't have an account? Sign up"}
                     </Button>
                  </Grid>
               </Grid>
            </form>
         </Paper>
      </Container>
   )
}

export default Auth;