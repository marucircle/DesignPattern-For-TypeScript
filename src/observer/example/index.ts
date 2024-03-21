/* example
 * チャットシステムを想定。メッセージを送信時、observable
 * に登録されているユーザー全員に対して通知が発生するイメージ。
 */

import { ChatObservable } from "./observable";
import { UserObserver } from "./observer";

/**
 * The client code.
 */

//observableの作成
const chatObservable = new ChatObservable();

//observerの作成と登録
const observerA = new UserObserver("山田さん");
chatObservable.subscribe(observerA);
const observerB = new UserObserver("花子さん");
chatObservable.subscribe(observerB);

//
chatObservable.writeMessage("テスト書き込み");

chatObservable.unsubscribe(observerA);

chatObservable.writeMessage("花子さんへのみ送信");
