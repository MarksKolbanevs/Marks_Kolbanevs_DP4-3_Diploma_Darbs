import { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react';
import BagItem from './components/bag-item/BagItem';
import './homepage.scss';
import { getBags, searchBag } from '../../requests/BagRequests';
export default function HomePage(){
  
  interface BagsData {
      _id: string,
      name: string,
      price:string,
      description:string,
      material:string,
      photo: string,
      hex:string
  }

const [bagsData, setBagsData] = useState<BagsData[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const bags = await getBags();
        setBagsData(bags);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const handleSearch = async (event:ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const target = event.target as HTMLInputElement;
    const queryBags = await searchBag(target.value);
    setBagsData(queryBags);
  };
  
    return(
      <div className='full-width'>
          <div className="hero-section">
            <div className='columns-8'>
              <div className='hero-content'>
                <div className='hero-info'>
              <div className='info'>
              <h1 className='px65 w600'>Be care of your belongings</h1>
              <h2 className='px28 w500 grey'>It’s time to save your nerves that you used to spend on searching your belongings.</h2>
              </div>
              </div>
              <div className='hero-image'>
                <img src="./assets/hero-bag.png"/>
              </div>
              </div> 
            </div>
          </div>
        <div className='columns-8'>
          <input className = "bag-search-input" placeholder='Search..' name="search" onChange = {handleSearch}/>
          <div className='bags-catalog-container'>
          {bagsData.map((bag,index) => (
            <BagItem key={index} price = {parseFloat(bag.price)} id = {bag._id} name={bag.name} photo={bag.photo} hex={bag.hex}/>
          ))} 
          </div>
        </div>
      </div>
    );
}