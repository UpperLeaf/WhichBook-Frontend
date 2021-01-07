import QueryDo from './QueryDo.js'

class QueryDoBuilder {

    constructor() {
        this.query = new QueryDo();
    }

    setValue(value) {
        this.query.value = value;
        return this;
    }

    setType(type) {
        this.query.type = type;
        return this;
    }

    build() {
        return this.query;
    }

}

export default QueryDoBuilder;