const http = require("http");
const url = require("url");
http
  .createServer((request, response) => {
    const path = url.parse(request.url); // 请求的url，对象
    console.log(path);
    const pathName = path.pathname; // 请求路径名，字符串
    const query = url.parse(request.url, true).query; // 请求数据，对象
    if (pathName === "/data") {
      console.log(query);
      const data = require("./data.json"); // 请求依赖：json数据
      const page = query.page;
      const size = query.size;
      const resultData = data.filter(
        (value, key) => key >= (page - 1) * size && key < page * size
      );
      response.writeHead(200, {
        "Access-Control-Allow-Origin": "*", // 允许跨域：所有域
        "Content-Type": "application/json" // 数据内容类型
      });
      response.write(JSON.stringify(resultData)); // 写入数据
      response.end(); // 结束响应
    }
  })
  .listen(3000);
