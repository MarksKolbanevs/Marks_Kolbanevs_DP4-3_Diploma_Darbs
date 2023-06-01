import { ChangeEvent, useEffect, useState } from 'react';
import './../admin-panel-page.scss';
import { deleteUser, getUsers, searchUser } from '../../../requests/AdminRequests';
import { searchBag } from '../../../requests/BagRequests';

export default function AdminPanelUsersPage(){
    
    interface UsersData {
        photo: string,
        _id: string,
        phone: number,
        email: string,
        name: string,
        passwordHash: string,
    }

    const [usersData, setUsersData] = useState<UsersData[]>([]);
    useEffect(() => {
        async function fetchData() {
          try {
            const users = await getUsers();
            setUsersData(users);
          } catch (error) {
            console.error(error);
          }
        }
        fetchData();
      }, []);

      const handleSearch = async (event:ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const queryBags = await searchUser(event.target.value);
        setUsersData(queryBags);
      };

    return(
        <div className='admin-panel-container'>
            <div className='side-bar'>
                <h1 className='px28 w500 white'>Admin panel</h1>
                <nav>
                    <a className='px24 white' href="/admin-panel">Bags</a>
                    <a className='px24 white' href="/admin-panel/users">Users</a>
                    <a className='px24 white' href="/admin-panel/bugs">Bugs</a>
                    <a className='px24 white' href="/admin-panel/faq">Faq</a>
                </nav>
            </div>
            <div className='info-table-container'>
                <div className='page-header'>
                    <h1 className='px65 w400'>Users</h1>
                    <h2 className='px28 w400 grey'>Manipulate with users</h2>
                </div>
                <table className='info-table'>
                    <thead>
                      <tr className='table-header'>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Photo</th>
                        <th><input placeholder='Search by name..' onChange={handleSearch}/></th>
                      </tr>
                    </thead>
                    <tbody>
                    {usersData.map((user,index) => (
                      <tr key={index}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td className='td-centered'><img src={user.photo} className='user-photo'/></td>
                      <td><button className='reject-button' onClick={ async () => await deleteUser(user._id)}>Block</button></td>
                      </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}