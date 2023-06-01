import { useEffect, useState } from 'react';
import './cart-page.scss';
import CartBagItem from './components/cart-bag-item/CartBagItem';
import { getCart, paymentVerified } from '../../requests/CartRequests';

interface CartData {
    _id: string,
    bag :{
        price:string,
        name: string,
        description:string,
        material:string,
        photo: string,
        hex:string,
    },
}

export default function CartPage(){
    const [cartData, setCartData] = useState<CartData[]>([]);

    useEffect(() => {
        async function fetchData() {
          try {
            const cart = await getCart();
            console.log(cart);
            setCartData(cart);
          } catch (error) {
            console.error(error);
          }
        }
        fetchData();
      }, []);
      
    return(
        <div className="full-width">
            <div className="columns-6">
                <div className="page-header">
                    <h1 className="px65 w500">Cart</h1>
                    <h2 className="px28 w400">Your liked bags here</h2>
                </div>
                <div className="cart-bags-container">
                    <div className='action-container'>
                        <h2 className="px28 w500">Bags</h2>
                        <a href='#' className='px24 w500 accent' onClick={async() => await paymentVerified()}>Proceed to checkout {'->'}</a>
                    </div>
                    <div className="cart-bags-list">
                    {cartData.map((item,index) => (
                        <CartBagItem key = {index} price = {parseFloat(item.bag.price)} id={item._id} name={item.bag.name} photo={item.bag.photo} hex={item.bag.hex}/>
                    ))}
                    </div>
                </div>
            </div>
        </div>
    );
}