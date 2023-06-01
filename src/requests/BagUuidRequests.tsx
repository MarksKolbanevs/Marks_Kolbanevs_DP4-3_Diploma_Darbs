import axios from 'axios';
import { toastSucceed } from '../components/toast-messages/ToastSucceed';

export async function postUuid(formData : FormData) {
  const tocken = localStorage.getItem('jwt');
  const headers = {'Authorization': `Bearer ${tocken}`};
  const url = `https://monleapi.onrender.com/bag/uuid`;
  try {
    const response = await axios.post(url, formData, {headers});
    if(response.status === 201){
      toastSucceed(response.data.message);
    }
  } catch (error) {
    console.log(error);
    // Handle any errors
  }
}