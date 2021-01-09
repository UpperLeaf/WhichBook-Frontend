import PreviewDoBuilder from '../../component/Home/Do/PreviewDoBuilder'
import HomeStateDo from '../../component/Home/Do/HomeStateDo';
import PreviewPageDoBuilder from '../../component/Home/Do/PreviewPageDoBuilder';
import PreviewPageDo from '../../component/Home/Do/PreviewPageDo';
import QueryDo from '../../component/Home/Do/QueryDo';
import Axios from 'axios';
import UriBuilder from '../UriBuilder';
import PageType from '../../component/Home/Do/PageType'
import BookResponseDto from './dto/BookResponseDto';
import PageRequestBuilder from './PageRequestBuilder';
import {isNotEmpty, isEmpty} from '../Utils'
import PreviewPages from '../../component/Home/Do/PreviewPages'

class HomeUtils {

    static load = async (state, pages, query) => {
        let newState = state;
        newState = await this.loadPages(newState, pages);
        newState = this.loadQuery(newState, query);
        return newState;
    }

    static loadPages = async (state, pages) => {
        let newState = new HomeStateDo(state);
        let newPages = new PreviewPages(pages);
        if (isEmpty(newPages.getRawPages())) {
            return newState = await this.clickedPage(newState, "최신");
        }
        
        newPages.emptyPreviewOfActivePage();
        newState.pages = newPages;

        let newPage = new PreviewPageDo(newState.pages.getActivePage());

        await newPage.addPreviews( 
            new PageRequestBuilder()
            .setDisplay(20)
            .setStart(0)
            .build()
            )            
            
        newState.pages.setPage(newState.pages.getActivePageIndex(), newPage);
        return newState;
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
        newState.pages = new PreviewPages(newState.pages);
        const currentPageIndex = newState.pages.getActivePageIndex();
        const clickedPageIndex = newState.pages.getPageIndexByPageTitle(pageTitle);

        if (currentPageIndex === clickedPageIndex) {
            return newState;
        }

        if(currentPageIndex !== -1)
            new PreviewPageDo().toggleChecked.call(newState.pages.at(currentPageIndex));
        new PreviewPageDo().toggleChecked.call(newState.pages.at(clickedPageIndex));
        
        let newPage = new PreviewPageDo(newState.pages.at(clickedPageIndex));
        await newPage.addPreviewsIfPreviewIsEmpty();
        newState.pages.setPage(clickedPageIndex, newPage);
        return newState;
    }

    static createPage = async (state, query) => {
        let newState = new HomeStateDo(state);
        let newQuery = new QueryDo(query);
        let pages = newState.pages;
        const pageTitle = newQuery.value;

        if (pageTitle.trim() === "") return newState;
        if (pages.getPageByPageTitle(pageTitle)) {
            newState = await this.clickedPage(newState, pageTitle);
            newState = this.clearQuery(newState);
            return newState;
        }

        newState.pages.add(
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
        newState.query.clear();
        return newState;
    }

    static removePage = async (state, pageTitle) => {
        if (pageTitle === "최신") return state;
        if (pageTitle === "trend") return state;
        let newState = new HomeStateDo(state);
        if (newState.pages.isActivePage(pageTitle)) {
            newState = await this.clickedPage(
                newState,
                newState.pages.at(newState.pages.getActivePageIndex() - 1).pageTitle);
        }
        newState.pages.removePageByPageTitle(pageTitle);
        return newState;
    }

    static changeMode = (state) => {
        let newState = new HomeStateDo(state);
        newState.query.changeType();
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
        const activePageIndex = newState.pages.getActivePageIndex();
        let activePage = newState.pages.getActivePage();
        await activePage.addPreviews(
            new PageRequestBuilder()
                .setStart(0)
                .setDisplay(10)
                .build()
        )
        newState.pages.setPage(activePageIndex, activePage);
        return newState;
    }

}

export default HomeUtils;