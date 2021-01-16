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

    static Builder = class {

        constructor() {
            this.query = new QueryDo();
        }

        value(value) {
            this.query.value = value;
            return this;
        }

        type(type) {
            this.query.type = type;
            return this;
        }

        build() {
            return this.query;
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