import PreviewDoBuilder from '../component/Home/Do/PreviewDoBuilder'
import HomeStateDo from '../component/Home/Do/HomeStateDo';
import PreviewPageDoBuilder from '../component/Home/Do/PreviewPageDoBuilder';
import PreviewPageDo from '../component/Home/Do/PreviewPageDo';
import QueryDo from '../component/Home/Do/QueryDo';

class HomeUtils{

    static load = (state, pages) => {
        let newState = new HomeStateDo(state);
        let newPages = [] || [new PreviewPageDo()];
        newPages = pages;

        if (this.isNotEmpty(newPages)) {
            const activeTitle = newPages[newPages.findIndex((page) => page.checked)].pageTitle;
            newPages = newPages.map(
                (page) => {
                    return new PreviewPageDoBuilder()
                        .setPageTitle(page.pageTitle)
                        .setPreviews(
                            activeTitle === page.pageTitle ? [] : page.previews
                        )
                        .build()
                }
            )
            newState.pages = newPages;
            newState = this.clickedPage(newState, activeTitle);
        }
        else {
            newState = HomeUtils.clickedPage(newState, "최신");
        }

        return newState;
    }

    static isNotEmpty = (item) => {
        if(item === undefined || item === null || item.length === 0)return false;
        return true;
    }

    static clickedPage = (state, pageTitle) => {
        let newState = new HomeStateDo(state);
        
        const currentPageIndex = HomeUtils.getActivePageIndex(newState);
        const clickedPageIndex = newState.pages.findIndex(page => page.pageTitle === pageTitle);

        if(currentPageIndex === clickedPageIndex){
            return newState;
        }
        newState = this.togglePageByIndex(newState, currentPageIndex);
        newState = this.togglePageByIndex(newState, clickedPageIndex);
        newState = this.requestPage(newState, pageTitle);

        return newState;
    }
    
    static getActivePageIndex = (state) => {
        let newState = new HomeStateDo(state);
        let pages = newState.pages;
        const currentIndex = pages.findIndex((page) =>
            page.checked);
        return currentIndex;
    }
    
    static togglePageByIndex = (state, pageIndex) => {
        if (pageIndex < 0) return state;
        let newState = new HomeStateDo(state);
        let pages = newState.pages;
        const page = pages[pageIndex];
        page.checked = !page.checked;
        pages[pageIndex] = page;
        newState.pages = pages;
        return newState;
    }

    static togglePageByPageTitle = (state, pageTitle) => {
        let newState = new HomeStateDo(state);
        let pages = newState.pages;

        const pageIndex = pages.findIndex(page => page.pageTitle === pageTitle);
        newState = this.togglePageByIndex(pageIndex);

        return newState;
    }
    
    static requestPage = (state, pageTitle) => {
        let newState = new HomeStateDo(state);
        let pages = newState.pages;
        const pageIndex = pages.findIndex((page) => page.pageTitle === pageTitle);
        const page = pages[pageIndex]

        if (page.previews.length === 0) {
            page.previews = page.previews.concat(
                new PreviewDoBuilder()
                    .setTitle(page.pageTitle)
                    .setImgURL("https://bookthumb-phinf.pstatic.net/cover/164/054/16405427.jpg?udate=20201222")
                    .setDescription("만들어진 꿈을 살 수있는")
                    .setCreatedAt("2020년 12월 13일")
                    .setAuthor("jinseongho")
                    .setId("1")
                    .build()
            )
            
            pages[pageIndex] = page;
            newState.pages = pages;
        }

        return newState;
    }

    static createPage = (state, query) => {
        let newState = new HomeStateDo(state);
        let newQuery = new QueryDo(query);
        let pages = newState.pages;
        const pageTitle = newQuery.value;

        if(pageTitle.trim() === "")return newState;
        if(pages.find(page => page.pageTitle === pageTitle)){
            newState = this.clickedPage(newState, pageTitle);
            newState = this.clearQuery(newState);
            return newState;
        }

        newState.addPages(
            new PreviewPageDoBuilder()
            .setPageTitle(pageTitle)
            .build()
        )
        newState = this.clickedPage(newState,pageTitle);
        newState = this.clearQuery(newState);
        return newState;
    }

    static clearQuery = (state) => {
        let newState = new HomeStateDo(state);
        newState.query.value="";
        return newState;
    }

    static removePage = (state, pageTitle) => {
        if (pageTitle === "최신") return state;
        if (pageTitle === "trend") return state;
        let newState = new HomeStateDo(state);
        if(this.isActivePage(newState, pageTitle)){
            newState = this.clickedPage(
                newState,
                newState.pages[this.getActivePageIndex(newState)-1].pageTitle);
        }
        const pages = newState.pages.filter(page => page.pageTitle !== pageTitle);
        newState.pages = pages;
        return newState;
    }

    static isActivePage(state, pageTitle) {
        let newState = new HomeStateDo(state);
        let pages = newState.pages;
        const currentIndex = pages.findIndex((page) =>
            page.pageTitle === pageTitle);
        const page = pages[currentIndex];
        return page.checked;
    }

    static changeMode(state){
        let newState = new HomeStateDo(state);
        let currentMode = newState.query.mode;
        newState.query.mode = QueryDo.queryMode.BOOK === currentMode ?  
                              QueryDo.queryMode.REVIEW : 
                              QueryDo.queryMode.BOOK;
        return newState;
    }
}

export default HomeUtils;