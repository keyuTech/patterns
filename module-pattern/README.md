# 模块模式/Module Pattern
> 「前端设计模式」系列是对于 [patterns.dev](https://www.patterns.dev/) 一书的一系列学习笔记

## 是什么

> Split up your code into smaller, reusable pieces

👆将您的代码拆分成更小的、可重用的部分

模块模式不仅可以实现将代码分割，还可以将代码私有化。如果在模块内不显式导出某个值，那么这个值在模块外则不可用。

## 怎么做
### ES2015/ES6
> 本文只讨论 ES2015/ES6 中的模块模式

ES2015/ES6 引入了内置的 JavaScript 模块。模块是包含 JavaScript 代码的文件，与普通脚本相比在行为上存在一些差异。


在当前示例中定义了 [math.js](./src/math.js) 模块，其中使用 `export` 关键字导出了 了 `add` 、 `multiply` 、 `subtarct` 、 `square` 四个函数，同时，在 [App.
js](./src/App.jsx) 中通过 `import {add, multiply, subtract, square} from ./math.js` 引入math模块中导出的四个函数。

在 [math.js](./src/math.js) 模块中，定义导出的函数的同时，还定义了模块内部的私有变量 `privateValue`，在 [App.js](./src/App.jsx) 中使用 `privateValue` 
时会报错。

有的情况下，导出的名称和当前文件中的名称会出现冲突，我们可以通过 `as` 关键字对引入的值进行重命名：
```javascript
import {add as addValues, multiply as multiplyValues, subtract, square} from "./math.js"

console.log(addValues(1, 2)) // 3
console.log(multipluValues(1, 2)) // 2
console.log(subtract(3, 1)) // 2
console.log(square(2)) // 4
```

除了命名导出（仅使用 export 关键字定义的导出）之外，我们还可以使用默认导出。但是每个模块只能有一个默认导出。

在示例 [math-with-default-export](./src/math-with-default-export.js) 中定义了默认导出的 `addWithDefault` 方法，还定义了非默认导出的 
`subtractWithDefault` 方法，在 [App.js](./src/App.jsx) 中通过
`import addWithDefault, {subtractWithDefault} from "./math-with-default-export.js"` 引入。

除了以上几种情况之外，我们还可以从模块中引入所有导出：
```javascript
import * as math from "./math.js"

console.log(math.add(1, 2)) // 3
```

需要注意的是，使用 `*` 导入模块中的值的时候，只会导入模块中导出的值，如果模块中存在私有变量、私有函数等情况，依然不会被导入，除非它们使用 `export` 关键字明确导出。

## 动态引入
在文件顶部导入所有模块时，所有模块都会在文件的其余部分之前加载。在某些情况下，我们只需要根据特定条件导入模块即可。通过动态导入，我们可以按需导入模块。

```javascript
// 使用 Promise.then 方式
import("module").then(module => {
  module.default()
  module.namedExport()
})

// 使用 async/await 方式
(async () => {
  const module = await import("module")
  module.default()
  module.namedExport()
})()
```

在示例 [dynamic-import](./src/dynamic-import.js) 中使用了 `Promise.then` 的方式动态引入了 `math.js` 中导出的方法。只有在用户点击按钮的时候才会加载引入的模块。


## 优/缺点

### 优点
使用模块模式，我们可以封装不应该公开的部分代码。 这可以防止意外的名称冲突和全局范围污染，从而降低使用多个依赖项和命名空间的风险。

### 缺点
JavaScript只在 ES2015/ES6 之后才提供了内建的模块模式，为了能够在所有 JavaScript 运行时中使用 ES2015 模块，需要一个转译器，例如 Babel。
