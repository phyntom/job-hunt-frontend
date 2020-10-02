import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navigation(props) {
   return (
      <div>
         <nav className='navbar navbar-expand-lg navbar-light bg-light'>
            {/* <NavLink className='navbar-brand' href='#'>
               Logo
            </NavLink> */}
            <button
               className='navbar-toggler'
               type='button'
               data-toggle='collapse'
               data-target='#navbarNav'
               aria-controls='navbarNav'
               aria-expanded='false'
               aria-label='Toggle navigation'
            >
               <span className='navbar-toggler-icon'></span>
            </button>
            <div className='collapse navbar-collapse' id='navbarNav'>
               <ul className='navbar-nav'>
                  <NavLink className='nav-item nav-link active' to='/apply'>
                     Apply
                  </NavLink>
                  <NavLink className='nav-item nav-link active' to='/applicantList'>
                     View Application
                  </NavLink>
               </ul>
            </div>
         </nav>
      </div>
   );
}
