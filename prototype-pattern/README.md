# 原型模式/Prototype Pattern

> 「前端设计模式」系列是对于 [patterns.dev](https://www.patterns.dev/) 一书的一系列学习笔记

## 是什么

> Share properties among many objects of the same type

👆在许多**相同类型**的对象之间**共享属性**

原型是JavaScript中的原生的对象，对象可以通过原型链访问自己的原型。

当要处理多个相同属性的对象时，原型模式是非常有效的。由于所有实例都可以访问原型对象，因此我们可以简单地将属性添加到原型，而不是每次都创建属性的副本，同样的原因，即使在创建实例之后也很容易向原型添加属性。

## 怎么做

在一个应用程序中，有时候会需要创建多个具有相同属性的对象，目前比较高效的做法是创建一个ES6的class，然后创建这个class的多个实例。

```jsx
class Dog {
  constructor(name) {
    this.name = name
  }

  run() {
    console.log('this dog is running')
  }
}

const dog1 = new Dog('Andy')
const dog2 = new Dog('Ben')
const dog3 = new Dog('Candy')
```
在这个基础的例子中，我们创建了一个 `Dog` 类，它具有一个 `name` 属性和一个 `run` 属性，使用 ES6 类时，类本身定义的所有属性（在本例中为 run）都会自动添加到原型中。

我们可以通过访问构造函数上的 `prototype` 属性或通过任何实例上的 `__proto__` 属性直接查看原型。

```jsx
console.log(Dog.prototype);
// {constructor: ƒ, run: ƒ}

console.log(dog1.__proto__);
// {constructor: ƒ, run: ƒ}
```

实例中的 `__proto__`，是对构造函数原型的直接引用。当直接访问对象上不存在的属性时，JavaScript 将沿着原型链向下查看该属性在原型链中是否可用。

同时，JavaScript提供了简便的方法创建对象：
```jsx
const dog = {
  run() {
    console.log('this dog is running');
  }
};

const dog1 = Object.create(dog);
```

使用 `Object.create` 方法可以显式传递原型的值。

## 优/缺点
原型模式使我们可以轻松地让对象访问和继承其他对象的属性。 由于原型链允许我们访问未直接在对象本身上定义的属性，我们可以避免方法和属性的重复，从而减少使用的内存量。