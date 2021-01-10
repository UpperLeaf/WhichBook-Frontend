import PageType from './PageType.js'
import QueryDoBuilder from './QueryDoBuilder.js';
import PreviewPages from './PreviewPages.js'
import { isEmpty,scrollIsEnd } from '../../../utils/Utils.js';
import QueryDo from './QueryDo.js';

class HomeStateDo {

    constructor(homeStateDo) {
        this.query = new QueryDoBuilder()
            .setValue("")
            .setType(PageType.REVIEW)
            .build();
        this.pages = new PreviewPages();

        if (homeStateDo !== undefined) {
            for (const property in this) {
                this[property] = homeStateDo[property];
            }
        }
    }

    async clickedPage(pageTitle){
        await this.pages.activePage(pageTitle);
        localStorage.setItem("pages", JSON.stringify(this.pages));
    }

    async createPage(){
        const pageTitle = this.query.value;
        const type = this.query.type;
        await this.pages.createPage(pageTitle, type);
        await this.query.clear();
        localStorage.setItem("pages", JSON.stringify(this.pages));
    }

    async removePage(pageTitle){
        await this.pages.removePage(pageTitle);
        localStorage.setItem("pages", JSON.stringify(this.pages));
    }

    changeQueryType(){
        this.query.changeType();
        localStorage.setItem("query", JSON.stringify(this.query));
    }

    async loadPagesInLocalStorage(){
        const pages = JSON.parse(localStorage.getItem("pages"));
        await this.loadPages(pages);
    }

    async loadQueryInLocalStorage(){
        const query = JSON.parse(localStorage.getItem("query"));
        await this.loadQuery(query);
    }

    async loadPages(pages){
        if(isEmpty(pages)){
            await this.pages.activePage("최신");
            return;
        }

        let newPages = new PreviewPages(pages);
        newPages.emptyPreviewOfActivePage();
        this.pages = newPages;
        await this.pages.addPreviewsAtAcivePage();
    }

    async loadQuery(query){
        if(isEmpty(query)){
            return;
        }

        let newQuery = new QueryDo(query);
        this.query.type = newQuery.type;
    }

    async onScroll(){
        if(!scrollIsEnd())return;
        await this.pages.onScrollEnd();
        localStorage.setItem("pages", JSON.stringify(this.pages));
    }
}

export default HomeStateDo;