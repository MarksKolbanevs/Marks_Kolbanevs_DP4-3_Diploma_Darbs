import axios from 'axios';

export async function getFaq(){
    const headers = {'Content-Type': 'application/json'};
    const url = `https://monleapi.onrender.com/faq`;
    
    try{
      const response = await axios.get(url, { headers });
        if(response.status === 200){
          return response.data;
        }
    } catch (error) {
      console.log(error);
      // Handle any errors
    };
  }