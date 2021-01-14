import PreviewDoBuilder from "../../../component/Home/Do/PreviewDoBuilder";

class BookResponseDto {
    constructor(bookResponseDto) {
        this.author = "";
        this.bookId = "";
        this.description = "";
        this.image = "";
        this.price = "";
        this.title = "";
        this.isbn = "";
        for (const property in this) {
            this[property] = bookResponseDto[property];
        }
    }

    toPreviewDo() {
        return new PreviewDoBuilder()
            .author(this.author)
            .id(this.bookId)
            .description(this.description)
            .imgURL(this.image)
            .title(this.title)
            .isbn(this.isbn)
            .build();
    }

}

export default BookResponseDto;