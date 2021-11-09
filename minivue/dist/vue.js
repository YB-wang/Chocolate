(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function isObject(data) {
    if (_typeof(data) !== 'object' || data === null) {
      return false;
    }

    return true;
  } //设置一个不可枚举的属性

  function def(data, key, value) {
    Object.defineProperty(data, key, {
      enumerable: false,
      writable: true,
      configurable: true,
      value: value
    });
  }
  function parsePath(path) {
    if (/[^\w.$]/.test(path)) {
      return;
    }

    var segments = path.split('.');
    return function (obj) {
      for (var i = 0; i < segments.length; i++) {
        if (!obj) {
          return;
        }

        obj = obj[segments[i]];
      }

      return obj;
    };
  }

  var oldArrayMethods = Array.prototype; //将 arrayMethods 的 __proto__ 指向  Array.prototype

  var arrayMethods = Object.create(oldArrayMethods); //这些方法都会导致数组 本身发生变化

  var methods = ['push', 'shift', 'unshift', 'pop', 'reverse', 'sort', 'splice'];
  methods.forEach(function (method) {
    arrayMethods[method] = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var result = oldArrayMethods[method].apply(this, args); //如果添加了元素，添加的元素如果是一个对象 那么需要进行观测

      var inserted;

      switch (method) {
        case 'push':
        case 'unshift':
          inserted = args;
          break;

        case 'splice':
          //三个参数 
          inserted = args.slice(2);
      } //将新增属性继续观测


      if (inserted) {
        this.__ob__.observerArray(inserted);
      }

      this.__ob__.dep.notify();

      return result;
    };
  });

  var Dep = /*#__PURE__*/function () {
    function Dep() {
      _classCallCheck(this, Dep);

      this.subs = [];
    }

    _createClass(Dep, [{
      key: "addSub",
      value: function addSub(val) {
        this.subs.push(val);
      }
    }, {
      key: "depend",
      value: function depend() {
        if (window.target) {
          this.subs.push(window.target);
        }
      }
    }, {
      key: "notify",
      value: function notify() {
        this.subs.forEach(function (sub) {
          sub.update();
        });
        console.log(this.subs);
      }
    }]);

    return Dep;
  }();

  function observe(data) {
    if (!isObject(data)) {
      return;
    }

    if (data.__ob__) {
      return data.__ob__;
    } //是对象就 进行数据劫持


    return new Observer(data); //用来观测数据
  }

  var Observer = /*#__PURE__*/function () {
    function Observer(value) {
      _classCallCheck(this, Observer);

      this.dep = new Dep(); //给每个观测过的对象都增加一个属性 当前Observer实例 并且这个属性不可被遍历到

      def(value, '__ob__', this);

      if (Array.isArray(value)) {
        //如果是数组的话并不会对索引进行观测 性能差
        //通过观测能改变数组的方法进行观测
        value.__proto__ = arrayMethods; //如果数组里的元素是一个对象 仍需要进行观测

        this.observerArray(value);
      } else {
        this.walk(value);
      }
    }

    _createClass(Observer, [{
      key: "walk",
      value: function walk(data) {
        Object.keys(data).forEach(function (key) {
          defineReactive(data, key, data[key]);
        });
      }
    }, {
      key: "observerArray",
      value: function observerArray(value) {
        for (var i = 0; i < value.length; i++) {
          //判断value是否为对象 如果是 则遍历劫持
          if (isObject(value[i])) {
            observe(value[i]);
          }
        }
      }
    }]);

    return Observer;
  }();

  function defineReactive(data, key, value) {
    //判断value是否为对象 如果是 则遍历属性劫持
    if (isObject(value)) {
      observe(value);
    }

    var dep = new Dep();
    var childOb = observe(value);
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      get: function get() {
        dep.depend();

        if (childOb) {
          childOb.dep.depend();
        }

        return value;
      },
      set: function set(newValue) {
        if (newValue === value) return; //若果设置的新值也是一个对象 也需要进行劫持

        if (isObject(value)) {
          observe(value);
        }

        console.log("数据更新了");
        value = newValue;
        dep.notify();
      }
    });
  }

  var Watcher = /*#__PURE__*/function () {
    //vm指观测对象  expOrFn 指具体属性 cb为回调函数
    function Watcher(vm, expOrFn, cb) {
      _classCallCheck(this, Watcher);

      this.vm = vm;
      this.gettter = parsePath(expOrFn);
      this.cb = cb;
      this.value = this.get();
    }

    _createClass(Watcher, [{
      key: "get",
      value: function get() {
        window.target = this;
        var value = this.gettter.call(this.vm, this.vm);
        window.target = undefined;
        return value;
      }
    }, {
      key: "update",
      value: function update() {
        var oldValue = this.value;
        this.value = this.get();
        this.cb.call(this.vm, this.value, oldValue);
      }
    }]);

    return Watcher;
  }();

  function initState(vm) {
    var opts = vm.$options; //这是vue默认的初始化顺序

    if (opts.props) ;

    if (opts.methods) ;

    if (opts.data) {
      initData(vm);
    }

    if (opts.computed) ;

    if (opts.watch) ;
  }

  function initData(vm) {
    //数据的初始化
    var data = vm.$options.data;
    data = typeof data === 'function' ? data.call(vm) : data; //方便用户直接访问data

    vm._data = data; //数据劫持  

    observe(data);
    new Watcher(data, 'age', function (v1, v2) {
      console.log("oldVal:", v2, '=>', "newVal:", v1);
    });
  }

  function compileToFunction(template) {
    return function render() {};
  }

  function initMixin(Vue) {
    Vue.prototype._init = function (options) {
      //数据劫持
      var vm = this; //vue中 的 this.$options 只带的就是用户传递的属性

      vm.$options = options; //初始化状态

      initState(vm); //如果传入了el 就需要挂载

      if (vm.$options.el) {
        vm.$mount(vm.$options.el);
      }
    };

    Vue.prototype.$mount = function (el) {
      var vm = this;
      el = document.querySelector(el);
      var options = vm.$options; //没有render函数就使用 模板

      if (!options.render) {
        var template = options.template;

        if (template && el) {
          template = el.outerHTML;
        }

        console.log(template); //拿到模板后 将模板转换为render函数

        var render = compileToFunction();
        vm.render = render;
      }
    };
  }

  function Vue(options) {
    this._init(options);
  }

  initMixin(Vue); //给vue增加初始化方法

  return Vue;

}));
