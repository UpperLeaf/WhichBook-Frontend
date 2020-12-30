import { Card } from "@material-ui/core";
import { useEffect, useState } from "react";
import { getBookInfo } from "../../utils/AxiosUtil";

const BookInfo = (props) => {
    const { isSelected, bookId } = props;
    const [bookInfo, setBookInfo] = useState({});

    const createTitle = (title) => {
        return { __html: title };
    };

    const createDescrption = (data) => {
        return { __html: data };
    };
    useEffect(() => {
        const fetchBookData = async () => {
            if (bookId !== undefined) {
                const bookData = await getBookInfo(bookId);
                setBookInfo(bookData.data);
            }
        };
        fetchBookData();
    }, [bookId]);

    if (isSelected) {
        return (
            <Card>
                <h4 dangerouslySetInnerHTML={createTitle(bookInfo.title)}></h4>
                <span
                    dangerouslySetInnerHTML={createDescrption(
                        bookInfo.description
                    )}
                ></span>
            </Card>
        );
    } else {
        return <div></div>;
    }
};

export default BookInfo;
