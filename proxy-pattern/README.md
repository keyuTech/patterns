# 代理模式/Proxy Pattern

> 「前端设计模式」系列是对于 [patterns.dev](https://www.patterns.dev/) 一书的一系列学习笔记

## 是什么

> Intercept and control interactions to target objects

👆**拦截**并**控制**对目标对象的交互

代理模式是指：不直接与目标对象进行交互，而是与代理对象进行交互，然后代理对象再与目标对象交互。

使用代理模式可以更好地控制与某些对象的交互。

⚠JavaScript中已经存在[Proxy对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)

## 怎么做

```jsx
const person = {
	name: "Andy",
	age: 18
}

const personProxy = new Proxy(person, {})
```

使用JavaScript提供的Proxy接口可以创建出一个Proxy对象，其中第一个参数是目标对象，第二个参数是一个对象，用于定义拦截后要控制的操作。详见👉[Proxy-MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)

Proxy接口提供了很多的捕获器（trap）用于捕获对目标对象的操作，比如get、set、delete等等，我们在下例中展示get、set两个捕获器的使用：

```jsx
const person = {
	name: "Andy",
	age: 18
}

const personProxy = new Proxy(person, {
	get: (target, prop) => {
		if (!target[prop]) {
			console.log("target property doesn't exist")
		} else {
			return target[prop]
		}
	},
	set: (target, prop, value) => {
		if (prop === "name" && typeof value !== "string") {
			console.log("name must be string")
		} else if (prop === "age" && typeof value !== "number") {
			console.log("age must be number")
		} else {
			target[prop] = value
		}
	}
})

personProxy.nationality //target property doesn't exist
personProxy.name = "John"
personProxy.age = "10" //age must be number
```

上例中展示了Proxy常见用法之一 — 数据校验

在Proxy的handler对象中定义了get、set两个捕获器，对于get方法来说，如果目标对象中不存在想要获取的属性，则log一个错误；如果存在则返回该属性的值。对于set方法来说，如果设置的name属性的值的类型不是字符串则报错；如果设置的age属性的值的类型不是数字则报错；如果都符合则设置对应的属性值。

handler对象中还有其他捕获器，可以对目标对象的其他操作进行拦截。

## 额外内容

### Reflect

JavaScript提供了内建的Reflect对象使得在使用Proxy时能更方便的操作对象。Reflect提供的拦截方法与Proxy的方法相同，因此可以直接将Proxy的写法替换成Reflect。

上述的例子中，对于get方法我们使用 ` target[prop] ` 获取属性值，而使用Reflect的话，可以写作 ` Reflect.get(target, prop) ` ；对于set方法我们使用 ` target[prop] = value ` 来设置属性的值，而使用Reflect的话，可以写作 ` Reflect.set(target, prop, value) ` 

```jsx
const person = {
	name: "Andy",
	age: 18
}

const personProxy = new Proxy(person, {
	get: (target, prop) => {
		if (!target[prop]) {
			console.log("target property doesn't exist")
		} else {
			return Reflect.get(target, prop) //直接将Proxy替换为Reflect
		}
	},
	set: (target, prop, value) => {
		if (prop === "name" && typeof value !== "string") {
			console.log("name must be string")
		} else if (prop === "age" && typeof value !== "number") {
			console.log("age must be number")
		} else {
			Reflect.set(target, prop, value) //直接将Proxy替换为Reflect
		}
	}
})

personProxy.nationality //target property doesn't exist
personProxy.name = "John"
personProxy.age = "10" //age must be number
```

### Vue响应式原理

Vue 3中，数据是基于Proxy实现的响应式，具体实现没有深入研究不做深入讨论。

相关内容 👉[响应式基础](https://cn.vuejs.org/guide/essentials/reactivity-fundamentals.html#declaring-reactive-state)