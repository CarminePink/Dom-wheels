const div = dom.create("<div>你好</div>");
//console.log(div);

dom.after(test, div);

const div2 = dom.create(`<div id="dvi2"></div>`);

dom.wrap(test, div2);
//console.log(div2);

const nodes = dom.empty(empty);
//console.log(nodes);

dom.attr(test, "title", "hi,i am frank");
const title = dom.attr(test, "title");
console.log(`title:${title}`);

dom.text(test, "这是新的内容");
const text = dom.text(test);
console.log(`text:${text}`);

dom.html(test1, "<strong>carmine</strong>");

dom.style(test, { border: "1px solid red", color: "blue" });
console.log(dom.style(test, "border"));
dom.style(test, "border", "1px solid black");

dom.class.add(test, "red");
dom.class.remove(test, "red");
console.log(dom.class.has(test, "blue"));

const fn = () => {
  console.log("点击了");
};
dom.on(test, "click", fn);
dom.off(test, "click", fn);

const testDiv = dom.find("#test")[0];
console.log(testDiv);
const testDiv2 = dom.find("#test2")[0];
console.log(dom.find(".red", testDiv2)[0]);
const testDiv3 = dom.find("#test3>.red")[0];
console.log(testDiv3);

console.log(dom.siblings(dom.find("#s2")[0]));

console.log(dom.next(dom.find("#s2")[0]));

const t = dom.find("#travel")[0];
dom.each(dom.children(t), n => dom.style(n, "color", "red"));

console.log(dom.index(dom.find("#s2")[0]));
