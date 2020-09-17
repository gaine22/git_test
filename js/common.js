;(function($, win, doc, undefined) {
	
	//'use strict';
	
	win.N = {
		initialize : function(){
			var base = this;
			
			//root
			base.root_body = $('body');
			base.root_header = $('.header');
			
			//main hero slide 			
			N.mainNav();
			N.menuH();
			
			N.resizeClass();
			N.header();	
			N.metSlide();

			//$('input[type="text"], input[type="password"]').uiPlaceholder();
			$('input[type=radio]').uiRadioCheck();
			$('input[type=checkbox]').uiRadioCheck();
			//$('.uiSelect').uiSelect(); 
			$('.uiDrop').uiDropdowns();
			
			N.totalSearch(1);	
		},
		
		// 통합검색
		totalSearch : function(type) {		
			
			var $srcKey = $('.searchKey'),
			$srcWrap = $('.searchAutoWrap'),
			$autoBtn =  $('.searchAutoWrap .btnAuto'),
			autoKey = 1; // 자동완성 켬 1 - 끔 0
			
			if(autoKey == 0){
				$autoBtn.addClass('on').text('자동완성 기능 켜기');
			}else{
				$autoBtn.removeClass('on').text('자동완성 기능 끄기');
			}
			
			$srcKey.find('input[type="text"]').on('keyup focus ',function(){
				var inputVal = $(this).val();
				if(inputVal !== ''){
					$srcWrap.show().addClass('on');
					$srcKey.find('.btnReset').show();
				} else {					
					$srcWrap.hide().removeClass('on');
					$srcKey.find('.btnReset').css({'display':'none'});
					$srcKey.find('.searchItem > ul li.on').removeClass('on');
				}
				if(autoKey == 1){
					$srcKey.find('.searchItem').css({'display':'block'});
				}else{
					$srcKey.find('.searchItem').css({'display':'none'});
					$srcKey.find('.searchItem > ul li.on').removeClass('on');
				}
			}).on('focusout', function(){
				if(type == 1){return false;}
				setTimeout(function(){
					if($srcWrap.hasClass('on') && !$srcWrap.hasClass('hover')){
						$srcWrap.removeClass('on').hide();
					}
				});
			});	
			
			$srcKey.find('.searchItem').on('focus','ul li a', function(){	
				$srcWrap.removeClass('on');
				$(this).parent().addClass('on');
				if(type == 1){return false;}
				$srcWrap.addClass('hover');
			}).on('focusout', function(){			
				if(type == 1){return false;}
				$srcWrap.removeClass('hover');
				setTimeout(function(){		
					if(!$srcWrap.hasClass('hover')){					
						$srcWrap.hide().removeClass('on');
						$srcKey.find('.searchItem > ul li.on').removeClass('on');
					}
				}, 100);
			});

			$srcKey.find($autoBtn).on('focus', function(){
				$srcWrap.addClass('hover');
			}).on('focusout', function(){
				$srcWrap.removeClass('hover');
				setTimeout(function(){
					if(!$srcWrap.hasClass('hover')){
						$srcWrap.hide().removeClass('on');
						$srcKey.find('.searchItem > ul li.on').removeClass('on');
						if($srcWrap.hasClass('shift')){
							$srcKey.find('input[type="text"]').focus();
							$srcWrap.removeClass('shift');
						}else{
							//$('#research').focus();
						}
					}
				}, 0);
			});
			$autoBtn.on('keydown ',function(e){
				var isshift = false;
				if(window.event){
					keyCode = event.keyCode;
					shiftKey = event.shiftKey;
				}else if(e.which){
					keyCode = e.which;
					shiftKey = isshift;
				}
				if(keyCode == 9 && shiftKey == true){ // shift tab
					$srcWrap.addClass('shift');
				}
			});		
		/*	
			$srcKey.find('input[type="text"]').on('keydown ',function(e){
				var isshift = false;
				if(window.event){
					keyCode = event.keyCode;
					shiftKey = event.shiftKey;
				}else if(e.which){
					keyCode = e.which;
					shiftKey = isshift;
				}
				var onIndex = $srcKey.find('.searchItem > ul li.on').index();
				var listLength = $srcKey.find('.searchItem > ul li').length;
				if(keyCode == 9 && shiftKey == false){ // tab
					if($srcWrap.hasClass('on')){
						$srcWrap.addClass('hover');
						setTimeout(function(){
							if(autoKey == 0){
								$srcKey.find($autoBtn).focus();
							}else{
								$srcKey.find('.searchItem > ul > li:first-child > a').focus();
							}
						}, 0);
						
					}
				}
			});
		*/
			
			$('.searchKey .searchItem').on('keydown','ul li:first-child', function(e){
				var isshift = false;
				if(window.event){
					keyCode = event.keyCode;
					shiftKey = event.shiftKey;
				}else if(e.which){
					keyCode = e.which;
					shiftKey = isshift;
				}
				if(keyCode == 9 && shiftKey == true){ // shift tab
					setTimeout(function(){
						$('.searchKey input[type="text"]').focus();
					}, 0);
				}
			});
			
			//자동완성 on/off
			$autoBtn.on('click', function(){
				$('.searchKey input[type="text"]').removeClass('focus');
				if(autoKey == 0) {
					$(this).text('자동완성 기능 끄기').removeClass('on');
					$('.searchKey .searchItem').css({'display':'block'});
					autoKey =1;
				}else{
					$(this).text('자동완성 기능 켜기').addClass('on');
					$('.searchKey .searchItem').css({'display':'none'}).find('.on').removeClass('on');
					autoKey =0;
				}
			});
			
			$srcKey.find('.searchItem').on('click', 'ul > li > a', function(){
				var keyword = $(this).text();
				$srcKey.find('input[type="text"]').val(keyword);
				$srcWrap.hide().removeClass('on');
				$srcKey.find('.searchItem > ul li.on').removeClass('on');
			});
			
			$srcKey.find('.btnReset').on('click', function(){
				$srcKey.find('input[type="text"]').val('').focus();
			});
			
		},
	
		resizeClass : function() {
			var base = this,
				$body =	$('body'),
				$html = $('html');
			
			$(win).resize(function(){
				var old_scrT = $(win).scrollTop(),
					width = $(doc).outerWidth(),
					devsize = [1440, 1023, 767],
					sizeMode = width > devsize[0] ? 4 : width > devsize[1] ? 3 : width > devsize[2] ? 2 : 1,
					sizeClass = (' s'+ sizeMode +' s'+ (2 > sizeMode ? 12 : 34) + (360 > width ? ' s0' : ''));
				//alert(width + " sizeMode:" + sizeMode);
				$html.removeClass('notransition transform backgroundsize rgba svg pointerevents opacity');
				$html.removeClass('s0 s1 s2 s3 s4 s12 s34').addClass(sizeClass);
				

				// 2017.04.18 수정
				setTimeout(function(){
					$('.tbScroll').width($(window).width());
					$('.tblBrd').show();
				},100);

				
				if($('.win .popup').length) {
					$html.removeClass('s0 s1 s2 s3 s4 s12 s34').addClass("s34");
				}
				
				base.s12 = (!!$('html.s12').length);
				base.s34 = (!!$('html.s34').length);
				base.win = (!!$('html.win').length);
				base.transition = (!!$('html.transition').length); 

				if (base.win)
				{
					if (old_scrT !== 0) {
						$body.addClass('header_reduce');
						base.header_scaleDown()
					} else {
						$body.removeClass('header_reduce');
						base.header_scaleUp()
					}
				} else if (base.s12) {
					var conH = $(win).height();
					if($('.mVisual').length) {
						$('.mVisual').css({'height':conH-414+'px'});
					}
					
					/*
					if($('.chatBox').length) {
						var winH = $(win).height();					
						var chatH;
						if ($('html.s12').length) chatH = winH - 172;
						if ($('html.s34').length) chatH = winH - 182;
						
						$(".chatWrap .chatList").css({"height":chatH+"px"});
					}
					*/
				}

			}).resize();
		},
			
		header : function() {
			var base = this,
				$body =	$('body'),
				old_scrT = $(win).scrollTop(),
				$contact = null,
				sc_t = 0,
				backdrop = false;
				
			// search open 여부
			$body.data('searchopen', false);
			(old_scrT !== 0) ? $body.addClass('header_reduce') : $body.removeClass('header_reduce');
			
			$(win).scroll(scaleTransform); 
			$('.exe_menu').on('click.menu', function(e){
				e.preventDefault();
				
				sc_t = $(win).scrollTop();
				menuAct();
			});
			$('.exe_contact').on('click.contact', contactAct);
			$('.exeSearch').on('click.search', searchAct);

			if($('html.s12').length) {
				$('.menuWrap nav > ul > li > a').click(subDepthOpen);
				$('.uiMbGnb').uiDropdowns();
			}
			
			// search event
			function searchAct(e) {
				e.preventDefault();
				// search open

				(!$body.data('srchtoggle')) ? searchShow() : searchHide();
				
				// backdrop click event
				$('.exeSearch, .searchBox *')
					.off('mouseover.search focus.search')
					.on('mouseover.search focus.search', function (){
						backdrop = true;
						docEvent();	
					})
					.off('mouseleave.search blur.search')
					.on('mouseleave.search  blur.search', function (){
						backdrop = false;
						docEvent();
					});
				$('.exe_menu')
					.off('click.search')
					.on('click.search', function (){
						docEvent();	
					});
				
				function docEvent() {
					(backdrop === true) ? $(doc).off('click.search') : $(doc).off('click.search').one('click.search', docClick);
				}
				function docClick() {
					backdrop = true;
					
					$body.data('searchopen') === false ? searchHide() : '';
				}
				
			}
			// search show fn
			function searchShow() {
				$body.data('srchtoggle', true);
				if ($('html.s34').length) {
					$('.searchBox').css('display','block');
					$('.searchBox').addClass('open');
					$('.searchBox button').stop().animate({
						right : 10
					},300);
				} 
				else {
					$('.exe_menu').data('open',true);
					menuAct();
					$('.searchBoxWrap').show();
					$('.exeSearch').addClass('open');
					$('.searchBox').stop().animate({
						top : 0
					},400);
				}
			}
			// search hide fn
			function searchHide() {
				$body.data('srchtoggle', false);
				if ($('html.s34').length) {
					$('.searchBox button').stop().animate({
						right : 180
					},function(){
						$('.searchBox').css('display','none');
						$('.searchBox').removeClass('open');
					});
				}
				else {
					$('.searchBox').stop().animate({
						top : -60
					},200, function(){
						$('.searchBoxWrap').hide();
						$('.exeSearch').removeClass('open');
					});
				}
			}
			
			// contact event
			function contactAct(e) {
				e.preventDefault();
				
				var base_contact = this,
					id = $(base_contact).attr('href'),
					$close = $(id).find('.ui_close');

				// open
				$contact = $(id);
				$contact.css('display','block').stop().animate({
					right : 0
				},300).attr('tabindex', 0).focus();
				$._uiHold.hold(id);
				
				// close
				$close.on('click.contact', function(e) {
					e.preventDefault();
					contactHide();
					$(base_contact).focus();
				});
			}
			// contact close fn
			function contactHide() {
				if ($contact !== null) {
					$contact.stop().animate({
						right : ($contact.outerWidth() * -1) - 10
					},300, function(){
						$(this).css('display', 'none');
					});
				}
			}
			
			// menu event
			function menuAct() {
				var base_menu = $('.exe_menu'),
					id = $(base_menu).attr('href'),
					$close = $(id).find('.ui_close');
					
				// menu open & close toggle
				(!$(base_menu).data('open')) ? menuOpen() : menuClose();
		
				// close button click event
				$close.on('click.menu', function(e) {
					e.preventDefault();
					menuClose();
					$(base_menu).focus();
				});
				// menu close fn
				function menuOpen() {
					if (base.win) {
						$body.data('searchopen',true);
						backdrop = true;
						searchShow();
					}
					
					base.header_scaleUp();
					//contactHide();
					base.root_body.addClass('menuOpen');
					
					if($('html.s12').length) {
						$(".menuWrap").css('z-index','103');
						$('.menuOpen .ui_close').show();
					} else {
						$(".menuWrap").css({'margin-top':'50px','z-index':'100'}).animate({ 'margin-top':'70px' },function(){ $(this).css('z-index','103'); $('.menuOpen .ui_close').show(); });
					}
					
					//$(base_menu).data('open', true).addClass('on').find('.hide').text('닫기');
					$(base_menu).data('open', true).addClass('on').text('').append('닫기');
					$(id).attr('tabindex', 0).focus();
					
					
					$._uiHold.hold(id);

					// 전체메뉴 li 높이 맞추기 (web 전용)
					var mnArry = new Array();
					if($('html.s34').length) {
						$('.allMenu > li').height('auto');
						for (var n=0; n < 5; n++) {
							mnArry[n] = parseInt($('.allMenu > li:eq('+n+')').height());
						}
						var mnH = Math.max.apply(null, mnArry) + 35; 

						for (var n=0; n < 5; n++) {
							$('.allMenu > li:eq('+n+')').height(mnH);
						}
					}
				}
				// menu close fn
				function menuClose() {
					if (base.win) {
						$body.data('searchopen',false);
						backdrop = false;
						searchHide();
					}
					(sc_t > 0) ? base.header_scaleDown() : '';
					base.root_body.removeClass('menuOpen');
					//$(base_menu).data('open', false).removeClass('on').find('.hide').text('열기');
					$(base_menu).data('open', false).removeClass('on').text('').append('메뉴 <span class="hide">열기</span>');
					
					if($('html.s12').length) {
						$('.menuWrap nav > ul > li').removeClass('on');
						$('.menuWrap nav > ul ul').slideUp();
					}
				}
			}
			
			// header scale fn
			function scaleTransform(e) {
				var current_scrT = $(this).scrollTop();
				
				(current_scrT !== 0) ? base.header_scaleDown() : base.header_scaleUp();
			}

			function subDepthOpen(){
				if ($('.menuWrap nav > ul > li').hasClass('on')) {
					if($(this).parent().hasClass('on')){
						$(this).parent().removeClass('on');
						$(this).next('ul').slideUp();
					}
					else {
						$('.menuWrap nav > ul > li').removeClass('on');
						$('.menuWrap nav > ul ul').slideUp();
						$(this).parent().addClass('on');
						$(this).next('ul').slideDown();
					}
				}
				else {
					$(this).parent().addClass('on');
					$(this).next('ul').slideDown();
				}
			}
		},
		header_scaleUp : function() {
			var base = this,
				$body = $('body'),
				$header = $('.header'),
				$groupA = $('.header .groupL'),
				$groupB = $('.header .groupR');
			
			$header.data('scale', false);
			$body.removeClass('header_reduce');
			
			if (!base.s12) {				
				$header.stop().animate({
					height : 70
				});
				$header.find('.logo').stop().animate({
					width : 168,
					paddingTop : 15,
					marginLeft : -84
				});
				$groupA.stop().animate({
					paddingTop : 26
				});
				$groupB.find('a').stop().animate({
					height : 70,
					paddingTop : 26
				});
			}
		},
		header_scaleDown : function() {
			var base = this,
				$body = $('body'),
				$header = $('.header'),
				$groupA = $('.header .groupL'),
				$groupB = $('.header .groupR');

			if (!$header.data('scale')) {
				$header.data('scale', true);
				$body.addClass('header_reduce');
				
				if (!base.s12) {	
					$header.stop().animate({
						height : 50
					});
					$header.find('.logo').stop().animate({
						width : 120,
						paddingTop : 11,
						marginLeft : -60
					});
					$groupA.stop().animate({
						paddingTop : 15
					});
					$groupB.find('a').stop().animate({
						height : 50,
						paddingTop : 15
					});
				}
			}
		},
		footer : function(){
			
		},
		metSlide : function() {
			/* 로그인페이지 이벤트 배너 슬라이드 */
			$('.exeBanSlide').uiSlide({ 
				dot : true,
				nav : true,
				rolling : true,
				style : 'slide',
				speed : 700,
				
				autoplay : true,
				autoplay_state : 'stop',
				autoplay_time : 3000 				
			});
		},
		mainNav : function() {
			var timer;
			$('.ui_mainNav .depth1 > li > a, .ui_mainNav .depth2').on('mouseover focus', function(){
				$('.ui_mainNav .depth1 > li').removeClass('on');
				$(this).closest('li').addClass('on').closest('.ui_mainNav').addClass('active');
				clearTimeout(timer);
			}).on('mouseleave blur', function(){
				hide(this);
			});
			
			function hide(target){
				var target = target;
				timer = setTimeout(function(target){
					$('.ui_mainNav .depth1 > li').removeClass('on').closest('.ui_mainNav').removeClass('active');
				},50);
			}
		},
		menuH : function() {  // 푸터 전체메뉴 li 높이 맞추기
			var listArry = new Array();
			for (var i=0; i < 5; i++) {
				listArry[i] = parseInt($('nav .totalMenu > li:eq('+i+')').height());
			}
			var listH = Math.max.apply(null, listArry) + 40; 

			for (var i=0; i < 5; i++) {
				$('nav .totalMenu > li:eq('+i+')').height(listH);
			}
		}
		
	};

	$(win).load(function() {
		setTimeout(function() {
			N.initialize();
		}, 0);
	});
	
})(jQuery, window, document);