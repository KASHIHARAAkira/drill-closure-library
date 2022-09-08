# drill-closure-library
Closure Libraryの練習。

# 環境構築
Closure Libraryのインストールが必要です。
[公式サイト](https://developers.google.com/closure/library/docs/gettingstarted)を参考に、`./public/lib/`にインストールしてください。
コマンドの例を示します。

```
cd ./public/lib 
git clone https://github.com/google/closure-library
cd closure-library
npm install
```

# 静的ファイルサーバーの実行
サーバーを実行します。
`drill-closure-library`の下で

```
node index.js
```

を実行してください。

```
Listening on 3000.
```

と表示されれば、サーバーが起動されています。
サンプルのページにアクセスするためには、以下のURLにアクセスします。

* 最もシンプルなチュートリアル

    [http://localhost:3000/src/simple-exam/html/notepad.html](http://localhost:3000/src/simple-exam/html/notepad.html)
* イベントハンドルがついたチュートリアル 

   [http://localhost:3000/src/event-handling/html/notepad-event.html](http://localhost:3000/src/event-handling/html/notepad-event.html)
* オリジナルのラーメンサイト 
 
   [http://localhost:3000/src/ramen-site/html/ramen-site.html](http://localhost:3000/src/ramen-site/html/ramen-site.html)