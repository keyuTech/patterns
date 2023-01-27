# 代理模式/Proxy Pattern

> 「前端设计模式」系列是对于 [patterns.dev](https://www.patterns.dev/) 一书的一系列学习笔记

## 是什么
> Add functionality to objects or classes without inheritance

👆在没有继承的情况下向对象或类添加功能

mixin是一个对象，我们可以通过使用mixin在没有继承的情况下向对象或类中添加功能函数。我们不应该单独使用mixin，它只有上述的一个作用。

## 怎么做
举例来说，在应用中我们需要很多的「狗」，但是我们创建的基类「狗」中只有 ```name``` 这一个属性：
```jsx
class Dog {
  constructor(name) {
    this.name = name;
  }
}
```
但是对于「狗」来说，它不应该只有名字，还应该能够叫、摇尾巴、玩耍等。相对于在基类Dog上直接添加这些功能函数来说，我们可以通过使用mixin提供这些能力：
```jsx
const dogFunctionality = {
  bark: () => console.log("Woof!"),
  wagTail: () => console.log("Wagging my tail!"),
  play: () => console.log("Playing!")
}
```
然后通过JavaScript提供的 ```Object.assign``` 方法将 ```dogFuntionality``` 并入 ```Dog``` 的原型，随后 ```Dog``` 的每个实例中都会包含 ```dogFunctionality``` 中的方法：
```jsx
Object.assign(Dog.prototype, dogFunctionality)

const dog1 = new Dog('Daisy')
dog1.name; // Daisy
dog1.bark(); // Woof!
dog1.play(); // Playing!
```

### 额外内容 - mixin的继承
虽然说我们是在不使用继承的情况下，通过mixin在对象或类中添加了功能函数，但实际上mixin本身是可以继承的。
例如，上例中，「狗」属于「动物」范畴内，动物一般都会走路和睡觉，那么我们新增一个mixin: ```animalFunctionality```，其中具有 ```walk``` 和 ```sleep``` 两个函数，并在mixin ```dogFunctionality``` 中继承这两个函数：
```jsx
const animalFunctionality = {
  walk: () => console.log('walking'),
  sleep: () => console.log('sleeping')
}

const dogFunctionality = {
  bark: () => console.log("Woof!"),
  wagTail: () => console.log("Wagging my tail!"),
  play: () => console.log("Playing!"),
  walk() {
    super.walk()
  },
  sleep() {
    super.sleep()
  }
}

Object.assign(dogFunctionality, animalFunctionality)
Object.assign(Dog.prototype, dogFunctionality)
```
如此一来，所有 ```Dog``` 的实例中就都会拥有 ```walk``` 和 ```sleep``` 方法。

## 优/缺点
### 优点
通过将功能函数注入到对象的原型中，Mixins 使我们无需继承即可轻松地向对象添加功能。 
修改对象的原型被视为不好的做法，因为它会导致原型污染和我们函数来源的不确定性。
### 缺点
mixin很容易给组件增加不必要的复杂性，使其难以维护和复用，因此React 团队不鼓励使用mixin。
React 团队鼓励使用高阶组件，现在通常可以用 Hooks 代替。