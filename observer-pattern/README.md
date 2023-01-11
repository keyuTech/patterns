# 观察者模式/Observer Pattern

> 「前端设计模式」系列是对于 [patterns.dev](https://www.patterns.dev/) 一书的一系列学习笔记

## 是什么
> Use observables to notify subscribers when an event occurs

👆使用 **「被观察者」** 在事件发生时通知 **「观察者」**

使用观察者模式，我们可以将某些对象（observers）订阅到另一个对象，称为被观察者（observable）。每当事件发生时，被观察者都会通知所有观察者。

## 怎么做
首先对于被观察者来说，需要最基本的属性：观察者列表（observers），以及最基本的三个方法：订阅（subscribe）、取消订阅（unsubscribe）、通知（notify）：
```jsx
export default class Observerable {
  constructor() {
    this.observers = []
  }

  subscribe(func) {
    this.observers.push(func)
  }

  unsubscribe(func) {
    this.observers = this.observers.filter(observer => observer !== func)
  }

  notify(data) {
    this.observers.forEach(observer => observer(data))
  }
}
```
通过observers数组保存了订阅该被观察者的观察者，通过subscribe方法将观察者存入observers数组，通过unsubscribe方法将观察者移出observers数组以取消订阅，通过notify方法调用观察者并传入数据。

```jsx
const observerable = new Observerable();

observerable.subscribe(logger1);
observerable.subscribe(logger2);

function App() {
  const handleClick = () => {
    observerable.notify('button clicked')
  };

  return (
    <div className="App">
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
}
```
如上例中使用observerable，logger1和logger2分别订阅了被观察者，在按钮被点击时，被观察者会通知logger1和logger2，所以在控制台会出现如下log：
``` shell
This is logger1: button clicked
This is logger2: button clicked
```

## 优/缺点
### 优点
使用观察者模式有利于实施关注点分离和单一职责原则。 观察者与被观察者没有紧密耦合，可以随时解耦。 被观察者负责监视事件，而观察者只是处理接收到的数据。

### 缺点
如果观察者变得过于复杂，在通知所有订阅者时可能会导致性能问题。