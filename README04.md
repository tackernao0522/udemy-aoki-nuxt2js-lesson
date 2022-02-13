# セクション 3: NuxtJs で GoogleBooksAPI(SPA)

## 28 Google Books API の説明

### Google Books API

メリット<br>
登録無しでも使える（1000 件/日）<br>

デメリット<br>
検索が少し弱い（表示されない本も）<br>
価格が表示されない・発刊日が正確ではない<br>
(AmazonAPI は条件厳しい(30 日いないに売上必要))<br>

参考: https://books.google.co.jp/ <br>

ベースの URL<br>
https://www.googleapis.com/books/v1/volumes?q=検索語句<br>

intitle: 本のタイトル<br>
maxResults:40 検索表示数(10-40)<br>

https://developers.google.com/books<br>
Guides->Using the API-> Query parameter reference

Google Book Api の使い方<br>
参考: https://miyachi-web.com/google-books-apis/ <br>

Google Books APIs <br>
https://developers.google.com/books/docs/v1/using <br>

### クエリーストリング

```
const baseUrl = 'https://www.googleapis.com/books/v1/volumes?'

const params = {
q: `intitle:${keyword}`,
maxResults:40
}
const queryParams = new URLSearchParams(params)
fetch(baseUrl + queryParams)
```
