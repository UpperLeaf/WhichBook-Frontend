import Navigation from "../component/Navigation";
import Viewer from "../component/Viewer";
import { useEffect, useState } from "react";
import { getReviewInfo } from "../utils/AxiosUtil";

const Review = ({ match }) => {
    const { reviewId } = match.params;
    const [bookTitle, setbookTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [reviewTitle, setReviewTitle] = useState("");

    useEffect(() => {
        (async () => {
            let response = await getReviewInfo(reviewId);
            setAuthor(response.data.author);
            setbookTitle(response.data.title);
            setDescription(response.data.description);
            setReviewTitle(response.data.reviewTitle);
        })();
    }, [reviewId]);

    return (
        <div>
            <Navigation></Navigation>
            <Viewer
                bookTitle={bookTitle}
                author={author}
                description={description}
                reviewTitle={reviewTitle}
            ></Viewer>
        </div>
    );
};

export default Review;
