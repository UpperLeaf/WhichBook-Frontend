import { useEffect, useState } from "react";
import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import { getBookList } from "../utils/AxiosUtil";
import {
    Input,
    Dialog,
    List,
    ListItem,
    Slide,
    makeStyles,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Divider,
} from "@material-ui/core";

const BookSelector = (props) => {
    const [books, setBooks] = useState([]);
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");

    const { setBook, setIsSelected } = props;

    const classes = useStyles();

    const inputStyle = {
        marginBottom: "20px",
        marginTop: "20px",
        border: "0px",
        width: "1000px",
    };

    const handleSearch = async (e) => {
        if (e.which === 13) {
            setTitle(e.target.value);
            let response = await getBookList(e.target.value);
            setBooks(response.data);
        }
    };

    useEffect(() => {
        if (title !== "") {
            console.log(books);
            setOpen(true);
        }
    }, [books]);

    const handleClose = (value) => {
        setOpen(false);
    };

    const createTitle = (data) => {
        return { __html: data };
    };

    const handleListClick = (bookId) => {
        setBook(bookId);
        setIsSelected(true);
        setOpen(false);
    };

    return (
        <div>
            <Input
                type="search"
                onKeyPress={handleSearch}
                style={inputStyle}
                placeholder="책 이름을 입력해주세요."
            ></Input>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            {title} 검색결과
                        </Typography>
                    </Toolbar>
                </AppBar>
                <List>
                    {books.map((book) => (
                        <div key={book.bookId}>
                            <ListItem
                                button
                                onClick={() => handleListClick(book.bookId)}
                            >
                                <h4
                                    dangerouslySetInnerHTML={createTitle(
                                        book.title
                                    )}
                                ></h4>
                            </ListItem>
                            <Divider />
                        </div>
                    ))}
                </List>
            </Dialog>
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: "relative",
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const Transition = React.forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props}></Slide>;
});

export default BookSelector;
