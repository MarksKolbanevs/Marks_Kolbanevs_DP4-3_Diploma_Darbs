import './contact-item.scss';

export default function ContactItem(props : {name : string}){
    return(
      <div className="contact-item">
        {props.name}
      </div>
    );
}