import PreviewPageDo from './PreviewPageDo.js'

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
        new PreviewPageDo().removePreviews.call(activePage);
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

}

export default PreviewPages;