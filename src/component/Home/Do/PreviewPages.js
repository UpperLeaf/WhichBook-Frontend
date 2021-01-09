import PreviewPageDo from './PreviewPageDo.js'

class PreviewPages{

    constructor(pages){
        this.previewPages = [] || [new PreviewPageDo()];
        if(pages !== undefined){
            this.previewPages = pages;
        }
    }

    add(pages){
        this.previewPages = this.previewPages.concat(pages);
    }

    at(index){
        return this.pages[index];
    }

}

export default PreviewPages;