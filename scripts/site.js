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
    } else if (route === "/score/assist.html") {
      renderVolunteerAssist();
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
    document.body.classList.remove("score-result-mode", "volunteer-mode");
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
    var candidate = "26500111111371";
    document.body.classList.add("score-mode", "score-result-mode");
    document.body.classList.remove("score-login-mode", "volunteer-mode");
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

  function renderVolunteerAssist() {
    if (!main) return;
    document.title = "重庆市统一高考志愿填报辅助系统";
    document.body.classList.add("score-mode", "volunteer-mode");
    document.body.classList.remove("score-login-mode", "score-result-mode");

    main.innerHTML = '<section class="volunteer-page history-normal-page">' +
      '<header class="volunteer-top">' +
        '<a class="zy-logo" href="javascript:;" aria-label="系统首页"><span class="zy-mark">渝</span><strong>重庆市统一高考志愿填报辅助系统</strong></a>' +
        '<nav class="zy-nav"><a href="javascript:;" data-zy-nav="home">主页</a><a class="active" href="javascript:;" data-zy-nav="history">历史数据查询</a><a href="javascript:;" data-zy-nav="plan">招生计划查询</a><a href="javascript:;" data-zy-nav="choice">备选志愿参考</a><a href="javascript:;" data-zy-nav="major">专业知识库</a><a href="javascript:;" data-zy-nav="video">视频专区</a><a href="javascript:;" data-zy-nav="manual">使用手册</a></nav>' +
        '<button type="button" class="back-score">我的</button>' +
      '</header>' +
      '<div class="zy-content">' +
        '<div class="zy-breadcrumb"><a href="javascript:;">主页</a><span>/</span><a href="javascript:;">历史数据查询</a><span>/</span><strong>普通类</strong></div>' +
        '<section class="card-system-search">' +
          '<div class="system-form">' +
            '<div class="form-row"><div class="form-label">首选科目</div><div class="form-control radio-line"><label><input type="radio" name="subjectFilter" value="物理" checked>物理</label><label><input type="radio" name="subjectFilter" value="历史">历史</label></div></div>' +
            '<div class="form-row"><div class="form-label">选择批次</div><div class="form-control"><select name="batchSelect"><option value="本科批">本科批</option><option value="高职专科批">高职专科批</option><option value="本科提前批A段">本科提前批A段</option><option value="本科提前批B段">本科提前批B段</option></select></div></div>' +
            '<div class="form-row"><div class="form-label">院校省份</div><div class="form-control"><select name="cityFilter"><option value="">请选择省份</option><option>重庆</option><option>北京</option><option>上海</option><option>四川</option><option>湖北</option><option>江苏</option><option>浙江</option><option>广东</option></select></div></div>' +
            '<div class="form-row"><div class="form-label">选择院校</div><div class="form-control school-picker"><button type="button" class="select-school">选择</button><input name="schoolKeyword" placeholder="请选择院校"></div></div>' +
            '<div class="form-row form-row-wide"><div class="form-label">院校标签</div><div class="form-control checkbox-line"><label><input type="checkbox" name="schoolTags" value="公办">公办</label><label><input type="checkbox" name="schoolTags" value="民办">民办</label><label><input type="checkbox" name="schoolTags" value="独立学院">独立学院</label><label><input type="checkbox" name="schoolTags" value="内地与港澳台地区合作办学">内地与港澳台地区合作办学</label><label><input type="checkbox" name="schoolTags" value="中外合作办学">中外合作办学</label><label><input type="checkbox" name="schoolTags" value="211工程高校">"211工程高校"</label><label><input type="checkbox" name="schoolTags" value="985工程高校">"985工程高校"</label><label><input type="checkbox" name="schoolTags" value="双一流">"双一流"建设高校及建设学科</label></div></div>' +
            '<div class="form-row form-row-wide"><div class="form-label">专业名称</div><div class="form-control major-filter"><div class="radio-line"><label><input type="radio" name="majorMode" value="include" checked>只显示以下专业</label><label><input type="radio" name="majorMode" value="exclude">不显示以下专业</label></div><div class="major-input"><input name="majorKeyword" placeholder="请输入专业名称，多个专业请用英文逗号“,”分割，支持模糊查询，最多可输入5个专业名称"><button type="button" class="major-add">+</button></div></div></div>' +
            '<div class="form-row form-row-wide"><div class="form-label">查询范围</div><div class="form-control range-filter"><div class="radio-line"><label><input type="radio" name="rangeMode" value="rank" checked>位次</label><label><input type="radio" name="rangeMode" value="score">分数</label></div><div class="score-range"><input name="rankMin" inputmode="numeric" placeholder="最低"><em>至</em><input name="rankMax" inputmode="numeric" placeholder="最高"><span class="range-unit">名</span><small>（位次范围差不超过5000名）</small></div></div></div>' +
          '</div>' +
          '<div class="search-footer"><button type="button" class="history-search">查 询</button><button type="button" class="history-reset">重 置</button></div>' +
        '</section>' +
        '<section class="history-tip"><h3>温馨提示</h3><p>本系统提供重庆市2023年、2024年、2025年普通高校在渝招生录取历史数据查询，可按物理、历史首选科目及批次、院校、省份、专业、分数或位次条件筛选。</p><p><a href="javascript:;">重庆市2025年全国普通高校各类招生录取最低控制分数线</a><a href="javascript:;">重庆市2024年全国普通高校各类招生录取最低控制分数线</a><a href="javascript:;">重庆市2023年全国普通高校各类招生录取最低控制分数线</a><a href="javascript:;">阳光高考</a><a href="javascript:;">第二轮“双一流”建设高校及建设学科名单</a><a href="javascript:;">第四轮学科评估结果</a></p></section>' +
        '<section class="school-list"></section>' +
        '<section class="choice-panel">' +
          '<div class="panel-head"><h2>备选志愿参考</h2><span>已选 <strong data-choice-count>0</strong>/96 个</span></div>' +
          '<div class="choice-actions"><button type="button" class="fill-recommend">一键生成96个备选志愿</button><button type="button" class="clear-volunteer">清空</button><button type="button" class="save-volunteer">保存</button><button type="button" class="submit-volunteer">锁定参考表</button><button type="button" class="unlock-volunteer">解除锁定</button><button type="button" class="print-volunteer">打印</button></div>' +
          '<div class="choice-table-wrap"><table class="choice-table backup-choice-table"><thead><tr><th>序号</th><th>院校</th><th>专业</th><th>所在地</th><th>梯度</th><th>服从调剂</th><th>操作</th></tr></thead><tbody></tbody></table></div>' +
        '</section>' +
        '<footer class="zy-footer"><p>© 2021-2026 cqzk.com.cn All rights reserved.</p><p>渝ICP备案号：渝B2-20030020号　渝公网安备：50010302000805号</p></footer>' +
      '</div>' +
      '<div class="zy-modal" role="dialog" aria-modal="true" aria-label="温馨提示"><div class="zy-modal-card"><h3>温馨提示</h3><p>本功能仅提供普通类历史数据查询和志愿填报参考。查询结果仅供考生填报志愿时参考，最终招生计划、录取规则及投档录取结果以重庆市教育考试院正式公布内容为准。</p><button type="button" class="modal-ok">确定</button></div></div>' +
    '</section>';

    setupVolunteerAssist();
  }

  function setupVolunteerAssist() {
    var maxChoices = 96;
    var seedSchools = [
      { name: "重庆大学", major: "人文科学试验班 / 法学", city: "重庆", risk: "冲", score: 641, tags: ["公办", "985工程高校", "211工程高校", "双一流"] },
      { name: "西南大学", major: "思想政治教育 / 历史学", city: "重庆", risk: "冲", score: 628, tags: ["公办", "211工程高校", "双一流"] },
      { name: "重庆师范大学", major: "汉语言文学 / 英语", city: "重庆", risk: "稳", score: 594, tags: ["公办"] },
      { name: "四川外国语大学", major: "英语 / 新闻传播学类", city: "重庆", risk: "稳", score: 586, tags: ["公办"] },
      { name: "西南政法大学", major: "政治学与行政学 / 社会工作", city: "重庆", risk: "稳", score: 612, tags: ["公办"] },
      { name: "华中师范大学", major: "历史学类 / 教育学类", city: "湖北", risk: "冲", score: 632, tags: ["公办", "211工程高校", "双一流"] },
      { name: "四川师范大学", major: "生物科学 / 历史学", city: "四川", risk: "保", score: 571, tags: ["公办"] },
      { name: "上海政法学院", major: "法学 / 行政管理", city: "上海", risk: "稳", score: 602, tags: ["公办"] },
      { name: "北京语言大学", major: "外国语言文学类", city: "北京", risk: "冲", score: 625, tags: ["公办"] },
      { name: "重庆文理学院", major: "思想政治教育 / 生物技术", city: "重庆", risk: "保", score: 532, tags: ["公办"] }
    ];
    var schools = buildVolunteerSchools(seedSchools);
    var choices = JSON.parse(localStorage.getItem("volunteerChoices") || "[]");
    if (choices.length > maxChoices) choices = choices.slice(0, maxChoices);
    var submitted = localStorage.getItem("volunteerSubmitted") === "1";
    var currentBatch = localStorage.getItem("volunteerBatch") || "本科批";
    var currentYear = "2025";
    var resultPage = 1;
    var resultPageSize = 10;

    var back = document.querySelector(".back-score");
    var list = document.querySelector(".school-list");
    var tbody = document.querySelector(".backup-choice-table tbody");
    var keyword = document.querySelector('input[name="schoolKeyword"]');
    var majorKeyword = document.querySelector('input[name="majorKeyword"]');
    var city = document.querySelector('select[name="cityFilter"]');
    var batchSelect = document.querySelector('select[name="batchSelect"]');
    var rangeMin = document.querySelector('input[name="rankMin"]');
    var rangeMax = document.querySelector('input[name="rankMax"]');
    var rangeUnit = document.querySelector(".range-unit");
    var rangeHint = document.querySelector(".score-range small");
    var modal = document.querySelector(".zy-modal");

    if (back) back.addEventListener("click", function () { navigate("/score/result.html", true); });

    document.querySelectorAll("[data-zy-nav]").forEach(function (button) {
      button.addEventListener("click", function () {
        document.querySelectorAll("[data-zy-nav]").forEach(function (item) { item.classList.toggle("active", item === button); });
        if (button.dataset.zyNav === "choice") {
          document.querySelector(".choice-panel").scrollIntoView({ behavior: "smooth", block: "start" });
        } else if (button.dataset.zyNav === "history") {
          document.querySelector(".card-system-search").scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          toastVolunteer("当前栏目已在本地复刻为演示入口。");
        }
      });
    });

    if (batchSelect) batchSelect.value = currentBatch;

    [keyword, majorKeyword, city, batchSelect, rangeMin, rangeMax].forEach(function (field) {
      if (!field) return;
      field.addEventListener("input", renderSchools);
      field.addEventListener("change", function () {
        if (field === batchSelect) {
          currentBatch = field.value;
          localStorage.setItem("volunteerBatch", currentBatch);
        }
        resultPage = 1;
        renderSchools();
      });
    });

    document.querySelectorAll('input[name="subjectFilter"], input[name="majorMode"], input[name="rangeMode"], input[name="schoolTags"]').forEach(function (input) {
      input.addEventListener("change", function () {
        updateRangeMode();
        resultPage = 1;
        renderSchools();
      });
    });

    var chooseSchool = document.querySelector(".select-school");
    if (chooseSchool) chooseSchool.addEventListener("click", function () {
      if (keyword) {
        keyword.focus();
        keyword.placeholder = "请输入院校名称";
      }
    });

    var majorAdd = document.querySelector(".major-add");
    if (majorAdd) majorAdd.addEventListener("click", function () {
      if (majorKeyword) majorKeyword.focus();
      toastVolunteer("请在专业名称输入框内用英文逗号分隔多个专业。");
    });

    var modalOk = document.querySelector(".modal-ok");
    if (modalOk) modalOk.addEventListener("click", function () {
      if (modal) modal.classList.add("hidden");
    });

    document.querySelector(".history-search").addEventListener("click", function () {
      resultPage = 1;
      renderSchools();
      toastVolunteer("查询完成。");
    });
    document.querySelector(".history-reset").addEventListener("click", function () {
      [keyword, majorKeyword, city, rangeMin, rangeMax].forEach(function (field) { if (field) field.value = ""; });
      if (batchSelect) {
        batchSelect.value = "本科批";
        currentBatch = "本科批";
        localStorage.setItem("volunteerBatch", currentBatch);
      }
      document.querySelectorAll('input[name="schoolTags"]').forEach(function (input) { input.checked = false; });
      var subjectDefault = document.querySelector('input[name="subjectFilter"][value="物理"]');
      if (subjectDefault) subjectDefault.checked = true;
      var majorDefault = document.querySelector('input[name="majorMode"][value="include"]');
      if (majorDefault) majorDefault.checked = true;
      var rangeDefault = document.querySelector('input[name="rangeMode"][value="rank"]');
      if (rangeDefault) rangeDefault.checked = true;
      updateRangeMode();
      resultPage = 1;
      renderSchools();
    });

    document.querySelector(".save-volunteer").addEventListener("click", function () {
      persistVolunteer();
      toastVolunteer("草稿已保存。");
    });
    document.querySelector(".fill-recommend").addEventListener("click", function () {
      if (submitted) return toastVolunteer("已提交状态不能修改志愿，请先撤销提交。");
      fillRecommendedChoices();
      persistVolunteer();
      renderChoices();
      toastVolunteer("已按冲稳保梯度填满 96 个志愿。");
    });
    document.querySelector(".clear-volunteer").addEventListener("click", function () {
      if (submitted) return toastVolunteer("已提交状态不能清空志愿，请先撤销提交。");
      choices = [];
      persistVolunteer();
      renderChoices();
      toastVolunteer("志愿表已清空。");
    });
    document.querySelector(".submit-volunteer").addEventListener("click", function () {
      if (!choices.length) return toastVolunteer("请至少添加一个志愿。");
      submitted = true;
      persistVolunteer();
      renderChoices();
      toastVolunteer("志愿表已确认提交。");
    });
    document.querySelector(".unlock-volunteer").addEventListener("click", function () {
      submitted = false;
      persistVolunteer();
      renderChoices();
      toastVolunteer("已撤销提交，可继续修改。");
    });
    document.querySelector(".print-volunteer").addEventListener("click", function () { window.print(); });

    updateRangeMode();
    renderSchools();
    renderChoices();

    function updateRangeMode() {
      var modeInput = document.querySelector('input[name="rangeMode"]:checked');
      var isScore = modeInput && modeInput.value === "score";
      if (rangeUnit) rangeUnit.textContent = isScore ? "分" : "名";
      if (rangeHint) rangeHint.textContent = isScore ? "（请输入分数范围）" : "（位次范围差不超过5000名）";
      if (rangeMin) rangeMin.placeholder = isScore ? "最低分" : "最低";
      if (rangeMax) rangeMax.placeholder = isScore ? "最高分" : "最高";
    }

    function renderSchools() {
      var key = keyword ? keyword.value.trim() : "";
      var majorKey = majorKeyword ? majorKeyword.value.trim() : "";
      var majorTerms = majorKey.split(",").map(function (item) { return item.trim(); }).filter(Boolean).slice(0, 5);
      var majorMode = document.querySelector('input[name="majorMode"]:checked');
      var includeMajor = !majorMode || majorMode.value === "include";
      var subjectInput = document.querySelector('input[name="subjectFilter"]:checked');
      var subject = subjectInput ? subjectInput.value : "物理";
      var rangeMode = document.querySelector('input[name="rangeMode"]:checked');
      var rangeByScore = rangeMode && rangeMode.value === "score";
      var selectedTags = Array.prototype.slice.call(document.querySelectorAll('input[name="schoolTags"]:checked')).map(function (input) { return input.value; });
      var cityValue = city ? city.value : "";
      var lowRange = rangeMin && rangeMin.value ? Number(rangeMin.value) : null;
      var highRange = rangeMax && rangeMax.value ? Number(rangeMax.value) : null;
      var filtered = schools.filter(function (school) {
        var rank = rankOfSchool(school);
        var score = scoreForYear(school);
        var majorMatched = !majorTerms.length || majorTerms.some(function (term) { return school.major.indexOf(term) >= 0; });
        var tagsMatched = !selectedTags.length || selectedTags.every(function (tag) { return (school.tags || []).indexOf(tag) >= 0; });
        return (!key || school.name.indexOf(key) >= 0 || school.major.indexOf(key) >= 0) &&
          (!majorTerms.length || (includeMajor ? majorMatched : !majorMatched)) &&
          tagsMatched &&
          (!cityValue || school.city === cityValue) &&
          (lowRange === null || (rangeByScore ? score >= lowRange : rank >= lowRange)) &&
          (highRange === null || (rangeByScore ? score <= highRange : rank <= highRange));
      });
      var totalPages = Math.max(1, Math.ceil(filtered.length / resultPageSize));
      if (resultPage > totalPages) resultPage = totalPages;
      var pageStart = (resultPage - 1) * resultPageSize;
      var pageRows = filtered.slice(pageStart, pageStart + resultPageSize);
      var condition = [
        "录取年份：2023-2025",
        "首选科目：" + subject,
        "批次：" + currentBatch,
        cityValue ? "院校省份：" + cityValue : "院校省份：全部",
        rangeByScore ? "查询范围：分数" : "查询范围：位次"
      ].join("　");
      list.innerHTML = '<div class="main-data"><div class="data-table-header"><div class="data-table-header-left"><h5>查询结果</h5><span>共 ' + filtered.length + ' 条</span></div><div class="data-table-header-right">' + escapeHtml(condition) + '</div></div><div class="choice-table-wrap"><table class="choice-table system-table history-result-table"><thead><tr><th>年份</th><th>批次</th><th>科类</th><th>院校代号</th><th>院校名称</th><th>专业代号</th><th>专业名称</th><th>计划数</th><th>录取数</th><th>最低分</th><th>最低位次</th><th>平均分</th></tr></thead><tbody>' +
        (pageRows.map(function (school, index) {
          var globalIndex = pageStart + index;
          var plan = 2 + (globalIndex % 6);
          var admitted = plan + (globalIndex % 2);
          var rank = rankOfSchool(school);
          var minScore = scoreForYear(school);
          return '<tr><td>' + (2025 - (globalIndex % 3)) + '</td><td>' + escapeHtml(currentBatch) + '</td><td>普通类（' + escapeHtml(subject) + '）</td><td>' + String(5000 + globalIndex).padStart(5, "0") + '</td><td><b>' + escapeHtml(school.name) + '</b><small>' + escapeHtml(school.city) + ' · ' + escapeHtml((school.tags || []).join(" / ")) + '</small></td><td>' + String(100 + globalIndex).padStart(3, "0") + '</td><td>' + escapeHtml(school.major) + '<small>再选科目：不提科目要求</small></td><td>' + plan + '</td><td>' + admitted + '</td><td><b>' + minScore + '</b></td><td>' + rank + '</td><td>' + (minScore + 3 + (globalIndex % 4)) + '</td></tr>';
        }).join("") || '<tr><td colspan="12" class="empty-choice"><div class="table-empty-title">暂无数据</div><p>请调整批次、省份、院校、专业或查询范围后重新查询。</p></td></tr>') +
      '</tbody></table></div>' + renderHistoryPager(filtered.length, totalPages) + '</div>';

      list.querySelectorAll("[data-history-page]").forEach(function (button) {
        button.addEventListener("click", function () {
          var next = button.dataset.historyPage;
          if (next === "prev") resultPage = Math.max(1, resultPage - 1);
          else if (next === "next") resultPage = Math.min(totalPages, resultPage + 1);
          else resultPage = Number(next) || 1;
          renderSchools();
        });
      });
    }

    function renderHistoryPager(total, totalPages) {
      var buttons = "";
      for (var page = 1; page <= totalPages && page <= 7; page += 1) {
        buttons += '<button type="button" data-history-page="' + page + '"' + (page === resultPage ? ' class="active"' : "") + '>' + page + '</button>';
      }
      if (totalPages > 7) buttons += '<span>...</span><button type="button" data-history-page="' + totalPages + '">' + totalPages + '</button>';
      return '<div class="history-pagination"><div>共 ' + total + ' 条</div><select aria-label="每页条数"><option selected>10条/页</option></select><button type="button" data-history-page="prev"' + (resultPage === 1 ? " disabled" : "") + '>‹</button>' + buttons + '<button type="button" data-history-page="next"' + (resultPage === totalPages ? " disabled" : "") + '>›</button><span>前往</span><input value="' + resultPage + '" readonly><span>页</span></div>';
    }

    function scoreForYear(school) {
      return school.score - (2025 - Number(currentYear || 2025));
    }

    function rankOfSchool(school) {
      return Math.max(360, 900 + (650 - school.score) * 78);
    }

    function renderChoices() {
      document.querySelectorAll("[data-choice-count]").forEach(function (node) { node.textContent = String(choices.length); });
      document.querySelector(".volunteer-page").classList.toggle("submitted", submitted);
      tbody.innerHTML = choices.map(function (choice, index) {
        return '<tr><td>A' + String(index + 1).padStart(2, "0") + '</td><td>' + escapeHtml(choice.name) + '<small>' + escapeHtml(choice.batch || currentBatch) + '</small></td><td>' + escapeHtml(choice.major) + '</td><td>' + escapeHtml(choice.city) + '</td><td><span class="risk ' + escapeHtml(choice.risk) + '">' + escapeHtml(choice.risk) + '</span></td><td><label class="adjust"><input type="checkbox" data-adjust="' + index + '"' + (choice.adjust ? " checked" : "") + (submitted ? " disabled" : "") + '>服从</label></td><td><button type="button" data-up="' + index + '"' + (submitted || index === 0 ? " disabled" : "") + '>上移</button><button type="button" data-down="' + index + '"' + (submitted || index === choices.length - 1 ? " disabled" : "") + '>下移</button><button type="button" data-remove="' + index + '"' + (submitted ? " disabled" : "") + '>删除</button></td></tr>';
      }).join("") || '<tr><td colspan="7" class="empty-choice">尚未添加志愿，请从上方院校专业列表选择。</td></tr>';

      tbody.querySelectorAll("[data-adjust]").forEach(function (input) {
        input.addEventListener("change", function () {
          choices[Number(input.dataset.adjust)].adjust = input.checked;
          persistVolunteer();
        });
      });
      tbody.querySelectorAll("[data-remove]").forEach(function (button) {
        button.addEventListener("click", function () {
          choices.splice(Number(button.dataset.remove), 1);
          persistVolunteer();
          renderChoices();
        });
      });
      tbody.querySelectorAll("[data-up]").forEach(function (button) {
        button.addEventListener("click", function () { moveChoice(Number(button.dataset.up), -1); });
      });
      tbody.querySelectorAll("[data-down]").forEach(function (button) {
        button.addEventListener("click", function () { moveChoice(Number(button.dataset.down), 1); });
      });
      renderSchools();
    }

    function moveChoice(index, offset) {
      var next = index + offset;
      if (next < 0 || next >= choices.length) return;
      var item = choices[index];
      choices[index] = choices[next];
      choices[next] = item;
      persistVolunteer();
      renderChoices();
    }

    function persistVolunteer() {
      localStorage.setItem("volunteerChoices", JSON.stringify(choices));
      localStorage.setItem("volunteerSubmitted", submitted ? "1" : "0");
      localStorage.setItem("volunteerBatch", currentBatch);
    }

    function fillRecommendedChoices() {
      var exists = {};
      choices.forEach(function (choice) { exists[choice.name + choice.major] = true; });
      schools.forEach(function (school) {
        if (choices.length >= maxChoices) return;
        var key = school.name + school.major;
        if (exists[key]) return;
        choices.push({ name: school.name, major: school.major, city: school.city, risk: school.risk, adjust: true, batch: currentBatch });
        exists[key] = true;
      });
    }

    function buildVolunteerSchools(seed) {
      var names = [
        "重庆大学", "西南大学", "西南政法大学", "重庆师范大学", "四川外国语大学", "重庆邮电大学",
        "重庆交通大学", "重庆工商大学", "重庆理工大学", "重庆文理学院", "四川师范大学", "成都大学",
        "西华师范大学", "湖北大学", "华中师范大学", "中南民族大学", "上海政法学院", "北京语言大学",
        "天津师范大学", "南京晓庄学院", "浙江传媒学院", "湖南师范大学", "广东外语外贸大学", "海南师范大学"
      ];
      var majors = [
        "汉语言文学", "历史学", "思想政治教育", "法学", "英语", "新闻传播学类",
        "社会工作", "教育学类", "生物科学", "行政管理", "政治学与行政学", "工商管理类"
      ];
      var cities = ["重庆", "四川", "湖北", "上海", "北京", "天津", "江苏", "浙江", "湖南", "广东", "海南"];
      var risks = ["冲", "冲", "稳", "稳", "保", "保"];
      var generated = seed.slice();
      var seen = {};
      generated.forEach(function (item) { seen[item.name + item.major] = true; });
      names.forEach(function (name, nameIndex) {
        majors.forEach(function (majorName, majorIndex) {
          if (generated.length >= 120) return;
          var major = majorName + " / " + majors[(majorIndex + 3) % majors.length];
          var key = name + major;
          if (seen[key]) return;
          var index = generated.length;
          var tagSet = nameIndex % 9 === 0 ? ["公办", "211工程高校", "双一流"] : nameIndex % 7 === 0 ? ["公办", "中外合作办学"] : nameIndex % 5 === 0 ? ["民办"] : ["公办"];
          generated.push({
            name: name,
            major: major,
            city: cities[(nameIndex + majorIndex) % cities.length],
            risk: risks[(nameIndex + majorIndex) % risks.length],
            score: 650 - (index % 96),
            tags: tagSet
          });
          seen[key] = true;
        });
      });

      var fallbackIndex = 1;
      while (generated.length < 120) {
        var fallback = {
          name: "重庆市模拟院校" + String(fallbackIndex).padStart(2, "0"),
          major: majors[fallbackIndex % majors.length] + " / " + majors[(fallbackIndex + 4) % majors.length],
          city: cities[fallbackIndex % cities.length],
          risk: risks[fallbackIndex % risks.length],
          score: 650 - (generated.length % 96),
          tags: ["公办"]
        };
        var fallbackKey = fallback.name + fallback.major;
        if (!seen[fallbackKey]) {
          generated.push(fallback);
          seen[fallbackKey] = true;
        }
        fallbackIndex += 1;
      }
      return generated;
    }
  }

  function ensurePortal() {
    if (!main) return;
    if (document.body.classList.contains("score-mode")) {
      main.innerHTML = initialMainHtml;
      articlePanel = document.querySelector(".article-panel");
      sectionMenu = document.querySelector(".section-menu");
    }
    document.body.classList.remove("score-mode", "score-login-mode", "score-result-mode", "volunteer-mode");
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
