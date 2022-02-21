//React
import { Component } from 'react';
import { BrowserRouter as Router,Switch, Route} from "react-router-dom";
import './App.css';
import './style.css';
import firebase from "firebase/app";
//Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
//Components
import Main from './componets/Main.js';
import Admin from './componets/Admin.js';
import Footer from './componets/Footer.js';
import { AuthProvider } from './context/AuthContext';
import ForgotPassword from './componets/forgotPassword'


class App extends Component {


  render(){
  return (
      <div>
        <Router>
        <AuthProvider>
            <Switch>
                <Route  path="/admin" component={Admin} />
                <Route  exact path='/forgot-password' component={ForgotPassword}></Route>
                <Route  path="/" component={Main}/>
            </Switch>
          </AuthProvider>
        </Router>
        <Footer></Footer>
      </div>
  );
  }
}

export default App;
