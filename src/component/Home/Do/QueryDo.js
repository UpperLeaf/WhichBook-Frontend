import PageType from "./PageType";

class QueryDo {

    constructor(queryDo) {
        this.value = "";
        this.type = PageType.REVIEW;

        if (queryDo !== undefined) {
            for (const property in this) {
                this[property] = queryDo[property];
            }
        }
    }

    changeType() {
        this.type = this.type === PageType.BOOK ? PageType.REVIEW : PageType.BOOK;
    }

    clear() {
        this.value = "";
    }

}

export default QueryDo;