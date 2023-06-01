import './outline-grey-round-button.scss';

export default function OutlineGreyRoundButton(props:{text:string}){
    return(
        <button className='outline-grey-round-button'>
            {props.text}
        </button>
    );
}