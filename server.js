const fs = require("fs");
const http = require("http");
const path = require("path");

const root = __dirname;
const port = Number(process.env.PORT || 3456);
const zyfzSecret = "CwnXDUjZifq/DZIhIo1O3kHARUVbP/CnPZ2n6Do432j0s5gSAt9/7zl9GZ9rO1C5p1h2ieZpUJ+CH7XBthAXXCsCF4rMsSu6DQvXdzLNBXeYnr1g7Hpcf6XT5GF1GXf+aRgmjJ/wM9MIli3ih8iLgJUg8uf3ha3DhBVVg5qi71s=";
const types = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml"
};

http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${port}`);
  const pathname = decodeURIComponent(url.pathname);
  let filePath = path.join(root, pathname);

  if (pathname === "/api/zyfz/history/art-sports") {
    proxyZyfz(req, res, {
      method: "POST",
      upstreamPath: "/history/front/history/ystySearchMajorList",
      referer: "https://www.cqzk.com.cn/apps/zyfz/system/history/art&sports"
    });
    return;
  }

  if (pathname === "/api/zyfz/route/history-normal") {
    proxyZyfz(req, res, {
      method: "GET",
      upstreamPath: "/user/common/route/getByName?name=history_normal",
      referer: "https://www.cqzk.com.cn/apps/zyfz/system/history/normal"
    });
    return;
  }

  if (pathname === "/api/zyfz/dict/history-years") {
    proxyZyfz(req, res, {
      method: "GET",
      upstreamPath: "/user/common/dictList?key=" + encodeURIComponent("历史数据查询-年份"),
      referer: "https://www.cqzk.com.cn/apps/zyfz/system/history/normal"
    });
    return;
  }

  if (pathname === "/api/zyfz/history/normal/search") {
    proxyZyfz(req, res, {
      method: "POST",
      upstreamPath: "/history/front/history/ptwlSearchMajorList",
      referer: "https://www.cqzk.com.cn/apps/zyfz/system/history/normal"
    });
    return;
  }

  if (pathname === "/api/zyfz/history/normal/college") {
    proxyZyfz(req, res, {
      method: "POST",
      upstreamPath: "/search/front/findTableCollage",
      referer: "https://www.cqzk.com.cn/apps/zyfz/system/history/normal"
    });
    return;
  }

  if (pathname === "/api/zyfz/history/normal/last-three-years") {
    proxyZyfz(req, res, {
      method: "POST",
      upstreamPath: "/history/front/history/lastThreeYearsMajorData",
      referer: "https://www.cqzk.com.cn/apps/zyfz/system/history/normal"
    });
    return;
  }

  if (pathname === "/apps/zyfz/system/plans" || pathname === "/apps/zyfz/system/plans/") {
    filePath = path.join(root, "plans.html");
  }

  if (pathname.endsWith("/styles/site.css")) {
    filePath = path.join(root, "styles", "site.css");
  } else if (pathname.endsWith("/scripts/site.js")) {
    filePath = path.join(root, "scripts", "site.js");
  }

  if (pathname === "/" || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(root, "index.html");
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Internal Server Error");
      return;
    }

    res.writeHead(200, {
      "Content-Type": types[path.extname(filePath)] || "application/octet-stream"
    });
    res.end(data);
  });
}).listen(port, () => {
  console.log(`Serving clone on http://localhost:${port}`);
});

function proxyZyfz(req, res, options) {
  if (req.method !== options.method) {
    sendJson(res, 405, { success: false, msg: "Method Not Allowed" });
    return;
  }

  let body = "";
  req.on("data", chunk => {
    body += chunk;
    if (body.length > 1024 * 1024) req.destroy();
  });
  req.on("end", async () => {
    try {
      const init = {
        method: options.method,
        headers: {
          "Accept": "application/json, text/javascript, */*; q=0.01",
          "Content-Type": "application/json; charset=UTF-8",
          "Referer": options.referer,
          "Secret": zyfzSecret,
          "User-Agent": "Mozilla/5.0"
        }
      };
      if (options.method !== "GET") {
        init.body = JSON.stringify(JSON.parse(body || "{}"));
      }
      const upstream = await fetch("https://applet.cqzk.com.cn/prod" + options.upstreamPath, init);
      const text = await upstream.text();
      res.writeHead(upstream.ok ? 200 : upstream.status, {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store"
      });
      res.end(text);
    } catch (error) {
      sendJson(res, 502, { success: false, msg: "原站数据接口暂时不可用" });
    }
  });
}

function sendJson(res, status, data) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  res.end(JSON.stringify(data));
}
