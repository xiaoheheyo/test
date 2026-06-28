const fs = require("fs");
const http = require("http");
const path = require("path");

const root = __dirname;
const mirrorRoot = path.join(root, "www.cqzk.com.cn");
const mirrorAssetRoot = path.join(root, "重庆招考信息网_files");
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
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".ttf": "font/ttf",
  ".woff": "font/woff",
  ".woff2": "font/woff2"
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

  if (pathname === "/apps/zyfz/login" || pathname === "/apps/zyfz/login/") {
    sendZyfzLoginPrompt(res, url.searchParams.get("redirect") || "/apps/zyfz/system/plans");
    return;
  }

  if (pathname === "/" || pathname === "/index.html") {
    filePath = path.join(mirrorRoot, "index.html");
  } else if (pathname === "/apps/zyfz/system/plans" || pathname === "/apps/zyfz/system/plans/") {
    filePath = path.join(root, "plans.html");
  }

  if (pathname.endsWith("/styles/site.css")) {
    filePath = path.join(root, "styles", "site.css");
  } else if (pathname.endsWith("/scripts/site.js")) {
    filePath = path.join(root, "scripts", "site.js");
  } else if (pathname.indexOf("/static/") === 0 || pathname.indexOf("/userfiles/") === 0) {
    filePath = resolveMirrorAsset(pathname) || filePath;
  }

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    const mirrored = resolveMirrorPath(pathname);
    if (mirrored) filePath = mirrored;
  }

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
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

function resolveMirrorPath(pathname) {
  const normalized = pathname.replace(/^\/+/, "");
  if (!normalized || normalized.includes("..")) return null;
  const candidate = path.join(mirrorRoot, normalized);
  if (fs.existsSync(candidate) && !fs.statSync(candidate).isDirectory()) return candidate;
  return resolveMirrorAsset(pathname);
}

function resolveMirrorAsset(pathname) {
  const normalized = pathname.replace(/^\/+/, "");
  if (!normalized || normalized.includes("..")) return null;

  const mirrorCandidate = path.join(mirrorRoot, normalized);
  if (fs.existsSync(mirrorCandidate) && !fs.statSync(mirrorCandidate).isDirectory()) return mirrorCandidate;

  const basename = path.basename(normalized);
  if (!basename) return null;
  const fallbackCandidate = path.join(mirrorAssetRoot, basename);
  if (fs.existsSync(fallbackCandidate) && !fs.statSync(fallbackCandidate).isDirectory()) return fallbackCandidate;

  return null;
}

function sendZyfzLoginPrompt(res, redirect) {
  const target = normalizeLocalRedirect(redirect);
  res.writeHead(200, {
    "Content-Type": "text/html; charset=utf-8",
    "Cache-Control": "no-store"
  });
  res.end(`<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>登录提示</title>
  <style>
    html,body{margin:0;width:100%;height:100%;font-family:"Microsoft YaHei",Arial,sans-serif;background:#f2f4fb;color:#1d2129}
    .page{min-height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(180deg,#f6f8ff 0%,#eef2fb 100%)}
    .dialog{width:420px;max-width:calc(100vw - 40px);background:#fff;border-radius:4px;box-shadow:0 18px 45px rgba(22,93,255,.12);overflow:hidden}
    .head{height:54px;display:flex;align-items:center;padding:0 22px;border-bottom:1px solid #eef1f6;font-size:18px;font-weight:700}
    .body{padding:28px 30px 24px;text-align:center}
    .body p{margin:0 0 24px;font-size:16px;line-height:1.8;color:#4e5969}
    .actions{display:flex;justify-content:center;gap:14px}
    button,a{box-sizing:border-box;width:118px;height:40px;border-radius:2px;font-size:15px;text-decoration:none;display:inline-flex;align-items:center;justify-content:center;cursor:pointer}
    .primary{border:0;background:#165dff;color:#fff}
    .ghost{border:1px solid #d9dce3;background:#fff;color:#4e5969}
  </style>
</head>
<body>
  <main class="page">
    <section class="dialog" role="dialog" aria-modal="true" aria-label="登录提示">
      <div class="head">温馨提示</div>
      <div class="body">
        <p>进入重庆市统一高考志愿填报辅助系统前，请先登录。</p>
        <div class="actions">
          <a class="ghost" href="/index.html">返回首页</a>
          <button class="primary" type="button" id="enter">确定</button>
        </div>
      </div>
    </section>
  </main>
  <script>
    document.getElementById("enter").addEventListener("click", function () {
      window.location.href = ${JSON.stringify(target)};
    });
  </script>
</body>
</html>`);
}

function normalizeLocalRedirect(value) {
  if (!value || typeof value !== "string") return "/apps/zyfz/system/plans";
  if (!value.startsWith("/") || value.startsWith("//") || value.includes("\\\\")) return "/apps/zyfz/system/plans";
  return value;
}

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
