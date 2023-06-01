import axios from 'axios';
import qs from 'qs';
import { toastSucceed } from '../components/toast-messages/ToastSucceed';
import { toastError } from '../components/toast-messages/ToastError';

export async function Signup(formData : FormData){
    let headers = { 'Content-Type': 'application/json' };
    try{
      const response = await axios.post('https://monleapi.onrender.com/auth/signup', formData, { headers: headers });
      if(response.status === 201){
        alert(response.data.message);
        localStorage.setItem('jwt', response.data.token); // Save token to localStorage
        //window.location.href = '/';
      }
    } catch (error){
      console.log(error);
    }
}

export async function Verify(token : string){
  const headers = { 'Content-Type': 'application/json' };
  try{
    const response = await axios.get(`https://monleapi.onrender.com/auth/verify?token=${token}`, { headers: headers });
    if(response.status === 200){
      toastSucceed(response.data.message);
    }
  } catch (e) {
    console.log(e);
  }
}

export async function SendForVerify(email : string){
  const token = localStorage.getItem('jwt');
  const headers = {'Authorization': `Bearer ${token}`};
  try{
    const response = await axios.get(`https://monleapi.onrender.com/auth/send-verify?email=${email}`, { headers: headers });
    if(response.status === 201){
      toastSucceed(response.data.message);
    }else{
      toastError(response.data.message);
    }
  } catch (e) {
    console.log(e);
  }
}

export async function Login(formData: FormData): Promise<any> {
  const headers = { 'Content-Type': 'application/json' };
  const params = qs.stringify(Object.fromEntries(formData.entries()));
  const url = `https://monleapi.onrender.com/auth/login?${params}`;
  try {
    const response = await axios.get(url, { headers });
    if (response.status === 200) {
      localStorage.setItem('jwt', response.data.token);
      window.location.href = '/';
      return true; // Successful login, return an empty string
    }
  } catch (error:any) {
    return error.response.data.message; // Return the error message
  } 
  return 'Unknown error occurred.'; // Handle any other unexpected errors
}

export async function AdminLogin(formData: FormData): Promise<any> {
  const headers = { 'Content-Type': 'application/json' };
  const params = qs.stringify(Object.fromEntries(formData.entries()));
  const url = `https://monleapi.onrender.com/auth/admin-login?${params}`;
  try{
    const response = await axios.get(url, { headers });
    if(response.status === 200){
      localStorage.setItem('jwt', response.data.token); // Save token to localStorage
      window.location.href = '/admin-panel';
      return true;
    }
  } catch (error:any) {
    return error.response.data.message;
  }
}

export async function HelperLogin(formData : FormData){
  const headers = { 'Content-Type': 'application/json' };
  const params = qs.stringify(Object.fromEntries(formData.entries()));
  const url = `https://monleapi.onrender.com/auth/helper-login?${params}`;
  await axios.get(url, { headers }).then(response => {
      if(response.status === 200){
        console.log('Logged in');
        localStorage.setItem('jwt', response.data.token); // Save token to localStorage
        window.location.href = '/helper-panel';
      }
    }).catch(error => {
      console.log(error.response);
      // Handle any errors
    });
}



