var startX = 0, startY = 0,len=0,isleft,count=0,p=1;  
function showMask() {
	$(".m-dialog").css("top",$(document).scrollTop());
	$(".m-dialog .u-maskimg").css("max-height", $("#miframe").height() - 40 - 10 - 78);
	$(".m-dialog .u-maskimg").css("max-width", $("#miframe").width() * 0.9);
	$(".m-dialog .dialogbg").css("height", $("#miframe").height() - 40 - 78 );
	$(".m-dialog").stop(false, true).fadeIn();
	$(".m-dialog ol").empty();
}

//隐藏遮罩层
function hideMask() {
	$(".m-dialog").stop(false, true).fadeOut();
}
$(".u-box a").click(function() {
	$(".u-nav ol").css("left", "0");
	$('.u-maskdiv img').attr("src", $(this).attr("data"));
	$(".dialogbg").bind("click", function() {
		hideMask();
	});
	var oj=$(this).attr("data");
	$.get("design/find/picurl/" + $(this).parent(".f-cb").parent(".pos").attr("data"), function(data) {
		var json = data[0].stylemore[0].picurl;
		for (var i = 0; i < json.length; i++) {
			if(json[i].imgSrc==oj){
				$('.m-dialog ol').append("<li data=" + json[i].imgSrc + " class='sel'><img src=" + json[i].imgSrc + " /></li>");
				len=i;
			}else
				$(".m-dialog ol").append("<li data=" + json[i].imgSrc + "><img src=" + json[i].imgSrc + " /></li>");
		}
		count=$(".m-dialog li").length;

		$(".m-dialog li").bind("click", function() {
			$('.m-dialog li').removeClass("sel");
			$(this).addClass("sel");
			$('.u-maskdiv img').attr("src", $(this).attr("data"));
		});

		//左右滑动
		document.createEvent("TouchEvent");  
		bindEvent();
	});
	showMask();
});

$(".u-nav .u-pre").click(function() {
	pre();
});

$(".u-nav .u-nxt").click(function() {
	ext();
});

//向左
function pre(){
	var w=$("#miframe").width()*0.95*0.8;
	var l = parseInt($(".u-nav ol").css("left")) + w;
	if (l <= 0)
		$(".u-nav ol").animate({
			left: l,
			opacity: 'show'
		}, {
			duration: 500
		});
}

//向右
function ext(){
	var s = $(".u-nav li").length;
	var w=$("#miframe").width()*0.95*0.8;
	var l = parseInt($(".u-nav ol").css("left")) - w;
	var i=$(".u-nav img").width();
	
	if (l > -(i*s))
		$(".u-nav ol").animate({
			left: l,
			opacity: 'show'
		}, {
			duration: 500
		});
}

function touchSatrtFunc(evt) {
	try {
		var touch = evt.touches[0];
		var x = Number(touch.pageX);
		var y = Number(touch.pageY);
		startX = x;
		startY = y;
	} catch (e) {
		alert('touchSatrtFunc：' + e.message);
	}
}
function touchMoveFunc(evt) {
	try {
		var touch = evt.touches[0];
		var x = Number(touch.pageX);
		var y = Number(touch.pageY);

		if (x - startX > 0) {
			isleft=false;
		}else if(x - startX < 0){
			isleft=true;
		}
		if (y - startY != 0) {
			evt.preventDefault();
		}
	} catch (e) {
		alert('touchMoveFunc：' + e.message);
	}
}
function touchEndFunc(evt) {
	try {
		if(isleft && len>0) 
			len--;
		else if(!isleft && len<count-1)
			len++;
		$('.m-dialog li').removeClass("sel");
		$('.u-maskdiv img').attr("src",$(".m-dialog li").eq(len).attr("data"));
		$('.m-dialog li').eq(len).addClass("sel");

		var s = $(".u-nav li").length;
		var w=$("#miframe").width()*0.95*0.8;
		var i=$(".u-nav img").width();

		if(i*(len+1)-(w*p)>0){
			ext();
			p++;
		}else if(i*(len+1)-(w*(p-1))<=0 && p>1){
			pre();
			p--;
		}
	} catch (e) {
		alert('touchEndFunc：' + e.message);
	}
}
function bindEvent() {  
    document.getElementById('slide').addEventListener('touchstart', touchSatrtFunc, false);  
    document.getElementById('slide').addEventListener('touchmove', touchMoveFunc, false);  
    document.getElementById('slide').addEventListener('touchend', touchEndFunc, false);  
}  