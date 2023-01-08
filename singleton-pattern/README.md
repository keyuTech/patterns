# 单例模式/Singleton Pattern
> 「前端设计模式」系列是对于 [patterns.dev](https://www.patterns.dev/) 一书的一系列学习笔记
    
## 是什么

> Share a single global instance throughout our application
    
👆在**整个应用**中共享**一个全局实例**

单例是可以实例化一次，并且可以全局访问的类，非常适合管理应用程序中的全局状态。

## 怎么做

首先，按照上文的定义，单例应该是一个类，因此先定义 Counter 作为基础，Counter类中定义了四个相关方法：getInstance方法用于获取当前实例；getCount方法用于获取计数；increment方法用于增加计数；decrement方法用于减少计数。

```jsx
let count = 0;

class Counter {
	getInstance() {
		return this;
	}
	getCount() {
		return count;
	}
	increment() {
		return ++count;
	}
	decrement() {
		return --count;
	}
}
```

但是上述代码并不是一个单例模式，因为按照定义，单例只能实例化一次，而上例中的代码可以多次实例化，因此我们需要做一些改进。

```jsx
let count = 0;
let instance;

class Counter {
	constructor() {
		if (instance) {
			throw new Error('only one instance!')
		}
		instance = this
	}
	getInstance() {
		return this;
	}
	getCount() {
		return count;
	}
	increment() {
		return ++count;
	}
	decrement() {
		return --count;
	}
}

const singleton = Object.freeze(new Counter());

export default singleton;
```

这里做了两处改进：

首先，新增了instance变量用于标记类是否已经被实例化，在constructor函数中先判断instance是否存在，如果存在则抛出错误以保证只能实例化一次，如果不存在则说明类未被实例化，用this给instance赋值。

其次，对于单例来说，我们需要保证单例中的属性应该是不可更改的，因此使用Object.freeze()方法将singleton冻结，随后export对象singleton。

这样一来就实现了Counter类的一个属性固定的单例singleton。

## 优/缺点

对于单例来说，优点是可以不用每次都为实例化分配内存，因为整个应用中只会有一个实例，所以会节省大量内存。

由于在C/Java这些语言中并不能直接创建对象，所以适合使用单例来节省内存，但是对于JavaScript来说，单例模式并不适合，因为JavaScript中可以直接创建对象，可以用更加方便的方式实现单例的效果，所以在JavaScript中会避免使用单例。

使用以下方式可以简单实现单例的效果：

```jsx
let count = 0;

const counter = {
  increment() {
    return ++count;
  },
  decrement() {
    return --count;
  }
};

Object.freeze(counter);
export { counter };
```

单例的另一个缺点是对测试不友好，在上面的例子中，我们需要测试increment方法和decrement方法，由于在整个应用中只有一个Counter实例，在测试increment时将count增加至4，那么在测试decrement时count的起始状态就是4而不是0，这会造成一些预期外的测试结果。