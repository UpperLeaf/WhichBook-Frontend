import PageType from './PageType.js'
import QueryDoBuilder from './QueryDoBuilder.js';
import PreviewPages from './PreviewPages.js'

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

}

export default HomeStateDo;