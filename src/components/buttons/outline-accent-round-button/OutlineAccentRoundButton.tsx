import './outline-accent-round-button.scss';
export default function OutlineAccentRoundButton(props:{text:string}){
    return(
        <button className='outline-accent-round-button'>{props.text}</button>
    );
}