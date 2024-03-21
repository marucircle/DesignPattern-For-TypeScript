import { UserObserver } from "./observer";

//Observable
interface Observable {
  // Attach an observer to the subject.
  subscribe(observer: UserObserver): void;

  // Detach an observer from the subject.
  unsubscribe(observer: UserObserver): void;

  // Notify all observers about an event.
  notifyAll(): void;
}

//Observableの詳細実装
export class ChatObservable implements Observable {
  private observers: UserObserver[] = [];

  /**
   * observerの登録
   */
  public subscribe(observer: UserObserver): void {
    const isExist = this.observers.includes(observer);
    if (isExist) {
      return console.log("既に追加済みのユーザー");
    }

    console.log("新たなユーザーを通知対象に追加：", observer.name);
    this.observers.push(observer);
  }

  //observerの削除
  public unsubscribe(observer: UserObserver): void {
    const observerIndex = this.observers.indexOf(observer);
    if (observerIndex === -1) {
      return console.log("登録されていないユーザー");
    }

    this.observers.splice(observerIndex, 1);
    console.log("次のユーザーを通知対象から除外：", observer.name);
  }

  /**
   * 登録済みのすべてのObserverに対して通知し、処理を実行させる
   */
  public notifyAll(): void {
    console.log("（内部処理）通知送信");
    for (const observer of this.observers) {
      observer.notify();
    }
  }

  /**
   * メッセージの書き込み（想定）
   */
  public writeMessage(message: string): void {
    console.log(`-------- 新規書き込み「${message}」） --------`);
    console.log(message);
    this.notifyAll();
  }
}
