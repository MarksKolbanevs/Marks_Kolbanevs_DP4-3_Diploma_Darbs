import ProceedLongButton from '../../../../components/buttons/proceed-long-button/ProceedLongButton';
import './bag-item.scss';

export default function BagItem(props: { name: string, id : string, photo: string, hex: string, price:number}){
    return(
        <div className='bag-item-container' style={{ backgroundColor: props.hex}}>
        <div className='bag-item-content'>
        <h1 className='rotated accent'>{props.price}</h1>
        <img src={props.photo}/>
        <h1 className='rotated white'>{props.name}</h1>
      </div>
      <a href={"/bag?id="+props.id}><ProceedLongButton/></a>
      </div>
    );
}