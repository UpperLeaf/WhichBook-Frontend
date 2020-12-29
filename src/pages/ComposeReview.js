import Navigation from "../component/navigation/Navigation";
import ReviewForm from "../component/review/ReviewForm";
import Main from '../component/Main'

const ComposeReview = () => {
    return (
        <Main>
            <Navigation />
            <ReviewForm></ReviewForm>
        </Main>
    );
};

export default ComposeReview;
