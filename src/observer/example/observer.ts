/**
 * observerはobservableから通知を受け取った際に実行したいメソッドを作っておく
 */

interface Observer {
  // Receive update from subject.
  notify(observable: Observable): void;
}

/**
 * Concrete Observers react to the updates issued by the Subject they had been
 * attached to.
 */
export class UserObserver implements Observer {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  public notify(): void {
    console.log(`[通知]：${this.name}に新規メッセージ`);
  }
}
