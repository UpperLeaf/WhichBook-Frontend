import Navigation from "../component/navigation/Navigation";
import ReviewForm from "../component/review/ReviewForm";
import Main from '../component/Main'

const ComposeReview = ({match}) => {
    
    return (
        <Main>
            <Navigation />
            <ReviewForm bookTitle={
               match.params.bookTitle || ""
            }/>
        </Main>
    );
};

export default ComposeReview;
