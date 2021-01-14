class BookRequestDtoBuilder {
    constructor() {
        this.bookRequestDto = {};
    }

    title(title) {
        this.bookRequestDto["title"] = title;
        return this;
    }

    start(start) {
        this.bookRequestDto["start"] = start;
        return this;
    }

    display(display) {
        this.bookRequestDto["display"] = display;
        return this;
    }

    id(id) {
        this.bookRequestDto["id"] = id;
        return this;
    }

    build() {
        return this.bookRequestDto;
    }
}

export default BookRequestDtoBuilder;