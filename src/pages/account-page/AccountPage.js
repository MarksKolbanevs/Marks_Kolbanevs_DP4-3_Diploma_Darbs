import OutlineAccentRoundButton from '../../components/buttons/outline-accent-round-button/OutlineAccentRoundButton';
import { SendForVerify } from '../../requests/AuthRequests';
import { getUser, getUserPhoto, updateUserPhoto, updateUser } from '../../requests/UserRequests';
import './account-page.scss';
import { useEffect, useState } from 'react';

// interface UserData {
//   photo: string,
//   _id: string,
//   phone: number,
//   email: string,
//   name: string,
//   passwordHash: string,
// }

// interface UserPhoto {
//   photo: string,
// }

export default function AccountPage() {
  const [userData, setUserData] = useState/*<UserData | null>*/(null);
  const [userPhoto, setUserPhoto] = useState/*<UserPhoto | null>*/(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getUser();
        setUserData(data);
        const photoUrl = await getUserPhoto();
        setUserPhoto(photoUrl);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const handleUpdatePhoto = (event) => {
    const photo = event.target.files[0];
    const formData = new FormData();
    formData.append('photo', photo);
    updateUserPhoto(formData);
  }

  const handleUpdate = (event) =>{
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    updateUser(formData);
  }


  return (
    <div className="full-width">
      <div className="account-container">
        {userData ? (
          <>
            <div className="account-main">
            <div className="image-upload">
              <label htmlFor="file-input">
                <img src={userPhoto}/>
              </label>
              <input id="file-input" type="file" name="userPhoto" onChange={handleUpdatePhoto}/>
            </div>
            </div>
            <form className='account-inputs' onSubmit={handleUpdate}>
              <input className='px24 w500' placeholder='Name' name="name" defaultValue={userData.name}/>
              <input className='px18 w600 grey' placeholder='Email' name="email" defaultValue={userData.email}/>
              {userData.emailVerified ? null : <button type="button" onClick={ () => SendForVerify(userData.email)}>Verify</button>}
              <input defaultValue={userData.phone} name="phone" placeholder='Phone' />
              <OutlineAccentRoundButton text="Save"/>
            </form>
          </>
        ) : 'Login/Signup to see your credentials'}
      </div>
    </div>
  );
}
