import OutlineAccentRoundButton from '../../../../components/buttons/outline-accent-round-button/OutlineAccentRoundButton';
import { postCart } from '../../../../requests/CartRequests';
import { deleteFavourite } from '../../../../requests/FavouriteRequests';
import './favourite-item.scss';
export default function CartBagItem(props:{id:string, bagId : string, name:string,photo:string,hex:string}){
    const handleDelete = () =>{
        deleteFavourite(props.id);
    }
    return(
        <div className="cart-bag-item" style={{ backgroundColor: props.hex}}>
            <button className='delete-button' onClick={handleDelete}>
                <img src="./assets/svg/krestic.svg"/>
            </button>
            <img src = {props.photo}/>
            <div className='cart-bag-name'>
                <h2>{props.name}</h2>
                <a onClick = {() => postCart(props.bagId)}><OutlineAccentRoundButton text="Add to cart"/></a>
            </div>
            
        </div>
    );
}