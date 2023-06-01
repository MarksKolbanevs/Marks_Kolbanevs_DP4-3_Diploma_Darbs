import axios from "axios";
import { toastSucceed } from "../components/toast-messages/ToastSucceed";
import { Buffer } from 'buffer';

export async function postReview(review: string){
    const token = localStorage.getItem('jwt');
    const headers = {'Content-Type': 'application/json','Authorization': `Bearer ${token}`};
    const url = `https://monleapi.onrender.com/review`;
    try{
      const response = await axios.post(url, {'review':review}, { headers });
        if(response.status === 201){
            toastSucceed(response.data.message);
        }
    } catch (error) {
      console.log(error);
      // Handle any errors
    };
}

export async function postLike(review: string){
  const token = localStorage.getItem('jwt');
  const headers = {'Content-Type': 'application/json','Authorization': `Bearer ${token}`};
  const url = `https://monleapi.onrender.com/review/like`;
  try{
    const response = await axios.post(url, {'review':review}, { headers });
      if(response.status === 200){
          toastSucceed(response.data.message);
      }
  } catch (error) {
    console.log(error);
    // Handle any errors
  };
}


export async function getReviews() {
    const headers = {'Content-Type': 'application/json'};
    const url = `https://monleapi.onrender.com/review`;
    try {
      const response = await axios.get(url, { headers });
      if(response.status === 200){
        const reviews = response.data;
        const reviewsWithConvertedPhoto = reviews.map((review : any) => {
          const photoBuffer = Buffer.from(review.user.photo, 'base64');
          const photoBlob = new Blob([photoBuffer], { type: 'image/jpeg' });
          const photoUrl = URL.createObjectURL(photoBlob);
          review.user.photo = photoUrl;
          return review;
        });
        return reviewsWithConvertedPhoto;
      }
    } catch (error) {
      console.log(error);
      // Handle any errors
    }
  }