import axios from 'axios';
import { Buffer } from 'buffer';
import { toastError } from '../components/toast-messages/ToastError';

export async function postBag(formData : FormData){
    const token = localStorage.getItem('jwt');
    const headers = {'Content-Type': 'multipart/form-data','Authorization': `Bearer ${token}`};
    const url = `https://monleapi.onrender.com/bag`;
    try{
      const response = await axios.post(url, formData, { headers: headers });
      if(response.status === 201){
          window.location.href = '/admin-panel';
      }
    } catch (error : any) {
      toastError(error.response.data.message);
    }
}

interface Bag {
  _id: string;
  name:string;
  description:string;
  material:string;
  photo: string;
  // add any other properties as needed
}

export async function getBags() {
  const headers = {'Content-Type': 'application/json'};
  const url = `https://monleapi.onrender.com/bag/bags`;
  try {
    const response = await axios.get(url, { headers });
    if(response.status === 200){
      const bags = response.data;
      const bagsWithConvertedPhoto = bags.map((bag : Bag) => {
        const photoBuffer = Buffer.from(bag.photo, 'base64');
        const photoBlob = new Blob([photoBuffer], { type: 'image/jpeg' });
        const photoUrl = URL.createObjectURL(photoBlob);
        bag.photo = photoUrl;
        return bag;
      });
      return bagsWithConvertedPhoto;
    }
  } catch (error) {
    console.log(error);
    // Handle any errors
  }
}

export async function getBag(bag : string) {
  const headers = {'Content-Type': 'application/json'};
  // const data = {bag: bag};
  const url = `https://monleapi.onrender.com/bag`;
  try {
    const response = await axios.get(url,{headers, params:{bag}});
    if(response.status === 200){
      const bag = response.data;
      const photoBuffer = Buffer.from(bag.photo, 'base64');
      const photoBlob = new Blob([photoBuffer], { type: 'image/jpeg' });
      const photoUrl = URL.createObjectURL(photoBlob);
      bag.photo = photoUrl;
      return bag;
    }
  } catch (error) {
    console.log(error);
    // Handle any errors
  }
}

export async function searchBag(query : string) {
  const headers = {'Content-Type': 'application/json'};
  const url = `https://monleapi.onrender.com/bag/search`;
  try {
    const response = await axios.get(url,{headers, params:{query}});
    if(response.status === 200){
      const bags = response.data;
      const bagsWithConvertedPhoto = bags.map((bag : Bag) => {
        const photoBuffer = Buffer.from(bag.photo, 'base64');
        const photoBlob = new Blob([photoBuffer], { type: 'image/jpeg' });
        const photoUrl = URL.createObjectURL(photoBlob);
        bag.photo = photoUrl;
        return bag;
      });
      console.log(bags);
      return bagsWithConvertedPhoto;
    }
  } catch (error) {
    console.log(error);
    // Handle any errors
  }
}