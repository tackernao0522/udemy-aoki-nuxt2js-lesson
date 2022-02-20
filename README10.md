## 62 Authentication の設定

管理画面で有効化<br>
メール<br>
追加のプロバイダ(Google, Twitter, Facebook 等)<br>

### 認証・・できる事

|               機能               |            メソッド            |
| :------------------------------: | :----------------------------: |
|          認証機能の利用          |            getAuth             |
| ユーザー登録（メール&パスワード) | createUserWithEmailAndPassword |
|            サインイン            |   signInWithEmailAndPassword   |
|          認証状態の変更          |       onAuthStateChanged       |
|         認証状態の永続性         |         setPersistence         |

- firebase 管理画面の`Authentication`のカードをクリック<br>

* `始める`ボタンをクリック<br>

- `メール / パスワード`をクリック<br>

* `メール / パスワード`を有効にする<br>

- `保存`をクリック<br>
