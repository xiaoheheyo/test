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
    document.body.classList.add("score-mode", "volunteer-mode");
    document.body.classList.remove("score-login-mode", "score-result-mode");

    main.innerHTML = '<section class="volunteer-page">' +
      '<header class="volunteer-top">' +
        '<a class="zy-logo" href="javascript:;" aria-label="系统首页"><span class="zy-mark">渝</span><strong>重庆市统一高考志愿填报辅助系统</strong></a>' +
        '<nav class="zy-nav"><a class="active" href="javascript:;" data-step="0">首页</a><a href="javascript:;" data-step="1">历史数据查询</a><a href="javascript:;" data-step="2">招生计划查询</a><a href="javascript:;" data-step="3">备选志愿参考</a><a href="javascript:;" data-step="4">资讯内容</a></nav>' +
        '<button type="button" class="back-score">退出</button>' +
      '</header>' +
      '<div class="volunteer-shell">' +
        '<aside class="volunteer-sidebar">' +
          '<div class="candidate-card"><h2>赵丁谕</h2><p>考生号：265****1371</p><p>首选科目：历史</p><p>再选科目：生物 / 思想政治</p><p>高考总分：626</p></div>' +
          '<nav class="volunteer-steps"><button class="active" type="button" data-step="0">首页</button><button type="button" data-step="1">历史数据查询</button><button type="button" data-step="2">招生计划查询</button><button type="button" data-step="3">备选志愿参考</button></nav>' +
          '<div class="fill-status"><span>备选志愿</span><strong><b data-choice-count>0</b>/96</strong></div>' +
        '</aside>' +
        '<div class="volunteer-main">' +
          '<section class="notice-panel welcome">' +
            '<div><h1>赵丁谕，欢迎登录</h1><p>为切实帮助考生及家长合理填报志愿，系统提供历史数据、招生计划、备选志愿参考等公益服务。本页面为本地演示，不连接官方认证接口。</p></div>' +
            '<table class="box-subject"><thead><tr><th>语文</th><th>数学</th><th>外语</th><th>历史</th><th>生物</th><th>政治</th><th>总分</th></tr></thead><tbody><tr><td>124</td><td>106</td><td>132</td><td>76</td><td>96</td><td>92</td><td>626</td></tr></tbody></table>' +
          '</section>' +
          '<section class="batch-panel home-quick-links">' +
            '<div class="quick-card"><span>历</span><h3>历史数据查询</h3><p>按年份、批次、院校、专业检索录取分数及位次。</p><button type="button" data-step="1">进入查询</button></div>' +
            '<div class="quick-card"><span>招</span><h3>招生计划查询</h3><p>查看 2026 年在渝招生计划、选科要求和专业备注。</p><button type="button" data-step="2">查看计划</button></div>' +
            '<div class="quick-card"><span>备</span><h3>备选志愿参考</h3><p>收藏院校专业，形成最多 96 个备选志愿清单。</p><button type="button" data-step="3">管理备选</button></div>' +
          '</section>' +
          '<section class="search-panel">' +
            '<div class="panel-head"><h2>查询条件</h2><span>当前批次：普通类本科批 · 首选历史</span></div>' +
            '<div class="filter-row"><input name="schoolKeyword" placeholder="请输入院校名称或专业名称"><select name="cityFilter"><option value="">院校所在地</option><option>重庆</option><option>北京</option><option>上海</option><option>四川</option><option>湖北</option></select><select name="riskFilter"><option value="">参考梯度</option><option>冲</option><option>稳</option><option>保</option></select></div>' +
            '<div class="batch-tabs"><button class="active" type="button" data-batch="本科批">普通类本科批</button><button type="button" data-batch="高职专科批">高职专科批</button><button type="button" data-batch="提前批A段">本科提前批A段</button></div>' +
            '<div class="school-list"></div>' +
          '</section>' +
          '<section class="choice-panel">' +
            '<div class="panel-head"><h2>备选志愿参考</h2><span>系统按顺序展示，已选 <strong data-choice-count>0</strong>/96 个</span></div>' +
            '<div class="choice-actions"><button type="button" class="fill-recommend">一键生成96个备选志愿</button><button type="button" class="clear-volunteer">清空</button><button type="button" class="save-volunteer">保存</button><button type="button" class="submit-volunteer">锁定参考表</button><button type="button" class="unlock-volunteer">解除锁定</button><button type="button" class="print-volunteer">打印</button></div>' +
            '<div class="choice-table-wrap"><table class="choice-table"><thead><tr><th>序号</th><th>院校</th><th>专业</th><th>所在地</th><th>梯度</th><th>服从调剂</th><th>操作</th></tr></thead><tbody></tbody></table></div>' +
          '</section>' +
          '<section class="review-panel"><h2>使用说明</h2><ul class="review-list"><li>辅助系统仅提供志愿填报参考，正式志愿以重庆市普通高校招生志愿填报系统提交结果为准。</li><li>建议结合招生章程、体检限报、选科要求和个人意愿综合判断。</li><li>本地演示版不采集真实账号、密码、手机号或验证码。</li></ul></section>' +
        '</div>' +
      '</div>' +
    '</section>';

    setupVolunteerAssist();
  }

  function setupVolunteerAssist() {
    var maxChoices = 96;
    var seedSchools = [
      { name: "重庆大学", major: "人文科学试验班 / 法学", city: "重庆", risk: "冲", score: 641 },
      { name: "西南大学", major: "思想政治教育 / 历史学", city: "重庆", risk: "冲", score: 628 },
      { name: "重庆师范大学", major: "汉语言文学 / 英语", city: "重庆", risk: "稳", score: 594 },
      { name: "四川外国语大学", major: "英语 / 新闻传播学类", city: "重庆", risk: "稳", score: 586 },
      { name: "西南政法大学", major: "政治学与行政学 / 社会工作", city: "重庆", risk: "稳", score: 612 },
      { name: "华中师范大学", major: "历史学类 / 教育学类", city: "湖北", risk: "冲", score: 632 },
      { name: "四川师范大学", major: "生物科学 / 历史学", city: "四川", risk: "保", score: 571 },
      { name: "上海政法学院", major: "法学 / 行政管理", city: "上海", risk: "稳", score: 602 },
      { name: "北京语言大学", major: "外国语言文学类", city: "北京", risk: "冲", score: 625 },
      { name: "重庆文理学院", major: "思想政治教育 / 生物技术", city: "重庆", risk: "保", score: 532 }
    ];
    var schools = buildVolunteerSchools(seedSchools);
    var choices = JSON.parse(localStorage.getItem("volunteerChoices") || "[]");
    if (choices.length > maxChoices) choices = choices.slice(0, maxChoices);
    var submitted = localStorage.getItem("volunteerSubmitted") === "1";
    var currentBatch = localStorage.getItem("volunteerBatch") || "本科批";

    var back = document.querySelector(".back-score");
    var list = document.querySelector(".school-list");
    var tbody = document.querySelector(".choice-table tbody");
    var keyword = document.querySelector('input[name="schoolKeyword"]');
    var city = document.querySelector('select[name="cityFilter"]');
    var risk = document.querySelector('select[name="riskFilter"]');

    if (back) back.addEventListener("click", function () { navigate("/score/result.html", true); });

    document.querySelectorAll("[data-step]").forEach(function (button) {
      button.addEventListener("click", function () {
        var targets = [0, 2, 2, 3, 4];
        document.querySelectorAll(".volunteer-steps button").forEach(function (item) { item.classList.remove("active"); });
        document.querySelectorAll(".zy-nav a").forEach(function (item) { item.classList.toggle("active", item.dataset.step === button.dataset.step); });
        document.querySelectorAll('.volunteer-steps button[data-step="' + button.dataset.step + '"]').forEach(function (item) { item.classList.add("active"); });
        document.querySelectorAll(".volunteer-main > section")[targets[Number(button.dataset.step || 0)]].scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });

    document.querySelectorAll(".batch-tabs button").forEach(function (button) {
      button.classList.toggle("active", button.dataset.batch === currentBatch);
      button.addEventListener("click", function () {
        if (submitted) return toastVolunteer("已提交状态不能修改批次，请先撤销提交。");
        currentBatch = button.dataset.batch;
        localStorage.setItem("volunteerBatch", currentBatch);
        document.querySelectorAll(".batch-tabs button").forEach(function (item) { item.classList.toggle("active", item === button); });
        toastVolunteer("已切换至：" + currentBatch);
      });
    });

    [keyword, city, risk].forEach(function (field) {
      if (!field) return;
      field.addEventListener("input", renderSchools);
      field.addEventListener("change", renderSchools);
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

    renderSchools();
    renderChoices();

    function renderSchools() {
      var key = keyword ? keyword.value.trim() : "";
      var cityValue = city ? city.value : "";
      var riskValue = risk ? risk.value : "";
      var filtered = schools.filter(function (school) {
        return (!key || school.name.indexOf(key) >= 0 || school.major.indexOf(key) >= 0) &&
          (!cityValue || school.city === cityValue) &&
          (!riskValue || school.risk === riskValue);
      });
      list.innerHTML = '<div class="main-data"><div class="data-table-header"><div class="data-table-header-left"><h5>查询结果</h5><span>共 ' + filtered.length + ' 条</span></div><div class="data-table-header-right">数据年份：2023-2025</div></div><div class="choice-table-wrap"><table class="choice-table system-table"><thead><tr><th>院校名称</th><th>专业名称</th><th>批次</th><th>所在地</th><th>参考分</th><th>参考梯度</th><th>操作</th></tr></thead><tbody>' +
        (filtered.map(function (school, index) {
          return '<tr><td><b>' + escapeHtml(school.name) + '</b><small>院校代码 ' + String(5000 + index).padStart(5, "0") + '</small></td><td>' + escapeHtml(school.major) + '<small>选科要求：历史+生物/政治</small></td><td>' + escapeHtml(currentBatch) + '</td><td>' + escapeHtml(school.city) + '</td><td><b>' + school.score + '</b><small>参考位次 ' + (1200 + index * 43) + '</small></td><td><span class="risk ' + escapeHtml(school.risk) + '">' + escapeHtml(school.risk) + '</span></td><td><button type="button" data-school-index="' + index + '"' + (submitted ? " disabled" : "") + '>加入备选</button></td></tr>';
        }).join("") || '<tr><td colspan="7" class="empty-choice">没有符合条件的院校专业。</td></tr>') +
      '</tbody></table></div></div>';

      list.querySelectorAll("button[data-school-index]").forEach(function (button) {
        button.addEventListener("click", function () {
          if (submitted) return toastVolunteer("已提交状态不能修改志愿。");
          if (choices.length >= maxChoices) return toastVolunteer("最多填报 96 个志愿。");
          var school = filtered[Number(button.dataset.schoolIndex)];
          if (choices.some(function (item) { return item.name === school.name && item.major === school.major; })) return toastVolunteer("该志愿已添加。");
          choices.push({ name: school.name, major: school.major, city: school.city, risk: school.risk, adjust: true, batch: currentBatch });
          persistVolunteer();
          renderChoices();
          toastVolunteer("已加入志愿表。");
        });
      });
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
          generated.push({
            name: name,
            major: major,
            city: cities[(nameIndex + majorIndex) % cities.length],
            risk: risks[(nameIndex + majorIndex) % risks.length],
            score: 650 - (index % 96)
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
          score: 650 - (generated.length % 96)
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
