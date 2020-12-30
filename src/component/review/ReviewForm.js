import BookSelector from "./BookSelector";
import Compose from "./Compose";
import { useState } from "react";
import { Button } from "@material-ui/core";
import { composeRequest } from "../../utils/AxiosUtil";
import { useHistory } from "react-router-dom";

const ReviewForm = () => {
    const [book, setBook] = useState();
    const [isSelected, setIsSelected] = useState(false);
    const [review, setReview] = useState("");
    const [title, setTitle] = useState("");
    const history = useHistory();

    const buttonStyle = {
        marginTop: "20px",
    };

    const handleButtonClick = async () => {
        let response = await composeRequest(title, review, book);
    };

    return (
        <div>
            <BookSelector
                book={book}
                setBook={setBook}
                isSelected={isSelected}
                setIsSelected={setIsSelected}
            ></BookSelector>
            <Compose
                review={review}
                setReview={setReview}
                title={title}
                setTitle={setTitle}
            ></Compose>
            <Button
                style={buttonStyle}
                variant="contained"
                onClick={handleButtonClick}
            >
                작성하기
            </Button>
        </div>
    );
};

export default ReviewForm;
