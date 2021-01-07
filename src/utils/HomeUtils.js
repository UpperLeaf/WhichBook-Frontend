import PreviewDoBuilder from '../component/Home/Do/PreviewDoBuilder'
import HomeStateDo from '../component/Home/Do/HomeStateDo';
import PreviewPageDoBuilder from '../component/Home/Do/PreviewPageDoBuilder';
import PreviewPageDo from '../component/Home/Do/PreviewPageDo';
import QueryDo from '../component/Home/Do/QueryDo';
import Axios from 'axios';
import UriBuilder from './UriBuilder';
import PageType from '../component/Home/Do/PageType'
import BookResponseDto from './dto/BookResponseDto';
import BookRequestDtoBuilder from './dto/BookRequestDtoBuilder';
import PageRequestBuilder from './dto/PageRequestBuilder';
import PageRequest from './dto/PageRequest';

class HomeUtils{

    static load = async (state, pages, query) => {
        let newState = state;
        newState = await this.loadPages(newState,pages);
        newState = this.loadQuery(newState,query);
        return newState;
    }

    static loadPages = async (state, pages) => {
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
                        .setType(page.type)
                        .build()
                }
            )
            newState.pages = newPages;
            newState = await this.clickedPage(newState, activeTitle);
        }
        else {
            newState = await HomeUtils.clickedPage(newState, "최신");
        }

        return newState;
    }

    static loadQuery = async (state, query) => {
        let newState = new HomeStateDo(state);
        let newQuery = new QueryDo(query);
        newState.query.type = newQuery.type;
        return newState;
    }

    static isNotEmpty = (item) => {
        if(item === undefined || item === null || item.length === 0)return false;
        return true;
    }

    static clickedPage = async (state, pageTitle) => {
        let newState = new HomeStateDo(state);

        const currentPageIndex = HomeUtils.getActivePageIndex(newState);
        const clickedPageIndex = newState.pages.findIndex(page => page.pageTitle === pageTitle);

        if (currentPageIndex === clickedPageIndex) {
            return newState;
        }
        newState = this.togglePageByIndex(newState, currentPageIndex);
        newState = this.togglePageByIndex(newState, clickedPageIndex);
        newState = await this.loadPage(
            newState,
            pageTitle,
            new PageRequestBuilder()
                .setDisplay(10)
                .setStart(0)
                .build()
        );

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
    
    static loadPage = async (state, pageTitle, pageRequest) => {
        let newState = new HomeStateDo(state);
        let pages = newState.pages;
        const pageIndex = pages.findIndex((page) => page.pageTitle === pageTitle);
        let page = pages[pageIndex]
        if (page.previews.length === 0) {
            page = await this.addNewPreviews(page, pageRequest);
            pages[pageIndex] = page;
            newState.pages = pages;
        }
        return newState;
    }

    static addNewPreviews = async (page, pageRequest) => {
        let newPage = new PreviewPageDo(page);
        const type = newPage.type;
        
        const func = {};
        func[PageType.BOOK] = this.addNewBookPreviews;
        func[PageType.REVIEW] = this.addNewReviewPreviews;

        newPage = await func[type](page, pageRequest);
        return newPage;
    }

    static addNewBookPreviews = async (page, pageRequest) => {
        let newPage = new PreviewPageDo(page);
        let newPageRequest = new PageRequest(pageRequest);
        
        const bookList = await this.getBookList(
            new BookRequestDtoBuilder()
            .setTitle(newPage.pageTitle)
            .setDisplay(newPageRequest.display)
            .setStart(newPageRequest.start)
            .build()
        )

        newPage.previews = newPage.previews.concat(bookList);
        return newPage;
    }

    static addNewReviewPreviews = async (page, pageRequest) => {
        let newPage = new PreviewPageDo(page);
        newPage.previews = newPage.previews.concat(
                new PreviewDoBuilder()
                    .setTitle(page.pageTitle)
                    .setImgURL("https://bookthumb-phinf.pstatic.net/cover/164/054/16405427.jpg?udate=20201222")
                    .setDescription("만들어진 꿈을 살 수있는")
                    .setCreatedAt("2020년 12월 13일")
                    .setAuthor("jinseongho")
                    .setId("1")
                    .build()
        )

        return newPage;
    }

    static createPage = async (state, query) => {
        let newState = new HomeStateDo(state);
        let newQuery = new QueryDo(query);
        let pages = newState.pages;
        const pageTitle = newQuery.value;

        if(pageTitle.trim() === "")return newState;
        if(pages.find(page => page.pageTitle === pageTitle)){
            newState = await this.clickedPage(newState, pageTitle);
            newState = this.clearQuery(newState);
            return newState;
        }

        newState.addPages(
            new PreviewPageDoBuilder()
            .setPageTitle(pageTitle)
            .setType(newQuery.type)
            .build()
        )

        newState = await this.clickedPage(newState,pageTitle);
        newState = this.clearQuery(newState);
        return newState;
    }

    static clearQuery = (state) => {
        let newState = new HomeStateDo(state);
        newState.query.value="";
        return newState;
    }

    static removePage = async (state, pageTitle) => {
        if (pageTitle === "최신") return state;
        if (pageTitle === "trend") return state;
        let newState = new HomeStateDo(state);
        if(this.isActivePage(newState, pageTitle)){
            newState = await this.clickedPage(
                newState,
                newState.pages[this.getActivePageIndex(newState)-1].pageTitle);
        }
        const pages = newState.pages.filter(page => page.pageTitle !== pageTitle);
        newState.pages = pages;
        return newState;
    }

    static isActivePage = (state, pageTitle) => {
        let newState = new HomeStateDo(state);
        let pages = newState.pages;
        const currentIndex = pages.findIndex((page) =>
            page.pageTitle === pageTitle);
        const page = pages[currentIndex];
        return page.checked;
    }

    static changeMode = (state) => {
        let newState = new HomeStateDo(state);
        let currentMode = newState.query.type;
        newState.query.type = PageType.BOOK === currentMode ?  
                              PageType.REVIEW : 
                              PageType.BOOK;
        return newState;
    }

    static getBookList = async (bookRequestDto) => {
        const uri = new UriBuilder("http://localhost:8080/book/search", bookRequestDto)
            .build();
        try {
            let response = await Axios.get(uri);
            return response.data.map(book => new BookResponseDto(book).toPreviewDo());
        } catch (err) {
            return err;
        }
    };

}

export default HomeUtils;