class BookRequestDto {

    constructor(){
        this.title = "";
        this.start = "";
        this.display = "";
        this.id = "";
    }

    static Builder = class {

        constructor() {
            this.bookRequestDto = new BookRequestDto();
        }

        title(title) {
            this.bookRequestDto.title = title;
            return this;
        }

        start(start) {
            this.bookRequestDto.start = start;
            return this;
        }

        display(display) {
            this.bookRequestDto.display = display;
            return this;
        }

        id(id) {
            this.bookRequestDto.id = id;
            return this;
        }

        build() {
            return this.bookRequestDto;
        }
    }
}

export default BookRequestDto;