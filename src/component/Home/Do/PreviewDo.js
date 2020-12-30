class PreviewDo{
    constructor(previewDo){
        this.imgURL = "";
        this.title = "";
        this.description = "";
        this.createdAt = "";
        this.author = "";
        this.id = 0;

        if(previewDo !== undefined){
            for (const property in previewDo){
                this[property] = previewDo[property];
            }
        }
    }
}

export default PreviewDo;