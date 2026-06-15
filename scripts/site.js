(function () {
  var search = document.querySelector(".search");
  var navToggle = document.querySelector(".nav-toggle");
  var main = document.querySelector("main");
  var initialMainHtml = main ? main.innerHTML : "";
  var articlePanel = document.querySelector(".article-panel");
  var sectionMenu = document.querySelector(".section-menu");
  var routeArticles = {};

  var mainSections = [
    { text: "最新资讯", route: "/news/list_1.html", menuTitle: "最新资讯" },
    { text: "公示公告", route: "/announcement/list_1.html", menuTitle: "公示公告" },
    { text: "普通高考", route: "/PTGK/PTGK_news/list_1.html", menuTitle: "普通高考" },
    { text: "研招考试", route: "/YZYK/YZYK_news/list_1.html", menuTitle: "研招考试" },
    { text: "学业水平考试", route: "/XYSPKS/XYSPKS_news/list_1.html", menuTitle: "学业水平考试" },
    { text: "成人考试", route: "/CRKS/CRKS_news/list_1.html", menuTitle: "成人考试" },
    { text: "自学考试", route: "/ZXKS/ZXKS_news/list_1.html", menuTitle: "自学考试" },
    { text: "社会考试", route: "/SHKS/SHKS_news/list_1.html", menuTitle: "社会考试" },
    { text: "港澳招生", route: "/admissions_hkmo/list_1.html", menuTitle: "港澳招生" },
    { text: "出国留学", route: "/admissions_abroad/list_1.html", menuTitle: "出国留学" },
    { text: "党建工作", route: "/party/party_news/list_1.html", menuTitle: "党建工作" },
    { text: "区县之窗", route: "/news_districts/list_1.html", menuTitle: "区县之窗" },
    { text: "高校介绍", route: "/colleges/list_1.html", menuTitle: "高校介绍" }
  ];

  var yzykArticles = [
    ["02/26", "2026", "重庆市2026年全国硕士研究生招生考试（初试）成绩公布须知", "/YZYK/YZYK_news/2026926726350348288.html"],
    ["12/12", "2025", "重庆市2026年全国硕士研究生招生考试温馨提醒", "/YZYK/YZYK_news/1999339581481918464.html"],
    ["09/30", "2025", "重庆市2026年全国硕士研究生招生考试报名公告", "/YZYK/YZYK_news/1972857475503464448.html"],
    ["02/17", "2025", "重庆市2025年硕士研究生招生考试初试成绩公布须知", "/YZYK/YZYK_news/1891371867068121088.html"],
    ["12/09", "2024", "重庆市2025年全国硕士研究生招生考试温馨提醒", "/YZYK/YZYK_news/1866023296353525760.html"],
    ["09/30", "2024", "重庆市2025年全国硕士研究生考试报名公告", "/YZYK/YZYK_news/1840639987204763648.html"],
    ["02/21", "2024", "重庆市2024年硕士研究生招生考试初试成绩公布须知", "/YZYK/YZYK_news/1760213061788753920.html"],
    ["12/15", "2023", "重庆市2024年全国硕士研究生招生考试温馨提示", "/YZYK/YZYK_news/1735576523060912128.html"],
    ["09/21", "2023", "重庆市2024年全国硕士研究生招生考试报名公告", "/YZYK/YZYK_news/1704679788056653824.html"],
    ["12/08", "2022", "重庆市2023年全国硕士研究生招生考试参考须知（一）", "/YZYK/YZYK_news/1600782664303255552.html"],
    ["12/08", "2022", "关于重庆市2023年全国硕士研究生招生考试考生借考的公告", "/YZYK/YZYK_news/1600532688084017152.html"],
    ["12/01", "2022", "重庆市2023年全国硕士研究生招生考试（初试）温馨提示", "/YZYK/YZYK_news/1598299096163426304.html"],
    ["09/22", "2022", "重庆市2023年全国硕士研究生报名公告报考要求", "/YZYK/YZYK_news/1572798304581599232.html"],
    ["12/06", "2021", "重庆市2022年全国硕士研究生招生考试健康应试防疫须知", "/YZYK/YZYK_news/1467700339620417536.html"],
    ["09/24", "2021", "重庆市2022年全国硕士研究生报名公告", "/userfiles/fileupload/202109/1441238178242732033.pdf"]
  ].map(toArticle);

  var yzykPage2 = [
    ["12/05", "2021", "重庆市2022年全国硕士研究生招生考试考前提醒", "/YZYK/YZYK_news/local-20211205.html"],
    ["09/18", "2021", "重庆市2022年全国硕士研究生招生考试网上报名公告", "/YZYK/YZYK_news/local-20210918.html"],
    ["02/26", "2021", "重庆市2021年硕士研究生招生考试成绩公布须知", "/YZYK/YZYK_news/local-20210226.html"],
    ["12/17", "2020", "重庆市2021年全国硕士研究生招生考试温馨提示", "/YZYK/YZYK_news/local-20201217.html"],
    ["09/23", "2020", "重庆市2021年全国硕士研究生招生考试报名公告", "/YZYK/YZYK_news/local-20200923.html"],
    ["02/20", "2020", "重庆市2020年硕士研究生招生考试初试成绩公布须知", "/YZYK/YZYK_news/local-20200220.html"],
    ["12/13", "2019", "重庆市2020年全国硕士研究生招生考试考生须知", "/YZYK/YZYK_news/local-20191213.html"],
    ["09/20", "2019", "重庆市2020年全国硕士研究生招生考试报名公告", "/YZYK/YZYK_news/local-20190920.html"]
  ].map(toArticle);

  var yzykPolicy = [
    ["10/08", "2025", "2026年全国硕士研究生招生工作管理规定", "/YZYK/YZYK_policy/2026-policy.html"],
    ["09/20", "2025", "重庆市硕士研究生招生考试报名相关政策解读", "/YZYK/YZYK_policy/2025-policy.html"],
    ["09/24", "2024", "2025年全国硕士研究生招生考试政策问答", "/YZYK/YZYK_policy/2024-policy.html"],
    ["09/18", "2023", "重庆市全国硕士研究生招生考试报名工作规定", "/YZYK/YZYK_policy/2023-policy.html"]
  ].map(toArticle);

  var yzykGuide = [
    ["09/28", "2025", "重庆市2026年研招考试网上报名流程指南", "/YZYK/YZYK_guide/2026-guide.html"],
    ["09/25", "2025", "研招考试报名信息填写常见问题", "/YZYK/YZYK_guide/apply-faq.html"],
    ["12/10", "2024", "研招考试准考证下载和考点查询指南", "/YZYK/YZYK_guide/ticket-guide.html"],
    ["02/15", "2024", "硕士研究生招生考试成绩查询操作说明", "/YZYK/YZYK_guide/score-guide.html"]
  ].map(toArticle);

  var latestNews = [
    ["06/15", "2026", "重庆市2026年普通高校招生统一考试成绩查询及志愿填报工作安排", "/news/20260615-score-volunteer.html"],
    ["06/15", "2026", "重庆市2026年普通高考综合查询服务今日开放", "/news/20260615-query-open.html"],
    ["06/14", "2026", "重庆市2026年普通高校招生网上咨询活动安排", "/news/20260614-consult.html"],
    ["06/12", "2026", "重庆市2026年高考后主要时间节点提醒", "/news/20260612-timeline.html"],
    ["06/09", "2026", "重庆市2026年普通高校招生统一考试考后主要时间节点安排", "/news/20260609-after-exam.html"],
    ["06/04", "2026", "重庆市2026年高考温馨提醒", "/news/20260604-reminder.html"],
    ["06/02", "2026", "致2026年重庆高考考生及家长的一封信", "/news/20260602-letter.html"],
    ["05/27", "2026", "重庆市2026年上半年高等教育自学考试毕业申请办理有关事项的公告", "/news/20260527-self-study.html"],
    ["05/25", "2026", "“智慧招考服务”支付宝小程序上线", "/news/20260525-smart-service.html"],
    ["05/09", "2026", "重庆市2026年上半年中小学教师资格考试（面试）温馨提示", "/news/20260509-teacher.html"],
    ["04/30", "2026", "重庆市2026年普通高校专升本考试一分段表", "/news/20260430-ranking.html"],
    ["04/30", "2026", "2026年重庆市普通高校专升本志愿填报时间和流程公告", "/news/20260430-upgrade.html"],
    ["04/29", "2026", "重庆市2026年同等学力人员申请硕士学位外国语水平和学科综合水平全国统一考试温馨提示", "/news/20260429-master.html"],
    ["04/19", "2026", "重庆市2026年高职分类考试招生录取信息表-高职对口专科批第三次征集", "/news/20260419-vocational.html"],
    ["04/18", "2026", "2026年高职对口专科批第三次征集", "/news/20260418-collect.html"]
  ].map(toArticle);

  var announcementArticles = [
    ["06/15", "2026", "重庆市2026年普通高考综合查询入口开通公告", "/announcement/20260615-score-entry.html"],
    ["06/15", "2026", "重庆市2026年普通高考成绩复核申请安排", "/announcement/20260615-review.html"],
    ["06/13", "2026", "重庆市2026年普通高校招生志愿填报辅助系统使用提示", "/announcement/20260613-assist.html"],
    ["06/10", "2026", "区县招考机构联系方式", "/announcement/20260610-district-contact.html"],
    ["06/06", "2026", "重庆市2026年普通高校招生网上咨询服务公告", "/announcement/20260606-consult.html"],
    ["05/31", "2026", "重庆市2026年普通高考考生照顾资格信息公示办法", "/announcement/20260531-care.html"],
    ["05/22", "2026", "重庆市2026年高职分类考试录取查询时间安排", "/announcement/20260522-vocational.html"],
    ["05/16", "2026", "重庆市2026年社会考试报名服务提示", "/announcement/20260516-social.html"]
  ].map(toArticle);

  var pageData = {
    "/": makePage("最新资讯", "最新资讯", expandArticles(latestNews, "最新资讯", "/news/news", 72), [["最新资讯", "/news/list_1.html"]], { total: "共有 73 页/ 1089 条数据", current: 1, pages: [["1", "/news/list_1.html"], ["2", "/news/list_2.html"], ["3", "/news/list_3.html"], ["4", "/news/list_4.html"], ["5", "/news/list_5.html"], ["›", "/news/list_2.html"], ["»", "/news/list_73.html"]] }),
    "/news/list_1.html": makePage("最新资讯", "最新资讯", expandArticles(latestNews, "最新资讯", "/news/news", 72), [["最新资讯", "/news/list_1.html"]], { total: "共有 73 页/ 1089 条数据", current: 1, pages: [["1", "/news/list_1.html"], ["2", "/news/list_2.html"], ["3", "/news/list_3.html"], ["4", "/news/list_4.html"], ["5", "/news/list_5.html"], ["›", "/news/list_2.html"], ["»", "/news/list_73.html"]] }),
    "/announcement/list_1.html": makePage("公示公告", "公示公告", expandArticles(announcementArticles, "公示公告", "/announcement/announcement", 54), [["公示公告", "/announcement/list_1.html"]], { total: "共有 18 页/ 270 条数据", current: 1, pages: [["1", "/announcement/list_1.html"], ["2", "/announcement/list_2.html"], ["3", "/announcement/list_3.html"], ["›", "/announcement/list_2.html"], ["»", "/announcement/list_18.html"]] }),
    "/score/2026.html": makePage("成绩查询", "2026成绩查询入口", [
      ["06/24", "2026", "2026年普通高考综合查询入口", "/score/2026-detail.html"],
      ["06/24", "2026", "普通高考成绩查询操作说明", "/score/2026-guide.html"],
      ["06/24", "2026", "普通高考录取信息查询入口", "/score/2026-admission.html"]
    ].map(toArticle), [["2026成绩查询入口", "/score/2026.html"]]),
    "/YZYK/YZYK_news/list_1.html": makePage("研招考试", "资讯公告", expandArticles(yzykArticles, "研招考试资讯公告", "/YZYK/YZYK_news/generated", 45), [
      ["资讯公告", "/YZYK/YZYK_news/list_1.html"],
      ["政策法规", "/YZYK/YZYK_policy/list_1.html"],
      ["报考指南", "/YZYK/YZYK_guide/list_1.html"]
    ], { total: "共有 6 页/ 90 条数据", current: 1, pages: [["1", "/YZYK/YZYK_news/list_1.html"], ["2", "/YZYK/YZYK_news/list_2.html"], ["3", "/YZYK/YZYK_news/list_3.html"], ["›", "/YZYK/YZYK_news/list_2.html"], ["»", "/YZYK/YZYK_news/list_6.html"]] }),
    "/YZYK/YZYK_news/list_2.html": makePage("研招考试", "资讯公告", expandArticles(yzykPage2, "研招考试资讯公告", "/YZYK/YZYK_news/page2-generated", 38), [
      ["资讯公告", "/YZYK/YZYK_news/list_1.html"],
      ["政策法规", "/YZYK/YZYK_policy/list_1.html"],
      ["报考指南", "/YZYK/YZYK_guide/list_1.html"]
    ], { total: "共有 6 页/ 90 条数据", current: 2, pages: [["‹", "/YZYK/YZYK_news/list_1.html"], ["1", "/YZYK/YZYK_news/list_1.html"], ["2", "/YZYK/YZYK_news/list_2.html"], ["3", "/YZYK/YZYK_news/list_3.html"]] }),
    "/YZYK/YZYK_policy/list_1.html": makePage("研招考试", "政策法规", expandArticles(yzykPolicy, "研招考试政策法规", "/YZYK/YZYK_policy/generated", 36), [
      ["资讯公告", "/YZYK/YZYK_news/list_1.html"],
      ["政策法规", "/YZYK/YZYK_policy/list_1.html"],
      ["报考指南", "/YZYK/YZYK_guide/list_1.html"]
    ]),
    "/YZYK/YZYK_guide/list_1.html": makePage("研招考试", "报考指南", expandArticles(yzykGuide, "研招考试报考指南", "/YZYK/YZYK_guide/generated", 36), [
      ["资讯公告", "/YZYK/YZYK_news/list_1.html"],
      ["政策法规", "/YZYK/YZYK_policy/list_1.html"],
      ["报考指南", "/YZYK/YZYK_guide/list_1.html"]
    ])
  };

  mainSections.forEach(function (section) {
    if (!pageData[section.route]) {
      pageData[section.route] = makePage(section.menuTitle, section.text, expandArticles(genericArticles(section.text, section.route.replace(/list_1\.html$/, "article")), section.text, section.route.replace(/list_1\.html$/, "generated"), 48), [[section.text, section.route]], { total: "共有 12 页/ 180 条数据", current: 1, pages: [["1", section.route], ["2", section.route.replace("list_1.html", "list_2.html")], ["3", section.route.replace("list_1.html", "list_3.html")], ["›", section.route.replace("list_1.html", "list_2.html")], ["»", section.route.replace("list_1.html", "list_12.html")]] });
    }
  });

  registerArticles(latestNews.concat(announcementArticles, yzykArticles, yzykPage2, yzykPolicy, yzykGuide));
  mainSections.forEach(function (section) {
    registerArticles(pageData[section.route].articles);
  });

  if (search) {
    search.addEventListener("submit", handleSearch);

    var searchButton = search.querySelector("button");
    if (searchButton) {
      searchButton.addEventListener("click", handleSearch);
    }
  }

  if (navToggle) {
    navToggle.addEventListener("click", function () {
      var channels = navToggle.closest(".channels");
      if (!channels) return;
      var open = channels.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  document.addEventListener("click", function (event) {
    var link = event.target.closest("a[data-route]");
    if (!link) return;

    event.preventDefault();
    navigate(link.getAttribute("data-route") || "/", true);
  });

  window.addEventListener("popstate", function () {
    renderRoute(location.pathname || "/", false);
  });

  renderRoute(location.pathname === "/" ? "/news/list_1.html" : location.pathname, false);

  function handleSearch(event) {
    event.preventDefault();
    var input = search.querySelector("input");
    var keyword = input ? input.value.trim() : "";

    if (!keyword) {
      showNotice("请输入关键词");
      if (input) input.focus();
      return;
    }

    var matches = Object.keys(routeArticles).map(function (key) {
      return routeArticles[key];
    }).filter(function (article, index, all) {
      return article.title.indexOf(keyword) >= 0 && all.findIndex(function (item) {
        return item.route === article.route;
      }) === index;
    }).slice(0, 12);

    renderList({
      menuTitle: "搜索",
      activeMenu: "搜索结果",
      articles: matches.length ? matches : [toArticle(["--/--", "----", "没有找到与“" + keyword + "”相关的内容", "/search/empty.html"])],
      menu: [["搜索结果", "/search/"]],
      pager: null
    });
    setActiveMain("");
    showNotice('搜索关键词：<strong>' + escapeHtml(keyword) + "</strong>");
  }

  function navigate(route, push) {
    renderRoute(route, push);
    var channels = document.querySelector(".channels");
    if (channels) channels.classList.remove("open");
    if (navToggle) navToggle.setAttribute("aria-expanded", "false");
  }

  function renderRoute(route, push) {
    if (!route || route === "/") route = "/news/list_1.html";

    if (route === "/score/2026.html") {
      renderScoreLogin();
    } else if (route === "/score/result.html") {
      renderScoreResult();
    } else if (/^\/score\//.test(route)) {
      renderScoreResult();
    } else if (/\.pdf$/i.test(route)) {
      ensurePortal();
      renderDetail({
        title: "重庆市2022年全国硕士研究生报名公告",
        route: route,
        date: "09/24",
        year: "2021",
        section: "研招考试"
      });
    } else if (routeArticles[route]) {
      ensurePortal();
      renderDetail(routeArticles[route]);
    } else {
      ensurePortal();
      renderList(pageData[route] || makePage("最新资讯", "资讯公告", genericArticles("最新资讯", "/news/news")));
    }

    setActiveMain(route);
    if (push) history.pushState({ route: route }, "", route);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderList(page) {
    ensurePortal();
    if (!articlePanel || !sectionMenu) return;
    var menu = page.menu || [[page.activeMenu, currentRouteFor(page)]];
    sectionMenu.innerHTML = "<h2>" + escapeHtml(page.menuTitle) + "</h2>" + menu.map(function (item) {
      var active = item[0] === page.activeMenu ? " on" : "";
      return '<a class="' + active.trim() + '" href="javascript:;" data-route="' + escapeHtml(item[1]) + '">' + escapeHtml(item[0]) + "</a>";
    }).join("");

    articlePanel.setAttribute("aria-label", page.activeMenu);
    articlePanel.innerHTML = '<ul class="article-list">' + page.articles.map(function (article) {
      return '<li><time><span>' + escapeHtml(article.date) + '</span><small>' + escapeHtml(article.year) + '</small></time><a href="javascript:;" data-route="' + escapeHtml(article.route) + '">' + escapeHtml(article.title) + "</a></li>";
    }).join("") + "</ul>" + renderPager(page.pager);
  }

  function renderDetail(article) {
    ensurePortal();
    if (!articlePanel || !sectionMenu) return;
    var section = article.section || inferSection(article.route);
    var basePage = pageForSection(section);
    sectionMenu.innerHTML = "<h2>" + escapeHtml(basePage.menuTitle) + "</h2>" + (basePage.menu || [[basePage.activeMenu, currentRouteFor(basePage)]]).map(function (item) {
      return '<a href="javascript:;" data-route="' + escapeHtml(item[1]) + '">' + escapeHtml(item[0]) + "</a>";
    }).join("");
    articlePanel.innerHTML = '<article class="article-detail">' +
      '<div class="detail-head"><h1>' + escapeHtml(article.title) + '</h1><p>发布时间：' + escapeHtml(article.year) + "-" + escapeHtml(article.date.replace("/", "-")) + "　来源：重庆招考信息网</p></div>" +
      '<div class="detail-body"><p>这是本地复刻页面，点击行为按照原网站进入详情页。当前展示的是“' + escapeHtml(article.title) + '”的详情内容。</p>' +
      '<p>请考生以重庆招考信息网发布的考试公告、报名安排、成绩查询须知和相关附件为准，按规定时间完成网上报名、确认、打印准考证和成绩查询等事项。</p>' +
      '<p>页面结构、标题区、正文区和返回行为均在 localhost 内完成，不会跳转到 www.cqzk.com.cn。</p></div>' +
      '<div class="detail-actions"><a href="javascript:;" data-route="' + escapeHtml(basePage.route) + '">返回列表</a></div>' +
      "</article>";
  }

  function renderScoreLogin() {
    if (!main) return;
    document.body.classList.add("score-mode", "score-login-mode");
    document.body.classList.remove("score-result-mode");
    main.innerHTML = '<section class="score-login-page">' +
      '<div class="score-title"><h1>重庆市教育考试招生查询系统</h1><p>2026年普通高考综合查询</p></div>' +
      '<div class="login-card">' +
        '<form class="score-login-form">' +
          '<div class="login-tabs"><button class="active" type="button">账号密码</button></div>' +
          '<label class="select-wrap"><select name="method"><option value="">请选择登录方式</option><option value="candidate">考生号/身份证号</option><option value="ticket">准考证号</option></select></label>' +
          '<label><input name="candidate" autocomplete="off" placeholder="请先选择登录方式" disabled></label>' +
          '<label><input name="password" type="password" placeholder="密码"></label>' +
          '<div class="captcha-row"><label><input name="captcha" autocomplete="off" placeholder="验证码"></label><button class="captcha-img" type="button" aria-label="刷新验证码">st4m</button></div>' +
          '<button class="login-submit" type="submit">登 录</button>' +
          '<div class="login-links"><a href="javascript:;" data-route="/YZYK/YZYK_news/list_1.html">返回上页</a><button class="forgot-pass" type="button">找回密码</button></div>' +
          '<p class="login-error" hidden></p>' +
        '</form>' +
      '</div>' +
    '</section>';
    setupScoreLogin();
  }

  function setupScoreLogin() {
    var form = document.querySelector(".score-login-form");
    var error = document.querySelector(".login-error");
    var captcha = document.querySelector(".captcha-img");
    var forgot = document.querySelector(".forgot-pass");
    var methodSelect = document.querySelector('select[name="method"]');
    var accountInput = document.querySelector('input[name="candidate"]');
    var codes = ["st4m", "7kq2", "m8r6", "c9x5"];
    var codeIndex = 0;

    if (methodSelect && accountInput) {
      methodSelect.addEventListener("change", function () {
        var selected = methodSelect.options[methodSelect.selectedIndex];
        var label = selected && methodSelect.value ? selected.textContent.trim() : "";
        accountInput.value = "";
        accountInput.disabled = !label;
        accountInput.placeholder = label || "请先选择登录方式";
        if (label) accountInput.focus();
      });

      accountInput.addEventListener("focus", function () {
        if (methodSelect.value) return;
        accountInput.blur();
        showLoginError("请先选择登录方式。");
      });
    }

    if (captcha) {
      captcha.addEventListener("click", function () {
        codeIndex = (codeIndex + 1) % codes.length;
        captcha.textContent = codes[codeIndex];
      });
    }

    if (forgot) {
      forgot.addEventListener("click", function () {
        if (!error) return;
        error.hidden = false;
        error.textContent = "请通过报名时绑定的手机号或区县招考机构办理密码找回。";
      });
    }

    if (!form) return;
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var method = form.elements.method.value;
      var candidate = form.elements.candidate.value.trim();
      var password = form.elements.password.value.trim();
      var inputCode = form.elements.captcha.value.trim().toLowerCase();
      var currentCode = (captcha ? captcha.textContent : "st4m").trim().toLowerCase();

      if (!method || !candidate || !password || !inputCode) {
        if (error) {
          error.hidden = false;
          error.textContent = !method ? "请先选择登录方式。" : "请完整填写" + accountLabel() + "、密码和验证码。";
        }
        return;
      }

      if (inputCode !== currentCode) {
        if (error) {
          error.hidden = false;
          error.textContent = "验证码输入错误，请重新输入。";
        }
        return;
      }

      sessionStorage.setItem("scoreCandidate", candidate);
      navigate("/score/result.html", true);
    });

    function accountLabel() {
      if (!methodSelect || !methodSelect.value) return "账号";
      return methodSelect.options[methodSelect.selectedIndex].textContent.trim();
    }

    function showLoginError(message) {
      if (!error) return;
      error.hidden = false;
      error.textContent = message;
    }
  }

  function renderScoreResult() {
    if (!main) return;
    var candidate = "26500111111371";
    document.body.classList.add("score-mode", "score-result-mode");
    document.body.classList.remove("score-login-mode");
    main.innerHTML = '<section class="score-result-page">' +
      '<header class="result-top"><div>重庆市教育考试院综合查询系统 [2026年普通高考综合查询]</div></header>' +
      '<div class="candidate-band">考生：赵丁谕　' + maskId(candidate) + '</div>' +
      '<nav class="result-nav"><span>▦ 成绩查询</span><button type="button" class="logout-score">↪ 退出</button></nav>' +
      '<div class="result-paper">' +
        '<div class="watermark" aria-hidden="true">' + watermarkMarkup(candidate) + '</div>' +
        qrMarkup("qr-top", "二维码") +
        '<table class="score-table"><thead><tr><th>科目</th><th>成绩</th></tr></thead><tbody>' +
          scoreRows().map(function (row) { return "<tr><td>" + row[0] + "</td><td>" + row[1] + "</td></tr>"; }).join("") +
        '</tbody></table>' +
        '<div class="verify-code">校验码：96259660B4CA53CEF841667A95A41FF6</div>' +
        '<a class="assist-link" href="javascript:;" data-route="/score/assist.html">重庆市统一高考志愿填报辅助系统(点击进入)</a>' +
        qrMarkup("qr-bottom", "重庆招考微信公众号二维码") +
        '<div class="qr-label">重庆招考微信公众号</div>' +
      '</div>' +
      '<div class="result-actions"><button type="button" class="print-score">打印成绩</button><button type="button" class="copy-code">复制校验码</button></div>' +
    '</section>';

    var logout = document.querySelector(".logout-score");
    if (logout) logout.addEventListener("click", function () { navigate("/score/2026.html", true); });
    var print = document.querySelector(".print-score");
    if (print) print.addEventListener("click", function () { window.print(); });
    var copy = document.querySelector(".copy-code");
    if (copy) copy.addEventListener("click", function () {
      showResultToast("校验码：96259660B4CA53CEF841667A95A41FF6");
    });
  }

  function ensurePortal() {
    if (!main) return;
    if (document.body.classList.contains("score-mode")) {
      main.innerHTML = initialMainHtml;
      articlePanel = document.querySelector(".article-panel");
      sectionMenu = document.querySelector(".section-menu");
    }
    document.body.classList.remove("score-mode", "score-login-mode", "score-result-mode");
  }

  function scoreRows() {
    return [["语文", "124"], ["数学", "106"], ["外语", "132"], ["历史", "76"], ["生物", "96"], ["思想政治", "92"], ["总分", "626"]];
  }

  function watermarkMarkup(candidate) {
    var text = "赵丁谕-230026<br>" + escapeHtml(candidate);
    var marks = "";
    for (var index = 0; index < 24; index += 1) {
      marks += '<span>' + text + "</span>";
    }
    return marks;
  }

  function qrMarkup(extraClass, label) {
    return '<img class="qr ' + extraClass + '" src="/wechat.png" alt="' + escapeHtml(label) + '">';
  }

  function maskId(value) {
    if (!value) return "********";
    return value.length > 8 ? value.slice(0, 3) + "****" + value.slice(-4) : value.slice(0, 2) + "****";
  }

  function showResultToast(text) {
    var toast = document.createElement("div");
    toast.className = "score-toast";
    toast.textContent = text;
    document.body.appendChild(toast);
    setTimeout(function () { toast.remove(); }, 1800);
  }

  function renderPager(pager) {
    if (!pager) return "";
    return '<div class="pager" aria-label="分页"><span>' + escapeHtml(pager.total) + "</span>" + pager.pages.map(function (item, index) {
      var active = String(item[0]) === String(pager.current) ? ' class="active"' : "";
      return '<a' + active + ' href="javascript:;" data-page-index="' + index + '" data-route="' + escapeHtml(item[1]) + '">' + escapeHtml(item[0]) + "</a>";
    }).join("") + "</div>";
  }

  function makePage(menuTitle, activeMenu, articles, menu, pager) {
    return {
      route: menu && menu[0] ? menu[0][1] : "",
      menuTitle: menuTitle,
      activeMenu: activeMenu,
      articles: articles,
      menu: menu || [[activeMenu, ""]],
      pager: pager || null
    };
  }

  function genericArticles(section, prefix) {
    return [
      ["06/15", "2026", section + "今日服务事项提醒", prefix + "-1.html"],
      ["06/15", "2026", section + "2026年考试招生查询服务更新", prefix + "-2.html"],
      ["06/14", "2026", section + "网上办理事项温馨提示", prefix + "-3.html"],
      ["06/12", "2026", section + "报名及查询服务公告", prefix + "-4.html"],
      ["06/09", "2026", section + "考试招生政策解读", prefix + "-5.html"],
      ["06/04", "2026", section + "考生常见问题答复", prefix + "-6.html"]
  ].map(toArticle).map(function (article) {
    article.section = section;
    return article;
  });
  }

  function expandArticles(seedArticles, section, prefix, targetCount) {
    var topics = [
      "考试报名安排",
      "网上办理事项提醒",
      "资格审核工作提示",
      "成绩查询服务公告",
      "志愿填报时间安排",
      "录取信息查询说明",
      "考生服务渠道公布",
      "政策解读及问答",
      "咨询活动安排",
      "区县招考机构联系方式",
      "考前注意事项",
      "招生录取工作提示",
      "信息公示办法",
      "系统维护公告",
      "材料提交说明",
      "常见问题答复"
    ];
    var articles = seedArticles.slice();
    var index = 0;
    while (articles.length < targetCount) {
      var day = Math.max(1, 15 - (index % 28));
      var month = index < 28 ? "06" : index < 56 ? "05" : "04";
      var date = month + "/" + String(day).padStart(2, "0");
      var title = "重庆市2026年" + section + topics[index % topics.length];
      var route = prefix + "-" + String(index + 1).padStart(3, "0") + ".html";
      articles.push(toArticle([date, "2026", title, route]));
      index += 1;
    }
    return articles;
  }

  function toArticle(item) {
    return { date: item[0], year: item[1], title: item[2], route: item[3], section: inferSection(item[3]) };
  }

  function registerArticles(articles) {
    articles.forEach(function (article) {
      routeArticles[article.route] = article;
    });
  }

  function setActiveMain(route) {
    var section = mainSections.find(function (item) {
      return route.indexOf(item.route.split("/")[1] ? "/" + item.route.split("/")[1] + "/" : item.route) === 0 || route === item.route;
    });
    if (route.indexOf("/YZYK/") === 0 || route.indexOf("/userfiles/") === 0) section = mainSections[3];
    document.querySelectorAll(".main-nav a").forEach(function (item) {
      item.classList.toggle("current", section && item.textContent.trim() === section.text);
    });
  }

  function pageForSection(section) {
    if (section === "研招考试") return pageData["/YZYK/YZYK_news/list_1.html"];
    var found = mainSections.find(function (item) { return item.text === section; });
    return found ? pageData[found.route] : pageData["/YZYK/YZYK_news/list_1.html"];
  }

  function inferSection(route) {
    if (route.indexOf("/YZYK/") === 0 || route.indexOf("/userfiles/") === 0) return "研招考试";
    var found = mainSections.find(function (item) {
      var key = item.route.split("/")[1];
      return key && route.indexOf("/" + key + "/") === 0;
    });
    return found ? found.text : "最新资讯";
  }

  function currentRouteFor(page) {
    var found = Object.keys(pageData).find(function (route) {
      return pageData[route] === page;
    });
    return found || "/";
  }

  function showNotice(html) {
    var result = document.querySelector(".search-result");
    if (!result) return;
    result.hidden = false;
    result.innerHTML = html;
    result.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function escapeHtml(value) {
    return String(value || "").replace(/[&<>"']/g, function (char) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      }[char];
    });
  }
})();
