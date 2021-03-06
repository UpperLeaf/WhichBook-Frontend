import PageType from './PageType.js'
import PreviewPages from './PreviewPages.js'
import { isEmpty, getCurrentScrollHeight, isScrollNotEnd } from '../../../utils/Utils.js';
import QueryDo from './QueryDo.js';
import PreviewDo from './PreviewDo.js';

class HomeStateDo {

    constructor(homeStateDo) {
        this.query = new QueryDo.Builder()
            .value("")
            .type(PageType.REVIEW)
            .build();
        this.pages = new PreviewPages();

        if (homeStateDo !== undefined) {
            for (const property in this) {
                this[property] = homeStateDo[property];
            }
        }
    }

    static Builder = class {

        constructor() {
            this.homeState = new HomeStateDo();
            return this;
        }

        query(query) {
            this.homeState.query = query;
            return this;
        }

        pages(pages) {
            this.homeState.pages = pages;
            return this;
        }

        build() {
            return this.homeState;
        }

    }

    async clickedPage(pageTitle) {
        await this.pages.activePage(pageTitle);
        localStorage.setItem("pages", JSON.stringify(this.pages));
    }

    async createPage() {
        const pageTitle = this.query.value;
        const type = this.query.type;
        await this.pages.createPage(pageTitle, type);
        await this.query.clear();
        localStorage.setItem("pages", JSON.stringify(this.pages));
    }

    async removePage(pageTitle) {
        await this.pages.removePage(pageTitle);
        localStorage.setItem("pages", JSON.stringify(this.pages));
    }

    changeQueryType() {
        this.query.changeType();
        localStorage.setItem("query", JSON.stringify(this.query));
    }

    setQueryType(type) {
        this.query.type = type;
        localStorage.setItem("query", JSON.stringify(this.query));
    }

    setValue(value) {
        this.query.value = value;
    }

    async loadPagesInLocalStorage() {
        const pages = JSON.parse(localStorage.getItem("pages"));
        await this.loadPages(pages);
    }

    async loadQueryInLocalStorage() {
        const query = JSON.parse(localStorage.getItem("query"));
        await this.loadQuery(query);
    }

    async loadPages(pages) {
        if (isEmpty(pages)) {
            await this.pages.activePage("최신");
            return;
        }

        let newPages = new PreviewPages(pages);
        newPages.emptyPreviewOfActivePage();
        this.pages = newPages;
        await this.pages.addPreviewsAtAcivePage();
    }

    async loadQuery(query) {
        if (isEmpty(query)) {
            return;
        }

        let newQuery = new QueryDo(query);
        this.query.type = newQuery.type;
    }

    async onScroll() {
        if (isScrollNotEnd(getCurrentScrollHeight())) return;
        await this.pages.onScrollEnd();
        localStorage.setItem("pages", JSON.stringify(this.pages));
    }

    async searchReview(pageTitle) {
        const currentQueryType = this.query.type;
        this.query.value = pageTitle;
        this.query.type = PageType.REVIEW;
        await this.createPage();
        this.setQueryType(currentQueryType);
    }

    async readPreview(preview) {
        const newPreview = new PreviewDo(preview);
        const title = newPreview.getTitle();
        await this.searchReview(title);
    }
}

export default HomeStateDo;