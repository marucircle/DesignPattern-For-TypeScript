//Observable
interface Observable {
  // Attach an observer to the subject.
  subscribe(observer: Observer): void;

  // Detach an observer from the subject.
  unsubscribe(observer: Observer): void;

  // Notify all observers about an event.
  notify(): void;
}

//Observableの詳細実装
class ObservableImpl implements Observable {
  /**
   * @type {number} For the sake of simplicity, the Subject's state, essential
   * to all subscribers, is stored in this variable.
   */
  public state: number = 0;

  /**
   * @type {Observer[]} List of subscribers. In real life, the list of
   * subscribers can be stored more comprehensively (categorized by event
   * type, etc.).
   */
  private observers: Observer[] = [];

  /**
   * observerの登録
   */
  public subscribe(observer: Observer): void {
    const isExist = this.observers.includes(observer);
    if (isExist) {
      return console.log("Subject: Observer has been attached already.");
    }

    console.log("Subject: Attached an observer.");
    this.observers.push(observer);
  }

  //observerの削除
  public unsubscribe(observer: Observer): void {
    const observerIndex = this.observers.indexOf(observer);
    if (observerIndex === -1) {
      return console.log("Subject: Nonexistent observer.");
    }

    this.observers.splice(observerIndex, 1);
    console.log("Subject: Detached an observer.");
  }

  /**
   * 登録済みのObserverに対して通知し、処理を実行させる
   */
  public notify(): void {
    console.log("Subject: Notifying observers...");
    for (const observer of this.observers) {
      observer.update(this);
    }
  }

  /**
   * observerを呼び出すような場面のビジネスロジック
   */
  public someBusinessLogic(): void {
    console.log("\nSubject: I'm doing something important.");
    this.state = Math.floor(Math.random() * (10 + 1));

    console.log(`Subject: My state has just changed to: ${this.state}`);
    this.notify();
  }
}

/**
 * observerはobservableから通知を受け取った際に実行したいメソッドを作っておく
 */
interface Observer {
  // Receive update from subject.
  update(observable: Observable): void;
}

/**
 * Concrete Observers react to the updates issued by the Subject they had been
 * attached to.
 */
class ObserverImplA implements Observer {
  public update(observable: Observable): void {
    if (observable instanceof ObservableImpl && observable.state < 3) {
      console.log("ConcreteObserverA: Reacted to the event.");
    }
  }
}

class ObserverImplB implements Observer {
  public update(observable: Observable): void {
    if (
      observable instanceof ObservableImpl &&
      (observable.state === 0 || observable.state >= 2)
    ) {
      console.log("ConcreteObserverB: Reacted to the event.");
    }
  }
}

/**
 * The client code.
 */

//observableの作成
const observable = new ObservableImpl();

//observerの作成と登録
const observer1 = new ObserverImplA();
observable.subscribe(observer1);
const observer2 = new ObserverImplB();
observable.subscribe(observer2);

//
observable.someBusinessLogic();
observable.someBusinessLogic();

observable.unsubscribe(observer2);

observable.someBusinessLogic();
