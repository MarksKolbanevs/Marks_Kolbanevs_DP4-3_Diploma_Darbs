import axios from 'axios';
import { Buffer } from 'buffer';
import { toastSucceed } from '../components/toast-messages/ToastSucceed';
import { toastError } from '../components/toast-messages/ToastError';

export async function postCart(id : string){
    const token = localStorage.getItem('jwt');
    const headers = {'Content-Type': 'application/json','Authorization': `Bearer ${token}`};
    const url = `https://monleapi.onrender.com/cart`;
    try{
      const response = await axios.post(url,{bag:id},{ headers });
        if(response.status === 201){
          toastSucceed(response.data.message);
        }
    } catch (error) {
      console.log(error);
      // Handle any errors
    };
}

export async function addToSave(id : string){
  // const token = localStorage.getItem('jwt');
  // const headers = {'Content-Type': 'application/json','Authorization': `Bearer ${token}`};
  // const url = `http://192.168.8.100:8000/cart`;
  // try{
  //   const response = await axios.post(url,{bag:id},{ headers });
  //     if(response.status === 201){
  //       toastSucceed(response.data.message);
  //     }
  // } catch (error) {
  //   console.log(error);
  //   // Handle any errors
  // };
}

interface Cart{
  _id: string,
  bag :{
      name: string,
      description:string,
      material:string,
      photo: string,
  },
}

export async function getCart(){
  const token = localStorage.getItem('jwt');
  const headers = {'Content-Type': 'application/json','Authorization': `Bearer ${token}`};
  const url = `https://monleapi.onrender.com/cart`;
  try{
    const response = await axios.get(url,{ headers });
    if(response.status === 200){
      const cart = response.data;
      const cartWithConvertedPhoto = cart.map((item : Cart) => {
        const photoBuffer = Buffer.from(item.bag.photo, 'base64');
        const photoBlob = new Blob([photoBuffer], { type: 'image/jpeg' });
        const photoUrl = URL.createObjectURL(photoBlob);
        item.bag.photo = photoUrl;
        return item;
      });
      return cartWithConvertedPhoto;
    }
  } catch (error) {
    console.log(error);
    // Handle any errors
  };
}

export async function deleteItem(item: string) {
  const token = localStorage.getItem('jwt');
  const headers = {'Content-Type': 'application/json', Authorization: `Bearer ${token}`};
  const url = 'https://monleapi.onrender.com/cart/item';
  const data = {item: item};
  try {
    const response = await axios.delete(url, { headers, data });
    if (response.status === 200) {
      toastSucceed(response.data.message);
      return response.data;
    }
  } catch (error) {
    console.log(error);
    // Handle any errors
  }
}

export async function paymentVerified(){
  const token = localStorage.getItem('jwt');
  const headers = {Authorization: `Bearer ${token}`};
  const url = 'https://monleapi.onrender.com/cart/payment';
  try {
    const response = await axios.post(url,{},{ headers});
    if (response.status === 200) {
      toastSucceed(response.data.message);
      return response.data;
    }
  } catch (error : any) {
    toastError(error.response.data.message);
    console.log(error);
    // Handle any errors
  }
}