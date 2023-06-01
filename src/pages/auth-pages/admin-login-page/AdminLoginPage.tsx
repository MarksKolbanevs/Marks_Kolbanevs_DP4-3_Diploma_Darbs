import { useState } from 'react';
import ProceedLongButton from '../../../components/buttons/proceed-long-button/ProceedLongButton';
import { AdminLogin } from '../../../requests/AuthRequests';
import './../auth-pages.scss';

export default function AdminLoginPage(){
    let [errorMessage,setErrorMessage] = useState("");
    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const login = await AdminLogin(formData);
        if (login !== true) {
            setErrorMessage(login);
        }
    };
    return(
        <div className="auth-page-full-width">
            <form className='auth-page-content' onSubmit={handleSubmit}>
                <h1 className='px40 w500'>Welcome back!</h1>
                <div className='buttons-container'>
                   <input name='email' placeholder='Email'/>
                    <input name='password' type="password" placeholder='Password'/>
                    {errorMessage ? (<h4 className='red w500'>{errorMessage}</h4>) : null}
                </div>
                <ProceedLongButton/>
            </form>
        </div>
    );
}