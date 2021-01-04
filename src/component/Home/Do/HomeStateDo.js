import PreviewPageDo from './PreviewPageDo.js'

class HomeStateDo{

    constructor(homeStateDo){
        this.query = "";
        this.pages = [] || [new PreviewPageDo()];
        this.pageMaxLength = 6;
        
        if(homeStateDo!== undefined){
            for (const property in homeStateDo){
                this[property] = homeStateDo[property];
            }
        }
    }

    addPages(pages){
        this.pages = this.pages.concat(pages);
        this.pages.splice(2, Math.max(0, this.pages.length-this.pageMaxLength))
    }
}

export default HomeStateDo;