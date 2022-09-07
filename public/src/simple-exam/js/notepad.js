/**
 * This software includes the work that is distributed in the Apache License 2.0.
 * このソフトウェアは、 Apache 2.0ライセンスで配布されている製作物が含まれています。
 * 
 * This source code is based on the source code which is distributed on 
 * https://developers.google.com/closure/library/docs/tutorial with Japanese comment.
 * このソースコードは、https://developers.google.com/closure/library/docs/tutorial に記載・配布されている
 * コードに、日本語のコメントを追加したものです。
 * 
 * このコードは、タイトルとコンテンツが含まれたノートを作成するものです。
 * 
 * Author: Akira Kashihara <akira.kashihara@hotmail.com>
 * Date: 7th Sep. 2022 -
 */

goog.provide("tutorial.notepad");       // ネームスペースを作成    
goog.provide("tutorial.notepad.Note");  // ネームスペースを作成

goog.require("goog.dom");               // goog.domをインポートする
goog.require("goog.ui.Zippy");          // アコーディオンの動きをするZippyをインポートする

/**
 * ノートのデータとインタフェースを定義する。
 * タイトルやコンテンツなど、ノートを表示するための情報を定義。
 * @param {string} title - ノートのタイトル
 * @param {string} content - ノートに表示するコンテンツの内容を入れる
 * @param {Element} noteContainer - 作成するDOMの親NODEを入れる
 */
tutorial.notepad.Note = function(title, content, noteContainer) {
    this.title = title;
    this.content = content;
    this.parent = noteContainer;
}

/**
 * ノートDOMを作成する関数。
 */
tutorial.notepad.Note.prototype.makeNoteDom = function() {
    this.headerElement = goog.dom.createDom(goog.dom.TagName.DIV, 
        {"style": "background-color: #EEE"}, this.title);           // タイトルを表示するヘッダーDOMを作成
    this.contentElement = goog.dom.createDom(goog.dom.TagName.DIV,
        null, this.content);                                        // ノートの内容を表示するコンテンツDOMを作成
    const newNote = goog.dom.createDom(goog.dom.TagName.DIV, null,
        this.headerElement, this.contentElement);                   // ヘッダーDOMとコンテンツDOMを内包するDOMを作成

    goog.dom.appendChild(this.parent, newNote);                     // 作成したDOMを親Nodeの下に入れる

    return new goog.ui.Zippy(this.headerElement, this.contentElement);  // アコーディオンの動きを付与
}

/**
 * ノートのデータオブジェクトを入れると、複数のノートを作成し、それらを包含したDOMを作成する。
 * @param {Array.<Object>} data - 複数のノートのデータ
 * @param {Element} noteContainer - 作成したDOMの親NODE
 * @returns {Array.<tutorial.notepad.Note>} - 作成したDOM（インスタンス）の結果
 */
tutorial.notepad.makeNotes = function(data, noteContainer) {
    let notes = [];
    for(let i = 0; i < data.length; i++) {
        const note =
            new tutorial.notepad.Note(data[i].title, data[i].content, noteContainer);
        notes.push(note);
        note.makeNoteDom();
    }
    return notes;
}