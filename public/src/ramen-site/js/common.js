// Copyright 2022 Akira Kashihara <akira.kashihara@hotmail.com>

goog.provide("common.components.Header");
goog.provide("common.components.makeHeader");
goog.provide("common.components.Footer");
goog.provide("common.components.makeFooter");

goog.require("goog.dom");
goog.require("goog.dom.TagName");
goog.require("goog.soy");

common.components.makeHeader = function (baseDom) {
    const item = new common.components.Header(baseDom);
    item.makeHeaderDom();
    return item;
}

common.components.makeFooter = function (baseDom) {
    const item = new common.components.Footer(baseDom);
    item.makeFooterDom();
    return item;
}

common.components.Header = class {
    constructor(baseDom) {
        this.baseNode = baseDom;
    }

    makeHeaderDom() {
        const newItem = goog.dom.createDom(
            goog.dom.TagName.HEADER,
            null,
            "My Bestラーメンランキング"
        );

        this.baseNode.before(newItem);
    }
}

common.components.Footer = class {
    constructor(baseDom) {
        this.baseNode = baseDom;
    }

    makeFooterDom() {
        let newItem = goog.dom.createDom(
            goog.dom.TagName.FOOTER,
            null,
            "© 2022 Akira Kashihara"
        );

        this.baseNode.after(newItem);
    }
}