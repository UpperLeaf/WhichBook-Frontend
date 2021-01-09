class BookRequestDtoBuilder {
    constructor() {
        this.bookRequestDto = {};
    }

    setTitle(title) {
        this.bookRequestDto["title"] = title;
        return this;
    }

    setStart(start) {
        this.bookRequestDto["start"] = start;
        return this;
    }

    setDisplay(display) {
        this.bookRequestDto["display"] = display;
        return this;
    }

    setId(id) {
        this.bookRequestDto["id"] = id;
        return this;
    }

    build() {
        return this.bookRequestDto;
    }
}

export default BookRequestDtoBuilder;