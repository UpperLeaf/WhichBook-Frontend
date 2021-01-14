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