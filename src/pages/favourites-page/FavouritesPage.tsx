import { useEffect, useState } from 'react';
import './favourite-page.scss';
import CartBagItem from './components/cart-bag-item/FavouriteItem';
import { getCart, paymentVerified } from '../../requests/CartRequests';
import { getFavourite } from '../../requests/FavouriteRequests';

interface FavouriteData {
    _id: string,
    bag :{
        _id :string,
        name: string,
        description:string,
        material:string,
        photo: string,
        hex:string,
    },
}

export default function FavouritesPage(){
    const [favouriteData, setFavouriteData] = useState<FavouriteData[]>([]);

    useEffect(() => {
        async function fetchData() {
          try {
            const cart = await getFavourite();
            console.log(cart);
            setFavouriteData(cart);
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
                    <h1 className="px65 w500">Favourite</h1>
                    <h2 className="px28 w400">Your liked bags here</h2>
                </div>
                <div className="cart-bags-container">
                    <div className='action-container'>
                        <h2 className="px28 w500">Bags</h2>
                    </div>
                    <div className="cart-bags-list">
                    {favouriteData.map((item,index) => (
                        <CartBagItem key = {index} bagId = {item.bag._id} id={item._id} name={item.bag.name} photo={item.bag.photo} hex={item.bag.hex}/>
                    ))}
                    </div>
                </div>
            </div>
        </div>
    );
}