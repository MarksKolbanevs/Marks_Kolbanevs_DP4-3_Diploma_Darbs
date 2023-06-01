import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const toastSucceed = (message : string) =>{
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
}