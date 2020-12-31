import PreviewDo from './PreviewDo.js'

class PreviewPageDo{

    constructor(previewPage){
        this.optionTitle="";
        this.checked=false;
        this.previews = [] || [new PreviewDo()];

        if(previewPage !== undefined){
            for (const property in previewPage){
                this[property] = previewPage[property];
            }
        }
    }
    
}

export default PreviewPageDo;