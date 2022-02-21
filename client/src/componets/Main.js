//React
import React, {Component} from 'react';
import { BrowserRouter as Router,Switch, Route} from "react-router-dom";
//Bootstrap

//Componets
import Home from './Home';
import Navigation from './Navigation.js';
import Showroom from './Showroom';
import Service from './Service';
import ContactPage from './ContactPage';
import Car from './Car';


class Main extends Component {


    render(){

    return (
      <Router>
              <Navigation></Navigation>
        <Switch>
          <Route exact path='/' component={Home}></Route>
          <Route exact path='/cars' component={Showroom}></Route>
          <Route exact path='/service' component={Service}></Route>
          <Route  exact path='/contact' component={ContactPage}></Route>
          <Route  exact path='/car' component={Car}></Route>
          <Route exact path='/car/:id' component={Car}></Route>
        </Switch>
      </Router>
    );
    }
  }
  
  export default Main;
  