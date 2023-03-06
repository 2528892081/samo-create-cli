const root = document.querySelector("#root");

//实现热替换
if (module && module.hot) {
  module.hot.accept();
}

root.innerHTML = 'Hello World!';
