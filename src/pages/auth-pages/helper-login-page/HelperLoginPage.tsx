import ProceedLongButton from '../../../components/buttons/proceed-long-button/ProceedLongButton';
import { HelperLogin } from '../../../requests/AuthRequests';
import './../auth-pages.scss';

export default function HelperLoginPage(){
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        HelperLogin(formData);
    };
    return(
        <div className="auth-page-full-width">
            <form className='auth-page-content' onSubmit={handleSubmit}>
                <h1 className='px40 w500'>Welcome back!</h1>
                <div className='buttons-container'>
                   <input name='email' placeholder='Email'/>
                    <input name='password' type="password" placeholder='Password'/> 
                </div>
                <ProceedLongButton/>
            </form>
        </div>
    );
}