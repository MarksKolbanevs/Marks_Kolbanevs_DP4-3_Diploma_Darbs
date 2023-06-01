import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const toastError = (text : string) =>{
    toast.error(text, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
}