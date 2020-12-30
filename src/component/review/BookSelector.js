import { useEffect, useState } from "react";
import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import BookInfo from "./BookInfo";
import { getBookList } from "../../utils/AxiosUtil";
import {
    Input,
    Dialog,
    List,
    ListItem,
    Grid,
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

    const { book, setBook, isSelected, setIsSelected } = props;

    const classes = useStyles();

    const inputStyle = {
        marginBottom: "20px",
        marginTop: "20px",
        border: "0px",
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
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <Input
                        type="search"
                        onKeyPress={handleSearch}
                        style={inputStyle}
                        fullWidth={true}
                        placeholder="책 이름을 입력해주세요."
                    ></Input>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <BookInfo isSelected={isSelected} bookId={book}></BookInfo>
                </Grid>
            </Grid>
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
