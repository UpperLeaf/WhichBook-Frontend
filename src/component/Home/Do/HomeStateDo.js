import PreviewPageDo from './PreviewPageDo.js'
import QueryDo from './QueryDo.js'
import QueryDoBuilder from './QueryDoBuilder.js';

class HomeStateDo{

    constructor(homeStateDo){
        this.query = new QueryDoBuilder()
                     .setValue("")
                     .setMode(QueryDo.queryMode.REVIEW)
                     .build();
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