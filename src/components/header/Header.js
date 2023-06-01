import { useEffect, useState } from 'react';
import './header.scss';
import { getUserPhoto } from '../../requests/UserRequests';
export default function Header(){
  const [userPhoto,setUserPhoto] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const photoUrl = await getUserPhoto();
        setUserPhoto(photoUrl);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);
  
    return(
        <header>
        <div className='logo-container'>
          <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
            <circle cx="15" cy="15" r="14" stroke="white" strokeWidth="2"/>
            <circle cx="12.5" cy="11.5" r="9.5" fill="white"/>
          </svg>
          <a className='px20 w600' href="/">Monle</a>
        </div>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/review">Reviews</a></li>
            <li><a href="/contacts">Contacts</a></li>
            <li><a href="/faq">FAQ</a></li>
          </ul>
        </nav>
        <div className='user-container'>
          <select id="currency" className='px16'>
            <option value="dollar">$</option>
            <option value="euro">€</option>
            <option value="ruble">₽</option>
          </select>
          <select id="language" className='px16'>
            <option value="english">English</option>
            <option value="russian">Русский</option>
            <option value="latvian">Latviski</option>
          </select>
          <button className='user-menu' tabIndex={0}>
            <a href="/account">
            {userPhoto ? <img src={userPhoto}/> 
            : <img src="/assets/png/default.png"/>}
            </a>
            <div className='menu'>
            </div>
          </button>
        </div>
      </header>
    );
}