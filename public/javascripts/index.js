require.config({
	paths: {
		'jquery': '/lib/jquery/dist/jquery',
    'bootstrap': '/lib/bootstrap/dist/js/bootstrap'
	},
	shim: {
		'jquery'    : { exports: '$' },
    'bootstrap' : { deps: ['jquery'], exports: 'bootstrap'}
	}
});

define ('isIE', [], function () {
    return function() {
      var undef,
    		v = 3,
    		div = document.createElement("div"),
    		all = div.getElementsByTagName("i");
    	while (
    		div.innerHTML = "<!--[if gt IE " + (++v) + "]><i></i><![endif]-->",
    		all[0]
    	) {
    		return v > 4 ? v : undef;
    	}
    };
});

define ('handleSidebarToggler', [], function () {
      return function(){

        var body = $('body');

    	  // handle sidebar show/hide
    	  body.on('click', '.sidebar-toggler', function (e) {

    		var sidebarMenuSubs = $('#sidebar .nav-second-level, #sidebar .nav-third-level');

    		//collapse("toggle") した際にheightが「0」になるため、height style削除
    		$("#sidebar-area .dropdown-collapse").parent("li").children("ul").css('height', '');

    		$(".sidebar-search", $('.page-sidebar')).removeClass("open");
    		if (body.hasClass("sidebar-closed")) {
    			body.removeClass("sidebar-closed");
    			sidebarMenuSubs.addClass('collapse');

    			if ($.cookie) {
    				$.cookie('sidebar-closed', '0');
    			}
    		} else {
    			body.addClass("sidebar-closed");
    			sidebarMenuSubs.removeClass('collapse');

    			if ($.cookie) {
    				$.cookie('sidebar-closed', '1');
    			}
    		}
    		$(window).trigger('resize');
    	});

    };
});


require(['jquery', 'bootstrap', 'isIE', 'handleSidebarToggler'],
function($, bootstrap, isIE, handleSidebarToggler){

//window.Raphael = Raphael;

/**
* sidebar menu click add tab
*/
$("a[name='loadTabContent']").click(function(e){
		e.preventDefault();

		var self = $(this).context;
		var tabId = $(this).attr('data-id');
		var tabTitle = $(this).attr('title');
		var tabSrc = "/"+$(this).attr('data-src');

		/* check tab existence */
		var tabExist;
		$('#pageTab li').each(function(i, el){
			if($(this).children().attr('id') == tabId){
				tabExist = 1;
			}
		});
		if(tabExist){
			$('#'+tabId).trigger('click');
			return;
		}

		/* append tab */
		$('#pageTab').append(
			$('<li>'+
				'<a id="'+tabId+'" href="#pageTabContent-'+ tabId +'">'+
						tabTitle + '<button class="close" type="button" title="Remove this page">×</button>' +
				'</a>'+
			'</li>')
		);


		$('#pageTabContent').append(
			$('<div class="tab-pane" id="pageTabContent-'+ tabId +'"></div>')
		);

		$('#'+tabId).trigger('click');
		$("#pageTabContent-"+tabId).html('<object style="width: 100%; height: 800px;" data="/'+tabId+'"></object>')

});


/**
* Remove a Tab
*/
$('#pageTab').on('click', ' li a .close', function() {

			var tabActiveId;
			$('#pageTab li').each(function(i, el){
				if($(this).hasClass('active')){
					tabActiveId = $(this).children().attr('id');
				}
			});

			var prevTabId = $(this).parents('li').prev().children().attr('id');
			var tabId = $(this).parents('li').children().attr('id');
			var pageTabContentId = "pageTabContent-"+tabId;

			$(this).parents('li').remove('li');
			$("#"+pageTabContentId).remove();

		//if current tab active open previous tab
		if($(this).parents('li').hasClass('active')){
			$("#"+prevTabId).trigger('click');
		}else{
			//find active tab and open
			$("#"+tabActiveId).trigger('click');
		}

});


/**
 * Click Tab to show its content
 */
$("#pageTab").on("click", "a", function(e) {
	e.preventDefault();
	$(this).tab('show');
});


//side menu toggle (init)
if (isIE() <= 9) {
  $('#sidebar').find("li.active").has("ul").children("ul").collapse("show");
  $('#sidebar').find("li").not(".active").has("ul").children("ul").collapse("hide");
} else {
  $('#sidebar').find("li.active").has("ul").children("ul").addClass("collapse in");
  $('#sidebar').find("li").not(".active").has("ul").children("ul").addClass("collapse");
}

//side menu toggle (setting)
$("#sidebar-area .dropdown-collapse").on((jQuery.support.touch ? "tap" : "click"), function(e) {
  e.preventDefault();

  if ($("body").hasClass("sidebar-closed")) {
    return false;
  }

  $(this).parent("li").toggleClass("active").children("ul").collapse("toggle");

  //if ($toggle) { //toggle On ・ Off

  $(this).parent("li").siblings().removeClass("active").children("ul.in").collapse("hide");

  //}
  return false;
});

handleSidebarToggler();

var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

if ($.cookie && $.cookie('sidebar-closed') === '1' && !$('body').hasClass("sidebar-closed") && width >= 768) {
  $('body').addClass("sidebar-closed");
  $('#sidebar .nav-second-level, #sidebar .nav-third-level').removeClass('collapse');
}

$(window).bind("load resize", function() {
  topOffset = 50;
  var body = $('body');
  var sidebarMenuSubs = $('#sidebar .nav-second-level, #sidebar .nav-third-level');

  width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;

  if (width < 768) {
    $('div.navbar-collapse').addClass('collapse');
    topOffset = 100; // 2-row-menu

    if (body.hasClass("sidebar-closed")) {
      body.removeClass("sidebar-closed");
      sidebarMenuSubs.addClass('collapse');
    }
  } else {
    $('div.navbar-collapse').removeClass('collapse');
    /*
    if ($.cookie) {
      if ($.cookie('sidebar-closed') === 1 && !$('body').hasClass("sidebar-closed")) {
        body.addClass("sidebar-closed");
        sidebarMenuSubs.removeClass('collapse');
      }
    }*/
  }

  height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height) - 1;
  height = height - topOffset;
  if (height < 1) height = 1;
  if (height > topOffset) {
    $("#page-wrapper").css("min-height", (height) + "px");
  }
});


});
