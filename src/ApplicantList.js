import React, { useState, useEffect } from 'react';
import { instance } from './HttpService';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export default function ApplicantList() {
   const [applicants, setApplicants] = useState([]);

   useEffect(() => {
      const fetchApplicant = async () => {
         try {
            const response = await instance.get('/');
            let listApplicants = response.data.data;
            listApplicants.sort((a, b) => {
               if (a.lastName < b.lastName) {
                  return 1;
               }
               if (a.lastName > b.lastName) {
                  return -1;
               }
               return 0;
            });
            setApplicants(listApplicants.slice(1, 11));
            console.log(response.data);
         } catch (error) {}
      };
      fetchApplicant();
   }, []);

   return (
      <div>
         <table class='table'>
            <thead>
               <tr>
                  <th scope='col'>#</th>
                  <th scope='col'>LastName</th>
                  <th scope='col'>FirstName</th>
                  <th scope='col'>Email</th>
                  <th scope='col'>Status</th>
                  <th scope='col'>Submission Date</th>
               </tr>
            </thead>
            <tbody>
               {applicants.map((item, index) => {
                  return (
                     <tr>
                        <th scope='row'>
                           <Link to={`/editApplicant/${item._id}`}>{item._id}</Link>
                        </th>
                        <td>{item.lastName}</td>
                        <td>{item.firstName}</td>
                        <td>{item.email}</td>
                        <td>{item.status}</td>
                        <td>{item.submittedAt}</td>
                     </tr>
                  );
               })}
            </tbody>
         </table>
      </div>
   );
}
