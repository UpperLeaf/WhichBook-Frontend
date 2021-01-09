import PreviewDoBuilder from "../../../component/Home/Do/PreviewDoBuilder";

class BookResponseDto {
    constructor(bookResponseDto) {
        this.author = "";
        this.bookId = "";
        this.description = "";
        this.image = "";
        this.price = "";
        this.title = "";

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
            .build();
    }

}

export default BookResponseDto;