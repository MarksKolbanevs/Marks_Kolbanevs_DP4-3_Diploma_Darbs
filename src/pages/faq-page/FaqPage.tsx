import { useEffect, useState } from 'react';
import './faq-page.scss';
import { getFaq } from '../../requests/FaqRequests';

interface FaqData {
    _id:string,
    title: string,
    description: string,
}

export default function FaqPage(){
    const [faqData, setFaqData] = useState<FaqData[]>([]);

    useEffect(() => {
        async function fetchData() {
          try {
            const data = await getFaq();
            setFaqData(data);
          } catch (error) {
            console.error(error);
          }
        }
        fetchData();
      }, []);
    
    return(
        <div className="full-width">
            <div className='columns-6'>
                {faqData && (
                 <>
                 <div className="page-header">
                    <h1 className="px65 w500">FAQ</h1>
                    <h2 className="px28 w400">The most common questions</h2>
                </div>
                <div className="faq-list">
                    {faqData.map((item) => (
                      <button className='faq-item' key={item._id}>
                          <div className='faq-item-header'>
                              <h1 className='px24 w500 accent'>{item.title}</h1>
                              <p className='px24 open-plus'>+</p>
                          </div>
                          <div className='faq-expanded'>
                              <h2 className='px24 w500 grey'>
                                {item.description}
                              </h2>
                          </div>
                      </button>
                    ))}
                </div>
                 </>
                )}
            </div>
        </div>
    );
}