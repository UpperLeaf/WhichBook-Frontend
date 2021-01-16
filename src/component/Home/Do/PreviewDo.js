class PreviewDo {
    constructor(previewDo) {
        this.imgURL = "";
        this.title = "";
        this.description = "";
        this.createdAt = "";
        this.author = "";
        this.id = 0;
        this.isbn = "";
        this.shortCutFlag = false;
        if (previewDo !== undefined) {
            for (const property in this) {
                this[property] = previewDo[property];
            }
        }
    }

    static Builder = class {
        constructor() {
            this.previewDo = new PreviewDo();
        }

        imgURL(imgURL) {
            this.previewDo.imgURL = imgURL;
            return this;
        }

        title(title) {
            this.previewDo.title = title;
            return this;
        }

        description(description) {
            this.previewDo.description = description;
            return this;
        }

        createdAt(createdAt) {
            this.previewDo.createdAt = createdAt;
            return this;
        }

        author(author) {
            this.previewDo.author = author;
            return this;
        }

        id(id) {
            this.previewDo.id = id;
            return this;
        }

        isbn(isbn) {
            this.previewDo.isbn = isbn;
            return this;
        }

        build() {
            return this.previewDo;
        }
    }

    getTitle() {
        let title =
            this.title.split("<b>").join('')
                .split("</b>").join('')
                .split("%").join('')
                .split("&").join('')
                .split("[").join('')
                .split("]").join('');
        return title;
    }
}

export default PreviewDo;