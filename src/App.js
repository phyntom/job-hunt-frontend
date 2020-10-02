import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Applicant from './Applicant';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer } from 'react-toastify';
import Navigation from './Navigation';
import ApplicantList from './ApplicantList';
import EditApplicant from './EditApplicant';

function App() {
   return (
      <div className='container'>
         <ToastContainer />
         <Navigation />
         <Switch>
            <Route path={'/'} exact component={Applicant} />
            <Route path={'/apply'} component={Applicant} />
            <Route path={'/applicantList'} component={ApplicantList} />
            <Route path={'/editApplicant/:applicantId'} component={EditApplicant} />
         </Switch>
      </div>
   );
}

export default App;
