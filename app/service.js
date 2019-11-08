// server.js 

const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');

const server = http.createServer(function(req, res) {
	// console.log("request: " + req.url);
    const urlObj = url.parse(req.url);
    const urlPathname = urlObj.pathname;
	console.log(urlPathname)
	if (urlPathname == '/fucktan8.html') {
	    // 读取静态文件
	    const filePathname = path.join(__dirname, "./", urlPathname);
	    readStaticFile(res, filePathname);
	} else {
		// 转发请求
		http.get("http://www.tan8.com" + urlPathname + "?" + urlObj.query, sres => {
			let data = '';
			sres.on('data', chunk => data += chunk);
			sres.on('end', () => {
				res.writeHead(200, { "Content-Type": "text/html" });
	            res.write(data);
	            res.end();
			})
		})
	}

});

function readStaticFile(res, filePathname) {
    fs.readFile(filePathname, (err, data) => {
        if (err) {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.write("404 - NOT FOUND");
        } else {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(data);
        }
        res.end();
    });
    
}

const port = 8090;
server.listen(port, function() {
    console.log("服务器运行中.");
    console.log("正在监听" + port + "端口:");
})
