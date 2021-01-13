import PreviewDo from './PreviewDo.js'

class PreviewDoBuilder {
    constructor() {
        this.PreviewDo = new PreviewDo();
    }

    setImgURL(imgURL) {
        this.PreviewDo.imgURL = imgURL;
        return this;
    }

    setTitle(title) {
        this.PreviewDo.title = title;
        return this;
    }

    setDescription(description) {
        this.PreviewDo.description = description;
        return this;
    }

    setCreatedAt(createdAt) {
        this.PreviewDo.createdAt = createdAt;
        return this;
    }

    setAuthor(author) {
        this.PreviewDo.author = author;
        return this;
    }

    setId(id) {
        this.PreviewDo.id = id;
        return this;
    }

    setIsbn(isbn){
        this.PreviewDo.isbn = isbn;
        return this;
    }

    build() {
        return this.PreviewDo;
    }
}

export default PreviewDoBuilder;