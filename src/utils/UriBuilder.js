class UriBuilder {

    constructor(uri, config) {
        this.uri = uri || "";
        this.config = config || {};
    }

    addParam(key, value) {
        this.config[key] = value;
        return this;
    }

    build() {
        let newUri = this.uri;
        let component = [];
        for (const property in this.config) {
            component.push(`${property}=${this.config[property]}`);
        }
        return newUri + (component.length === 0 ? "" : "?") + component.join("&");
    }

}

export default UriBuilder
