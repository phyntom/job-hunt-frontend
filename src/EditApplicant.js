import React, { useState, useEffect } from 'react';
import { instance } from './HttpService';
import { toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';

export default function EditApplicant(props) {
   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [email, setEmail] = useState('');
   const [status, setStatus] = useState('');
   const { applicantId } = props.match.params;

   console.log(applicantId);

   const handleSubmit = async (e) => {
      e.preventDefault();
      let requestData = {
         firstName: firstName.toUpperCase(),
         status,
      };
      try {
         const response = await instance.patch(`/${applicantId}`, requestData);
         if (response.data.status === 'success')
            toast.info('Applicant status edited successfully', { autoClose: 3000 });
         else {
            toast.error('sorry we are not able to process you application try later !', {
               autoClose: 3000,
            });
         }
         props.history.push('/applicantList');
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

   const fetchApplicantById = () => {
      instance
         .get(`/${applicantId}`)
         .then((response) => {
            setFirstName(response.data.data.firstName);
            setLastName(response.data.data.lastName);
            setEmail(response.data.data.email);
            setStatus(response.data.data.status);
            console.log(response.data);
         })
         .catch((error) => {
            console.error(error.message);
         });
   };

   useEffect(fetchApplicantById, []);

   return (
      <div>
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
                                 disabled
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
                                 disabled
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
                                 disabled
                              />
                           </div>
                           <div class='form-group col-md-12'>
                              <label for='status'>Status</label>
                              <input
                                 type='text'
                                 class='form-control'
                                 id='status'
                                 value={status}
                                 placeholder='Status'
                                 onChange={(e) => setStatus(e.currentTarget.value)}
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
                                 Edit Status
                              </button>
                           </div>
                        </div>
                     </form>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
