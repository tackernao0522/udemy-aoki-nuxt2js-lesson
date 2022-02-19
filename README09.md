# セクション 4: Firebase & SPA

### Firebase の概要

Baas や mBass よ呼ばれる<br>
(mobile Backend as a service)<br>

サーバー側で必要な仕組みを用意<br>
サーバーを用意しないで開発ができるのでサーバーレスとも呼ばれる<br>

### Firebase の歴史

2011 年 Firebase Inc. が開発<br>
2013 年 Zapier を統合(複数のアプリ間通信)<br>
2014 年 Google が買収<br>
2017 年 10 月 Cloud Firestore 提供開始<br>
2021 年 8 月 Firebase JS SDK v9.0.0<br>

(他に iOS, Android, C++, Unity なども対応)<br>

### Firebase の機能

Hosting・・HTML/CSS/JS が動く<br>
レンタルサーバー CLI も用意<br>
Cloud Firestore・・データベース(NoSQL)<br>
Cloud Storage・・画像保存など<br>
認証(Authentication)・・Firebase 上でプログラムを動かす仕組み<br>
パフォーマンス監視<br>
グーグルアナリティクス<br>
エクステンション・・画像リサイズ、翻訳 etc・・・<br>

### Firebase 無料プラン

Spark プラン<br>
Authentication 1 万/月<br>
Cloud Firestore 保存済みデータ合計 1GiB<br>
書き込み 2 万件/日<br>
読み取り 5 万件/日<br>
Hosting ストレージ 10GB<br>
Cloud Storage GB 保存済み 5GB<br>
https://firebase.google.com/pricing?hl=ja<br>

## 54 プロジェクト作成

- Firebase へログインする<br>

* コンソールをクリック<br>

- プロジェクトを作成をクリック<br>

* プロジェクト名を入力して`続行`をクリック<br>

- 今回はアナリティクスを有効にしないに設定して`プロジェクトを作成`をクリック<br>

* `続行をクリック`<br>

- `</>`のボタンを選択してクリック<br>

* アプリのニックネームを`nuxt-spa`と入力してみる<br>

- このアプリの Firebase Hosting も設定します。にチェックを入れて`アプリを登録`をクリック<br>

* そのまま`次へ`をクリック<br>

- そのまま`次へ`を再度クリック<br>

* `コンソールへ進む`をクリック<br>
