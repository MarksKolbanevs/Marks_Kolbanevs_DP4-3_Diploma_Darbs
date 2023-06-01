import axios from 'axios';
import { Buffer } from 'buffer';
import { toastSucceed } from '../components/toast-messages/ToastSucceed';

export async function getUser() {
  const tocken = localStorage.getItem('jwt');
  const headers = {'Authorization': `Bearer ${tocken}`};
  const url = `https://monleapi.onrender.com/user`;
  try {
    const response = await axios.get(url, {headers});
    if(response.status === 200){
      const body = response.data;
      return body;
    }
  } catch (error) {
    console.log(error);
    // Handle any errors
  }
}

export async function getUserPhoto(){
  const token = localStorage.getItem('jwt');
  const headers = {'Content-Type': 'application/json','Authorization': `Bearer ${token}`};
  const url = `https://monleapi.onrender.com/user/photo`;
  try {
    const response = await axios.get(url, {headers});
    if (response.status === 200) {
      const photoBuffer = Buffer.from(response.data, 'base64');
      const photoBlob = new Blob([photoBuffer], { type: 'image/jpeg' });
      const photoUrl = URL.createObjectURL(photoBlob);
      return photoUrl;
    }
  } catch (error) {
    console.log(error);
    // Handle any errors
  }
  return null;
}

export async function updateUserPhoto(formData : FormData){
  const token = localStorage.getItem('jwt');
  const headers = {'Authorization': `Bearer ${token}`};
  const url = `https://monleapi.onrender.com/user/photo`;
  try{
    const response = await axios.patch(url, formData, {headers});
    if (response.status === 200) {
      toastSucceed(response.data.message);
    }
  } catch (e){
    console.log(e);
  }
}

export async function updateUser(formData : FormData){
  // Step 1: Create an empty object
  const formDataObject: { [key: string]: FormDataEntryValue } = {};

  // Step 2: Iterate through FormData entries
  formData.forEach((value, key) => {
    // Step 3: Assign key-value pairs to the object
    formDataObject[key] = value;
  });

  // Step 4: Convert the object to JSON string
  const formDataJSON = JSON.stringify(formDataObject);
  const token = localStorage.getItem('jwt');
  const headers = {'Content-Type': 'application/json','Authorization': `Bearer ${token}`};
  const url = `https://monleapi.onrender.com/user`;
  try{
    const response = await axios.patch(url, formDataJSON, {headers});
    if (response.status === 200) {
      toastSucceed(response.data.message);
    }
  } catch (e){
    console.log(e);
  }
}