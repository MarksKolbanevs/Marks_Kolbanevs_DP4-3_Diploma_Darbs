import './users-list-item.scss';

export default function UsersListItem(){
    return(
        <div className='users-list-item-container'>
            <img src="./assets/png/facebook.png"/>
            <div className='text-holder'>
              <h2 className='px20 w600'>Quora</h2>
              <h3 className='px16 w400'>Your Daily Statement</h3>
            </div>
        </div>
    );
}