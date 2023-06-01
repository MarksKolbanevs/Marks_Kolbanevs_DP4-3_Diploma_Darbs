import ContactItem from './components/contact-item/ContactItem';
import './contacts-page.scss';

export default function ContactsPage(){
    return(
        <div className="full-width">
            <div className="columns-6">
                <div className="page-header">
                    <h1 className="px65 w500">Contacts</h1>
                    <h2 className="px28 w400">The main information about us</h2>
                </div>
                <div className="contacts-container">
                    <ContactItem name = "+37125900962"/>
                    <ContactItem name = "onecupoftea93@gmail.com"/>
                    <ContactItem name = "Ulica Pushkina dom Kolotushkina"/>
                </div>
            </div>
        </div>
    );
}
