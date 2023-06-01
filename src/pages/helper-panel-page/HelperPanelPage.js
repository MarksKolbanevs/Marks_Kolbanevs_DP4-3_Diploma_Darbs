import { useEffect, useState } from 'react';
import './helper-panel-page.scss';
import UsersListItem from './components/users-list-item/UsersListItem';
import UserMessage from './components/messages/UserMessage';
import HelperMessage from './components/messages/HelperMessage';

export default function HelperPanelPage(){
    return(
        <div className='full-width'>
          <div className='columns-8'>
          <div className='helper-panel'>
            <div className='helper-panel-side-bar'>
              <input placeholder='Search'/>
              <div className='user-chat-list'>
                <UsersListItem/>
              </div>
            </div>
            <div className='room-container'>
              <header>
              <h2 className='w500'>{'<'}</h2>
              <h2>Facebook</h2>
              <img src="./assets/png/facebook.png"/>
              </header>
              <div className='chat-container'>
                <UserMessage/>
                <HelperMessage/>
              </div>
              <form>
                <input placeholder='Enter message..'/>
                <button>Send</button>
              </form>
            </div>
          </div>
          </div>
        </div>
    );
}