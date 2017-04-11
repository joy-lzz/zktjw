/**
 * Created by Joy-li on 2017/2/7.
 */
$(function () {
    /* big banner start */
    var $bannerImgs = $("#bigBanner .slider > .imgs a");
    $bannerImgs.eq(0).fadeIn(1500);

    /* 遍历得到li（小圆点） */
    $bannerImgs.each(function (index, ele) {
        $(ele).parent().next(".circle").append("<li><a href='javascript:;'></a></li>");
    });

    /* 让小圆点居中 */
    $("#bigBanner .slider > .circle").css("margin-left",$("#bigBanner>.circle").width()/-2)
                           .children("li").eq(0).addClass("current");

    /* focus_btn鼠标滑入切换精灵图 */
    /* 获得当前元素的索引号，可以用index()方法 */
    $("#bigBanner .play").on("mouseenter","span", function () {
        $(this).css({
            "background-position" : $(this).index() * -40 + "px 0"
        });
    });
    $("#bigBanner .play").on("mouseleave","span", function () {
        $(this).css({
            "background-position" : $(this).index() * -40 + "px -74px"
        });
    });

    /* 控制bigBanner slider轮播 */
    var bannerFlag = 0;
    $("#bigBanner .circle").on("click","li", function () {
        $(this).addClass("current").siblings().removeClass("current");
        var indexNum = $(this).index();
        $bannerImgs.eq(indexNum).fadeIn(500).siblings().fadeOut();
        bannerFlag = indexNum;
    });
    var bannerTime = setInterval(bannerSlider,3000);
    function bannerSlider() {
        if(bannerFlag < 3) {
            bannerFlag++;
            bannerSliderFixed(bannerFlag);
        }else {
            bannerFlag = 0;
            bannerSliderFixed(bannerFlag);
        }
    }
    $("#bigBanner").hover(function () {
        clearInterval(bannerTime);
    }, function () {
        bannerTime = setInterval(bannerSlider,3000);
    });

    $("#bigBanner .play").on("click","span", function () {
        if($(this).hasClass("prev")) {
            if (bannerFlag == 0) {
                bannerFlag = $bannerImgs.length - 1;
                bannerSliderFixed(bannerFlag);
            }else {
                bannerFlag--;
                bannerSliderFixed(bannerFlag);
            }
        }else {
            if (bannerFlag == $bannerImgs.length - 1) {
                bannerFlag = -1;   /* 这个值为什么是负一？？？ */
                bannerSliderFixed(bannerFlag);
            }
            bannerFlag++;
            bannerSliderFixed(bannerFlag);
        }

    });


    /* search框控制 */
    var $searchAs = $("#bigBanner .select-area a");
    $searchAs.on("click", function () {
        $(this).addClass("current").siblings().removeClass("current");
        $(this).children("i").css("background-position","-4px -429px")
               .parent().siblings().children("i").css("background-position","-4px -406px");
    });
    /* big banner end */

    /* mainOne start */
    var $customLis = $("#custom ul li");
    $customLis.each(function (index, ele) {
        $(ele).css("background-position",""+ (-index*50 -12*(index*2+1))  +"px -304px");
    });

    /* 这里展示信息用到了元素的title属性！！！  记住！！ */
    $customLis.hover(function (event) {
        var $that = $(this);
        /* attr()方法：获取、设置属性值 */
        $that.attr("title",$that.text()).css({
            "opacity" : 0.8,
            "color" : "#2EABE8"
        }).siblings().css({
            "opacity" : 1,
            "color" : "#000"
        });
    }, function () {
        $(this).css({
            "opacity" : 1,
            "color" : "#000"
        })
    });
    /* mainOne end */

    /* accordion start */
    var $accordionLis = $("#accordion > ul li");
    $accordionLis.each(function (index, ele) {
        $(ele).css("background-image","url(img/items/"+ (index+1) +".jpg)");
    });
    var $accordionUl = $("#accordion > ul");
    $accordionUl.on("mouseenter","li", function () {
        $(this).stop().animate({
            "width" : "400px"
        },300).children("span").css("display","none").parent().siblings().stop().animate({
            "width" : "133px"
        },300);
    });
    $accordionUl.on("mouseleave","li", function () {
        $(this).children("span").css("display","block").parent().stop().animate({
            "width" : "180px"
        },300).siblings().stop().animate({
            "width" : "170px"
        },300);
    });
    /* accordion end */

    /* hotPhysicalExamination start */
    var $hotPhysicalExaminationDl = $("#hotPhysicalExamination>.hospitalType>dl");
    $hotPhysicalExaminationDl.on("click","dd", function () {
        changeBGC($(this));
    });

    var $hotPhysicalExaminationAs = $("#hotPhysicalExamination .detail li > a");
    $hotPhysicalExaminationAs.hover(function () {
        $(this).children("p").stop().animate({
            "bottom" : 0
        },300)
    }, function () {
        $(this).children("p").stop().animate({
            "bottom" : "-115px"
        },300)
    });

    $("#hotPhysicalExamination .detail").hover(function () {
        $("#hotPhysicalExamination .detail .arrow").css("display","block");
    }, function () {
        $("#hotPhysicalExamination .detail .arrow").css("display","none");
    });

    /* 实现tab栏切换 */
    var $hotPhysicalExaminationDds = $("#hotPhysicalExamination>.hospitalType>dl dd");
    var $hotPhysicalExaminationUls = $("#hotPhysicalExamination .detail > ul");
    $hotPhysicalExaminationDds.on("click", function () {
        var $countIndex = $(this).index();
        $hotPhysicalExaminationUls.eq($countIndex - 1).addClass("current").siblings("ul").removeClass("current");
    });

    /* 按钮的背景变色 */
    var $hotPhysicalExaminationSpanSBtn = $("#hotPhysicalExamination .detail .arrow span");
    $hotPhysicalExaminationSpanSBtn.hover(function () {
        $(this).addClass("current");
    }, function () {
        $(this).removeClass("current");
    });

    /* 控制轮播图 */  /* 效果还未实现！！！！ */
    $hotPhysicalExaminationSpanSBtn.on("click", function () {
        var $that = $(this);
        /* 获得所选模块的索引值 */
        var $ulIndex = $("#hotPhysicalExamination>.hospitalType>dl dd[class = 'current']").index();
        var $move_ul =  $that.parent().siblings("ul").eq($ulIndex - 1);
//        sliderScroll($that,$move_ul);
        exchangeP($that,$move_ul);
    });
    /* hotPhysicalExamination end */

    /* culling start */
    var $cullingDl = $("#culling>.cullingType>dl");
    $cullingDl.on("click","dd", function () {
        changeBGC($(this));
    });

    /* 按钮变色 */
    $("#culling .detailExam").hover(function () {
        $("#culling .detailExam .arrow").css("display","block");
    }, function () {
        $("#culling .detailExam .arrow").css("display","none");
    });

    var $cullingSpanSBtn = $("#culling .detailExam .arrow span");
    $cullingSpanSBtn.hover(function () {
        $(this).addClass("current");
    }, function () {
        $(this).removeClass("current");
    });

    /* tab栏切换 */
    var $cullingDds = $("#culling>.cullingType>dl dd");
    var $cullingUls = $("#culling .detailExam > ul");

    $cullingDds.on("click", function () {
        var $countIndex = $(this).index();
        $cullingUls.eq($countIndex - 1).addClass("current").siblings("ul").removeClass("current");
    });

    $cullingSpanSBtn.on("click", function () {
        var $that = $(this);
        /* 获得所选模块的索引值 */
        var $ulIndex = $("#culling>.cullingType>dl dd[class = 'current']").index();
        var $move_ul =  $that.parent().siblings("ul").eq($ulIndex - 1);
        sliderScroll($that,$move_ul);
    });
    /* culling end */

    /* preferential start */
    var $preferentialAs = $("#preferential a");
    var $preferentialSpeed = 300;
    $preferentialAs.hover(function () {
        $(this).children("img").stop().animate({
            bottom : "40px"
        },$preferentialSpeed).siblings("span").stop().animate({
            bottom : 0
        },400)
    }, function () {
        $(this).children("img").stop().animate({
            bottom : 0
        },$preferentialSpeed).siblings("span").stop().animate({
            bottom : "-40px"
        },400)
    });
    /* preferential end */

    /* information start */
    var $informationIs = $("#information>ul>li i");
    $informationIs.each(function (index, ele) {
        $(ele).css("background-position","0px "+ (-index*85-672) +"px");
    });
    /* information end */
























    /* common function */
    function bannerSliderFixed(controlNum) {
        $bannerImgs.eq(controlNum).stop().fadeIn().siblings().fadeOut();
        $("#bigBanner .circle li").eq(controlNum).addClass("current").siblings().removeClass("current");
    }

    function changeBGC(selector) {
        selector.children("a").addClass("currentColor").parent().addClass("current")
            .siblings().removeClass("current").children("a").removeClass("currentColor");
    }

    function sliderScroll(selector,obj) {
        /* 在连续点击的时候，需要先判断目标盒子是否处在动画当中，如果是，则不运动，如果否，则做动画 */
        /* $(selector).is(":animated") */
        if(!obj.is(":animated")) {
            if (selector.hasClass("next")) {
                /* 判断运动盒子的子元素是否够4个，不够的话，固定不动 */
                var objLen = obj.children().length >= 4 ? obj.children().length : 4;
                if (obj.position().left == (objLen - 4) * (-305)) {
                    obj.css({
                        left : (objLen - 4) * (-305) + "px"
                    })
                }else {
                    obj.stop(true,true).animate({
                        "left" : (obj.position().left - 305) +"px"
                    },300);
                }
            }else {
                if (obj.position().left == 0) {
                    obj.css({
                        left : 0
                    })
                }else {
                    obj.stop(true,true).animate({
                        "left" : (obj.position().left + 305) +"px"
                    },300);
                }
            }
        }
    }

    function exchangeP(selector,obj) {
        var $exchangeChild = obj.children();
        if (selector.hasClass("next")) {
            /* .remove()和.detach()两个方法删除元素后都返回删除的元素本身，区别是： */
            /* .remove()删除元素后，返回值不保留元素的动画；.detach()删除元素后，返回的值（元素）保留设置的动画 */
            var $firstToEnd = $exchangeChild.first().detach();
            obj.append($firstToEnd);
        }else {
            var $endToFirst = $exchangeChild.last().detach();
            obj.prepend($endToFirst);
        }
    }
















});
