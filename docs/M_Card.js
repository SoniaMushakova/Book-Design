/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 69:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(540);
/* harmony import */ var _data_cardsData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(976);
// 1) Импорты (если нужны)
// import './A_CardText.css' //нет такого файла тк я стиль храню в atoms.css


// 2) Данные / массивы (импорт из внешнего файла)


// 3) Компонент = функция
function A_CardText(_ref) {
  var _ref$variant = _ref.variant,
    variant = _ref$variant === void 0 ? 0 : _ref$variant;
  // 4) Берём данные из внешнего массива
  var item = cards[variant] || cards[0];
  // number может храниться в данных, иначе вычислим
  var number = item.number || String(variant + 1).padStart(2, '0');
  return /*#__PURE__*/React.createElement("div", {
    className: "A_CardText"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "card-heading"
  }, /*#__PURE__*/React.createElement("span", {
    className: "card-heading-number"
  }, number), item.title), /*#__PURE__*/React.createElement("p", {
    className: "card-body"
  }, item.text));
}

// 6) Экспорт
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ((/* unused pure expression or super */ null && (A_CardText)));

/***/ }),

/***/ 540:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



if (true) {
  /* unused reexport */ __webpack_require__(869);
} else // removed by dead control flow
{}


/***/ }),

/***/ 869:
/***/ ((__unused_webpack_module, exports) => {

var __webpack_unused_export__;
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"),
  REACT_PORTAL_TYPE = Symbol.for("react.portal"),
  REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"),
  REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"),
  REACT_PROFILER_TYPE = Symbol.for("react.profiler"),
  REACT_CONSUMER_TYPE = Symbol.for("react.consumer"),
  REACT_CONTEXT_TYPE = Symbol.for("react.context"),
  REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"),
  REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"),
  REACT_MEMO_TYPE = Symbol.for("react.memo"),
  REACT_LAZY_TYPE = Symbol.for("react.lazy"),
  MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
function getIteratorFn(maybeIterable) {
  if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
  maybeIterable =
    (MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL]) ||
    maybeIterable["@@iterator"];
  return "function" === typeof maybeIterable ? maybeIterable : null;
}
var ReactNoopUpdateQueue = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {}
  },
  assign = Object.assign,
  emptyObject = {};
function Component(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  this.updater = updater || ReactNoopUpdateQueue;
}
Component.prototype.isReactComponent = {};
Component.prototype.setState = function (partialState, callback) {
  if (
    "object" !== typeof partialState &&
    "function" !== typeof partialState &&
    null != partialState
  )
    throw Error(
      "takes an object of state variables to update or a function which returns an object of state variables."
    );
  this.updater.enqueueSetState(this, partialState, callback, "setState");
};
Component.prototype.forceUpdate = function (callback) {
  this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
};
function ComponentDummy() {}
ComponentDummy.prototype = Component.prototype;
function PureComponent(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  this.updater = updater || ReactNoopUpdateQueue;
}
var pureComponentPrototype = (PureComponent.prototype = new ComponentDummy());
pureComponentPrototype.constructor = PureComponent;
assign(pureComponentPrototype, Component.prototype);
pureComponentPrototype.isPureReactComponent = !0;
var isArrayImpl = Array.isArray,
  ReactSharedInternals = { H: null, A: null, T: null, S: null, V: null },
  hasOwnProperty = Object.prototype.hasOwnProperty;
function ReactElement(type, key, self, source, owner, props) {
  self = props.ref;
  return {
    $$typeof: REACT_ELEMENT_TYPE,
    type: type,
    key: key,
    ref: void 0 !== self ? self : null,
    props: props
  };
}
function cloneAndReplaceKey(oldElement, newKey) {
  return ReactElement(
    oldElement.type,
    newKey,
    void 0,
    void 0,
    void 0,
    oldElement.props
  );
}
function isValidElement(object) {
  return (
    "object" === typeof object &&
    null !== object &&
    object.$$typeof === REACT_ELEMENT_TYPE
  );
}
function escape(key) {
  var escaperLookup = { "=": "=0", ":": "=2" };
  return (
    "$" +
    key.replace(/[=:]/g, function (match) {
      return escaperLookup[match];
    })
  );
}
var userProvidedKeyEscapeRegex = /\/+/g;
function getElementKey(element, index) {
  return "object" === typeof element && null !== element && null != element.key
    ? escape("" + element.key)
    : index.toString(36);
}
function noop$1() {}
function resolveThenable(thenable) {
  switch (thenable.status) {
    case "fulfilled":
      return thenable.value;
    case "rejected":
      throw thenable.reason;
    default:
      switch (
        ("string" === typeof thenable.status
          ? thenable.then(noop$1, noop$1)
          : ((thenable.status = "pending"),
            thenable.then(
              function (fulfilledValue) {
                "pending" === thenable.status &&
                  ((thenable.status = "fulfilled"),
                  (thenable.value = fulfilledValue));
              },
              function (error) {
                "pending" === thenable.status &&
                  ((thenable.status = "rejected"), (thenable.reason = error));
              }
            )),
        thenable.status)
      ) {
        case "fulfilled":
          return thenable.value;
        case "rejected":
          throw thenable.reason;
      }
  }
  throw thenable;
}
function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
  var type = typeof children;
  if ("undefined" === type || "boolean" === type) children = null;
  var invokeCallback = !1;
  if (null === children) invokeCallback = !0;
  else
    switch (type) {
      case "bigint":
      case "string":
      case "number":
        invokeCallback = !0;
        break;
      case "object":
        switch (children.$$typeof) {
          case REACT_ELEMENT_TYPE:
          case REACT_PORTAL_TYPE:
            invokeCallback = !0;
            break;
          case REACT_LAZY_TYPE:
            return (
              (invokeCallback = children._init),
              mapIntoArray(
                invokeCallback(children._payload),
                array,
                escapedPrefix,
                nameSoFar,
                callback
              )
            );
        }
    }
  if (invokeCallback)
    return (
      (callback = callback(children)),
      (invokeCallback =
        "" === nameSoFar ? "." + getElementKey(children, 0) : nameSoFar),
      isArrayImpl(callback)
        ? ((escapedPrefix = ""),
          null != invokeCallback &&
            (escapedPrefix =
              invokeCallback.replace(userProvidedKeyEscapeRegex, "$&/") + "/"),
          mapIntoArray(callback, array, escapedPrefix, "", function (c) {
            return c;
          }))
        : null != callback &&
          (isValidElement(callback) &&
            (callback = cloneAndReplaceKey(
              callback,
              escapedPrefix +
                (null == callback.key ||
                (children && children.key === callback.key)
                  ? ""
                  : ("" + callback.key).replace(
                      userProvidedKeyEscapeRegex,
                      "$&/"
                    ) + "/") +
                invokeCallback
            )),
          array.push(callback)),
      1
    );
  invokeCallback = 0;
  var nextNamePrefix = "" === nameSoFar ? "." : nameSoFar + ":";
  if (isArrayImpl(children))
    for (var i = 0; i < children.length; i++)
      (nameSoFar = children[i]),
        (type = nextNamePrefix + getElementKey(nameSoFar, i)),
        (invokeCallback += mapIntoArray(
          nameSoFar,
          array,
          escapedPrefix,
          type,
          callback
        ));
  else if (((i = getIteratorFn(children)), "function" === typeof i))
    for (
      children = i.call(children), i = 0;
      !(nameSoFar = children.next()).done;

    )
      (nameSoFar = nameSoFar.value),
        (type = nextNamePrefix + getElementKey(nameSoFar, i++)),
        (invokeCallback += mapIntoArray(
          nameSoFar,
          array,
          escapedPrefix,
          type,
          callback
        ));
  else if ("object" === type) {
    if ("function" === typeof children.then)
      return mapIntoArray(
        resolveThenable(children),
        array,
        escapedPrefix,
        nameSoFar,
        callback
      );
    array = String(children);
    throw Error(
      "Objects are not valid as a React child (found: " +
        ("[object Object]" === array
          ? "object with keys {" + Object.keys(children).join(", ") + "}"
          : array) +
        "). If you meant to render a collection of children, use an array instead."
    );
  }
  return invokeCallback;
}
function mapChildren(children, func, context) {
  if (null == children) return children;
  var result = [],
    count = 0;
  mapIntoArray(children, result, "", "", function (child) {
    return func.call(context, child, count++);
  });
  return result;
}
function lazyInitializer(payload) {
  if (-1 === payload._status) {
    var ctor = payload._result;
    ctor = ctor();
    ctor.then(
      function (moduleObject) {
        if (0 === payload._status || -1 === payload._status)
          (payload._status = 1), (payload._result = moduleObject);
      },
      function (error) {
        if (0 === payload._status || -1 === payload._status)
          (payload._status = 2), (payload._result = error);
      }
    );
    -1 === payload._status && ((payload._status = 0), (payload._result = ctor));
  }
  if (1 === payload._status) return payload._result.default;
  throw payload._result;
}
var reportGlobalError =
  "function" === typeof reportError
    ? reportError
    : function (error) {
        if (
          "object" === typeof window &&
          "function" === typeof window.ErrorEvent
        ) {
          var event = new window.ErrorEvent("error", {
            bubbles: !0,
            cancelable: !0,
            message:
              "object" === typeof error &&
              null !== error &&
              "string" === typeof error.message
                ? String(error.message)
                : String(error),
            error: error
          });
          if (!window.dispatchEvent(event)) return;
        } else if (
          "object" === typeof process &&
          "function" === typeof process.emit
        ) {
          process.emit("uncaughtException", error);
          return;
        }
        console.error(error);
      };
function noop() {}
__webpack_unused_export__ = {
  map: mapChildren,
  forEach: function (children, forEachFunc, forEachContext) {
    mapChildren(
      children,
      function () {
        forEachFunc.apply(this, arguments);
      },
      forEachContext
    );
  },
  count: function (children) {
    var n = 0;
    mapChildren(children, function () {
      n++;
    });
    return n;
  },
  toArray: function (children) {
    return (
      mapChildren(children, function (child) {
        return child;
      }) || []
    );
  },
  only: function (children) {
    if (!isValidElement(children))
      throw Error(
        "React.Children.only expected to receive a single React element child."
      );
    return children;
  }
};
__webpack_unused_export__ = Component;
__webpack_unused_export__ = REACT_FRAGMENT_TYPE;
__webpack_unused_export__ = REACT_PROFILER_TYPE;
__webpack_unused_export__ = PureComponent;
__webpack_unused_export__ = REACT_STRICT_MODE_TYPE;
__webpack_unused_export__ = REACT_SUSPENSE_TYPE;
__webpack_unused_export__ =
  ReactSharedInternals;
__webpack_unused_export__ = {
  __proto__: null,
  c: function (size) {
    return ReactSharedInternals.H.useMemoCache(size);
  }
};
__webpack_unused_export__ = function (fn) {
  return function () {
    return fn.apply(null, arguments);
  };
};
__webpack_unused_export__ = function (element, config, children) {
  if (null === element || void 0 === element)
    throw Error(
      "The argument must be a React element, but you passed " + element + "."
    );
  var props = assign({}, element.props),
    key = element.key,
    owner = void 0;
  if (null != config)
    for (propName in (void 0 !== config.ref && (owner = void 0),
    void 0 !== config.key && (key = "" + config.key),
    config))
      !hasOwnProperty.call(config, propName) ||
        "key" === propName ||
        "__self" === propName ||
        "__source" === propName ||
        ("ref" === propName && void 0 === config.ref) ||
        (props[propName] = config[propName]);
  var propName = arguments.length - 2;
  if (1 === propName) props.children = children;
  else if (1 < propName) {
    for (var childArray = Array(propName), i = 0; i < propName; i++)
      childArray[i] = arguments[i + 2];
    props.children = childArray;
  }
  return ReactElement(element.type, key, void 0, void 0, owner, props);
};
__webpack_unused_export__ = function (defaultValue) {
  defaultValue = {
    $$typeof: REACT_CONTEXT_TYPE,
    _currentValue: defaultValue,
    _currentValue2: defaultValue,
    _threadCount: 0,
    Provider: null,
    Consumer: null
  };
  defaultValue.Provider = defaultValue;
  defaultValue.Consumer = {
    $$typeof: REACT_CONSUMER_TYPE,
    _context: defaultValue
  };
  return defaultValue;
};
__webpack_unused_export__ = function (type, config, children) {
  var propName,
    props = {},
    key = null;
  if (null != config)
    for (propName in (void 0 !== config.key && (key = "" + config.key), config))
      hasOwnProperty.call(config, propName) &&
        "key" !== propName &&
        "__self" !== propName &&
        "__source" !== propName &&
        (props[propName] = config[propName]);
  var childrenLength = arguments.length - 2;
  if (1 === childrenLength) props.children = children;
  else if (1 < childrenLength) {
    for (var childArray = Array(childrenLength), i = 0; i < childrenLength; i++)
      childArray[i] = arguments[i + 2];
    props.children = childArray;
  }
  if (type && type.defaultProps)
    for (propName in ((childrenLength = type.defaultProps), childrenLength))
      void 0 === props[propName] &&
        (props[propName] = childrenLength[propName]);
  return ReactElement(type, key, void 0, void 0, null, props);
};
__webpack_unused_export__ = function () {
  return { current: null };
};
__webpack_unused_export__ = function (render) {
  return { $$typeof: REACT_FORWARD_REF_TYPE, render: render };
};
__webpack_unused_export__ = isValidElement;
__webpack_unused_export__ = function (ctor) {
  return {
    $$typeof: REACT_LAZY_TYPE,
    _payload: { _status: -1, _result: ctor },
    _init: lazyInitializer
  };
};
__webpack_unused_export__ = function (type, compare) {
  return {
    $$typeof: REACT_MEMO_TYPE,
    type: type,
    compare: void 0 === compare ? null : compare
  };
};
__webpack_unused_export__ = function (scope) {
  var prevTransition = ReactSharedInternals.T,
    currentTransition = {};
  ReactSharedInternals.T = currentTransition;
  try {
    var returnValue = scope(),
      onStartTransitionFinish = ReactSharedInternals.S;
    null !== onStartTransitionFinish &&
      onStartTransitionFinish(currentTransition, returnValue);
    "object" === typeof returnValue &&
      null !== returnValue &&
      "function" === typeof returnValue.then &&
      returnValue.then(noop, reportGlobalError);
  } catch (error) {
    reportGlobalError(error);
  } finally {
    ReactSharedInternals.T = prevTransition;
  }
};
__webpack_unused_export__ = function () {
  return ReactSharedInternals.H.useCacheRefresh();
};
__webpack_unused_export__ = function (usable) {
  return ReactSharedInternals.H.use(usable);
};
__webpack_unused_export__ = function (action, initialState, permalink) {
  return ReactSharedInternals.H.useActionState(action, initialState, permalink);
};
__webpack_unused_export__ = function (callback, deps) {
  return ReactSharedInternals.H.useCallback(callback, deps);
};
__webpack_unused_export__ = function (Context) {
  return ReactSharedInternals.H.useContext(Context);
};
__webpack_unused_export__ = function () {};
__webpack_unused_export__ = function (value, initialValue) {
  return ReactSharedInternals.H.useDeferredValue(value, initialValue);
};
__webpack_unused_export__ = function (create, createDeps, update) {
  var dispatcher = ReactSharedInternals.H;
  if ("function" === typeof update)
    throw Error(
      "useEffect CRUD overload is not enabled in this build of React."
    );
  return dispatcher.useEffect(create, createDeps);
};
__webpack_unused_export__ = function () {
  return ReactSharedInternals.H.useId();
};
__webpack_unused_export__ = function (ref, create, deps) {
  return ReactSharedInternals.H.useImperativeHandle(ref, create, deps);
};
__webpack_unused_export__ = function (create, deps) {
  return ReactSharedInternals.H.useInsertionEffect(create, deps);
};
__webpack_unused_export__ = function (create, deps) {
  return ReactSharedInternals.H.useLayoutEffect(create, deps);
};
__webpack_unused_export__ = function (create, deps) {
  return ReactSharedInternals.H.useMemo(create, deps);
};
__webpack_unused_export__ = function (passthrough, reducer) {
  return ReactSharedInternals.H.useOptimistic(passthrough, reducer);
};
__webpack_unused_export__ = function (reducer, initialArg, init) {
  return ReactSharedInternals.H.useReducer(reducer, initialArg, init);
};
__webpack_unused_export__ = function (initialValue) {
  return ReactSharedInternals.H.useRef(initialValue);
};
__webpack_unused_export__ = function (initialState) {
  return ReactSharedInternals.H.useState(initialState);
};
__webpack_unused_export__ = function (
  subscribe,
  getSnapshot,
  getServerSnapshot
) {
  return ReactSharedInternals.H.useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );
};
__webpack_unused_export__ = function () {
  return ReactSharedInternals.H.useTransition();
};
__webpack_unused_export__ = "19.1.1";


/***/ }),

/***/ 976:
/***/ (() => {

var cards = [{
  id: 1,
  image: 'images/Card_Cover_1.svg',
  title: 'Введение',
  text: 'Как будет построено твое обучение',
  number: '01 ',
  href: 'pages/Main.html#card-1'
}, {
  id: 2,
  image: 'images/Card_Cover_2.svg',
  title: 'Ориентиры',
  text: 'Ты узнаешь о двух подходах к дизайну книг и получишь сводку правил по типографике и верстке',
  number: '02 ',
  href: 'pages/Main.html#card-2'
}, {
  id: 3,
  image: 'images/Card_Cover_3.svg',
  title: 'План работы',
  text: 'Разберем реальный кейс и познакомимся с одним из способов эффективно выстроить работу',
  number: '03 ',
  href: 'pages/Main.html#card-3'
}, {
  id: 4,
  image: 'images/Card_Cover_4.svg',
  title: 'Анатомия книги',
  text: 'Узнаем, как книга печатается и собирается, и как это влияет на наш дизайн',
  number: '04 ',
  href: 'pages/Main.html#card-4'
}, {
  id: 5,
  image: 'images/Card_Cover_5.svg',
  title: 'Разделы книги',
  text: 'Разберем все типичные развороты в книгах и определимся, какие из них нужны именно тебе',
  number: '05 ',
  href: 'pages/Main.html#card-5'
}, {
  id: 6,
  image: 'images/Card_Cover_6.svg',
  title: 'Элементы разворота',
  text: 'Как много разных блоков текста обычно используется в одной книге, какие кроме них есть объекты на развороте – с разбором типичного оформления каждого',
  number: '06 ',
  href: 'pages/Main.html#card-6'
}, {
  id: 7,
  image: 'images/Card_Cover_7.svg',
  title: 'Композиция',
  text: 'Советы по сильной композиции, способы выстроить иерархию, а также немного про все виды сеток',
  number: '07 ',
  href: 'pages/Main.html#card-7'
}, {
  id: 8,
  image: 'images/Card_Cover_8.svg',
  title: 'Шрифт',
  text: 'Объемная глава, где мы затронем как теорию (разберемся с терминологией и классификацией), так и практику: научимся выбирать шрифты и сочетать их',
  number: '08 ',
  href: 'pages/Main.html#card-8'
}, {
  id: 9,
  image: 'images/Card_Cover_none.svg',
  title: 'Анализ задачи',
  text: 'Шаг, который позволяет ускорить процесс набросков и быстрее придумать макет',
  number: '09 ',
  href: 'pages/Main.html#card-9'
}, {
  id: 10,
  image: 'images/Card_Cover_none.svg',
  title: 'Формат',
  text: 'Узнаем, от чего можно отталкиваться в выборе формата книги',
  number: '10 ',
  href: 'pages/Main.html#card-10'
}, {
  id: 11,
  image: 'images/Card_Cover_none.svg',
  title: 'Поля',
  text: 'Выберем поля для макета и разберем, от чего они зависят',
  number: '11 ',
  href: 'pages/Main.html#card-11'
}, {
  id: 12,
  image: 'images/Card_Cover_none.svg',
  title: 'Основной текст',
  text: 'Определимся со шрифтом и дизайном основного текстового блока',
  number: '12 ',
  href: 'pages/Main.html#card-12'
}, {
  id: 13,
  image: 'images/Card_Cover_none.svg',
  title: 'Колонэлементы',
  text: 'Оформим базовыеэлементы навигации – номер страницы и колонтитул',
  number: '13 ',
  href: 'pages/Main.html#card-13'
}, {
  id: 14,
  image: 'images/Card_Cover_none.svg',
  title: 'Картинки',
  text: 'Узнаем, от чего зависит размер картинки, как ее можно расположить относительно текста',
  number: '14 ',
  href: 'pages/Main.html#card-14'
}, {
  id: 15,
  image: 'images/Card_Cover_none.svg',
  title: 'Рубрикация',
  text: 'Выберем оформление заголовков для текста',
  number: '15 ',
  href: 'pages/Main.html#card-15'
}, {
  id: 16,
  image: 'images/Card_Cover_none.svg',
  title: 'Верстка',
  text: 'В этой главе ты познакомишься с эффективным порядком работы, ускоришь работу при помощи инструментов InDesign',
  number: '16 ',
  href: 'pages/Main.html#card-16'
}, {
  id: 17,
  image: 'images/Card_Cover_none.svg',
  title: 'Печать',
  text: 'Чек-лист ошибок, которые нужно проверить перед печатью. Узнаем лайфхаки, как ускорить препресс',
  number: '17 ',
  href: 'pages/Main.html#card-17'
}];
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ((/* unused pure expression or super */ null && (cards)));

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/* unused harmony export default */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(540);
/* harmony import */ var _A_CardText_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(69);
/* harmony import */ var _data_cardsData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(976);



function M_Card(_ref) {
  var _ref$variant = _ref.variant,
    variant = _ref$variant === void 0 ? 0 : _ref$variant;
  var item = cards[variant] || cards[0];
  return /*#__PURE__*/React.createElement("a", {
    className: "M_Card",
    href: item.href,
    "aria-label": item.title
  }, /*#__PURE__*/React.createElement("img", {
    className: "A_CardImage",
    src: item.image,
    alt: item.title,
    loading: "lazy"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(A_CardText, {
    variant: variant
  })));
}
/******/ })()
;