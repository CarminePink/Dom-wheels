window.dom = {};

dom.create = function(string) {
  const container = document.createElement("template");
  container.innerHTML = string.trim();
  return container.content.firstChild;
};
dom.after = function(node, node2) {
  //新增弟弟，把新增的节点node2放在node的下一个节点的前面
  node.parentNode.insertBefore(node2, node.nextSibling);
};
dom.before = function(node, node2) {
  //新增哥哥
  node.parentNode.insertBefore(node2, node);
};
dom.append = function(parent, node) {
  //新增儿子
  parent.appendChild(node);
};
dom.wrap = function(node, parent) {
  //新增爸爸
  dom.before(node, parent);
  dom.append(parent, node);
};
dom.remove = function(node) {
  //删除节点
  node.parentNode.removeChild(node);
  return node; //可能还需要被删节点的引用，所以返回被删节点
};
dom.empty = function(node) {
  //每次删除一个节点，数组的长度都会实时变化的
  const children = node.childNodes;
  const array = [];
  let x = 0;
  while (children[x]) {
    //console.log(children[x]);
    array.push(children[x]);
    dom.remove(children[x]);
  }
  return array; //返回被删的所有子节点，原因同上
};
dom.attr = function(node, name, value) {
  //读\写属性  用到了重载
  if (arguments.length === 3) {
    node.setAttribute(name, value);
  } else if (arguments.length === 2) {
    return node.getAttribute(name);
  }
};
dom.text = function(node, string) {
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
dom.html = function(node, string) {
  //读写html内容
  if (arguments.length === 2) {
    node.innerHTML = string;
  } else if (arguments.length === 1) {
    return node.innerHTML;
  }
};
dom.style = function(node, name, value) {
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
      const object = name;
      for (let key in object) {
        node.style[key] = object[key];
      }
    }
  }
};

dom.class = {
  //class的添加、删除、判断是否存在
  add(node, className) {
    node.classList.add(className);
  },
  remove(node, className) {
    node.classList.remove(className);
  },
  has(node, className) {
    return node.classList.contains(className);
  }
};
dom.on = function(node, eventName, fn) {
  //添加事件监听
  node.addEventListener(eventName, fn);
};
dom.off = function(node, eventName, fn) {
  //删除事件监听
  node.removeEventListener(eventName, fn);
};
dom.find = function(selector, scope) {
  //获取标签 或 标签们
  return (scope || document).querySelectorAll(selector);
};
dom.parent = function(node) {
  //获取父元素
  return node.parentNode;
};
dom.children = function(node) {
  //获取子元素
  return node.children;
};
dom.siblings = function(node) {
  //获取兄弟元素(除了自己)
  return Array.from(node.parentNode.children).filter(item => item !== node);
};
dom.next = function(node) {
  //获取弟弟，不能直接返回，因为下一个节点可能是文本节点
  let x = node.nextSibling;
  while (x && x.nodeType === 3) {
    x = x.nextSibling;
  }
  return x;
};
dom.previous = function(node) {
  //获取哥哥
  let x = node.previousSibling;
  while (x && x.nodeType === 3) {
    x = node.previousSibling;
  }
  return x;
};
dom.each = function(nodeList, fn) {
  //遍历所有节点
  for (let i = 0; i < nodeList.length; i++) {
    fn(nodeList[i]);
  }
};
dom.index = function(node) {
  //查看该节点排行老几
  const array = Array.from(dom.children(node.parentNode));
  let x = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i] === node) {
      x = i;
    }
  }
  return x + 1;
};

dom.find = function(selector, scope) {
  return (scope || document).querySelectorAll(selector);
};
