# 中介者/中间件模式/Mediator/Middleware Pattern

> 「前端设计模式」系列是对于 [patterns.dev](https://www.patterns.dev/) 一书的一系列学习笔记

## 是什么

> Use a central mediator object to handle communication between components

👆使用中介对象来处理组件之间的通信

中介者（中间件）模式使得组件可以通过一个中心点：中介者（中间件）来相互交互。组件之间不是直接进行互相通信，而是通过中介者（中间件）接收请求，然后将它们发送出去。在 JavaScript 中，中介者（中间件）通常只是一个对象或一个函数。

如下图所示，各个component之间并不互相通信，而是全部与Mediator通信，然后由Mediator进行后续处理：

![中介者/中间件模式](https://res.cloudinary.com/ddxwdqwkr/image/upload/v1609056523/patterns.dev/Screen_Shot_2020-12-23_at_11.23.32_PM_wjft0a.png)

## 怎么做
文中使用聊天室作为一个典型例子：聊天室中的用户并不是直接进行沟通，而是将聊天室服务作为Mediator从中连接。

```jsx
class ChatRoom {
  logMessage(user, message) {
    const time = new Date();
    const sender = user.getName();

    console.log(`${time} [${sender}]: ${message}`);
  }
}

class User {
  constructor(name, chatroom) {
    this.name = name
    this.chatroom = chatroom
  }

  getName() {
    return this.name
  }

  send(message) {
    this.chatroom.logMessage(this, message)
  }
}

const chatroom = new ChatRoom()

const user1 = new User('Andy', chatroom)
const user2 = new User('Bob', chatroom)

user1.send('Hi, I am Andy')
user2.send('Hi, I am Bob')
```

## 优/缺点
### 优点
中介者（中间件）模式让所有通信都流经一个中心点，使我们可以轻松简化对象之间的多对多关系。