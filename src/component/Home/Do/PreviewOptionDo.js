import PreviewDo from './PreviewDo.js'

class PreviewOptionDo{

    constructor(previewOptionDo){
        this.optionTitle="";
        this.checked=false;
        this.previews = [] || [new PreviewDo()];

        if(previewOptionDo !== undefined){
            for (const property in previewOptionDo){
                this[property] = previewOptionDo[property];
            }
        }
    }
    
}

export default PreviewOptionDo;