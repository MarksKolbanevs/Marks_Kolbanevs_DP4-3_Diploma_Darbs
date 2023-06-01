import './proceed-long-button.scss';

export default function ProceedLongButton(){
    return(
        <button className='proceed-long-button' type="submit">
          <svg width="88" height="15" viewBox="0 0 88 15" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M86.8533 8.30281C87.2438 7.91229 87.2438 7.27912 86.8533 6.8886L80.4893 0.524637C80.0988 0.134113 79.4657 0.134113 79.0751 0.524637C78.6846 0.915162 78.6846 1.54833 79.0751 1.93885L84.732 7.59571L79.0751 13.2526C78.6846 13.6431 78.6846 14.2762 79.0751 14.6668C79.4657 15.0573 80.0988 15.0573 80.4893 14.6668L86.8533 8.30281ZM0.853515 8.5957L86.1462 8.59571L86.1462 6.59571L0.853516 6.5957L0.853515 8.5957Z"/>
          </svg>
        </button>
    );
}