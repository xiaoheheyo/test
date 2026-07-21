const fs = require("fs");
const http = require("http");
const path = require("path");
const crypto = require("crypto");

const root = __dirname;
const mirrorRoot = path.join(root, "www.cqzk.com.cn");
const mirrorAssetRoot = path.join(root, "重庆招考信息网_files");
const scoreShell = path.join(root, "score.html");
const port = Number(process.env.PORT || 3456);
const scoreAccountHashes = new Set([
  "172e122b1f2ee8997019a36e89ff655127d02f7ebe788be82633b55f2ab4419e",
  "1bc2bbb5f314453d8c41e2c724f3f0df7fd8a48f38986791d03f43700165e193"
]);
const scorePasswordHash = "65b61073ccd2ab7b938564d495cd963587c7cb26a05725209e7d2c72f8d562a7";
const scoreSessions = new Set();
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

  if (pathname === "/api/score/login") {
    authenticateScore(req, res, false);
    return;
  }

  if (pathname === "/score/login") {
    authenticateScore(req, res, true);
    return;
  }

  if (pathname.indexOf("/user/") === 0) {
    const snapshot = resolveUserSnapshot(pathname);
    if (!snapshot) {
      sendJson(res, 404, { success: false, msg: "Page Not Found" });
      return;
    }
    sendUserSnapshot(req, res, snapshot);
    return;
  }

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
  } else if (isScoreRoute(pathname)) {
    filePath = scoreShell;
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

function isScoreRoute(pathname) {
  return pathname.indexOf("/score/") === 0;
}

function resolveUserSnapshot(pathname) {
  const normalized = pathname.replace(/^\/+|\/+$/g, "");
  if (!normalized || normalized.includes("..")) return null;
  const withExtension = normalized.endsWith(".html") ? normalized : normalized + ".html";
  const candidate = path.join(root, withExtension);
  const userRoot = path.join(root, "user") + path.sep;
  if (!candidate.startsWith(userRoot)) return null;
  if (!fs.existsSync(candidate) || fs.statSync(candidate).isDirectory()) return null;
  return candidate;
}

function sendUserSnapshot(req, res, filePath) {
  if (!hasScoreSession(req)) {
    res.writeHead(302, { Location: "/score/2026.html", "Cache-Control": "no-store" });
    res.end();
    return;
  }

  fs.readFile(filePath, "utf8", (error, source) => {
    if (error) {
      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Internal Server Error");
      return;
    }

    let html = source
      .replace(/<script\b[^>]*type=["']module["'][^>]*><\/script>/gi, "")
      .replace(/<link\b[^>]*rel=["']modulepreload["'][^>]*>/gi, "")
      .replace(/\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/cdn\.cqzk\.com\.cn\//g, "https://cdn.cqzk.com.cn/")
      .replace(/\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/tdesign\.gtimg\.com\//g, "https://tdesign.gtimg.com/")
      .replace(/https:\/\/www\.cqzk\.com\.cn\/apps\/zyfz\/login/g, "/apps/zyfz/login");

    html = html.replace(/https:\/\/gkcj\.cqksy\.cn\/(user\/[^"']+)/g, (match, route) => {
      return resolveUserSnapshot("/" + route) ? "/" + route : match;
    });

    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store"
    });
    res.end(html);
  });
}

function authenticateScore(req, res, redirectOnComplete) {
  if (req.method !== "POST") {
    sendJson(res, 405, { success: false, msg: "Method Not Allowed" });
    return;
  }

  let body = "";
  req.on("data", chunk => {
    body += chunk;
    if (body.length > 4096) req.destroy();
  });
  req.on("end", () => {
    try {
      const contentType = String(req.headers["content-type"] || "");
      const payload = contentType.indexOf("application/x-www-form-urlencoded") >= 0
        ? Object.fromEntries(new URLSearchParams(body))
        : JSON.parse(body || "{}");
      const account = payload.account || payload.candidate || "";
      const accountHash = sha256(String(account).trim());
      const passwordHash = sha256(String(payload.password || ""));
      if (!scoreAccountHashes.has(accountHash) || !safeHashEqual(passwordHash, scorePasswordHash)) {
        if (redirectOnComplete) {
          redirectScoreLogin(res, "/score/2026.html?error=credentials");
          return;
        }
        sendJson(res, 401, { success: false, msg: "账号或密码错误" });
        return;
      }

      const session = crypto.randomBytes(32).toString("hex");
      scoreSessions.add(session);
      if (redirectOnComplete) {
        res.writeHead(303, {
          Location: "/user/grade/4/1066/1230",
          "Cache-Control": "no-store",
          "Set-Cookie": `score_session=${session}; HttpOnly; SameSite=Strict; Path=/; Max-Age=28800`
        });
        res.end();
        return;
      }
      sendJson(res, 200, { success: true }, {
        "Set-Cookie": `score_session=${session}; HttpOnly; SameSite=Strict; Path=/; Max-Age=28800`
      });
    } catch (error) {
      if (redirectOnComplete) {
        redirectScoreLogin(res, "/score/2026.html?error=request");
        return;
      }
      sendJson(res, 400, { success: false, msg: "Invalid Request" });
    }
  });
}

function redirectScoreLogin(res, location) {
  res.writeHead(303, { Location: location, "Cache-Control": "no-store" });
  res.end();
}

function hasScoreSession(req) {
  const cookies = String(req.headers.cookie || "").split(";");
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split("=", 2);
    if (name === "score_session" && scoreSessions.has(value)) return true;
  }
  return false;
}

function sha256(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function safeHashEqual(actual, expected) {
  const actualBuffer = Buffer.from(actual, "hex");
  const expectedBuffer = Buffer.from(expected, "hex");
  return actualBuffer.length === expectedBuffer.length && crypto.timingSafeEqual(actualBuffer, expectedBuffer);
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

function sendJson(res, status, data, extraHeaders = {}) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    ...extraHeaders
  });
  res.end(JSON.stringify(data));
}
