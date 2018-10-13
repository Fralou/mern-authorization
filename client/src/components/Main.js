import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom'
import SignIn from './SignIn'
import SignUp from './SignUp'
import '../styles/Main.css'



const Main = () => (
    <div className="Main">
        <Switch>
            <Redirect exact from='/' to='/signin'/>
            <Route path='/signin' component={SignIn}/>
            <Route path='/signup' component={SignUp}/>
        </Switch>
    </div>
)

export default Main