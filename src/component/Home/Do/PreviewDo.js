import { ThreeSixtyOutlined } from "@material-ui/icons";

class PreviewDo {
    constructor(previewDo) {
        this.imgURL = "";
        this.title = "";
        this.description = "";
        this.createdAt = "";
        this.author = "";
        this.id = 0;
        this.isbn = "";
        if (previewDo !== undefined) {
            for (const property in this) {
                this[property] = previewDo[property];
            }
        }

    }

    getTitle(){
        return this.title.replace("<b>","")
        .replace("</b>", "");
    }
}

export default PreviewDo;