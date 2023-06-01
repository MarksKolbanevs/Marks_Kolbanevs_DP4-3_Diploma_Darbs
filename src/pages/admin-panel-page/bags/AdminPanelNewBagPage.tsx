import { ChangeEvent, useState } from "react";
import ProceedLongButton from "../../../components/buttons/proceed-long-button/ProceedLongButton";
import { postBag } from "../../../requests/BagRequests";
import { toastSucceed } from "../../../components/toast-messages/ToastSucceed";
import { toastError } from "../../../components/toast-messages/ToastError";

export default function AdminPanelNewBagPage(){
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [hexColor, setHexColor] = useState<string | undefined>(undefined);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        postBag(formData);
  }

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileName = file.name;
      const fileExtension = fileName.split('.').pop();
      if (fileExtension !== 'jpg' && fileExtension !== 'png') {
        toastError('Valid extensions are .jpg and .png only!');
        return;
      }
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleHexChange = (event:ChangeEvent<HTMLInputElement>) =>{
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
                    <h1 className='px65 w400'>New bag</h1>
                    <h2 className='px28 w400 grey'>Add new bag to catalog</h2>
                </div>
                <form className="new-bag-container" onSubmit={handleSubmit}>
                  <div className="main-photo-container">
                    <label htmlFor="file-input">
                      <div className="main-image-upload" style={{ backgroundColor: hexColor}}>
                        {selectedImage ? <img src={selectedImage} alt="Selected" className="uploaded-photo"/> 
                        : <img src = "/assets/png/image-upload.png"/>}
                      </div>
                    </label>
                    <input id="file-input" type="file" name="main-photo" onChange={handleImageChange}/>
                  </div>
                  <input placeholder="Hex" name="hex" onChange={handleHexChange}/>
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
                <input className="small-input" name="name" placeholder="Name" />
                <input className="small-input" name="price" placeholder="Price" />
                <textarea className="textbox-input" name="description" placeholder="Description" />
                <textarea className="textbox-input" name="material" placeholder="Materials" />
                <ProceedLongButton/>
                </form>
            </div>
        </div>
    );
}