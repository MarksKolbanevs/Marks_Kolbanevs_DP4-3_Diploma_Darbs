import { deleteItem } from '../../../../requests/CartRequests';
import './cart-bag-item.scss';
export default function CartBagItem(props:{id:string,name:string,photo:string,hex:string,price:number}){
    const handleDelete = () =>{
        deleteItem(props.id);
    }
    return(
        <div className="cart-bag-item" style={{ backgroundColor: props.hex}}>
            <button className='delete-button' onClick={handleDelete}>
                <img src="./assets/svg/krestic.svg"/>
            </button>
            <img src = {props.photo}/>
            <div className='cart-bag-info'>
                <h2>{props.name}</h2>
                <h3 className='accent'>{props.price} $</h3>
            </div>
        </div>
    );
}