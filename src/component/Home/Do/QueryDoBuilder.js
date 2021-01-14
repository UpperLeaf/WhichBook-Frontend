import QueryDo from './QueryDo.js'

class QueryDoBuilder {

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

export default QueryDoBuilder;