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

}

export default QueryDo;