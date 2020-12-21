const BookInfo = (props) => {
    const { isSelected } = props;

    if (isSelected) {
        return <div>Is Selected</div>;
    } else {
        return <div>책을 선택해주세요</div>;
    }
};

export default BookInfo;
