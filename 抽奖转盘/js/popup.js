// JavaScript PopUp dialog
/****
 * div形式的弹出层生成函数
 * @param parentDivid  弹出层的父节点id(是一个div层)
 * @param childreaDivid 弹出层的子结点id(是一个div层，包含了弹出层中的内容，且已经存在)
 * @returns
 */


function createPopupDiv(parentDivid, childreaDivid, backgroud_color_transparent, only_close)
{
    var popupDivHtml = '<div id="createPopupDivLight" class="white_content">';
    popupDivHtml 	+= '<div id="createPopupDivClose" class="close"><a id="createPopupDivCloseA" href="javascript:void(0)" class="ui-btn ui-shadow ui-corner-all ui-icon-delete ui-btn-icon-notext">关闭</a></div>';
    popupDivHtml 	+= '<div id="createPopupDivContent" class="con"> ';
    popupDivHtml 	+= '</div>';
    popupDivHtml 	+= '</div>';
    popupDivHtml 	+= '<div id="createPopupDivFade" class="black_overlay"></div>';
    if($("#"+parentDivid).children("#createPopupDivLight").length){
        $("#"+parentDivid).children("#createPopupDivLight").remove();
    }
    if($("#"+parentDivid).children("#createPopupDivFade").length){
        $("#"+parentDivid).children("#createPopupDivFade").remove();
    }
    $("#"+parentDivid).append(popupDivHtml).css("display", "block"); //向弹出层父节点增加弹出层节点

    //css
    var min_width = 500>$(window).width()? $(window).width(): 500;
    var max_width = $(window).width() - 20*2;
    if(max_width <= min_width) {
    	min_width = max_width;
    }
    if(backgroud_color_transparent) {
    	backgroud_color_transparent = 'transparent';
    } else {
    	backgroud_color_transparent = '#FFFFFF';
    }

    $(".white_content").css({
        "display": "none",
        "position": "absolute",
        "min-width": min_width+"px",
        "max-width": max_width+"px",
        "padding":"10px 20px",
        "background-color":backgroud_color_transparent,
        "z-index":"9999",
        "opacity": "0.95",

        
        
    });

    $(".black_overlay").css({
        "display": "none",
        "position": "absolute",
        "top": "0%",
        "left": "0%",
        "width": "100%",
        "height": "100%",
        "background-color":"#000000",
        "color":"#3366cc",
        "z-index":"9998",
        "opacity": "0.65",
        "finishOpacity":"60",
        "filter": "alpha(opacity=50)"
    });
    $(".close").css({
        "float":"right",
        "clear":"both",
        "width":"18%",
        "text-align":"right",
        "margin":"0 0 6px 0"
    });
    $(".close a").css({
        "color":"#333",
        "text-decoration":"none",
        "font-size":"14px",
        "font-weight":"700"
    });

    $("#createPopupDivLight > #createPopupDivContent").html($("#"+childreaDivid).html());
    $("#createPopupDivLight > #createPopupDivContent").css({'width':$("#createPopupDivLight").width()});

    //删除原有的html数据
    $("#"+childreaDivid).empty();

    //确定宽高
    $(".white_content").css("top", $(window).height()* 10 / 100 + $(document).scrollTop());
    $(".white_content").css("left", ($(window).width()-$(".white_content").outerWidth())/2 + $(document).scrollLeft());
    $(".black_overlay").css("width", $(document).width());
    $(".black_overlay").css("height", $(document).height());
    $(".white_content").addClass("fade_radios");   //web_css/public/fade.css

    //show('createPopupDivLight');
    var light=document.getElementById('createPopupDivLight');
    var fade=document.getElementById('createPopupDivFade');
    fade.style.display='block';
    light.style.display='block';

    $("#"+parentDivid).on('click', '#createPopupDivCloseA', function(){
        var light=document.getElementById('createPopupDivLight');
        var fade=document.getElementById('createPopupDivFade');
        light.style.display='none';
        fade.style.display='none';
        $("#"+parentDivid).css("display", "none");
        //$("#"+childreaDivid).html($("#createPopupDivLight > #createPopupDivContent").html());
        $("#createPopupDivLight > #createPopupDivContent").remove();
        return false;
    });

    if(null==only_close || undefined == only_close) {
        setTimeout(function(){
            //点击遮罩层就隐藏的功能
            $("#"+parentDivid).on('click', '#createPopupDivFade', function(){
            	$("#"+parentDivid).unbind('click');
                //hide('createPopupDivLight');
                var light=document.getElementById('createPopupDivLight');
                var fade=document.getElementById('createPopupDivFade');
                light.style.display='none';
                fade.style.display='none';
                $("#"+parentDivid).css("display", "none");
                //$("#"+childreaDivid).html($("#createPopupDivLight > #createPopupDivContent").html());
                $("#createPopupDivLight > #createPopupDivContent").remove();
                return false;
            });
        }, 200);
    }

    
}