import PreviewDo from './PreviewDo.js'

class PreviewDoBuilder {
    constructor() {
        this.PreviewDo = new PreviewDo();
    }

    imgURL(imgURL) {
        this.PreviewDo.imgURL = imgURL;
        return this;
    }

    title(title) {
        this.PreviewDo.title = title;
        return this;
    }

    description(description) {
        this.PreviewDo.description = description;
        return this;
    }

    createdAt(createdAt) {
        this.PreviewDo.createdAt = createdAt;
        return this;
    }

    author(author) {
        this.PreviewDo.author = author;
        return this;
    }

    id(id) {
        this.PreviewDo.id = id;
        return this;
    }

    isbn(isbn) {
        this.PreviewDo.isbn = isbn;
        return this;
    }

    build() {
        return this.PreviewDo;
    }
}

export default PreviewDoBuilder;