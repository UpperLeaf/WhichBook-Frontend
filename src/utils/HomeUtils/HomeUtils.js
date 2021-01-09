import PreviewDoBuilder from '../../component/Home/Do/PreviewDoBuilder'
import HomeStateDo from '../../component/Home/Do/HomeStateDo';
import PreviewPageDoBuilder from '../../component/Home/Do/PreviewPageDoBuilder';
import PreviewPageDo from '../../component/Home/Do/PreviewPageDo';
import QueryDo from '../../component/Home/Do/QueryDo';
import Axios from 'axios';
import UriBuilder from '../UriBuilder';
import PageType from '../../component/Home/Do/PageType'
import BookResponseDto from './dto/BookResponseDto';
import BookRequestDtoBuilder from './dto/BookRequestDtoBuilder';
import PageRequestBuilder from './PageRequestBuilder';
import PageRequest from './PageRequest';
import {isEmpty} from '../Utils'

class HomeUtils {

    static load = async (state, pages, query) => {
        let newState = state;
        newState = await this.loadPages(newState, pages);
        newState = this.loadQuery(newState, query);
        return newState;
    }

    static loadPages = async (state, pages) => {
        let newState = new HomeStateDo(state);
        let newPages = [] || [new PreviewPageDo()];
        newPages = pages;
        
        if (isEmpty(newPages)) {
            return newState = await this.clickedPage(newState, "최신");
        }

        newState.pages = this.emptyPreviewOfActivePage(newPages);
        return newState;
    }

    static emptyPreviewOfActivePage = (pages) => {
        let newPages = [] || [new PreviewPageDo()];
        newPages = pages;

        const activePageIndex = this.getActivePageIndex(newPages);
        let activePage = newPages[activePageIndex];

        activePage = this.emptyPreview(activePage);
        newPages[activePageIndex] = activePage;
        return newPages;
    }

    static emptyPreview = (page) => {
        let newPage = new PreviewPageDo(page);
        newPage.previews = [];
        return newPage;
    }

    static loadQuery = (state, query) => {
        let newState = new HomeStateDo(state);

        if (isEmpty(query)) {
            return newState;
        }

        let newQuery = new QueryDo(query);
        newState.query.type = newQuery.type;
        
        return newState;
    }

    static clickedPage = async (state, pageTitle) => {
        let newState = new HomeStateDo(state);

        const currentPageIndex = HomeUtils.getActivePageIndex(newState.pages);
        const clickedPageIndex = newState.pages.findIndex(page => page.pageTitle === pageTitle);
        if (currentPageIndex === clickedPageIndex) {
            return newState;
        }

        newState = this.togglePageByIndex(newState, currentPageIndex);
        newState = this.togglePageByIndex(newState, clickedPageIndex);
        newState = await this.loadPage(
            newState,
            pageTitle
        );

        return newState;
    }

    static getActivePageIndex = (pages) => {
        let newPages = [] || [new PreviewPageDo()]
        newPages = pages;
        return newPages.findIndex((page) => page.checked);
    }

    static getActiveTitle = (pages) => {
        let newPages = [] || [new PreviewPageDo()]
        newPages = pages;
        const activeIndex = this.getActivePageIndex(pages);
        return newPages[activeIndex].pageTitle;
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

    static loadPage = async (state, pageTitle) => {
        let newState = new HomeStateDo(state);
        let pages = newState.pages;
        const pageIndex = pages.findIndex((page) => page.pageTitle === pageTitle);
        let page = pages[pageIndex];
        console.log(state);
        if (page.previews.length === 0) {
            page = await this.addPreviews(page, 
                new PageRequestBuilder()
                .setDisplay(20)
                .setStart(0)
                .build()
            );
            pages[pageIndex] = page;
            newState.pages = pages;
        }
        return newState;
    }

    static addPreviews = async (page, pageRequest) => {
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
                .setId(newPageRequest.id)
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

        if (pageTitle.trim() === "") return newState;
        if (pages.find(page => page.pageTitle === pageTitle)) {
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

        newState = await this.clickedPage(newState, pageTitle);
        newState = this.clearQuery(newState);
        return newState;
    }

    static clearQuery = (state) => {
        let newState = new HomeStateDo(state);
        newState.query.value = "";
        return newState;
    }

    static removePage = async (state, pageTitle) => {
        if (pageTitle === "최신") return state;
        if (pageTitle === "trend") return state;
        let newState = new HomeStateDo(state);
        if (this.isActivePage(newState, pageTitle)) {
            newState = await this.clickedPage(
                newState,
                newState.pages[this.getActivePageIndex(newState.pages) - 1].pageTitle);
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

    static scrollisEnd = () => {
        const currentScrollValue = document.documentElement.scrollTop;
        const widnowHeight = window.innerHeight;
        const scrollHeight = document.body.scrollHeight;
        return currentScrollValue + widnowHeight >= scrollHeight
    }

    static scrollEnd = async (state) => {
        const newState = new HomeStateDo(state);
        const activePageIndex = this.getActivePageIndex(state.pages);
        let activePage = newState.pages[this.getActivePageIndex(state.pages)];

        activePage = await this.addPreviews(
            activePage,
            new PageRequestBuilder()
                .setStart(0)
                .setDisplay(10)
                .build()
        )

        newState.pages[activePageIndex] = activePage;
        return newState;
    }

}

export default HomeUtils;