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
            .setAuthor(this.author)
            .setId(this.bookId)
            .setDescription(this.description)
            .setImgURL(this.image)
            .setTitle(this.title)
            .setIsbn(this.isbn)
            .build();
    }

}

export default BookResponseDto;