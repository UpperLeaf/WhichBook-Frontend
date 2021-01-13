import PageRequestBuilder from '../../../utils/HomeUtils/PageRequestBuilder.js';
import PreviewPageDo from './PreviewPageDo.js'
import PreviewPageDoBuilder from './PreviewPageDoBuilder.js';

class PreviewPages{

    constructor(pages){
        this.pages = [] || [new PreviewPageDo()];
        this.pageMaxLength = 6;
        
        if(pages !== undefined && pages !== null){
            for(const property in this){
                this[property] = pages[property];
            }
        }
    }



    add(pages){
        this.pages = this.pages.concat(pages);
        this.pages.splice(2, Math.max(0, this.pages.length - this.pageMaxLength))
        return this;
    }

    setPage(index, page){
        this.pages[index] = page;
    }

    at(index){
        return this.pages[index];
    }

    getActivePageIndex(){
        return this.pages.findIndex((page) => page.checked);
    }

    getActivePage(){
        return this.pages[this.getActivePageIndex()];
    }

    getActivePageTitle(){
        return this.getActivePage().pageTitle;
    }

    emptyPreviewOfActivePage(){
        let activePage = this.getActivePage();
        let activePageIndex = this.getActivePageIndex();
        new PreviewPageDo().reset.call(activePage);
        this.setPage(activePageIndex, activePage);
    }

    async addPreviewsAtAcivePage(){
        const activePage = new PreviewPageDo(this.getActivePage());
        const activePageIndex = this.getActivePageIndex();
        await activePage.addPreviewsIfPreviewIsEmpty();
        this.setPage(activePageIndex, activePage);
    }

    getRawPages(){
        return this.pages;
    }

    getPageIndexByPageTitle(pageTitle){
        return this.pages.findIndex(page => page.pageTitle === pageTitle);
    }

    getPageByPageTitle(pageTitle){
        return this.pages.find(page => page.pageTitle === pageTitle);
    }

    isActivePage(pageTitle){
        const page = this.getPageByPageTitle(pageTitle);
        return page.checked;
    }

    removePageByPageTitle(pageTitle){
        this.pages = this.pages.filter(page => page.pageTitle !== pageTitle);
    }

    async activePage(pageTitle){
        const currentPageIndex = this.getActivePageIndex();
        const clickedPageIndex = this.getPageIndexByPageTitle(pageTitle);
        if(currentPageIndex === clickedPageIndex){
            return;
        }
        if(currentPageIndex != -1)
            new PreviewPageDo().toggleChecked.call(this.at(currentPageIndex));
        if(clickedPageIndex != -1)
            new PreviewPageDo().toggleChecked.call(this.at(clickedPageIndex));

        let newPage = new PreviewPageDo(this.at(clickedPageIndex));
        await newPage.addPreviewsIfPreviewIsEmpty();
        this.setPage(clickedPageIndex,newPage)
    }

    async createPage(pageTitle, type){
        if(pageTitle.trim() === "")return;
        if(this.getPageByPageTitle(pageTitle)){
            await this.activePage(pageTitle);
            return;
        }
        this.add(
            new PreviewPageDoBuilder()
            .setPageTitle(pageTitle)
            .setType(type)
            .build()
        )

        await this.activePage(pageTitle)
    }

    async removePage(pageTitle){
        if(pageTitle === "최신")return;
        if(pageTitle === "trend")return;
        if(this.isActivePage(pageTitle)){
            await this.activePage(
                this.at(this.getActivePageIndex()-1).pageTitle
            )
        }
        this.removePageByPageTitle(pageTitle);
    }

    async onScrollEnd(){
        const activePageIndex = this.getActivePageIndex();
        const activePage = this.getActivePage();
        await activePage.addPreviewScrolling();
        this.setPage(activePageIndex, activePage);
    }
    
}

export default PreviewPages;