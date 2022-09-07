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
goog.require("goog.dom.TagName");       // goog.dom.TagNameをインポートする
goog.require("goog.ui.Zippy");          // アコーディオンの動きをするZippyをインポートする

/**
 * ノートのデータとインタフェースを定義する。
 * タイトルやコンテンツなど、ノートを表示するための情報を定義。
 * @param {string} title - ノートのタイトル
 * @param {string} content - ノートに表示するコンテンツの内容を入れる
 * @param {Element} noteContainer - 作成するDOMの親NODEを入れる
 */
tutorial.notepad.Note = class {

    /**
     * 作成する1つのNoteの情報を定義。インスタンス作成時に呼ばれる。
     * @param {Array.<Object>} data - 単体のNoteのデータ（表示情報）
     * @param {*} noteContainer - 作成したNote（DOM）の親NODE
     */
    constructor(data, noteContainer) {
        this.title = data.title;        // タイトル
        this.content = data.content;    // 表示するコンテンツ
        this.parent = noteContainer;    // 作成したDOMの親NODE
    }

    makeNoteDom() {
        // 表示するDOMの構造を作成
        this.headerElement = 
            goog.dom.createDom(goog.dom.TagName.DIV, {"style": "background-color: #EEE"}, this.title); // タイトル表示のDOM作成
        this.contentElement = 
            goog.dom.createDom(goog.dom.TagName.DIV, null, this.content);   // コンテンツ表示のDOM作成
        
        // コンテンツを編集するためのテキストエリアと、保存するためのセーブボタンを作成
        this.editorElement = 
            goog.dom.createDom(goog.dom.TagName.TEXTAREA);  // テキストエリア作成
        const saveBtn = goog.dom.createDom(
            goog.dom.TagName.INPUT, {"type": "button", "value": "Save"});   // セーブボタン作成
        this.editorContainer = goog.dom.createDom(
            goog.dom.TagName.DIV, {"style": "display: none;"}, this.editorElement, saveBtn);    // テキストエリアとセーブボタンを包括するDOMの作成

        this.contentContainer = goog.dom.createDom(
            goog.dom.TagName.DIV, null, this.contentElement, this.editorContainer); // コンテンツと編集DOMを包括するDOMを作成

        const newNote = goog.dom.createDom(
            goog.dom.TagName.DIV, null, this.headerElement, this.contentContainer); // 新しいノート（DOM）の作成

        this.parent.appendChild(newNote);   // 親NODEに新しく作成したノートを挿入

        goog.events.listen(
            this.contentElement, goog.events.EventType.CLICK, this.openEditor, false, this);    // コンテンツをクリックしたときのイベント

        goog.events.listen(
            saveBtn, goog.events.EventType.CLICK, this.save, false, this);  // セーブボタンが押されたときのイベント

        this.zippy = new goog.ui.Zippy(this.headerElement, this.contentContainer);  // アコーディオンパネルの動きを作成
    }

    /**
     * セーブボタンが押されたときのイベント
     * @param {goog.events.Event} e - イベントオブジェクト
     */
    save(e) {
        this.content = this.editorElement.value;    // テキストエリアに入力された文章を、コンテンツに代入
        this.closeEditor(); // エディタを閉じる
    }

    /**
     * コンテンツを編集したあと、エディタを閉じるための関数
     */
    closeEditor() {
        this.contentElement.innerHTML = this.content;   // 更新されたコンテンツをコンテンツエレメントに代入
        this.contentElement.style.display = "inline";   // コンテンツエレメントを表示する
        this.editorContainer.style.display = "none";    // エディタを非表示にする
    }

    /**
     * コンテンツをクリックしたときに、エディタを表示する関数
     * @param {goog.events.Event} e - イベントオブジェクト
     */
    openEditor(e) {
        this.editorElement.value = this.content;            // テキストエディタの中に、現在のコンテンツを代入
        this.contentElement.style.display = "none";         // コンテンツを表示するDOMを非表示にする
        this.editorContainer.style.display = "inline";      // テキストエディタを表示する
    }
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
            new tutorial.notepad.Note(data[i], noteContainer);
        notes.push(note);
        note.makeNoteDom();
    }
    return notes;
}