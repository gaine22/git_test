
$(function($){
	var tbl = $('.table'),
		total = $('table .p_id').length, 
		complete = $('table .ico_end').length,
		pOwner = $(tbl).find('tbody').find('tr'),
		$pId = $('table .p_id'),
		popStyle = $('.popView');
	
	$(popStyle).off('click.popup').on('click.popup', open);
		
	function open(e){
		
		e.preventDefault();
		
		var base = $(this),
			link = null,
			name = '_blank', 
	        width = base.attr('data-width');
	        height = base.attr('data-height');
	        align = 'center',
	        top = 0,
	        left = 0,
	        toolbar = 'no',	       
	        menubar = 'no',
	        status = 'no',
	        resizable = 'no',
	        scrollbars = base.attr('data-scroll');
	        	
		if (align === 'center') {
			var w_w = $(window).outerWidth() / 2,
				w_h = $(window).outerHeight() / 2;
			
			
			left = w_w - (width / 2);
			top = w_h - (height / 2);
		}
		
		if (link !== null) {
			href = link;
		}

		var specs = 'width=' + width + ', height='+ height + ', left=' + left + ', top=' + top;
			specs += ', toolbar=' + toolbar + ', location = no' + 'resizable=' + resizable + ', status=' + status + ', menubar=' + menubar + ', scrollbars=' + scrollbars;
		
		window.open(this.href, name , specs);
	}
	
	
	

	$(pOwner).each(function(i) {
		var pOwnerL = $('.p_owner');
		
		if ($(pOwner).eq(i).data('user') === 'C') {
			pOwnerL.eq(i).text('최미경');			
		} else if ($(pOwner).eq(i).data('user') === 'M') {
			pOwnerL.eq(i).text('김미혜');
		}  else if ($(pOwner).eq(i).data('user') === 'Y') {
			pOwnerL.eq(i).text('유찬현');
		} 
		
	});	
		
	
	$pId.each(function(i) {
		if ($pId.eq(i).find('a').length > 0) {
			
			$(this).attr('data-link', 'Y');
			
			 if ($pId.eq(i).data('link') === 'Y') {				
				var pLink = $(this).find('a'),	
					pHref = $(this).find('a').attr('href'),
					pUrlLast = pHref.substr(pHref.lastIndexOf('/')+1), 
					pUrlLast2 = pUrlLast.split('.'); 
				
				$(pLink).text(pUrlLast2[0]);
				
			}
		}		
	});  
	
	
	$('#p_total').text(total);
	$('#p_end').text(complete);
	$('#p_com').text(Math.round(((complete/total)*100)) + '%');
	
	
	
		
});

// JavaScript Document
$(document).ready(function () {
	var $table = $('table#table1');
	var $tableBody = $table.find('tbody');
	var $SelDepth1 = $table.find('#depth1');
	var $SelDepth2 = $table.find('#depth2');
	var $tableTr = $tableBody.find('tr');
	var depth1Str = undefined;
	var depth1Seq = undefined;
	var depth2Str = undefined;
	var depth2Seq = undefined;

	var menuObj = {};
	
	// 넘버링을 위한 태그 추가 
	$table.find('colgroup').prepend('<col style="width:30px" />');
	$table.find('thead').find('tr').eq(0).prepend('<th scope="col" rowspan="2" style="border-right:1px solid #ccc">No</th>');
	
	// 대메뉴 메뉴 데이터 생성
	$tableTr.each(function (idx) {
		var $depth1 = $(this).find('td').eq(0);
		var $depth2 = $(this).find('td').eq(1);
		if ($depth1.text().trim() != '') {
			depth1Str = $depth1.text();
			depth1Seq = idx;
			if (!menuObj[idx]) { menuObj[idx] = {}; }
			menuObj[idx].menuNm = $depth1.text();
		}
		if ($depth2.text().trim() != '') {
			depth2Str = $depth2.text();
			depth2Seq = idx;
		}
		$(this).attr('data-seq1', depth1Seq).attr('data-depth1', depth1Str).attr('data-depth2', depth2Str).attr('data-seq2', depth2Seq);
		
		// 넘버링
		$(this).prepend('<td style="font-weight: bold;text-align: center;">'+ (idx + 1)+ '</td>');
	});
	
	// 대메뉴 메뉴 데이터 생성
	$tableTr.each(function (idx) {
		if (!menuObj[$(this).attr('data-seq1')].lowerMenu) {
			menuObj[$(this).attr('data-seq1')].lowerMenu = {};
		}
		menuObj[$(this).attr('data-seq1')].lowerMenu[$(this).attr('data-seq2')] = $(this).attr('data-depth2');
	});
	
	// 대메뉴 Option 태그 생성
	var arrHtmlStr = new Array();
	arrHtmlStr.push('<option value=""> -  선택 - </option>');
	for (var name in menuObj) {
		arrHtmlStr.push('<option value="' + name + '">' + menuObj[name].menuNm + '</option>');
	}
	$SelDepth1.html(arrHtmlStr.join(''));

	// 대메뉴 이벤트 바인딩
	$SelDepth1.on('change', function () {
		$owner.val('');
		
		if($SelDepth1.val()){
			$tableTr.hide();
			$tableTr.filter('[data-seq1="' + $SelDepth1.val() + '"]').show();
		} else {
			$tableTr.show();
		}
		
		// 중메뉴 Option 태그 생성
		if(menuObj[$SelDepth1.val()]){
			var lowerMenu = menuObj[$SelDepth1.val()].lowerMenu;
			arrHtmlStr.length = 0;
			arrHtmlStr.push('<option value=""> -  선택 - </option>');
			for (var name2 in lowerMenu) {
				if (lowerMenu[name2]) {
					arrHtmlStr.push('<option value="' + name2 + '">' + lowerMenu[name2] + '</option>');
				}
			}
			$SelDepth2.html(arrHtmlStr.join(''));
		}
	});

	// 중메뉴 이벤트 바인딩
	$SelDepth2.on('change', function () {
		$owner.val('');
		if($SelDepth2.val()){
			$tableTr.hide();
			$tableTr.filter('[data-seq2="' + $SelDepth2.val() + '"]').show();
		} else {
			$SelDepth1.trigger('change');
		}
	});
	
	
	// 담당자 셀렉트 박스 생성을 위한 데이터 생성
	var $owner = $table.find('#owner');
	var arrOwnerList = new Array();
	$tableTr.each(function (idx) {
		var owner = $(this).find('td').eq(7).text().trim();
		var flag = true;
		for(var i=0; i<arrOwnerList.length;i++){ 
			if(arrOwnerList[i] == owner){ flag = false; } 
		}
		if(flag){ arrOwnerList.push(owner); }
		$(this).attr('data-owner', owner);
	});
	
	// 담당자 셀렉트 박스 Option태그 생성
	arrHtmlStr.length = 0;
	arrHtmlStr.push('<option value=""> -  선택 - </option>');
	for (var i=0; i<arrOwnerList.length;i++) {
		arrHtmlStr.push('<option value="' + arrOwnerList[i] + '">' + arrOwnerList[i] + '</option>');
	}
	$owner.html(arrHtmlStr.join(''));
	
	// 담당자 셀렉트 박스 이벤트 바인딩
	$owner.on('change', function(){
		$SelDepth1.val('');
		$SelDepth2.val('');
		
		if($owner.val() == '0'){
			$tableTr.show();
		} else {
			$tableTr.hide();
			$tableTr.filter('[data-owner="' + $owner.val() +'"]').show();
		}
	});
	
	// 시작일 셀렉트 박스 생성을 위한 데이터 생성
	var $stDate = $table.find('#stDate');
	var arrStDateList = new Array();
	$tableTr.each(function (idx) {
		var stDate = $(this).find('td').eq(8).find('span').text().trim();
		var flag = true;
		for(var i=0; i<arrStDateList.length;i++){ 
			if(arrStDateList[i] == stDate){ flag = false; } 
		}
		if(flag){ arrStDateList.push(stDate); }
		$(this).attr('data-stDate', stDate);
	});
	
	// 시작일 셀렉트 박스 Option태그 생성
	arrStDateList = arrStDateList.sort();
	arrHtmlStr.length = 0;
	arrHtmlStr.push('<option value="0"> -  선택 - </option>');
	for (var i=0; i<arrStDateList.length;i++) {
		arrHtmlStr.push('<option value="' + arrStDateList[i] + '">' + arrStDateList[i] + '</option>');
	}
	$stDate.html(arrHtmlStr.join(''));
	
	// 시작일 셀렉트 박스 이벤트 바인딩
	$stDate.on('change', function(){
		$SelDepth1.val('');
		$SelDepth2.val(''); 
		
		if($stDate.val() == '0'){
			$tableTr.show();
		} else {
			$tableTr.hide();
			$tableTr.filter('[data-stDate="' + $stDate.val() +'"]').show();
		}
	});
	
	// 종료일 셀렉트 박스 생성을 위한 데이터 생성
	var $edDate = $table.find('#edDate');
	var arrEdDateList = new Array();
	$tableTr.each(function (idx) {
		var edDate = $(this).find('td').eq(9).find('span').text().trim();
		var flag = true;
		for(var i=0; i<arrEdDateList.length;i++){ 
			if(arrEdDateList[i] == edDate){ flag = false; } 
		}
		if(flag){ arrEdDateList.push(edDate); }
		$(this).attr('data-edDate', edDate);
	});
	
	// 종료일 셀렉트 박스 Option태그 생성
	arrEdDateList = arrEdDateList.sort();
	arrHtmlStr.length = 0;
	arrHtmlStr.push('<option value="0"> -  선택 - </option>');
	for (var i=0; i<arrEdDateList.length;i++) {
		arrHtmlStr.push('<option value="' + arrEdDateList[i] + '">' + arrEdDateList[i] + '</option>');
	}
	$edDate.html(arrHtmlStr.join(''));
	
	// 종료일 셀렉트 박스 이벤트 바인딩
	$edDate.on('change', function(){
		$SelDepth1.val('');
		$SelDepth2.val(''); 
		
		if($edDate.val() == '0'){
			$tableTr.show();
		} else {
			$tableTr.hide();
			$tableTr.filter('[data-edDate="' + $edDate.val() +'"]').show();
		}
	}); 
	
});
 




 



 