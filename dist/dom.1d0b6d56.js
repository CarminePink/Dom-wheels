// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"dom.js":[function(require,module,exports) {
window.dom = {};

dom.create = function (string) {
  var container = document.createElement("template");
  container.innerHTML = string.trim();
  return container.content.firstChild;
};

dom.after = function (node, node2) {
  //新增弟弟，把新增的节点node2放在node的下一个节点的前面
  node.parentNode.insertBefore(node2, node.nextSibling);
};

dom.before = function (node, node2) {
  //新增哥哥
  node.parentNode.insertBefore(node2, node);
};

dom.append = function (parent, node) {
  //新增儿子
  parent.appendChild(node);
};

dom.wrap = function (node, parent) {
  //新增爸爸
  dom.before(node, parent);
  dom.append(parent, node);
};

dom.remove = function (node) {
  //删除节点
  node.parentNode.removeChild(node);
  return node; //可能还需要被删节点的引用，所以返回被删节点
};

dom.empty = function (node) {
  //每次删除一个节点，数组的长度都会实时变化的
  var children = node.childNodes;
  var array = [];
  var x = 0;

  while (children[x]) {
    //console.log(children[x]);
    array.push(children[x]);
    dom.remove(children[x]);
  }

  return array; //返回被删的所有子节点，原因同上
};

dom.attr = function (node, name, value) {
  //读\写属性  用到了重载
  if (arguments.length === 3) {
    node.setAttribute(name, value);
  } else if (arguments.length === 2) {
    return node.getAttribute(name);
  }
};

dom.text = function (node, string) {
  //用于读写文本内容，这里用到了适配和重载
  if (arguments.length === 2) {
    if ("innerText" in node) {
      node.innerText = string;
    } else {
      node.textContent = string;
    }
  } else if (arguments.length === 1) {
    if ("innerText" in node) {
      return node.innerText;
    } else {
      return node.textContent;
    }
  }
};

dom.html = function (node, string) {
  //读写html内容
  if (arguments.length === 2) {
    node.innerHTML = string;
  } else if (arguments.length === 1) {
    return node.innerHTML;
  }
};

dom.style = function (node, name, value) {
  //用于修改style,三个参数时是写属性，两个参数时可能是读，也可能是写
  if (arguments.length === 3) {
    //dom.style(div,'color','red')
    node.style[name] = value;
  } else if (arguments.length === 2) {
    if (typeof name === "string") {
      //dom.style(div,'border')
      return node.style[name];
    } else if (name instanceof Object) {
      //dom.style(div,{border:'1px solid red'})
      var object = name;

      for (var key in object) {
        node.style[key] = object[key];
      }
    }
  }
};

dom.class = {
  //class的添加、删除、判断是否存在
  add: function add(node, className) {
    node.classList.add(className);
  },
  remove: function remove(node, className) {
    node.classList.remove(className);
  },
  has: function has(node, className) {
    return node.classList.contains(className);
  }
};

dom.on = function (node, eventName, fn) {
  //添加事件监听
  node.addEventListener(eventName, fn);
};

dom.off = function (node, eventName, fn) {
  //删除事件监听
  node.removeEventListener(eventName, fn);
};

dom.find = function (selector, scope) {
  //获取标签 或 标签们
  return (scope || document).querySelectorAll(selector);
};

dom.parent = function (node) {
  //获取父元素
  return node.parentNode;
};

dom.children = function (node) {
  //获取子元素
  return node.children;
};

dom.siblings = function (node) {
  //获取兄弟元素(除了自己)
  return Array.from(node.parentNode.children).filter(function (item) {
    return item !== node;
  });
};

dom.next = function (node) {
  //获取弟弟，不能直接返回，因为下一个节点可能是文本节点
  var x = node.nextSibling;

  while (x && x.nodeType === 3) {
    x = x.nextSibling;
  }

  return x;
};

dom.previous = function (node) {
  //获取哥哥
  var x = node.previousSibling;

  while (x && x.nodeType === 3) {
    x = node.previousSibling;
  }

  return x;
};

dom.each = function (nodeList, fn) {
  //遍历所有节点
  for (var i = 0; i < nodeList.length; i++) {
    fn(nodeList[i]);
  }
};

dom.index = function (node) {
  //查看该节点排行老几
  var array = Array.from(dom.children(node.parentNode));
  var x = 0;

  for (var i = 0; i < array.length; i++) {
    if (array[i] === node) {
      x = i;
    }
  }

  return x + 1;
};

dom.find = function (selector, scope) {
  return (scope || document).querySelectorAll(selector);
};
},{}],"C:/Users/76968/AppData/Local/Yarn/Data/global/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "58134" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/76968/AppData/Local/Yarn/Data/global/node_modules/parcel/src/builtins/hmr-runtime.js","dom.js"], null)
//# sourceMappingURL=/dom.1d0b6d56.js.map