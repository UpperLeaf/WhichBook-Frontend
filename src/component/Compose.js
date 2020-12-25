import MarkDownEditor from "@uiw/react-md-editor";
import { TextField } from "@material-ui/core";

const Compose = (props) => {
    const { setTitle, review, setReview } = props;

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const reviewTitleStyle = {
        marginBottom: "20px",
        marginTop: "20px",
    };

    return (
        <div>
            <TextField
                id="standard-basic"
                fullWidth={true}
                placeholder="리뷰 제목을 입력해주세요"
                onChange={handleTitleChange}
                style={reviewTitleStyle}
            ></TextField>
            <MarkDownEditor
                value={review}
                onChange={setReview}
                height={500}
            ></MarkDownEditor>
        </div>
    );
};

export default Compose;
