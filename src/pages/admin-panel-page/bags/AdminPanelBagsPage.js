import { useEffect, useState } from 'react';
import './../admin-panel-page.scss';
import { deleteBag } from '../../../requests/AdminRequests';
import { getBags,searchBag } from '../../../requests/BagRequests';
import { postUuid } from '../../../requests/BagUuidRequests';

export default function AdminPanelBagsPage(){
  const [bagsData, setBagsData] = useState([]);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const bags = await getBags();
        console.log(bags);
        setBagsData(bags);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const handleUploadCsv = (event, bag) => {
    const csv = event.target.files[0];
    const formData = new FormData();
    formData.append('uuid-csv', csv);
    formData.append('bag', bag);
    postUuid(formData);
  }

  const handleSearch = async (event) => {
    event.preventDefault();
    const queryBags = await searchBag(event.target.value);
    setBagsData(queryBags);
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
                    <h1 className='px65 w400'>Bags</h1>
                    <h2 className='px28 w400 grey'>Manipulate with bags data</h2>
                </div>
                <table className='info-table'>
                    <thead>
                      <tr className='table-header'>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Material</th>
                        <th>Image</th>
                        <th><a className='add-button' href = "/admin-panel/bags/new" >+</a></th>
                        <th><input placeholder='Search by name..' onChange={handleSearch}/></th>
                        <th/>
                      </tr>
                    </thead>
                    <tbody>
                      {bagsData.map((bag,index) => (
                        <tr name={bag._id} key={index} tabIndex={index}>
                          <td>{bag.name}</td>
                          <td>{bag.description}</td>
                          <td>{bag.material}</td>
                          <td className='td-centered'><img className='user-photo' src={bag.photo}/></td>
                          <td><button className='reject-button' onClick={async () => await deleteBag(bag._id)}>Delete</button></td>
                          <td><button className='change-button' onClick={ () => window.location.href = '/admin-panel/bag/change?id='+bag._id}>Change</button></td>
                          <td className='csv-uploader'>
                              <label htmlFor="csv" className='change-button'>Upload csv</label>
                              <input id="csv" type="file" name="uuid-csv" onChange={ (event) => handleUploadCsv(event, bag._id)}/>
                          </td>
                        </tr>
                      ))} 
                    </tbody>
                </table>
            </div>
        </div>
    );
}