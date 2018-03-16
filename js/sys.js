$(function() {
	$.ajax({
		type: "get",
		url: "js/sign.json",
		success: function(data) {
			//请求成功动态生成li标签及其里面的元素
			//console.log(data);
			for(var key in data) {
				$('#top').append('<li class='+'"li swiper-slide"' + '></li>');
				$("#top li").eq(key).append('<div class='+'"regist_cont"'+ '></div>');
				$("#top li").eq(key).find('.regist_cont').append('<h1>兰州科技大市场会议签到系统</h1><p class='+'"regist_title"'+' meetId='+data[key].id+ '>'+data[key].topic+'</p><p class='+'"regist_data"'+'></p>');
				$("#top li").eq(key).find('.regist_cont .regist_data').append('<span>'+data[key].startTime+'</span>~<span>'+data[key].endTime+'</span><span class='+'"regist_room"'+'>会议室:&nbsp;&nbsp;</span><span>'+data[key].room+'</span>');
				$("#top li").eq(key).find('.regist_cont').append('<p class='+'"regis_people"'+'>参会人员(排名不分先后):</p>');
				$("#top li").eq(key).find('.regist_cont').append('<div class='+'"regist_per"'+'></div>');
				for(var j in data[key].signs) {
					$('.regist_per').eq(key).append('<span ' + 'dataStatus=' + data[key].signs[j].status + '>' + data[key].signs[j].name + '</span>');
					if($('.regist_per').eq(key).find('span').eq(j).attr('dataStatus') == 0){
						$('.regist_per').eq(key).find('span').eq(j).css({
							"color": "#00367a",
							"background": "rgba(0,180,207,.7)"
						})
					}else{
						$('.regist_per').eq(key).find('span').eq(j).css({
							'color': 'rgba(77,105,138,1)',
							'background': 'rgba(0,51,110,1)'
						})
					}
				}

			}

			//弹跳按钮效果
			$(".showup").on("touchstart", function() {
				$(".cont_title").animate({
					bottom: "0"
				}, '50');
				if($(".cont_title").attr("onOff") == "true") {
					$(".cont_title").animate({
						bottom: "-400px"
					}, '50');
					$(".cont_title").attr("onOff", false);
				} else {
					$(".cont_title").animate({
						bottom: "0"
					}, '50');
					$(".cont_title").attr("onOff", true);
				}
			
			})
			
			//点击名单签到
			$('.regist_per').find('span').on('touchstart', function() {
				var meetId = $(this).parent('.regist_per').parent('.regist_cont').find('.regist_title').attr('meetId');
				var name = $(this).html();
				var index = $(this).index();
				var $regist = $(this).parent('.regist_per');
				$.ajax({
					
					type:"get",
					url:"js/newsign.json",
					/*data:{
						"Id":"meetId",
						"name":"name"
					},*/
					success:function(result){
						$regist.find('span').eq(index).attr('dataStatus',result[0].signs[index].status);
						$regist.find('span').each(function(){
							console.log($(this));
							if($(this).attr('dataStatus') == 0){
								$(this).css({
									'color':'#00367a',
									'background':'rgba(0,180,207,.7)'
								})
							}else{
								var that = $(this);
								setTimeout(function(){
									that.css({
										'color': 'rgba(77,105,138,1)',
										'background': 'rgba(0,51,110,1)'
									})
								},500);
								
							}
						})
						/*for(var i in result[0].signs){
							$regist.find('span').eq(i).attr('dataStatus',result[0].signs[i].status);
							console.log($regist.find('span').eq(i).attr('dataStatus'));
							if($regist.find('span').eq(i).attr("dataStatus") == 0){
								$regist.find('span').eq(i).css({
									"color": "#00367a",
									"background": "rgba(0,180,207,.7)"
								});
							}else{
								$regist.find('span').eq(i).css({
									'color': 'rgba(77,105,138,1)',
									'background': 'rgba(0,51,110,1)'
								});
							}	
						}*/
						
					},
					error:function(result){
						alert("签到失败！");
					}
					
				});
			})

			var swiper = new Swiper('.swiper-container', {
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
				autoplay: {
					delay: 10000,
					stopOnLastSlide: false,
					disableOnInteraction: true
				},
				loop: true,
				pagination: {
					el: '.swiper-pagination',
					clickable: true,
					renderBullet: function(index, lit) {
						console.log($('#top li')[index]);
						return '<li class="' + lit + '">' + $('#top li').eq(index + 1).find('.regist_cont .regist_title').html() + '</li>';
					},
				},

			});
			$('body').on('touchstart', function() {
				swiper.autoplay.stop();
			})

			function start() {
				swiper.autoplay.start();
			}
			ifvisible.setIdleDuration(15); //调用该插件每10s检测一次屏幕是否有操作
			ifvisible.on("idle", function() { //如果没有其他操作调用自动自动反转动画函数
				start();
			});

		}/*,
		error: function(data){
			alert("请求失败！");
		}*/
	});

});