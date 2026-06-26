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

    if (route === "/score/2026.html" || route === "/user/grade/4/1066/1230" || route === "/user/grade/4/1066/1230/") {
      renderGradePortal("score");
    } else if (route === "/user/personal/0/1073/1230" || route === "/user/personal/0/1073/1230/") {
      renderGradePortal("personal");
    } else if (route === "/user/health_examination/0/1075/1230" || route === "/user/health_examination/0/1075/1230/") {
      renderGradePortal("health");
    } else if (route === "/score/result.html") {
      renderScoreResult();
    } else if (route === "/score/assist.html") {
      renderVolunteerAssist("history");
    } else if (route === "/apps/zyfz/system/plans" || route === "/apps/zyfz/system/plans/") {
      renderVolunteerAssist("plan");
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

  function renderGradePortal(activePage) {
    if (!main) return;
    document.title = "重庆市教育考试招生查询系统";
    document.body.classList.add("score-mode", "score-result-mode", "grade-portal-mode");
    document.body.classList.remove("score-login-mode", "volunteer-mode");
    main.innerHTML = gradeShellMarkup(activePage || "score");
  }

  function gradeEntries() {
    return [
      { text: "2026年普通高考综合查询", route: "/score/result.html" },
      { text: "重庆市2026年普通高校招生艺术类专业统考成绩查询", route: "/score/result.html" },
      { text: "重庆市2026年普通高校招生体育类专业统考成绩查询", route: "/score/result.html" },
      { text: "2026年高职分类考试综合查询", route: "/score/result.html" },
      { text: "重庆市2026年普通高校专升本统一考试成绩及录取结果查询", route: "/score/result.html" },
      { text: "2026年上半年中小学教师资格考试(面试)成绩复核申请系统", route: "/score/result.html" },
      { text: "重庆市教育考试招生证明", route: "/score/result.html" }
    ];
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
    var detail = detailContent(article, section);
    articlePanel.innerHTML = '<article class="article-detail">' +
      '<div class="detail-head"><h1>' + escapeHtml(article.title) + '</h1><p>发布时间：' + escapeHtml(article.year) + "-" + escapeHtml(article.date.replace("/", "-")) + "　来源：重庆招考信息网</p></div>" +
      '<div class="detail-body">' + detail.paragraphs.map(function (paragraph) { return "<p>" + escapeHtml(paragraph) + "</p>"; }).join("") + renderSignature(detail.signature) + detailAttachment(article) + "</div>" +
      '<div class="detail-actions"><a href="javascript:;" data-route="' + escapeHtml(basePage.route) + '">返回列表</a></div>' +
      "</article>";
  }

  function detailContent(article, section) {
    var title = article.title;
    var dateText = article.year + "年" + article.date.replace("/", "月") + "日";

    if (title.indexOf("硕士研究生招生考试（初试）成绩公布须知") >= 0 || title.indexOf("硕士研究生招生考试初试成绩公布须知") >= 0) {
      return content([
        "报考重庆市硕士研究生招生单位的考生，可按招生单位公布的时间和方式查询全国硕士研究生招生考试初试成绩。成绩由各招生单位负责公布，请考生及时关注报考单位公告。",
        "考生如对成绩有异议，应在规定时间内按照报考招生单位要求提出成绩复核申请。逾期未申请的，不再受理；复核结果由招生单位反馈考生本人。",
        "报考重庆市外招生单位的考生，请根据报考招生单位或其所在省级教育考试机构发布的公告查询成绩和办理后续事项。"
      ], "重庆市教育考试院", dateText);
    }

    if (title.indexOf("研招考试网上报名流程") >= 0 || title.indexOf("硕士研究生报名公告") >= 0 || title.indexOf("硕士研究生考试报名公告") >= 0) {
      return content([
        "重庆市全国硕士研究生招生考试报名包括网上报名和网上确认两个阶段。考生应在规定时间内登录研招网填报报名信息，并按报考点要求完成确认。",
        "报名期间，考生须认真核对本人学历学籍、户籍或工作所在地、报考单位、考试方式、专项计划等信息。因填报错误、材料不实或未按要求确认造成不能考试的，责任由考生本人承担。",
        "各报考点容量有限，报考点选择、网上缴费、确认材料提交和审核结果查询等事项，以重庆市教育考试院、报考点和招生单位后续公告为准。"
      ], "重庆市教育考试院", dateText);
    }

    if (title.indexOf("研招考试报名信息填写常见问题") >= 0 || title.indexOf("政策问答") >= 0 || title.indexOf("政策解读") >= 0) {
      return content([
        "为帮助考生准确理解招生考试政策，现就报名资格、报考点选择、网上确认、信息修改、缴费退费和准考证下载等常见问题进行提示。",
        "考生填报前应认真阅读教育部招生工作管理规定、重庆市报名公告、招生单位招生章程和报考点公告，确认本人符合报考条件后再提交信息。",
        "政策执行中涉及具体资格审核和材料要求的，以招生单位、报考点及相关主管部门审核意见为准。"
      ], "重庆市教育考试院", dateText);
    }

    if (title.indexOf("准考证") >= 0 || title.indexOf("考前提醒") >= 0 || title.indexOf("温馨提醒") >= 0 || title.indexOf("温馨提示") >= 0 || title.indexOf("参考须知") >= 0) {
      return content([
        "请考生提前打印准考证，认真阅读准考证上的考试地点、考试时间、考场规则和注意事项，合理安排出行时间。",
        "考生进入考点时应主动配合身份核验和安全检查，严禁携带手机、智能手表、电子存储设备等违规物品进入考场。",
        "考试期间请遵守考场纪律，诚信应考。后续成绩查询、复核、复试和录取安排，请持续关注招生单位及重庆招考信息网发布的通知。"
      ], "重庆市教育考试院", dateText);
    }

    if (title.indexOf("高考综合查询入口") >= 0 || title.indexOf("综合查询服务") >= 0 || title.indexOf("成绩查询") >= 0) {
      return content([
        "重庆市2026年普通高校招生统一考试综合查询服务已开通。考生可根据页面提示选择登录方式，通过本人考生号、准考证号或身份证号等信息完成身份校验后查询相关结果。",
        "请考生妥善保管账号、密码和验证码，不向他人泄露个人信息。查询高峰期如出现页面访问缓慢，可稍后错峰登录。",
        "考生对成绩有疑问的，可在规定时间内向报名所在区县招考机构提出成绩复核申请。复核只核查答卷信息、统分登分等事项，不重新评卷。"
      ], "重庆市教育考试院", dateText);
    }

    if (title.indexOf("成绩复核") >= 0) {
      return content([
        "普通高考成绩公布后，考生如对本人考试成绩有疑问，可按报名所在区县招考机构公布的时间、地点和方式提交成绩复核申请。",
        "成绩复核内容包括考生信息是否一致、是否漏评、统分登分是否准确等。复核结果由区县招考机构按规定方式告知考生本人。",
        "逾期未提出申请的，视为自动放弃复核。请考生保持报名时预留联系方式畅通。"
      ], "重庆市教育考试院", dateText);
    }

    if (title.indexOf("志愿填报") >= 0 || title.indexOf("辅助系统") >= 0) {
      return content([
        "为做好重庆市2026年普通高校招生志愿填报工作，考生应在规定时间内登录指定系统填报志愿，并认真阅读招生计划、招生章程和填报说明。",
        "志愿填报辅助系统用于帮助考生查询招生计划、选科要求、历年录取参考信息等内容，辅助信息不作为录取承诺，正式志愿以志愿填报系统提交结果为准。",
        "考生应妥善保管登录密码，填报完成后及时核对确认。因考生本人填报失误、未按时提交或泄露密码造成的后果，由考生本人承担。"
      ], "重庆市教育考试院", dateText);
    }

    if (title.indexOf("区县招考机构联系方式") >= 0) {
      return content([
        "为方便考生咨询报名、考试、成绩复核、志愿填报和录取查询等事项，现公布重庆市各区县招考机构联系方式。",
        "考生咨询时请说明本人报名区县、考试类别和具体事项。涉及个人信息查询或业务办理的，请按工作人员要求提供必要身份核验材料。",
        "联系方式如有调整，以各区县招考机构最新公布信息为准。"
      ], "重庆市教育考试院", dateText);
    }

    if (title.indexOf("公示") >= 0 || section === "公示公告") {
      return content([
        "根据考试招生工作安排，现将有关名单、资格或办理事项予以公示。公示期间如有异议，可按公告公布的渠道实名反映。",
        "反映问题应实事求是，并提供必要证明材料。受理单位将按规定核查处理，依法保护反映人和相关考生个人信息。",
        "公示期满无异议或经核查不影响相关资格的，按规定进入后续工作程序。"
      ], "重庆市教育考试院", dateText);
    }

    return content([
      "为做好重庆市考试招生相关工作，现将有关事项通知如下。",
      "请考生认真阅读本通知内容，按照规定时间、规定方式办理报名、确认、查询、打印、填报等事项。相关安排以重庆招考信息网发布内容为准。",
      "后续安排如有调整，将通过重庆招考信息网及时公布，请考生持续关注。"
    ], "重庆市教育考试院", dateText);
  }

  function content(paragraphs, org, dateText) {
    return {
      paragraphs: paragraphs,
      signature: org && dateText ? [org, dateText] : []
    };
  }

  function renderSignature(signature) {
    if (!signature || !signature.length) return "";
    return '<div class="detail-signature">' + signature.map(function (line) {
      return "<p>" + escapeHtml(line) + "</p>";
    }).join("") + "</div>";
  }

  function detailAttachment(article) {
    if (article.title.indexOf("公告") < 0 && article.title.indexOf("安排") < 0 && article.title.indexOf("办法") < 0) return "";
    return '<div class="detail-attachment"><strong>附件：</strong><a href="javascript:;">' + escapeHtml(article.title) + "相关材料.pdf</a></div>";
  }

  function renderScoreLogin() {
    if (!main) return;
    document.body.classList.add("score-mode", "score-login-mode");
    document.body.classList.remove("score-result-mode", "volunteer-mode", "grade-portal-mode");
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
    var expectedPassword = "ZDYzdy410DZYV!";
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

      if (password !== expectedPassword) {
        if (error) {
          error.hidden = false;
          error.textContent = "密码错误，请重新输入。";
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
    document.title = "重庆市教育考试招生查询系统";
    document.body.classList.add("score-mode", "score-result-mode", "grade-portal-mode");
    document.body.classList.remove("score-login-mode", "volunteer-mode");
    main.innerHTML = gradeShellMarkup("score");
  }

  function gradeShellMarkup(activePage) {
    return '<section class="grade-result-layout">' +
      '<header class="grade-result-header">' +
        '<div class="grade-header-inner grade-result-banner">' +
          '<a class="grade-logo" href="https://www.cqksy.cn/" aria-label="重庆市教育考试院">' + gradeLogoMarkup() + '</a>' +
          '<span class="grade-title-divider" aria-hidden="true"></span>' +
          '<h1 class="grade-result-title"><b>2026</b>年普通高考综合查询</h1>' +
          '<button type="button" class="grade-user">你好，赵丁谕 <span>⌄</span></button>' +
        '</div>' +
        '<nav class="grade-tabs" aria-label="成绩导航">' +
          gradeTabMarkup("score", "成绩查询", "/user/grade/4/1066/1230", activePage) +
          gradeTabMarkup("personal", "基本信息", "/user/personal/0/1073/1230", activePage) +
          gradeTabMarkup("health", "体检信息", "/user/health_examination/0/1075/1230", activePage) +
        '</nav>' +
      '</header>' +
      '<main class="grade-result-content">' + gradePageContent(activePage) + '</main>' +
      '<footer class="grade-footer"><p>© 2025-2026 cqksy.cn All rights reserved.</p><p>本服务由重庆市教育考试院提供</p></footer>' +
    '</section>';
  }

  function gradeTabMarkup(key, label, route, activePage) {
    var active = key === activePage ? " active" : "";
    return '<a class="' + active.trim() + '" href="javascript:;" data-route="' + route + '">' + label + '</a>';
  }

  function gradePageContent(activePage) {
    if (activePage === "personal") return personalInfoMarkup();
    if (activePage === "health") return healthInfoMarkup();
    return scoreInfoMarkup();
  }

  function scoreInfoMarkup() {
    return '<section class="grade-result-card score-card">' +
      '<div class="grade-result-card-head"><div class="grade-card-col"><div class="grade-card-qrcode">' + qrMarkup("", "二维码", "plain") + '</div></div><div class="grade-card-col"><h2>查询结果</h2></div><div class="grade-card-col"></div></div>' +
      '<div class="grade-result-card-body">' +
        '<div class="grade-watermark" aria-hidden="true">' + watermarkMarkup() + '</div>' +
        '<div class="grade-score-list">' + scoreRows().map(function (row) {
          return '<div class="grade-subject"><div class="subject-label">' + escapeHtml(row[0]) + '</div><div class="subject-score">' + escapeHtml(row[1]) + '</div></div>';
        }).join("") + '</div>' +
      '</div>' +
      '<div class="grade-card-footer"><span>校验码：65B81566467A208FDD96076DF1F168B3</span></div>' +
    '</section>' +
    '<ul class="grade-ad-container"><li><span><a href="javascript:;" data-route="/score/assist.html">重庆市统一高考志愿填报辅助系统(点此进入)</a></span></li></ul>' +
    '<div class="qrcode-bottom">' + qrMarkup("", "qrcode", "marked") + '<span>重庆招考微信公众号</span></div>';
  }

  function personalInfoMarkup() {
    return gradeInfoCard("基本信息", personalInfoRows()) +
      gradeInfoCard("特征信息", [
        ["特征类别", "重庆户籍", "特征明细", "重庆户籍"],
        ["特征类别", "外语口试成绩", "特征明细", "90"]
      ]);
  }

  function personalInfoRows() {
    return [
      ["身份证号", "500106200804108323", "考生号", "26500111111271"],
      ["准考证号", "", "姓名", "赵丁谕"],
      ["性别", "女", "政治面貌", "共青团员"],
      ["民族", "汉族", "出生年月", "2008年04月10日"],
      ["考生类别", "城市应届", "毕业类别", "普通高中毕业"],
      ["报考类别", "普通类(历史)", "考试类型", "历史"],
      ["选择性考试科目", "【历史】生物学、思想政治", "笔试外语语种", "英语"],
      ["区县", "巴南区", "毕业中学", "重庆巴南育才实验中学校"],
      ["报名点", "重庆巴南育才实验中学校", "班级", "04班"],
      ["联系电话", "15730365715", "收件人", "赵丁谕"],
      ["通知书收件人电话", "15730365715", "通知书邮编", "400054"],
      ["通知书邮寄地址", "重庆重庆市巴南区李家沱街道莫园誉府5幢2单元601", "", ""]
    ];
  }

  function healthInfoMarkup() {
    return gradeInfoCard("基础信息", [
      ["考生号", "26500111111271", "既往病史", "无"],
      ["既往病史说明", "无", "既往病史说明", "无"]
    ]) +
    gradeInfoCard("眼科", [
      ["裸眼视力(右)", "4.4", "裸眼视力(左)", "4.4"],
      ["矫正视力(右)", "4.8", "矫正视力(左)", "4.8"],
      ["矫正度数(右)", "300", "矫正度数(左)", "300"],
      ["彩色图案及数码检查", "正常", "色觉检查图名称", "喻自萍"],
      ["单色识别-红", "能识别", "单色识别-黄", "能识别"],
      ["单色识别-绿", "能识别", "单色识别-蓝", "能识别"],
      ["单色识别-紫", "能识别", "", ""],
      ["医生意见", "专业受限", "", ""],
      ["书面意见", "受限24.25", "", ""],
      ["说明", "任何一只眼睛裸眼视力4.8（含）以上的，矫正视力值为“0”或为空的，均表示无需矫正。", "", ""]
    ]) +
    gradeInfoCard("内科", [
      ["收缩压(MmHg)", "97", "舒张压(MmHg)", "71"],
      ["发育情况", "良", "心脏血管", "正常"],
      ["呼吸系统", "正常", "神经系统", "正常"],
      ["肝长(cm)", "0", "肝性质", "正常"],
      ["脾长(cm)", "0", "脾性质", "正常"],
      ["医生意见", "合格", "", ""],
      ["书面意见", "无", "", ""]
    ]) +
    gradeInfoCard("外科", [
      ["身高(cm)", "160", "体重(kg)", "68"],
      ["皮肤", "正常", "面部", "正常"],
      ["颈部", "正常", "脊柱", "正常"],
      ["四肢", "正常", "关节", "正常"]
    ]);
  }

  function gradeInfoCard(title, rows) {
    return '<section class="grade-info-card"><h2>' + escapeHtml(title) + '</h2><table class="grade-info-table"><tbody>' +
      rows.map(function (row) {
        var wide = row[2] === "" && row[3] === "";
        return '<tr><th>' + escapeHtml(row[0]) + '</th><td' + (wide ? ' colspan="3"' : '') + '>' + escapeHtml(row[1]) + '</td>' +
          (wide ? "" : '<th>' + escapeHtml(row[2]) + '</th><td>' + escapeHtml(row[3]) + '</td>') + '</tr>';
      }).join("") + '</tbody></table></section>';
  }

  function renderVolunteerAssist(initialView) {
    if (!main) return;
    document.title = "重庆市统一高考志愿填报辅助系统";
    document.body.classList.add("score-mode", "volunteer-mode");
    document.body.classList.remove("score-login-mode", "score-result-mode", "grade-portal-mode");

    main.innerHTML = '<section class="volunteer-page history-normal-page" data-zy-view="history">' +
      '<header class="volunteer-top arco-layout-header">' +
        '<a class="zy-logo ac-navbar-logo" href="javascript:;" aria-label="系统首页"><img class="logo" src="https://www.cqzk.com.cn/apps/zyfz/file/upload/image/Image_1728611594151-8432-9FZ116B6CW26U8E-1153761511.svg" alt=""></a>' +
        '<nav class="zy-nav ac-navigation"><a href="javascript:;" data-zy-nav="home">主页</a><a class="active" href="javascript:;" data-zy-nav="history">历史数据查询' + downIconMarkup() + '</a><a href="javascript:;" data-zy-nav="plan">招生计划查询</a><a href="javascript:;" data-zy-nav="choice">备选志愿参考</a><a href="javascript:;" data-zy-nav="major">专业知识库</a><a href="javascript:;" data-zy-nav="video">视频专区</a><a href="javascript:;" data-zy-nav="manual">使用手册</a></nav>' +
        '<button type="button" class="back-score ac-nav-personal"><span class="user-avatar">' + userIconMarkup() + '</span><span class="text">我的</span>' + downIconMarkup() + '</button>' +
      '</header>' +
      '<div class="zy-content">' +
        '<div class="zy-breadcrumb"><a href="javascript:;">主页</a><span>/</span><a href="javascript:;">历史数据查询</a><span>/</span><strong>普通类</strong></div>' +
        '<section class="card-system-search history-section">' +
          '<div class="system-form">' +
            '<div class="form-row"><div class="form-label">首选科目</div><div class="form-control"><div class="segmented-line"><label class="segmented"><input type="radio" name="subjectFilter" value="5" checked><span>物理</span></label><label class="segmented"><input type="radio" name="subjectFilter" value="1"><span>历史</span></label></div></div></div>' +
            '<div class="form-row"><div class="form-label">选择批次</div><div class="form-control"><select name="batchSelect"><option value="2" selected>本科批</option></select></div></div>' +
            '<div class="form-row"><div class="form-label">院校省份</div><div class="form-control"><select name="cityFilter"><option value="">请选择省份</option><option>北京</option><option>天津</option><option>河北</option><option>山西</option><option>内蒙古</option><option>辽宁</option><option>吉林</option><option>黑龙江</option><option>上海</option><option>江苏</option><option>浙江</option><option>安徽</option><option>福建</option><option>江西</option><option>山东</option><option>河南</option><option>湖北</option><option>湖南</option><option>广东</option><option>广西</option><option>海南</option><option>重庆</option><option>四川</option><option>贵州</option><option>云南</option><option>西藏</option><option>陕西</option><option>甘肃</option><option>青海</option><option>宁夏</option><option>新疆</option><option>香港</option></select></div></div>' +
            '<div class="form-row"><div class="form-label">选择院校</div><div class="form-control school-picker"><button type="button" class="select-school">选择</button><input name="schoolKeyword" placeholder="请选择院校"></div></div>' +
            '<div class="form-row form-row-wide"><div class="form-label">院校标签</div><div class="form-control checkbox-line"><label><input type="checkbox" name="schoolTags" value="公办">公办</label><label><input type="checkbox" name="schoolTags" value="民办">民办</label><label><input type="checkbox" name="schoolTags" value="独立学院">独立学院</label><label><input type="checkbox" name="schoolTags" value="内地与港澳台地区合作办学">内地与港澳台地区合作办学</label><label><input type="checkbox" name="schoolTags" value="中外合作办学">中外合作办学</label><label><span class="tag-sep">|</span><input type="checkbox" name="schoolTags" value="211工程高校">"211工程高校"</label><label><input type="checkbox" name="schoolTags" value="985工程高校">"985工程高校"</label><label><input type="checkbox" name="schoolTags" value="双一流">"双一流"建设高校及建设学科</label></div></div>' +
            '<div class="form-row form-row-wide"><div class="form-label">专业名称</div><div class="form-control major-filter"><div class="radio-line"><label><input type="radio" name="majorMode" value="include" checked>只显示以下专业</label><label><input type="radio" name="majorMode" value="exclude">不显示以下专业</label></div><div class="major-input"><input name="majorKeyword" placeholder="请输入专业名称，多个专业请用英文逗号“,”分割，支持模糊查询，最多可输入5个专业名称"><button type="button" class="major-add" aria-label="添加专业">' + plusCircleIconMarkup() + '</button></div></div></div>' +
            '<div class="form-row form-row-wide"><div class="form-label">查询范围</div><div class="form-control range-filter"><div class="radio-line"><label><input type="radio" name="rangeMode" value="rank" checked>位次</label><label><input type="radio" name="rangeMode" value="score">分数</label></div><div class="score-range"><input name="rankMin" inputmode="numeric" placeholder="最低"><em>至</em><input name="rankMax" inputmode="numeric" placeholder="最高"><span class="range-unit">名</span><small>（位次范围差不超过5000名）</small></div></div></div>' +
          '</div>' +
          '<div class="search-footer"><button type="button" class="history-search">查 询</button><button type="button" class="history-reset">重 置</button></div>' +
        '</section>' +
        '<section class="history-tip history-section"><h3>温馨提示</h3><p>系统提供2023年、2024年和2025年在渝招生高校各专业（分物理类、历史类）的录取人数、录取分数和位次等信息。考生及家长在查阅院校录取历史数据时，还需密切关注教育部阳光高考平台、重庆市教育考试院门户网、重庆招考信息网、高校官方网站及重庆招考微信公众号等权威渠道发布的相关政策及解读，综合分析、谨慎抉择、合理参考使用录取历史数据。</p></section>' +
        '<section class="school-list history-section"></section>' +
        '<section class="card-system-search plan-section">' +
          '<div class="system-form plan-form">' +
            '<div class="form-row"><div class="form-label">首选科目</div><div class="form-control"><div class="segmented-line"><label class="segmented"><input type="radio" name="planSubject" value="历史" checked><span>历史</span></label><label class="segmented"><input type="radio" name="planSubject" value="物理"><span>物理</span></label></div></div></div>' +
            '<div class="form-row"><div class="form-label">再选科目</div><div class="form-control checkbox-line"><label><input type="checkbox" name="planElective" value="生物学" checked>生物学</label><label><input type="checkbox" name="planElective" value="思想政治" checked>思想政治</label><label><input type="checkbox" name="planElective" value="化学">化学</label><label><input type="checkbox" name="planElective" value="地理">地理</label></div></div>' +
            '<div class="form-row"><div class="form-label">院校省份</div><div class="form-control"><select name="planProvince"><option value="">请选择省份</option><option>重庆</option><option>四川</option><option>北京</option><option>上海</option><option>湖北</option><option>江苏</option><option>广东</option><option>陕西</option></select></div></div>' +
            '<div class="form-row"><div class="form-label">选择院校</div><div class="form-control school-picker"><button type="button" class="select-plan-school">选择</button><input name="planSchool" placeholder="请选择院校"></div></div>' +
            '<div class="form-row form-row-wide"><div class="form-label">专业名称</div><div class="form-control major-filter"><div class="radio-line"><label><input type="radio" name="planMajorMode" value="include" checked>只显示以下专业</label><label><input type="radio" name="planMajorMode" value="exclude">不显示以下专业</label></div><div class="major-input"><input name="planMajor" placeholder="请输入专业名称，多个专业请用英文逗号“,”分割，支持模糊查询，最多可输入5个专业名称"><button type="button" class="plan-major-add" aria-label="添加专业">' + plusCircleIconMarkup() + '</button></div></div></div>' +
          '</div>' +
          '<div class="search-footer"><button type="button" class="plan-search">查 询</button><button type="button" class="history-reset plan-reset">重 置</button></div>' +
        '</section>' +
        '<section class="history-tip plan-section"><h3>温馨提示</h3><p>本系统用于查询2026年全国在渝招生高校普通类、艺术类、体育类各批次招生计划信息。</p><p>正式填报高考志愿前，考生要特别留意计划的增补或更正通知。如有增补或更正，将在志愿填报网站上进行公布，请在填报志愿前认真查看。</p><p>部分招生计划要求考生须具备相应的资格条件；本系统所显示的招生计划与考生录取照顾资格、专项报考资格信息及选考科目相匹配。</p><p>招生计划的显示顺序按批次代码、院校代号、专业代号依次排序。使用【指定院校】功能查询时，每次可选择院校数量不超过5所。</p><p><a href="https://www.moe.gov.cn/srcsite/A22/s7065/202202/t20220211_598710.html">《教育部 财政部 国家发展改革委关于公布第二轮“双一流”建设高校及建设学科名单的通知》（点击进入教育部官网查看详情）。</a><a href="https://www.cdgdc.edu.cn/dslxkpgjggb/">全国第四轮学科评估结果（点击进入中国学位与研究生教育信息网查看详情）。</a></p></section>' +
        '<section class="plan-list plan-section"></section>' +
        '<footer class="zy-footer"><p>© 2021-2026 cqzk.com.cn All rights reserved.</p><p>渝ICP备案号：渝B2-20030020号　渝公网安备：50010302000805号</p></footer>' +
      '</div>' +
      '<div class="zy-modal" role="dialog" aria-modal="true" aria-label="温馨提示"><div class="zy-modal-card"><h3>温馨提示</h3><p>系统提供2023年、2024年和2025年在渝招生高校各专业（分物理类、历史类）的录取人数、录取分数和位次等信息。考生及家长在查阅院校录取历史数据时，还需密切关注教育部阳光高考平台、重庆市教育考试院门户网、重庆招考信息网、高校官方网站及重庆招考微信公众号等权威渠道发布的相关政策及解读，认真阅读《2026招生计划汇编》（本书预计将于2026年6月中旬出版）及本系统招生计划查询功能公布的在渝招生普通高校招生专业（类）选考科目要求，综合分析、谨慎抉择、合理参考使用录取历史数据。</p><button type="button" class="modal-ok">确定</button></div></div>' +
    '</section>';

    setupVolunteerAssist(initialView || "history");
  }

  function setupVolunteerAssist(initialView) {
    var historyDataset = normalizeHistoryRows(readLocalHistoryDataset());
    var historyRoute = null;
    var historyYears = ["2025", "2024", "2023"];
    var planDataset = readLocalPlanDataset();
    var state = {
      subject: "5",
      batch: "2",
      year: "2025",
      rangeMode: "rank",
      sortKey: "minRank",
      sortDir: "desc",
      rangeMin: "",
      rangeMax: "",
      city: "",
      school: "",
      schoolCodes: [],
      major: "",
      majorMode: "include",
      tags: [],
      hasSearched: false,
      loading: false,
      total: 0,
      page: 1,
      pageSize: 100,
      error: ""
    };
    var list = document.querySelector(".school-list");
    var planList = document.querySelector(".plan-list");
    var modal = document.querySelector(".zy-modal");
    var back = document.querySelector(".back-score");
    var keyword = document.querySelector('input[name="schoolKeyword"]');
    var majorKeyword = document.querySelector('input[name="majorKeyword"]');
    var city = document.querySelector('select[name="cityFilter"]');
    var batchSelect = document.querySelector('select[name="batchSelect"]');
    var rangeMin = document.querySelector('input[name="rankMin"]');
    var rangeMax = document.querySelector('input[name="rankMax"]');
    var rangeUnit = document.querySelector(".range-unit");
    var rangeHint = document.querySelector(".score-range small");
    var crumb = document.querySelector(".zy-breadcrumb");
    var planSchool = document.querySelector('input[name="planSchool"]');
    var planMajor = document.querySelector('input[name="planMajor"]');
    var planProvince = document.querySelector('select[name="planProvince"]');
    var planState = {
      subject: "历史",
      electives: ["生物学", "思想政治"],
      province: "",
      school: "",
      major: "",
      majorMode: "include",
      hasSearched: false
    };

    if (back) back.addEventListener("click", function () { navigate("/score/result.html", true); });

    document.querySelectorAll("[data-zy-nav]").forEach(function (button) {
      button.addEventListener("click", function () {
        setZyView(button.dataset.zyNav || "history");
      });
    });

    if (modal) {
      var modalOk = modal.querySelector(".modal-ok");
      if (modalOk) modalOk.addEventListener("click", function () { modal.classList.add("hidden"); });
    }

    document.querySelector(".select-school").addEventListener("click", function () {
      if (keyword) keyword.focus();
    });
    document.querySelector(".select-plan-school").addEventListener("click", function () {
      if (planSchool) planSchool.focus();
    });

    document.querySelector(".major-add").addEventListener("click", function () {
      if (majorKeyword) majorKeyword.focus();
    });
    document.querySelector(".plan-major-add").addEventListener("click", function () {
      if (planMajor) planMajor.focus();
    });

    document.querySelector(".history-search").addEventListener("click", function () {
      state.hasSearched = true;
      renderHistoryList();
    });

    document.querySelector(".history-reset").addEventListener("click", function () {
      state.subject = "5";
      state.batch = "2";
      state.year = "2025";
      state.rangeMode = "rank";
      state.rangeMin = "";
      state.rangeMax = "";
      state.city = "";
      state.school = "";
      state.schoolCodes = [];
      state.major = "";
      state.majorMode = "include";
      state.tags = [];
      state.hasSearched = false;
      state.loading = false;
      state.total = 0;
      state.error = "";
      syncForm();
      list.innerHTML = "";
    });
    document.querySelector(".plan-search").addEventListener("click", function () {
      planState.hasSearched = true;
      renderPlanList();
    });
    document.querySelector(".plan-reset").addEventListener("click", function () {
      planState.subject = "历史";
      planState.electives = ["生物学", "思想政治"];
      planState.province = "";
      planState.school = "";
      planState.major = "";
      planState.majorMode = "include";
      planState.hasSearched = false;
      syncPlanForm();
      planList.innerHTML = "";
    });

    [keyword, majorKeyword, city, batchSelect, rangeMin, rangeMax].forEach(function (field) {
      if (!field) return;
      field.addEventListener("input", updateStateFromForm);
      field.addEventListener("change", function () {
        updateStateFromForm();
        if (state.hasSearched) renderHistoryList();
      });
    });
    [planSchool, planMajor, planProvince].forEach(function (field) {
      if (!field) return;
      field.addEventListener("input", updatePlanStateFromForm);
      field.addEventListener("change", function () {
        updatePlanStateFromForm();
        if (planState.hasSearched) renderPlanList();
      });
    });

    document.querySelectorAll('input[name="subjectFilter"], input[name="majorMode"], input[name="rangeMode"], input[name="schoolTags"]').forEach(function (input) {
      input.addEventListener("change", function () {
        updateStateFromForm();
        updateRangeMode();
        if (state.hasSearched) renderHistoryList();
      });
    });
    document.querySelectorAll('input[name="planSubject"], input[name="planElective"], input[name="planMajorMode"]').forEach(function (input) {
      input.addEventListener("change", function () {
        updatePlanStateFromForm();
        if (planState.hasSearched) renderPlanList();
      });
    });

    loadHistoryConfig();
    updateRangeMode();
    syncForm();
    syncPlanForm();
    setZyView(initialView || "history");
    list.innerHTML = "";
    if (initialView === "plan") showPlanNotice();

    function loadHistoryConfig() {
      Promise.all([
        fetchJson("/api/zyfz/route/history-normal"),
        fetchJson("/api/zyfz/dict/history-years")
      ]).then(function (responses) {
        historyRoute = responses[0] && responses[0].data ? responses[0].data : null;
        if (historyRoute && historyRoute.form) {
          try {
            var defaultForm = JSON.parse(historyRoute.form);
            state.year = String(defaultForm.year || state.year);
            state.pageSize = Number(historyRoute.pageSize || defaultForm.pageSize || state.pageSize);
          } catch (error) {}
        }
        var years = normalizeApiData(responses[1]);
        if (Array.isArray(years) && years.length) {
          historyYears = years.map(function (item) {
            return String(item.value || item.name || "");
          }).filter(Boolean);
          state.year = historyYears[0] || state.year;
        }
        syncForm();
      }).catch(function () {
        historyRoute = null;
      });
    }

    function setZyView(view) {
      document.querySelectorAll("[data-zy-nav]").forEach(function (item) {
        item.classList.toggle("active", item.dataset.zyNav === view || (view === "history" && item.dataset.zyNav === "history"));
      });
      document.querySelector(".volunteer-page").setAttribute("data-zy-view", view);
      updateBreadcrumb(view);
      if (view === "plan" && !planState.hasSearched) showPlanNotice();
    }

    function updateBreadcrumb(view) {
      if (!crumb) return;
      var map = {
        home: ["主页"],
        history: ["历史数据查询", "普通类"],
        plan: ["招生计划查询"],
        choice: ["备选志愿参考"],
        major: ["专业知识库"],
        video: ["视频专区"],
        manual: ["使用手册"]
      };
      var parts = map[view] || map.history;
      crumb.innerHTML = '<a href="javascript:;" data-zy-crumb="home">主页</a>' + parts.map(function (part) {
        return '<span>›</span><strong>' + escapeHtml(part) + '</strong>';
      }).join("");
      var homeCrumb = crumb.querySelector("[data-zy-crumb]");
      if (homeCrumb) homeCrumb.addEventListener("click", function () { setZyView("home"); });
    }

    function updateRangeMode() {
      var modeInput = document.querySelector('input[name="rangeMode"]:checked');
      state.rangeMode = modeInput ? modeInput.value : "rank";
      var isScore = state.rangeMode === "score";
      if (rangeUnit) rangeUnit.textContent = isScore ? "分" : "名";
      if (rangeHint) rangeHint.textContent = isScore ? "（分数范围差不超过5000分）" : "（位次范围差不超过5000名）";
      if (rangeMin) rangeMin.placeholder = isScore ? "最低" : "最低";
      if (rangeMax) rangeMax.placeholder = isScore ? "最高" : "最高";
    }

    function updateStateFromForm() {
      var subject = document.querySelector('input[name="subjectFilter"]:checked');
      var majorMode = document.querySelector('input[name="majorMode"]:checked');
      var rangeMode = document.querySelector('input[name="rangeMode"]:checked');
      state.subject = subject ? subject.value : "5";
      state.batch = batchSelect ? batchSelect.value : "2";
      state.city = city ? city.value : "";
      state.school = keyword ? keyword.value.trim() : "";
      state.major = majorKeyword ? majorKeyword.value.trim() : "";
      state.majorMode = majorMode ? majorMode.value : "include";
      state.rangeMode = rangeMode ? rangeMode.value : "rank";
      state.rangeMin = rangeMin ? rangeMin.value.trim() : "";
      state.rangeMax = rangeMax ? rangeMax.value.trim() : "";
      state.tags = Array.prototype.slice.call(document.querySelectorAll('input[name="schoolTags"]:checked')).map(function (input) {
        return input.value;
      });
    }

    function syncForm() {
      var subject = document.querySelector('input[name="subjectFilter"][value="' + state.subject + '"]');
      if (subject) subject.checked = true;
      if (batchSelect) batchSelect.value = state.batch;
      if (keyword) keyword.value = state.school;
      if (majorKeyword) majorKeyword.value = state.major;
      if (city) city.value = state.city;
      if (rangeMin) rangeMin.value = state.rangeMin;
      if (rangeMax) rangeMax.value = state.rangeMax;
      var majorMode = document.querySelector('input[name="majorMode"][value="' + state.majorMode + '"]');
      if (majorMode) majorMode.checked = true;
      var rangeMode = document.querySelector('input[name="rangeMode"][value="' + state.rangeMode + '"]');
      if (rangeMode) rangeMode.checked = true;
      document.querySelectorAll('input[name="schoolTags"]').forEach(function (input) {
        input.checked = state.tags.indexOf(input.value) >= 0;
      });
      updateRangeMode();
    }
    function updatePlanStateFromForm() {
      var subject = document.querySelector('input[name="planSubject"]:checked');
      var majorMode = document.querySelector('input[name="planMajorMode"]:checked');
      planState.subject = subject ? subject.value : "历史";
      planState.province = planProvince ? planProvince.value : "";
      planState.school = planSchool ? planSchool.value.trim() : "";
      planState.major = planMajor ? planMajor.value.trim() : "";
      planState.majorMode = majorMode ? majorMode.value : "include";
      planState.electives = Array.prototype.slice.call(document.querySelectorAll('input[name="planElective"]:checked')).map(function (input) {
        return input.value;
      });
    }

    function syncPlanForm() {
      var subject = document.querySelector('input[name="planSubject"][value="' + planState.subject + '"]');
      if (subject) subject.checked = true;
      if (planProvince) planProvince.value = planState.province;
      if (planSchool) planSchool.value = planState.school;
      if (planMajor) planMajor.value = planState.major;
      var majorMode = document.querySelector('input[name="planMajorMode"][value="' + planState.majorMode + '"]');
      if (majorMode) majorMode.checked = true;
      document.querySelectorAll('input[name="planElective"]').forEach(function (input) {
        input.checked = planState.electives.indexOf(input.value) >= 0;
      });
    }

    function showPlanNotice() {
      if (!planList) return;
      planList.innerHTML = '<div class="main-data plan-empty-panel"><div class="empty-choice"><div class="table-empty-title">请设置查询条件后点击“查 询”</div><p>当前默认条件：首选科目历史，再选科目生物学、思想政治。</p></div></div>';
    }

    function renderPlanList() {
      updatePlanStateFromForm();
      var rows = planDataset.filter(function (row) {
        var subjectOk = row.subject === planState.subject;
        var provinceOk = !planState.province || row.province === planState.province;
        var schoolOk = !planState.school || row.college.indexOf(planState.school) >= 0 || row.code.indexOf(planState.school) >= 0;
        var terms = planState.major.split(",").map(function (item) { return item.trim(); }).filter(Boolean).slice(0, 5);
        var majorMatch = !terms.length || terms.some(function (term) { return row.major.indexOf(term) >= 0 || row.majorCode.indexOf(term) >= 0; });
        var majorOk = planState.majorMode === "include" ? majorMatch : !majorMatch;
        var electiveOk = !row.requirements.length || row.requirements.every(function (item) {
          return item === "不限" || item === planState.subject || planState.electives.indexOf(item) >= 0;
        });
        return subjectOk && provinceOk && schoolOk && majorOk && electiveOk;
      }).sort(function (a, b) {
        return a.batchCode.localeCompare(b.batchCode) || a.code.localeCompare(b.code) || a.majorCode.localeCompare(b.majorCode);
      });
      planList.innerHTML = renderPlanResultTable(rows);
    }

    function renderPlanResultTable(rows) {
      var tool = '<div class="history-year-nav plan-summary"><div><strong>2026年招生计划</strong><span> 共 ' + rows.length + ' 条</span></div><div class="main-data-tool"><span>显示顺序：批次代码、院校代号、专业代号</span></div></div>';
      var table = '<div class="main-data"><table class="history-result-table plan-result-table"><thead><tr>' +
        '<th>院校信息</th><th>专业信息</th><th>批次</th><th>选科要求</th><th>计划数</th><th>学制</th><th>学费</th><th>备注</th>' +
        '</tr></thead><tbody>';
      var body = rows.length ? rows.map(function (row) {
        return '<tr>' +
          '<td class="school-info"><a class="official-blue">' + escapeHtml(row.college) + '</a><p><b>' + escapeHtml(row.code) + '</b><i></i>' + escapeHtml(row.province) + '　' + escapeHtml(row.nature) + '</p></td>' +
          '<td class="major-info"><a class="official-blue">' + escapeHtml(row.major) + '</a><p>专业代号：<b>' + escapeHtml(row.majorCode) + '</b><span>办学地点：' + escapeHtml(row.campus) + '</span></p></td>' +
          '<td class="score-cell"><span>' + escapeHtml(row.batch) + '</span></td>' +
          '<td class="plan-require">' + escapeHtml(row.requirements.join("、") || "不限") + '</td>' +
          '<td class="count-cell"><b>' + escapeHtml(row.plan) + '</b></td>' +
          '<td class="score-cell"><span>' + escapeHtml(row.duration) + '</span></td>' +
          '<td class="score-cell"><span>' + escapeHtml(row.tuition) + '</span></td>' +
          '<td class="plan-note">' + escapeHtml(row.note) + '</td>' +
        '</tr>';
      }).join("") : '<tr><td colspan="8" class="empty-choice"><div class="table-empty-title">暂无数据</div><p>请调整首选科目、再选科目、院校省份、院校或专业名称后重新查询。</p></td></tr>';
      return tool + table + body + '</tbody></table><div class="history-result-foot">数据为本地复刻样例，用于还原页面查询逻辑和表格展示。</div></div>';
    }

    function renderHistoryList() {
      updateStateFromForm();
      state.loading = true;
      state.error = "";
      list.innerHTML = renderHistoryResultTable([]);
      fetchJson("/api/zyfz/history/normal/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildHistoryPayload())
      }).then(function (body) {
        var data = normalizeApiData(body);
        if (!data || !Array.isArray(data.list)) throw new Error(body && body.msg ? body.msg : "查询失败");
        var rows = applyHistoryFilters(normalizeHistoryRows(data.list));
        state.total = Number(rows.length || data.count || 0);
        state.page = Number(data.page || 1);
        state.pageSize = Number(data.pageSize || state.pageSize);
        state.loading = false;
        list.innerHTML = renderHistoryResultTable(rows);
        bindResultControls();
      }).catch(function () {
        var fallback = filterFallbackRows();
        state.total = fallback.length;
        state.loading = false;
        state.error = "原站接口暂时不可用，当前显示本地兜底数据。";
        list.innerHTML = renderHistoryResultTable(fallback);
        bindResultControls();
      });
    }

    function renderHistoryResultTable(rows) {
      var yearTabs = '<div class="history-year-nav"><div class="arco-radio-group-button" role="tablist">' +
        historyYears.map(function (year) {
          return '<button type="button" class="arco-radio-button' + (state.year === year ? ' arco-radio-checked' : '') + '" data-result-year="' + year + '"><span>' + year + '年</span></button>';
        }).join("") +
      '</div><div class="main-data-tool"><span class="main-data-tool-label">结果排序：</span><select class="main-data-tool-select"><option>最低分位次</option><option>最高分位次</option><option>平均分</option></select><select class="main-data-tool-select"><option>从高到低</option><option>从低到高</option></select></div></div>';
      var headers = '<div class="main-data"><table class="history-result-table"><thead><tr>' +
        '<th>院校信息</th>' +
        '<th>专业信息</th>' +
        '<th>原始计划<br>及录取人数</th>' +
        '<th>最高分及位次</th>' +
        '<th>平均分</th>' +
        '<th>最低分及位次</th>' +
        '<th>近三年<br>数据</th>' +
        '<th>删除</th>' +
      '</tr></thead><tbody>';
      var body = state.loading ? '<tr><td colspan="8" class="empty-choice"><div class="table-empty-title">正在请求原站数据...</div><p>请稍候。</p></td></tr>' : rows.length ? rows.map(function (row) {
        var tags = [row.province, row.nature].concat(row.tags || []).filter(Boolean).join("　");
        return '<tr>' +
          '<td class="school-info"><a class="official-blue">' + escapeHtml(formatCollegeName(row)) + '</a><p>' + escapeHtml(tags) + '</p></td>' +
          '<td class="major-info"><a class="official-blue">' + escapeHtml(row.major) + '</a><p><span>专业代号：<b>' + escapeHtml(row.majorCode) + '</b></span><span>选科要求：<b>' + escapeHtml(row.requirement || "不限") + '</b></span></p></td>' +
          '<td class="count-cell"><b>' + escapeHtml(row.plan || "1") + '</b><i></i><b>' + escapeHtml(row.admit || "1") + '</b></td>' +
          '<td class="score-cell"><span>' + escapeHtml(row.maxScore || row.minScore) + '</span><i></i><b>' + escapeHtml(row.maxRank || row.minRank) + '</b></td>' +
          '<td class="score-cell"><span>' + escapeHtml(row.avgScore || row.minScore) + '</span></td>' +
          '<td class="score-cell"><span>' + escapeHtml(row.minScore) + '</span><i></i><b>' + escapeHtml(row.minRank) + '</b></td>' +
          '<td class="icon-cell"><button type="button" aria-label="近三年数据">' + searchIconMarkup() + '</button></td>' +
          '<td class="icon-cell"><button type="button" aria-label="删除">' + trashIconMarkup() + '</button></td>' +
        '</tr>';
      }).join("") : '<tr><td colspan="8" class="empty-choice"><div class="table-empty-title">暂无数据</div><p>请调整批次、省份、院校、专业或查询范围后重新查询。</p></td></tr>';
      var foot = '<div class="history-result-foot">' + (state.error ? escapeHtml(state.error) + "　" : "") + '共 ' + escapeHtml(String(state.total || rows.length || 0)) + ' 条数据</div>';
      return yearTabs + headers + body + "</tbody></table>" + foot + "</div>";
    }

    function normalizeHistoryRows(source) {
      return source.map(function (row) {
        var tags = [];
        if (Number(row.is985)) tags.push("985");
        if (Number(row.is211)) tags.push("211");
        if (Number(row.sfyldx) || Number(row.isYLYXJSGX) || Number(row.isYLXKJSGX)) tags.push("双一流");
        return {
          college: row.collageName || row.college || row.schoolName || "",
          collegeNo: row.collage || row.code || "",
          collegeCode: row.collageCode || row.code || row.schoolCode || "",
          majorCode: row.major || row.majorCode || "",
          major: row.majorName || row.major || "",
          minScore: Number(row.majorMinScore || row.minScore || row.lowScore || 0),
          minRank: Number(row.majorMinScoreRank || row.minRank || row.lowRank || 0),
          avgScore: Number(row.majorAvgScore || row.avgScore || row.minScore || 0),
          maxScore: Number(row.majorMaxScore || row.maxScore || row.highScore || 0),
          maxRank: Number(row.majorMaxScoreRank || row.maxRank || row.highRank || 0),
          plan: row.majorPlan || row.plan || "1",
          admit: row.majorReal || row.admit || "1",
          province: row.province || inferProvince(row.collageName || row.college || row.schoolName || ""),
          subject: row.majorRequirementName || row.subject || "历史",
          nature: row.yxxz || row.nature || "公办",
          requirement: normalizeRequirement(row.majorRequirementName || row.requirement || ""),
          tags: tags.length ? tags : (row.tags || [])
        };
      });
    }

    function inferProvince(name) {
      if (name.indexOf("重庆") >= 0) return "重庆";
      if (name.indexOf("四川") >= 0 || name.indexOf("成都") >= 0) return "四川";
      if (name.indexOf("北京") >= 0) return "北京";
      if (name.indexOf("上海") >= 0) return "上海";
      if (name.indexOf("天津") >= 0) return "天津";
      if (name.indexOf("湖北") >= 0) return "湖北";
      return "";
    }

    function formatCollegeName(row) {
      return (row.collegeNo ? "[" + row.collegeNo + "] " : "") + row.college;
    }

    function normalizeRequirement(value) {
      var text = String(value || "");
      if (!text) return "不限";
      if (text.indexOf("(") >= 0 && text.indexOf(")") > text.indexOf("(")) {
        text = text.substring(text.indexOf("(") + 1, text.indexOf(")"));
      }
      return text.replace(/\+/g, "或").replace(/\*/g, "和");
    }

    function bindResultControls() {
      var selects = list.querySelectorAll(".main-data-tool-select");
      if (selects[0]) {
        selects[0].value = sortKeyToLabel(state.sortKey);
        selects[0].addEventListener("change", function () {
          state.sortKey = valueToSortKey(selects[0].value);
          if (state.hasSearched) renderHistoryList();
        });
      }
      if (selects[1]) {
        selects[1].value = state.sortDir === "asc" ? "从低到高" : "从高到低";
        selects[1].addEventListener("change", function () {
          state.sortDir = selects[1].value === "从低到高" ? "asc" : "desc";
          if (state.hasSearched) renderHistoryList();
        });
      }
      list.querySelectorAll("[data-result-year]").forEach(function (button) {
        button.addEventListener("click", function () {
          state.year = button.dataset.resultYear || state.year;
          renderHistoryList();
        });
      });
    }

    function filterFallbackRows() {
      return applyHistoryFilters(historyDataset).sort(function (a, b) {
        var left = Number(a[state.sortKey] || 0);
        var right = Number(b[state.sortKey] || 0);
        return state.sortDir === "asc" ? left - right : right - left;
      });
    }

    function applyHistoryFilters(rows) {
      return rows.filter(function (row) {
        var subjectOk = state.subject === "5" ? row.subject === "物理" : row.subject === "历史";
        var schoolOk = !state.school || row.college.indexOf(state.school) >= 0 || row.major.indexOf(state.school) >= 0;
        var cityOk = !state.city || row.province === state.city;
        var majorTerms = state.major.split(",").map(function (item) { return item.trim(); }).filter(Boolean).slice(0, 5);
        var majorMatch = !majorTerms.length || majorTerms.some(function (term) { return row.major.indexOf(term) >= 0; });
        var majorOk = state.majorMode === "include" ? majorMatch : !majorMatch;
        var tagsOk = !state.tags.length || state.tags.every(function (tag) { return (row.tags || []).indexOf(tag) >= 0; });
        var rangeMinValue = state.rangeMin ? Number(state.rangeMin) : null;
        var rangeMaxValue = state.rangeMax ? Number(state.rangeMax) : null;
        var metric = state.rangeMode === "score" ? row.minScore : row.minRank;
        var lowOk = rangeMinValue === null || metric >= rangeMinValue;
        var highOk = rangeMaxValue === null || metric <= rangeMaxValue;
        return subjectOk && schoolOk && cityOk && majorOk && tagsOk && lowOk && highOk;
      });
    }

    function buildHistoryPayload() {
      var base = historyRoute && historyRoute.form ? JSON.parse(historyRoute.form) : {};
      var range = normalizeRangeValues();
      base.sxkm = state.subject;
      base.pcdm = state.batch;
      base.szsf = state.city ? [state.city] : [];
      base.yxdh = [];
      base.yxbq = state.tags.map(function (tag) {
        if (tag === "985工程高校") return "985";
        if (tag === "211工程高校") return "211";
        return tag;
      });
      base.zycx = {
        zydm: "",
        zydh: "",
        zymc: normalizeMajorKeyword(state.major),
        display: state.majorMode === "exclude" ? "0" : "1"
      };
      base.cxlx = state.rangeMode === "score" ? "fsfw" : "wcfw";
      base.wcfw = state.rangeMode === "score" ? [] : range;
      base.fsfw = state.rangeMode === "score" ? range : [];
      base.year = Number(state.year);
      base.routeId = historyRoute && historyRoute.id ? historyRoute.id : base.routeId || "";
      base.page = state.page || 1;
      base.pageSize = state.pageSize || 100;
      base.order = state.sortDir === "asc" ? "asc" : "desc";
      base.orderBy = sortKeyToOrderBy(state.sortKey);
      return base;
    }

    function normalizeRangeValues() {
      var min = state.rangeMin ? Number(state.rangeMin) : null;
      var max = state.rangeMax ? Number(state.rangeMax) : null;
      if (min === null && max === null) {
        return state.rangeMode === "score" ? [0, 750] : [1, 250000];
      }
      if (min === null) min = state.rangeMode === "score" ? 0 : 1;
      if (max === null) max = state.rangeMode === "score" ? 750 : Math.min(min + 5000, 250000);
      if (max < min) {
        var tmp = min;
        min = max;
        max = tmp;
      }
      var diff = state.rangeMode === "score" ? 20 : 5000;
      if (max - min > diff) max = min + diff;
      return [min, max];
    }

    function normalizeMajorKeyword(value) {
      return String(value || "").trim().replace(/，/g, ",").split(",").map(function (item) {
        return item.trim();
      }).filter(Boolean).slice(0, 5).join(",");
    }

    function fetchJson(url, options) {
      return fetch(url, options || {}).then(function (response) {
        return response.json();
      });
    }

    function normalizeApiData(body) {
      if (!body) return null;
      if (body.success === false) throw new Error(body.msg || "查询失败");
      return body.data !== undefined ? body.data : body;
    }

    function sortKeyToOrderBy(key) {
      if (key === "maxRank") return "ZYLQZGFWC";
      if (key === "avgScore") return "ZYLQPJF";
      return "ZYLQZDFWC";
    }

    function readLocalHistoryDataset() {
      try {
        var script = document.querySelector('script[data-history-dataset]');
        if (script && script.textContent) return JSON.parse(script.textContent);
      } catch (error) {}
      return [
        { college: "重庆大学", code: "5001", majorCode: "130", major: "人文科学试验班(法学新闻类)", minScore: 603, minRank: 1407, avgScore: 608, maxScore: 621, maxRank: 593, subject: "历史", province: "重庆", tags: ["985工程高校", "211工程高校", "双一流"] },
        { college: "重庆大学", code: "5001", majorCode: "192", major: "汉语言文学(博雅类，含中文、历史、哲学专业)", minScore: 610, minRank: 1038, avgScore: 611, maxScore: 613, maxRank: 901, subject: "历史", province: "重庆", tags: ["985工程高校", "211工程高校", "双一流"] },
        { college: "重庆大学", code: "5001", majorCode: "111", major: "马克思主义理论", minScore: 603, minRank: 1407, avgScore: 606, maxScore: 611, maxRank: 985, subject: "历史", province: "重庆", tags: ["985工程高校", "211工程高校", "双一流"] },
        { college: "重庆大学", code: "5001", majorCode: "118", major: "新闻传播学类", minScore: 605, minRank: 1321, avgScore: 607, maxScore: 613, maxRank: 900, subject: "历史", province: "重庆", tags: ["985工程高校", "211工程高校", "双一流"] },
        { college: "重庆大学", code: "5001", majorCode: "124", major: "法学", minScore: 608, minRank: 1189, avgScore: 611, maxScore: 616, maxRank: 821, subject: "历史", province: "重庆", tags: ["985工程高校", "211工程高校", "双一流"] },
        { college: "重庆大学", code: "5001", majorCode: "136", major: "英语", minScore: 600, minRank: 1530, avgScore: 604, maxScore: 609, maxRank: 1034, subject: "历史", province: "重庆", tags: ["985工程高校", "211工程高校", "双一流"] },
        { college: "重庆大学", code: "5001", majorCode: "205", major: "中国语言文学类", minScore: 612, minRank: 962, avgScore: 614, maxScore: 620, maxRank: 632, subject: "历史", province: "重庆", tags: ["985工程高校", "211工程高校", "双一流"] },
        { college: "四川大学", code: "5127", majorCode: "1W3", major: "法学", minScore: 625, minRank: 477, avgScore: 627, maxScore: 632, maxRank: 311, subject: "历史", province: "四川", tags: ["985工程高校", "211工程高校", "双一流"] },
        { college: "四川大学", code: "5127", majorCode: "127", major: "外国语言文学类(含双学士学位)", minScore: 608, minRank: 1141, avgScore: 613, maxScore: 622, maxRank: 559, subject: "历史", province: "四川", tags: ["985工程高校", "211工程高校", "双一流"] },
        { college: "四川大学", code: "5127", majorCode: "1W4", major: "人文科学试验班(中文与新闻传播)", minScore: 617, minRank: 749, avgScore: 622, maxScore: 628, maxRank: 393, subject: "历史", province: "四川", tags: ["985工程高校", "211工程高校", "双一流"] },
        { college: "四川大学", code: "5127", majorCode: "1W6", major: "历史学类", minScore: 615, minRank: 830, avgScore: 618, maxScore: 622, maxRank: 559, subject: "历史", province: "四川", tags: ["985工程高校", "211工程高校", "双一流"] },
        { college: "四川大学", code: "5127", majorCode: "1W1", major: "哲学", minScore: 610, minRank: 1038, avgScore: 613, maxScore: 618, maxRank: 707, subject: "历史", province: "四川", tags: ["985工程高校", "211工程高校", "双一流"] },
        { college: "四川大学", code: "5127", majorCode: "1W2", major: "经济学类", minScore: 617, minRank: 749, avgScore: 619, maxScore: 623, maxRank: 531, subject: "历史", province: "四川", tags: ["985工程高校", "211工程高校", "双一流"] }
        ,{ college: "四川大学", code: "5127", majorCode: "1W8", major: "汉语言文学", minScore: 614, minRank: 871, avgScore: 617, maxScore: 621, maxRank: 590, subject: "历史", province: "四川", tags: ["985工程高校", "211工程高校", "双一流"] }
        ,{ college: "四川大学", code: "5127", majorCode: "1W9", major: "新闻传播学类", minScore: 613, minRank: 903, avgScore: 616, maxScore: 620, maxRank: 640, subject: "历史", province: "四川", tags: ["985工程高校", "211工程高校", "双一流"] }
        ,{ college: "四川大学", code: "5127", majorCode: "1X1", major: "政治学类", minScore: 612, minRank: 949, avgScore: 615, maxScore: 619, maxRank: 688, subject: "历史", province: "四川", tags: ["985工程高校", "211工程高校", "双一流"] }
        ,{ college: "四川大学", code: "5127", majorCode: "1X2", major: "工商管理类", minScore: 609, minRank: 1101, avgScore: 612, maxScore: 617, maxRank: 760, subject: "历史", province: "四川", tags: ["985工程高校", "211工程高校", "双一流"] }
        ,{ college: "重庆大学", code: "5001", majorCode: "301", major: "计算机科学与技术", minScore: 632, minRank: 3380, avgScore: 635, maxScore: 641, maxRank: 2910, subject: "物理", province: "重庆", tags: ["985工程高校", "211工程高校", "双一流"] }
        ,{ college: "重庆大学", code: "5001", majorCode: "302", major: "软件工程", minScore: 630, minRank: 3620, avgScore: 633, maxScore: 638, maxRank: 3140, subject: "物理", province: "重庆", tags: ["985工程高校", "211工程高校", "双一流"] }
        ,{ college: "重庆大学", code: "5001", majorCode: "303", major: "电气工程及其自动化", minScore: 636, minRank: 2912, avgScore: 639, maxScore: 644, maxRank: 2488, subject: "物理", province: "重庆", tags: ["985工程高校", "211工程高校", "双一流"] }
        ,{ college: "重庆大学", code: "5001", majorCode: "304", major: "电子信息类", minScore: 634, minRank: 3150, avgScore: 637, maxScore: 642, maxRank: 2740, subject: "物理", province: "重庆", tags: ["985工程高校", "211工程高校", "双一流"] }
        ,{ college: "重庆大学", code: "5001", majorCode: "305", major: "自动化", minScore: 631, minRank: 3510, avgScore: 634, maxScore: 639, maxRank: 3001, subject: "物理", province: "重庆", tags: ["985工程高校", "211工程高校", "双一流"] }
        ,{ college: "重庆大学", code: "5001", majorCode: "306", major: "建筑类", minScore: 624, minRank: 4488, avgScore: 628, maxScore: 633, maxRank: 3912, subject: "物理", province: "重庆", tags: ["985工程高校", "211工程高校", "双一流"] }
        ,{ college: "四川大学", code: "5127", majorCode: "401", major: "计算机类", minScore: 646, minRank: 1805, avgScore: 649, maxScore: 654, maxRank: 1260, subject: "物理", province: "四川", tags: ["985工程高校", "211工程高校", "双一流"] }
        ,{ college: "四川大学", code: "5127", majorCode: "402", major: "软件工程", minScore: 644, minRank: 2020, avgScore: 647, maxScore: 652, maxRank: 1420, subject: "物理", province: "四川", tags: ["985工程高校", "211工程高校", "双一流"] }
        ,{ college: "四川大学", code: "5127", majorCode: "403", major: "电子信息类", minScore: 642, minRank: 2210, avgScore: 646, maxScore: 651, maxRank: 1608, subject: "物理", province: "四川", tags: ["985工程高校", "211工程高校", "双一流"] }
        ,{ college: "四川大学", code: "5127", majorCode: "404", major: "电气工程及其自动化", minScore: 641, minRank: 2340, avgScore: 644, maxScore: 649, maxRank: 1740, subject: "物理", province: "四川", tags: ["985工程高校", "211工程高校", "双一流"] }
        ,{ college: "四川大学", code: "5127", majorCode: "405", major: "临床医学", minScore: 650, minRank: 1400, avgScore: 653, maxScore: 658, maxRank: 990, subject: "物理", province: "四川", tags: ["985工程高校", "211工程高校", "双一流"] }
        ,{ college: "四川大学", code: "5127", majorCode: "406", major: "口腔医学", minScore: 660, minRank: 720, avgScore: 662, maxScore: 666, maxRank: 510, subject: "物理", province: "四川", tags: ["985工程高校", "211工程高校", "双一流"] }
      ];
    }

    function readLocalPlanDataset() {
      return [
        { subject: "历史", requirements: ["不限"], province: "重庆", college: "重庆大学", code: "5001", nature: "公办 双一流", batchCode: "B", batch: "本科批", majorCode: "101", major: "人文科学试验班(法学新闻类)", plan: 18, duration: "四年", tuition: "5625", campus: "虎溪校区", note: "含法学、新闻学、广播电视学" },
        { subject: "历史", requirements: ["思想政治"], province: "重庆", college: "重庆大学", code: "5001", nature: "公办 双一流", batchCode: "B", batch: "本科批", majorCode: "102", major: "马克思主义理论", plan: 8, duration: "四年", tuition: "4500", campus: "虎溪校区", note: "要求思想政治合格" },
        { subject: "历史", requirements: ["不限"], province: "重庆", college: "重庆大学", code: "5001", nature: "公办 双一流", batchCode: "B", batch: "本科批", majorCode: "103", major: "汉语言文学", plan: 12, duration: "四年", tuition: "4500", campus: "A区", note: "博雅类培养" },
        { subject: "历史", requirements: ["不限"], province: "四川", college: "四川大学", code: "5127", nature: "公办 双一流", batchCode: "B", batch: "本科批", majorCode: "1W3", major: "法学", plan: 6, duration: "四年", tuition: "6000", campus: "江安校区", note: "国家级一流本科专业" },
        { subject: "历史", requirements: ["不限"], province: "四川", college: "四川大学", code: "5127", nature: "公办 双一流", batchCode: "B", batch: "本科批", majorCode: "1W4", major: "人文科学试验班(中文与新闻传播)", plan: 10, duration: "四年", tuition: "6000", campus: "江安校区", note: "含汉语言文学、新闻学、广告学" },
        { subject: "历史", requirements: ["地理"], province: "北京", college: "中国人民大学", code: "1102", nature: "公办 双一流", batchCode: "B", batch: "本科批", majorCode: "105", major: "人文科学试验班", plan: 3, duration: "四年", tuition: "5000", campus: "北京", note: "含哲学、历史学等专业" },
        { subject: "历史", requirements: ["思想政治"], province: "北京", college: "中国政法大学", code: "1141", nature: "公办 双一流", batchCode: "B", batch: "本科批", majorCode: "011", major: "政治学与行政学", plan: 2, duration: "四年", tuition: "5000", campus: "昌平校区", note: "外语语种不限" },
        { subject: "物理", requirements: ["化学"], province: "重庆", college: "重庆大学", code: "5001", nature: "公办 双一流", batchCode: "B", batch: "本科批", majorCode: "301", major: "计算机科学与技术", plan: 32, duration: "四年", tuition: "5625", campus: "虎溪校区", note: "大类招生分流培养" },
        { subject: "物理", requirements: ["化学"], province: "重庆", college: "重庆大学", code: "5001", nature: "公办 双一流", batchCode: "B", batch: "本科批", majorCode: "302", major: "电气工程及其自动化", plan: 28, duration: "四年", tuition: "5625", campus: "虎溪校区", note: "国家级一流本科专业" },
        { subject: "物理", requirements: ["化学"], province: "四川", college: "四川大学", code: "5127", nature: "公办 双一流", batchCode: "B", batch: "本科批", majorCode: "401", major: "临床医学", plan: 12, duration: "五年", tuition: "7250", campus: "江安校区", note: "不招色盲、色弱考生" },
        { subject: "物理", requirements: ["化学"], province: "四川", college: "四川大学", code: "5127", nature: "公办 双一流", batchCode: "B", batch: "本科批", majorCode: "402", major: "口腔医学", plan: 5, duration: "五年", tuition: "7250", campus: "华西校区", note: "不招色盲、色弱考生" },
        { subject: "物理", requirements: ["不限"], province: "上海", college: "上海财经大学", code: "3120", nature: "公办 双一流", batchCode: "B", batch: "本科批", majorCode: "018", major: "金融学", plan: 4, duration: "四年", tuition: "7150", campus: "主校区", note: "双一流建设学科相关专业" }
      ];
    }

    function valueToSortKey(label) {
      if (label === "最高分位次") return "maxRank";
      if (label === "平均分") return "avgScore";
      return "minRank";
    }

    function sortKeyToLabel(key) {
      if (key === "maxRank") return "最高分位次";
      if (key === "avgScore") return "平均分";
      return "最低分位次";
    }

    function fetchJson(url, options) {
      return fetch(url, options).then(function (response) {
        return response.text().then(function (text) {
          var parsed = null;
          try {
            parsed = text ? JSON.parse(text) : null;
          } catch (error) {
            parsed = { raw: text };
          }
          if (!response.ok) {
            throw new Error((parsed && parsed.msg) || response.statusText || "Request failed");
          }
          return parsed;
        });
      });
    }

    function normalizeApiData(payload) {
      if (!payload) return [];
      if (Array.isArray(payload)) return payload;
      if (Array.isArray(payload.data)) return payload.data;
      if (payload.data && Array.isArray(payload.data.list)) return payload.data.list;
      if (payload.data && Array.isArray(payload.data.rows)) return payload.data.rows;
      if (payload.rows && Array.isArray(payload.rows)) return payload.rows;
      if (payload.list && Array.isArray(payload.list)) return payload.list;
      return [];
    }
  }

  function ensurePortal() {
    if (!main) return;
    if (document.body.classList.contains("score-mode")) {
      main.innerHTML = initialMainHtml;
      articlePanel = document.querySelector(".article-panel");
      sectionMenu = document.querySelector(".section-menu");
    }
    document.body.classList.remove("score-mode", "score-login-mode", "score-result-mode", "volunteer-mode", "grade-portal-mode");
  }

  function scoreRows() {
    var subjects = [["语文", 124], ["数学", 103], ["外语", 132], ["生物学", 96], ["思想政治", 92], ["历史", 76]];
    var total = subjects.reduce(function (sum, row) {
      return typeof row[1] === "number" ? sum + row[1] : sum;
    }, 0);
    return subjects.concat([["总分", total ? total : "--"]]).map(function (row) {
      return [row[0], String(row[1])];
    });
  }

  function watermarkMarkup() {
    var text = "赵于谕-108323<br>124103132969276623";
    var marks = "";
    for (var index = 0; index < 24; index += 1) {
      marks += '<span>' + text + "</span>";
    }
    return marks;
  }

  function qrMarkup(extraClass, label, variant) {
    var src = variant === "plain" ? "/assets/qrcode-grade-plain.png" : (variant === "marked" ? "/assets/qrcode-grade-marked.png" : "/assets/qrcode_sjb.png");
    return '<img class="qr ' + extraClass + '" src="' + src + '" alt="' + escapeHtml(label) + '">';
  }

  function gradeLogoMarkup() {
    return '<img src="/assets/cqksy-grade-logo.svg" alt="重庆市教育考试院">';
  }

  function qrCodeIconMarkup() {
    return '<svg viewBox="0 0 33 33" role="img" aria-label="二维码"><path fill="#fff" d="M0,0 h33v33H0z"></path><path fill="#18326A" d="M0 0h7v7H0zM1 1v5h5V1zM2 2h3v3H2zM26 0h7v7h-7zM27 1v5h5V1zM28 2h3v3h-3zM0 26h7v7H0zM1 27v5h5v-5zM2 28h3v3H2zM9 0h2v1H9zM13 0h3v1h-3zM18 0h2v2h-1v1h-2V1h1zM22 0h2v1h-2zM9 2h4v1H9zM14 2h1v2h2v1h-4V4h1zM20 2h3v1h1v2h-2V4h-2zM8 5h2v2H8zM11 5h1v1h2v2h-3zM16 6h3v1h-3zM21 6h3v2h-1v1h-2zM0 9h2v2H0zM4 9h3v1H4zM9 9h1v2H8v-1h1zM12 9h2v1h1v2h-3zM17 9h1v3h-2v-1h1zM20 9h4v1h-1v2h-3zM27 9h2v1h2v2h-4zM1 13h2v1h2v2H2v-1H1zM6 12h2v3H7v1H5v-2h1zM10 13h2v2h1v2h-3zM15 13h4v1h-1v2h-2v-1h-1zM21 13h2v1h2v2h-1v1h-3zM28 14h1v1h4v2h-5zM0 18h3v2H1v1H0zM5 18h2v1h2v2H5zM11 18h1v1h3v2h-4zM17 18h3v1h-1v2h-2zM22 18h4v2h-2v1h-2zM29 19h2v1h2v3h-4zM9 23h2v2H9zM13 23h4v1h-1v2h-3zM19 23h2v3h-2zM23 23h3v1h2v2h-5zM30 24h3v2h-3zM9 27h1v2h2v2H9zM14 27h2v1h1v3h-3zM19 28h2v1h2v2h-4zM25 27h1v2h2v1h1v3h-4zM31 28h2v5h-2v-2h-1v-1h1z"></path></svg>';
  }

  function downIconMarkup() {
    return '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" class="arco-icon arco-icon-down" stroke-width="4" stroke-linecap="butt" stroke-linejoin="miter"><path d="M39.6 17.443 24.043 33 8.487 17.443"></path></svg>';
  }

  function userIconMarkup() {
    return '<svg viewBox="0 0 1024 1024" class="arco-icon icon-user" fill="currentColor" aria-hidden="true"><path d="M512 512c113.1 0 204.8-91.7 204.8-204.8S625.1 102.4 512 102.4 307.2 194.1 307.2 307.2 398.9 512 512 512zm0 102.4c-170.7 0-307.2 91.7-307.2 204.8 0 56.6 34.1 102.4 76.8 102.4h460.8c42.7 0 76.8-45.8 76.8-102.4 0-113.1-136.5-204.8-307.2-204.8z"></path></svg>';
  }

  function plusCircleIconMarkup() {
    return '<svg viewBox="0 0 1024 1024" class="arco-icon icon-plus-circle" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm192 480H544v160h-64V544H320v-64h160V320h64v160h160v64z"></path></svg>';
  }

  function linkIconMarkup() {
    return '<svg viewBox="0 0 1024 1024" class="arco-icon icon-link" fill="currentColor" aria-hidden="true"><path d="M574.1 292.7l63.9-63.9c70.6-70.6 185-70.6 255.6 0s70.6 185 0 255.6l-111 111c-70.6 70.6-185 70.6-255.6 0-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c45.6 45.6 119.5 45.6 165.1 0l111-111c45.6-45.6 45.6-119.5 0-165.1s-119.5-45.6-165.1 0l-63.9 63.9c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.2zM449.9 731.3L386 795.2c-70.6 70.6-185 70.6-255.6 0s-70.6-185 0-255.6l111-111c70.6-70.6 185-70.6 255.6 0 12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0c-45.6-45.6-119.5-45.6-165.1 0l-111 111c-45.6 45.6-45.6 119.5 0 165.1s119.5 45.6 165.1 0l63.9-63.9c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.2z"></path><path d="M366.1 657.9c-12.5-12.5-12.5-32.8 0-45.3l246.5-246.5c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3L411.4 657.9c-12.5 12.5-32.8 12.5-45.3 0z"></path></svg>';
  }

  function searchIconMarkup() {
    return '<svg viewBox="0 0 1024 1024" class="arco-icon icon-search" fill="none" stroke="currentColor" stroke-width="80" stroke-linecap="round" aria-hidden="true"><circle cx="430" cy="430" r="246"></circle><path d="M610 610l240 240"></path></svg>';
  }

  function trashIconMarkup() {
    return '<svg viewBox="0 0 1024 1024" class="arco-icon icon-trash" fill="none" stroke="currentColor" stroke-width="70" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true"><path d="M250 310h524M404 310V206h216v104M332 310l38 548h284l38-548"></path><path d="M454 454v260M570 454v260"></path></svg>';
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

  function toastVolunteer(text) {
    showResultToast(text);
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
