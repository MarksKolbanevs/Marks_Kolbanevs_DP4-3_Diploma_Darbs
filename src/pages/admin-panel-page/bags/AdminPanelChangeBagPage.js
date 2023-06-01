import ProceedLongButton from "../../../components/buttons/proceed-long-button/ProceedLongButton";
import {useEffect, useState} from "react";
import { changeBag } from '../../../requests/AdminRequests';
import { getBag } from '../../../requests/BagRequests';
import { useSearchParams } from "react-router-dom";



export default function AdminPanelChangeBagPage(){
  const [searchParams, setSearchParams] = useSearchParams();
  const [bagData, setBagData] = useState(null);

  const [hexColor, setHexColor] = useState(undefined);

  useEffect(() => {
    async function fetchData() {
      try {
        const bag = await getBag(searchParams.get("id"));
        setBagData(bag);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    changeBag(formData);
  }

  const handleHexChange = (event) =>{
    const hex = event.target.value;
    setHexColor(hex);
  }
  
    return (
        <div className='admin-panel-container'>
            <div className='side-bar'>
                <h1 className='px28 w500 white'>Admin panel</h1>
                <nav>
                    <a className='px24 white' href="/admin-panel">Bags</a>
                    <a className='px24 white' href="/admin-panel/users">Users</a>
                    <a className='px24 white' href="/admin-panel/roles">Roles</a>
                </nav>
            </div>
            <div className='info-table-container'>
                <div className='page-header'>
                    <h1 className='px65 w400'>Change bag</h1>
                    <h2 className='px28 w400 grey'>Change bag from catalog</h2>
                </div>
                {bagData && (
                <form className="new-bag-container" onSubmit={handleSubmit}>
                <div className="main-photo-container">
                    <label htmlFor="file-input">
                      <div className="main-image-upload" style={{ backgroundColor: hexColor}}>
                        {bagData.photo ? <img src={bagData.photo} alt="Selected" className="uploaded-photo"/> 
                        : <img src = "/assets/png/image-upload.png"/>}
                      </div>
                    </label>
                    <input id="file-input" type="file" name="main-photo"/>
                </div>
                <div className="image-upload-container">
                    <div className="image-upload">
                      <label htmlFor="file-input">
                        <h1>+</h1>
                      </label>
                      <input id="file-input" type="file" name="first-photo"/>
                    </div>
                    <div className="image-upload">
                      <label htmlFor="file-input">
                        <h1>+</h1>
                      </label>
                      <input id="file-input" type="file" name="second-photo"/>
                    </div> 
                    <div className="image-upload">
                      <label htmlFor="file-input">
                        <h1>+</h1>
                      </label>
                      <input id="file-input" type="file" name="third-photo"/>
                    </div> 
                    <div className="image-upload">
                      <label htmlFor="file-input">
                        <h1>+</h1>
                      </label>
                      <input id="file-input" type="file" name="fourth-photo"/>
                    </div> 
                </div>
                <h2 className="px36 grey">Main</h2>
                <input className="small-input" name="name" placeholder="Name" defaultValue={bagData.name}/>
                <input className="small-input" name="price" placeholder="Price" defaultValue={bagData.price}/>
                <textarea className="textbox-input" name="description" placeholder="Description" defaultValue={bagData.description}/>
                <textarea className="textbox-input" name="material" placeholder="Materials" defaultValue={bagData.material}/>
                <ProceedLongButton/>
                </form>
                )}
            </div>
        </div>
    );
}