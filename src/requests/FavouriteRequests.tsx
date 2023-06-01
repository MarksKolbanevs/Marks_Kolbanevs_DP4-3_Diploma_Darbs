import axios from 'axios';
import { Buffer } from 'buffer';
import { toastSucceed } from '../components/toast-messages/ToastSucceed';
import { toastError } from '../components/toast-messages/ToastError';

export async function postFavourite(id : string){
    const token = localStorage.getItem('jwt');
    const headers = {'Content-Type': 'application/json','Authorization': `Bearer ${token}`};
    const url = `https://monleapi.onrender.com/favourite`;
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

interface Favourite{
  _id: string,
  bag :{
      name: string,
      description:string,
      material:string,
      photo: string,
  },
}

export async function getFavourite(){
  const token = localStorage.getItem('jwt');
  const headers = {'Content-Type': 'application/json','Authorization': `Bearer ${token}`};
  const url = `https://monleapi.onrender.com/favourite`;
  try{
    const response = await axios.get(url,{ headers });
    if(response.status === 200){
      const cart = response.data;
      const cartWithConvertedPhoto = cart.map((item : Favourite) => {
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

export async function deleteFavourite(item: string) {
  const token = localStorage.getItem('jwt');
  const headers = {'Content-Type': 'application/json', Authorization: `Bearer ${token}`};
  const url = 'https://monleapi.onrender.com/favourite/item';
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