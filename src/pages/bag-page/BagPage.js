import OutlineGreyRoundButton from '../../components/buttons/outline-grey-round-button/OutlineGreyRoundButton';
import { useSearchParams } from "react-router-dom";
import './bag-page.scss';
import { useEffect, useState } from 'react';
import { getBag } from '../../requests/BagRequests';
import { postCart } from '../../requests/CartRequests';
import OutlineAccentIconButton from '../../components/buttons/outline-accent-icon-button/OutlineAccentIconButton';
import { postFavourite } from '../../requests/FavouriteRequests';

export default function BagPage(){
    const [searchParams, setSearchParams] = useSearchParams();
    const [bagData, setBagData] = useState(null);
    const [totalPrice,setTotalPrice] = useState(null);
    const tagPrice = 1;
    const [totalTagPrice,setTotalTagPrice] = useState(tagPrice);
    useEffect(() => {
        async function fetchData() {
          try {
            const bag = await getBag(searchParams.get("id") ?? "");
            setTotalPrice(bag.price + totalTagPrice);
            setBagData(bag);
          } catch (error) {
            console.error(error);
          }
        }
        fetchData();
      }, []);

    const handleTotalValueChange = (event) => {
        const value = event.target.value;
        setTotalTagPrice(value * tagPrice);
        setTotalPrice(bagData.price + (value * tagPrice));
    }

    return(
        <>
        {bagData && (
        <div className="bag-page-container" style={{ backgroundColor: bagData.hex}}>
            <div className='full-width'>
                <div className='columns-8'>
                    <div className='bag-content'>
                        <div className='action-column'>
                            <div className='title-container'>
                               <h5 className='px16 w500 grey'>Homepage {'->'} Search {'->'} Bag</h5>
                                <h1 className='px32 w500'>{bagData.name}</h1> 
                                <hr/>
                            </div>
                            <div className='main-content'>
                                <h2 className='px36 w600 accent'>{bagData.price}$</h2>
                                <div className='amount-selection-container'>
                                    <h1 className='px28 w600'>Tags</h1>
                                    <select onChange={handleTotalValueChange}>
                                        <option value={1}>1</option>
                                        <option value={5}>5</option>
                                        <option value={10}>10</option>
                                        <option value={20}>20</option>
                                    </select>
                                    <h3 className='px18 w600 accent'>{totalTagPrice ? totalTagPrice : null} $</h3>
                                </div>
                            </div>
                                <div className='price-container'>
                                    <h3 className='px24 w500'>Total price:</h3>
                                    <h3 className='px24 w600 accent'>{totalPrice ? totalPrice : null} $</h3>
                                </div>
                            <div className='button-action-container'>
                                <a onClick = {() => postCart(bagData._id)}  style={{width:'100%'}}>
                                  <OutlineGreyRoundButton text={'Add to cart'}/>
                                </a>
                                <a onClick={() => postFavourite(bagData._id)}>
                                    <OutlineAccentIconButton/>
                                </a>  
                            </div>
                            <hr/>
                            <p>Colors Colors Colors Colors Colors Colors Colors Col</p>
                            <div className='bag-colors-slider'>
                            </div>
                        </div>
                        <div className='bag-image'>
                            <img src={bagData.photo}/>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
        )}
        </>
    );
}