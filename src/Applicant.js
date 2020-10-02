import React, { useState } from 'react';
import { instance } from './HttpService';
import { toast } from 'react-toastify';

export default function Applicant() {
   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [email, setEmail] = useState('');

   const handleSubmit = async (e) => {
      e.preventDefault();
      let requestData = {
         firstName: firstName.toUpperCase(),
         lastName: lastName.toUpperCase(),
         email,
         cvUrl: 'default url',
      };
      try {
         const response = await instance.post('/', requestData);
         if (response.data.status === 'success')
            toast.info('Application submitted successfully', { autoClose: 3000 });
         else {
            toast.error('sorry we are not able to process you application try later !', {
               autoClose: 3000,
            });
         }
      } catch (error) {
         if (error.message.includes('Network Error') || !error.response) {
            toast.error('Network error - make sure API is running', {
               autoClose: true,
            });
         } else {
            toast.error(`${error.response.data.message}`, {
               autoClose: 3000,
            });
         }
      }
   };

   return (
      <div className='row mt-5'>
         <div className='col-md-6 offset-md-3'>
            <div class='card'>
               <div class='card-body'>
                  <h2>Submit your application</h2>
                  <form onSubmit={handleSubmit}>
                     <div class='form-row'>
                        <div class='form-group col-md-6'>
                           <label for='firstName'>FirstName</label>
                           <input
                              type='text'
                              class='form-control'
                              id='firstName'
                              name='firstName'
                              value={firstName}
                              onChange={(e) => setFirstName(e.currentTarget.value)}
                           />
                        </div>
                        <div class='form-group col-md-6'>
                           <label for='inputPassword4'>LastName</label>
                           <input
                              type='text'
                              class='form-control'
                              id='lastName'
                              name='lastName'
                              value={lastName}
                              onChange={(e) => setLastName(e.currentTarget.value)}
                           />
                        </div>
                        <div class='form-group col-md-12'>
                           <label for='inputAddress'>Email</label>
                           <input
                              type='text'
                              class='form-control'
                              id='email'
                              value={email}
                              placeholder='Email'
                              onChange={(e) => setEmail(e.currentTarget.value)}
                           />
                        </div>
                        <div class='form-group col-md-6'>
                           <div class='custom-file'>
                              <input type='file' class='custom-file-input' id='customFile' />
                              <label class='custom-file-label' for='customFile'>
                                 Upload CV
                              </label>
                           </div>
                        </div>
                     </div>
                     <div class='form-group row'>
                        <div class='col-sm-10'>
                           <button type='submit' class='btn btn-primary'>
                              Submit
                           </button>
                        </div>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </div>
   );
}
