function getData(lock, page, size) {
  if (lock) return;
  else {
    lock = true;
    let data;
    ajax(
      'get',
      // "./src/assets/data.json",
      './src/assets/data.json',
      resp => {
        data = JSON.parse(resp);
      },
      `page=${page}&size=${size}`
    );
    return data;
  }
}
function getMinCol(columns) {
  let minH = columns[0].offsetHeight,
    minC = columns[0];
  columns.forEach(c => {
    const h = c.offsetHeight;
    if (h < minH) {
      minH = h;
      minC = c;
    }
  });
  return minC;
}
function renderDom(data, columns) {
  const imgW = columns[0].offsetWidth;
  data.forEach(item => {
    const div = document.createElement('div');
    div.className = 'waterfall item';
    // // 1#
    // const a = document.createElement("a");
    // div.append(a);
    // const img = new Image();
    // img.src = item.img;
    // a.append(img);
    // const p = document.createElement("p");
    // p.innerHTML = item.desc;
    // div.append(p);
    // // 解决异步加载导致获取最低列错误
    // img.onload = () => {
    //   const minCol = getMinCol(columns);
    //   minCol.append(div);
    // };

    // 2#
    // item.width / item.height = (img.width) / img.height**
    const h = (item.height * imgW) / item.width;
    const str = `<a href="#"><img height="${h}" src="${item.img}" alt=""/></a><p>${item.desc}</p>`;
    div.innerHTML = str;
    const minCol = getMinCol(columns);
    minCol.append(div);
  });
}

let page = 1,
  size = 5;
const columns = document.querySelectorAll('.waterfall.column');
let lock = false;
renderDom(getData(lock, page, size), columns);

let minCol = getMinCol(columns);
window.onscroll = () => {
  const rect = minCol.getBoundingClientRect();
  if (-rect.top + window.innerHeight >= rect.height) {
    renderDom(getData(lock, page, size), columns);
    minCol = getMinCol(columns);
    page = (page % Math.floor(10 / size)) + 1;
  }
};
