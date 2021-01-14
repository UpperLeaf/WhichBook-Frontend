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

    getTitle() {
        let title =
            this.title.split("<b>").join('')
                .split("</b>").join('')
                .split("%").join('');
        return title;
    }
}

export default PreviewDo;