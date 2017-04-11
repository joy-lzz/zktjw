$(function () {
    /* header start */
    //  遍历login的小精灵图
    var header = $("#header");
    var iS = header.find("i");
    $.each(iS, function (i,ele) {
    $(ele).css("background-position", -(72+24*i) +"px -2px")
    });

    //  搜索处的背景切换   选择“选医院”的时候，文字更换
    $("#search_top").on("click", "span" , function () {
    $(this).addClass("current").siblings().removeClass("current");
    var spanTxt = $(this).text();
    //  字符串截取  substring([a,b)):截取索引值包含a，不包含b之间的所有字符
    var addTxt = spanTxt.substring(spanTxt.length-2,spanTxt.length);
    $("label[for='search-k']").html("请输入你要搜索的" + addTxt);
    });

    //  搜索框输入时默认文字隐藏
    $("#search-k").on("keyup", function () {
    var $txt = $(this).val();
    if ($txt == "") {
    $(this).next("label").css("display","block");

    }else {
    $(this).next("label").css("display","none");
    }
    });

    //  显示客服服务
    header.find("li").eq(4).on("mouseenter", function () {
    $(this).find("ul").css("z-index", 2)
    });
    header.find("li").eq(4).on("mouseleave", function () {
    $(this).find("ul").css("z-index", 0)
    });

    //  显示网站导航
    header.find("li").last().on("mouseenter", function () {
    $(this).find(".wrap-box").css({
    "display": "block",
    "z-index" : 1
    });
    });

    header.find("li").last().on("mouseleave", function () {
    $(this).find(".wrap-box").css({
    "display": "none",
    "z-index" : 0
    });
    });
    /* header end */

    /* navigation bar start */
    //  导航栏背景色切换  // a标签的大小和li的一样，li给一个hover  a给点击事件就能实现这个导航栏效果
    function clickBgc(selector) {
        $(selector).on("click", function () {
            $(this).css("background-color", "#1EA2E2")
            .siblings().css("background-color", "#34B5F2");
        });
    }
    clickBgc("#nav .nav-right");
    clickBgc("#nav .nav-left>ul>li");
    /* navigation bar end */
});


