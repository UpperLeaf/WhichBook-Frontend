import PageType from './PageType.js'
import QueryDoBuilder from './QueryDoBuilder.js';
import PreviewPages from './PreviewPages.js'
import PreviewPageDo from './PreviewPageDo.js';

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

    // async removePage(pageTitle) {
    //     if (pageTitle === "최신") return state;
    //     if (pageTitle === "trend") return state;

    //     if (this.pages.isActivePage(pageTitle)) {

    //     }
    // }

    async clickedPage(pageTitle){
        const currentPageIndex = this.pages.getActivePageIndex();
        const clickedPageIndex = this.pages.getPageIndexByPageTitle(pageTitle);
        if(currentPageIndex === clickedPageIndex){
            return;
        }
        if(currentPageIndex != -1){
            new PreviewPageDo().toggleChecked.call(this.pages.at(currentPageIndex));
        }
        new PreviewPageDo().toggleChecked.call(this.pages.at(clickedPageIndex));
        let newPage = new PreviewPageDo(this.pages.at(clickedPageIndex));
        console.log(this.pages);
        await newPage.addPreviewsIfPreviewIsEmpty();
        console.log(this.pages);
    }

}

export default HomeStateDo;