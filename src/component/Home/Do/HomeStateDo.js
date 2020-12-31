import PreviewPageDo from './PreviewPageDo.js'

class HomeStateDo{

    constructor(){
        this.query = "";
        this.pages = [] || [new PreviewPageDo()];
        this.pageMaxLength = 6;
    }

    addPages(pages){
        this.pages = this.pages.concat(pages);
        this.pages.splice(2, Math.max(0, this.pages.length-this.pageMaxLength))
    }
}

export default HomeStateDo;