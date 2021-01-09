import PreviewPageDo from './PreviewPageDo.js'
import PageType from './PageType.js'
import QueryDoBuilder from './QueryDoBuilder.js';
class HomeStateDo {

    constructor(homeStateDo) {
        this.query = new QueryDoBuilder()
            .setValue("")
            .setType(PageType.REVIEW)
            .build();
        this.pages = [] || [new PreviewPageDo()];
        this.pageMaxLength = 6;

        if (homeStateDo !== undefined) {
            for (const property in this) {
                this[property] = homeStateDo[property];
            }
        }
    }

    addPages(pages) {
        this.pages = this.pages.concat(pages);
        this.pages.splice(2, Math.max(0, this.pages.length - this.pageMaxLength))
    }
}

export default HomeStateDo;