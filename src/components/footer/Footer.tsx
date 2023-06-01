import './footer.scss';
export default function Footer(){
    return(
        <footer>
          <div className='footer-content'>
            <div className='social'>
              <a href='#'><img src="/assets/png/twitter.png"/></a>
              <a href='#'><img src="/assets/png/facebook.png"/></a>
              <a href='#'><img src="/assets/png/instagram.png"/></a>
            </div>
            <p className='px16 w400'>©2023 Monle</p>
          </div>
      </footer>
    );
}