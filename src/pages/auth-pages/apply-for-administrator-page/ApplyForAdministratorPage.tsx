import { useState } from 'react';
import ProceedLongButton from '../../../components/buttons/proceed-long-button/ProceedLongButton';

export default function ApplyForAdministrator(){
    let [errorMessage,setErrorMessage] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        //Signup(formData);
    };

    return(
        <div className="auth-page-full-width">
            <form className='auth-page-content' onSubmit = {handleSubmit}>
                <h1 className='px40 w500'>Apply for admin role</h1>
                    <div className='buttons-container'>
                    <input name="name" placeholder='Name'/>
                    <input name="surname" placeholder='Surname'/>
                   <input name="email" placeholder='Email'/>
                   <input name="password" type="password" placeholder='Password'/> 
                   <input name="repeatPassword" type="password" placeholder='Repeat password'/> 
                </div>
                <ProceedLongButton/>
            </form>
        </div>
    );
}