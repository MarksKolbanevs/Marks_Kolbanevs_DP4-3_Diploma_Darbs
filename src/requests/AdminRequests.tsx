import axios from 'axios';
import { Buffer } from 'buffer';
import { toastSucceed } from '../components/toast-messages/ToastSucceed';
import { toastError } from '../components/toast-messages/ToastError';

interface User {
  _id: string;
  photo: string;
  // add any other properties as needed
}

export async function getUsers() {
  const tocken = localStorage.getItem('jwt');
  const headers = {'Content-Type': 'application/json','Authorization': `Bearer ${tocken}`};
  const url = `https://monleapi.onrender.com/admin/users`;
  try {
    const response = await axios.get(url, { headers });
    if(response.status === 200){
      const users = response.data;
      console.log(users);
      const usersWithConvertedPhoto = users.map((user : User) => {
        const photoBuffer = Buffer.from(user.photo, 'base64');
        const photoBlob = new Blob([photoBuffer], { type: 'image/jpeg' });
        const photoUrl = URL.createObjectURL(photoBlob);
        user.photo = photoUrl;
        return user;
      });
      console.log(usersWithConvertedPhoto);
      return usersWithConvertedPhoto;
    }
  } catch (error) {
    console.log(error);
    // Handle any errors
  }
}

export async function getBags() {
  const tocken = localStorage.getItem('jwt');
  const headers = {'Content-Type': 'application/json','Authorization': `Bearer ${tocken}`};
  const url = `https://monleapi.onrender.com/admin/bags`;
  try {
    const response = await axios.get(url, { headers });
    if(response.status === 200){
      const bags = response.data;
      const bagsWithConvertedPhoto = bags.map((bag : User) => {
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

export async function deleteUser(id: string) {
  const token = localStorage.getItem('jwt');
  const headers = {'Content-Type': 'application/json','Authorization': `Bearer ${token}`};
  const url = 'https://monleapi.onrender.com/admin/user';
  const data = {id: id};
  try {
    const response = await axios.delete(url, { headers, data });
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

export async function deleteBag(id: string) {
  const token = localStorage.getItem('jwt');
  const headers = {'Content-Type': 'application/json', Authorization: `Bearer ${token}`};
  const url = 'https://monleapi.onrender.com/admin/bag';
  const data = {id: id};
  try {
    const response = await axios.delete(url, { headers, data });
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

export async function updateBag(formData : FormData){
  const token = localStorage.getItem('jwt');
  const headers = {'Authorization': `Bearer ${token}`};
  const url = `https://monleapi.onrender.com/admin/bag`;
  try{
    const response = await axios.patch(url, formData, {headers});
    if (response.status === 200) {
      alert('User updated');
    }
  } catch (e){
    console.log(e);
  }
}

export async function changeBag(formData : FormData){
  const token = localStorage.getItem('jwt');
  const headers = {'Authorization': `Bearer ${token}`};
  const url = `https://monleapi.onrender.com/bag`;
  await axios.patch(url,formData,{headers: headers}).then(response => {
      if(response.status === 200){
        alert('Changed');
      }
    }).catch(error => {
      console.log(error.response);
      // Handle any errors
});
}

interface User{}

export async function searchUser(query : string) {
  const token = localStorage.getItem('jwt');
  const headers = {'Content-Type': 'multipart/form-data','Authorization': `Bearer ${token}`};
  const url = `https://monleapi.onrender.com/admin/users/search`;
  try {
    const response = await axios.get(url,{headers, params:{query}});
    if(response.status === 200){
      const users = response.data;
      const usersWithConvertedPhoto = users.map((user : User) => {
        const photoBuffer = Buffer.from(user.photo, 'base64');
        const photoBlob = new Blob([photoBuffer], { type: 'image/jpeg' });
        const photoUrl = URL.createObjectURL(photoBlob);
        user.photo = photoUrl;
        return user;
      });
      console.log(users);
      return usersWithConvertedPhoto;
    }
  } catch (error) {
    console.log(error);
    // Handle any errors
  }
}
