import { Typography } from "@material-ui/core";
import MDEditor from "@uiw/react-md-editor";

const Viewer = (props) => {
    const { reviewTitle, description, bookTitle, author } = props;

    const style = {
        marginTop: "40px",
    };

    return (
        <div>
            <Typography variant="h6" style={style} align="left">
                {reviewTitle}
                <Typography variant="subtitle1" align="right">
                    {author}
                </Typography>
            </Typography>
            <MDEditor.Markdown source={description}></MDEditor.Markdown>
        </div>
    );
};

export default Viewer;
