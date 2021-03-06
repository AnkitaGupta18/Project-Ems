(function ($) {
	'use strict';

	var cache = {},
		p = getParams('layout'),
        l = p ? p + '.' : '',
        layout = "'../views/layout."+l+"html'",
        dashboard = '../views/layout/dashboard.'+l+'html';

	function get (url, cb) {
	    if (cache[url]) return cb(cache[url]);
	    $.ajax({
	      url: url,
	      success: function(data) {
	        cache[url] = data;
	        cb(data);
	      },
	      error: function(jqXHR, textStatus, errorThrown) {
	        console.log(jqXHR, textStatus, errorThrown);
	      },
	      dataType: 'text'
	    });
	}

	function loadPage(data){
		var view = '#view',
			url = window.location.href.split('#');
		window.title = data.data.title;
		// see if this page need a layout(page to signin)
		if(url[1] && (url[1].indexOf('app') == -1) ) {
			view = '#app';
			renderPage(data, view);
		}else{
			// need a layout and we must include a layout for it (signin to page)
			if($(view).length == 0){
				$('#app').empty().append('<div ui-include="'+layout+'"></div>').uiInclude().then(
		    		function(){ 
						//console.log('layout done');
						renderPage(data, view);
					}
		    	);
		    // the layout is exist (page to page)
			}else{
				renderPage(data, view);
			}
		}
    };

    function renderPage(data, view){
		$('#pageTitle').html(data.data.title);
		$('html,body').animate({scrollTop: 0}, 200);
		// hide open menu
        $('#aside').modal('hide');
        get(data.templateUrl, function (html) {
          	var compiled = _.template(html),
		      	content = compiled(app);
		    $(view).empty().append(content).uiInclude().then(
		    	function(){
		    		//console.log('page done');
		    	}
		    );
		});
    }

    function getParams(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    // config the router
    routie({
    	'': function() {
          loadPage(
	      	{
	      		templateUrl: dashboard,
	      		data: {title: 'Dashboard'}
	      	}
	      );
        },
	    '/app/dashboard': function() {
	      loadPage(
	      	{
	      		templateUrl: dashboard,
	      		data: {title: 'Dashboard'}
	      	}
	      );
	    },
	    '/app/inbox': function() {
	      loadPage(
	      	{
	      		templateUrl: '../views/app/inbox.html',
	      		data: {title: 'Inbox'}
	      	}
	      );
	    },
	    '/app/contact': function() {
	      loadPage(
	      	{
	      		templateUrl: '../views/app/contact.html',
	      		data: {title: 'Contact'}
	      	}
	      );
	    },
	    '/app/layout/header': function() {
	      loadPage(
	      	{
	      		templateUrl: '../views/layout/layout.headers.html',
	      		data: {title: 'Headers'}
	      	}
	      );
	    },
	    '/app/layout/aside': function() {
	      loadPage(
	      	{
	      		templateUrl: '../views/layout/layout.asides.html',
	      		data: {title: 'Asides'}
	      	}
	      );
	    },
	    '/app/layout/footer': function() {
	      loadPage(
	      	{
	      		templateUrl: '../views/layout/layout.footers.html',
	      		data: {title: 'Footers'}
	      	}
	      );
	    },
	    '/app/widget': function() {
	      loadPage(
	      	{
	      		templateUrl: '../views/widget/widget.html',
	      		data: {title: 'Widget'}
	      	}
	      );
		},
		    '/app/ui/arrow': function() {
		      loadPage(
		      	{
		      		templateUrl: '../views/ui/arrow.html',
		      		data: {title: 'Arrow'}
		      	}
		      );
		    },
		    '/app/ui/box': function() {
		      loadPage(
		      	{
		      		templateUrl: '../views/ui/box.html',
		      		data: {title: 'Box'}
		      	}
		      );
		    },
		    '/app/ui/button': function() {
		      loadPage(
		      	{
		      		templateUrl: '../views/ui/button.html',
		      		data: {title: 'Button'}
		      	}
		      );
		    },
		    '/app/ui/color': function() {
		      loadPage(
		      	{
		      		templateUrl: '../views/ui/color.html',
		      		data: {title: 'Color'}
		      	}
		      );
		    },
		    '/app/ui/dropdown': function() {
		      loadPage(
		      	{
		      		templateUrl: '../views/ui/dropdown.html',
		      		data: {title: 'Dropdown'}
		      	}
		      );
		    },
		    '/app/ui/grid': function() {
		      loadPage(
		      	{
		      		templateUrl: '../views/ui/grid.html',
		      		data: {title: 'Grid'}
		      	}
		      );
		    },
		    '/app/ui/icon': function() {
		      loadPage(
		      	{
		      		templateUrl: '../views/ui/icon.html',
		      		data: {title: 'Icon'}
		      	}
		      );
		    },
		    '/app/ui/label': function() {
		      loadPage(
		      	{
		      		templateUrl: '../views/ui/label.html',
		      		data: {title: 'Label'}
		      	}
		      );
		    },
		    '/app/ui/list': function() {
		      loadPage(
		      	{
		      		templateUrl: '../views/ui/list.html',
		      		data: {title: 'List'}
		      	}
		      );
		    },
		    '/app/ui/modal': function() {
		      loadPage(
		      	{
		      		templateUrl: '../views/ui/modal.html',
		      		data: {title: 'Modal'}
		      	}
		      );
		    },
		    '/app/ui/nav': function() {
		      loadPage(
		      	{
		      		templateUrl: '../views/ui/nav.html',
		      		data: {title: 'Nav'}
		      	}
		      );
		    },
		    '/app/ui/progress': function() {
		      loadPage(
		      	{
		      		templateUrl: '../views/ui/progress.html',
		      		data: {title: 'Progress'}
		      	}
		      );
		    },
		    '/app/ui/social': function() {
		      loadPage(
		      	{
		      		templateUrl: '../views/ui/social.html',
		      		data: {title: 'Social'}
		      	}
		      );
		    },
		    '/app/ui/streamline': function() {
		      loadPage(
		      	{
		      		templateUrl: '../views/ui/streamline.html',
		      		data: {title: 'Streamline'}
		      	}
		      );
		    },
		    '/app/ui/timeline': function() {
		      loadPage(
		      	{
		      		templateUrl: '../views/ui/timeline.html',
		      		data: {title: 'Timeline'}
		      	}
		      );
		    },
		    '/app/ui/vectormap': function() {
		      loadPage(
		      	{
		      		templateUrl: '../views/ui/map.vector.html',
		      		data: {title: 'Vector Map'}
		      	}
		      );
		    },
	    '/app/page/profile': function() {
	      loadPage(
	      	{
	      		templateUrl: '../views/page/profile.html',
	      		data: {title: 'Profile'}
	      	}
	      );
	    },
	    '/app/page/setting': function() {
	      loadPage(
	      	{
	      		templateUrl: '../views/page/setting.html',
	      		data: {title: 'Setting'}
	      	}
	      );
	    },
	    '/app/page/search': function() {
	      loadPage(
	      	{
	      		templateUrl: '../views/page/search.html',
	      		data: {title: 'Search'}
	      	}
	      );
	    },
	    '/app/page/faq': function() {
	      loadPage(
	      	{
	      		templateUrl: '../views/page/faq.html',
	      		data: {title: 'FAQ'}
	      	}
	      );
	    },
	    '/app/page/invoice': function() {
	      loadPage(
	      	{
	      		templateUrl: '../views/page/invoice.html',
	      		data: {title: 'Invoice'}
	      	}
	      );
	    },
	    '/app/page/price': function() {
	      loadPage(
	      	{
	      		templateUrl: '../views/page/price.html',
	      		data: {title: 'Price'}
	      	}
	      );
	    },
	    '/app/page/blank': function() {
	      loadPage(
	      	{
	      		templateUrl: '../views/page/blank.html',
	      		data: {title: 'Blank'}
	      	}
	      );
	    },
	    '/app/form/layout': function() {
	      loadPage(
	      	{
	      		templateUrl: '../views/form/layout.html',
	      		data: {title: 'Layout'}
	      	}
	      );
	    },
	    '/app/form/element': function() {
	      loadPage(
	      	{
	      		templateUrl: '../views/form/element.html',
	      		data: {title: 'Element'}
	      	}
	      );
	    },
	    '/app/table/static': function() {
	      loadPage(
	      	{
	      		templateUrl: '../views/table/static.html',
	      		data: {title: 'Static'}
	      	}
	      );
	    },
	    '/app/table/datatable': function() {
	      loadPage(
	      	{
	      		templateUrl: '../views/table/datatable.html',
	      		data: {title: 'Datatable'}
	      	}
	      );
	    },
	    '/app/table/footable': function() {
	      loadPage(
	      	{
	      		templateUrl: '../views/table/footable.html',
	      		data: {title: 'Footable'}
	      	}
	      );
	    },
	    '/app/chart': function() {
	      loadPage(
	      	{
	      		templateUrl: '../views/chart/chart.html',
	      		data: {title: 'Chart'}
	      	}
	      );
	    },
	    '/app/docs': function() {
	      loadPage(
	      	{
	      		templateUrl: '../views/page/docs.html',
	      		data: {title: 'Documents'}
	      	}
	      );
	    },
	    '/access/signin': function() {
	      loadPage(
	      	{
	      		templateUrl: '../views/page/signin.html',
	      		data: {title: 'Sign in'}
	      	}
	      );
	    },
	    '/access/signup': function() {
	      loadPage(
	      	{
	      		templateUrl: '../views/page/signup.html',
	      		data: {title: 'Sign up'}
	      	}
	      );
	    },
	    '/access/forgot-password': function() {
	      loadPage(
	      	{
	      		templateUrl: '../views/page/forgot-password.html',
	      		data: {title: 'Forgot password'}
	      	}
	      );
	    },
	    '/access/lockme': function() {
	      loadPage(
	      	{
	      		templateUrl: '../views/page/lockme.html',
	      		data: {title: 'Lock me'}
	      	}
	      );
	    },
	    '/404': function() {
	      loadPage(
	      	{
	      		templateUrl: '../views/page/404.html',
	      		data: {title: '404'}
	      	}
	      );
	    },
	    '/505': function() {
	      loadPage(
	      	{
	      		templateUrl: '../views/page/505.html',
	      		data: {title: '505'}
	      	}
	      );
	    }

	});

})(jQuery);
