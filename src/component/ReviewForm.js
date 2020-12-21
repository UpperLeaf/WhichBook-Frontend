import BookSelector from "./BookSelector";
import Compose from "./Compose";
import BookInfo from "./BookInfo";
import { useState } from "react";

const ReviewForm = () => {
    const [book, setBook] = useState({});
    const [isSelected, setIsSelected] = useState(false);
    const [review, setReview] = useState("");

    return (
        <div>
            <BookSelector
                book={book}
                setBook={setBook}
                setIsSelected={setIsSelected}
            ></BookSelector>
            <BookInfo isSelected={isSelected}></BookInfo>
            <Compose review={review} setReview={setReview}></Compose>
        </div>
    );
};

export default ReviewForm;
