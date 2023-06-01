import { useEffect, useState } from 'react';
import ProceedLongButton from '../../components/buttons/proceed-long-button/ProceedLongButton';
import './index.scss';
import ReviewListItem from './review-list-item/ReviewListItem';
import { getReviews, postReview } from '../../requests/ReviewRequests';


interface ReviewData {
    _id:string,
    review:string,
    user:{
      photo: string,
      _id: string,
      phone: number,
      email: string,
      name: string,
      passwordHash: string,  
    }
}


export default function ReviewPage(){
    const [review,setReview] = useState(String);
    const [reviewsData, setReviewData] = useState<ReviewData[]>([]);
    const [errorMessage, setErrorMessage] = useState(String);

    const handleSubmit = async (event:any) =>{
        event.preventDefault();
        if(review.length <= 0){
            setErrorMessage('Please enter some review!');
            return;
        }
        await postReview(review)
    }

    const handleChange = (event : any) => {
        event.preventDefault();
        const value = event.target.value;
        setReview(value);
    }

    useEffect(() => {
        async function fetchData() {
          try {
            const review = await getReviews();
            setReviewData(review);
          } catch (error) {
            console.error(error);
          }
        }
        fetchData();
    }, []);


    return(
        <div className='full-width'>
            <div className='columns-8'>
                <div className="page-header">
                    <h1 className="px65 w500">Reviews</h1>
                    <h2 className="px28 w400">Check what other people think about us</h2>
                </div>
                <form className='create-review-form' onSubmit={ handleSubmit }>
                    <input className="review-input" name="review" onChange={handleChange} placeholder='Your review here'/>
                    <ProceedLongButton/>
                </form>
                {errorMessage.length <= 0 ? null : <h3 className='px14 w500 red'>{errorMessage}</h3>}
                <div className='review-list'>
                {reviewsData.map((review,index) => (
                    <ReviewListItem key={index} _id = {review._id} photo={review.user.photo} name={review.user.name} review={review.review}/>
                ))}
                </div>
            </div>
        </div>
    )
}