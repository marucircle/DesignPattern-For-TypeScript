## Observerパターン

- あるオブジェクト（Observer）を別のオブジェクト（Observable）にSubscribeすることができる
- イベントが発生すると、Observableが自身のObserverに通知を行う

## 登場人物

### Observer

- 特定のイベントが発生するたびに通知をするObserverの配列

### subscribe()

- ObserverをObserverのリストに追加するためのメソッド

### unsubscribe()

- ObserverのリストからObserverを削除するためのメソッド

### notify()

- 特定のイベントが発生した際にすべてのObserverに通知をするメソッド

## 処理の流れ

- あるObservableが作成される
  - ObservableにはObserverの登録(subscribe)と削除(unsubscribe)、登録済みのObserverに対して処理を実行させるためのメソッド（notify）を用意する
- いくつかのObserverが作成され、Observableに登録される
  - Observerには、Observableから通知を受け取った際に実行するメソッドを用意しておく
- Observableのnotifyメソッドが実行され、Observerのメソッドも連動して実行される

## 有効活用できる場面？

- 各Observerに依存関係があり、一方のObserverに変更が生じたような場面で別のObserverも更新など実行したい時
- 非同期のイベントベースなデータを扱うような場合（○○の処理が完了した際に、別のコンポーネントに対して通知や処理の実行を行いたい場合）
