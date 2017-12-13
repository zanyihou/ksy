$(function(){
	
	////当前筹码：
	var curChip = 1;//默认筹码是1， 有1,5,50,500
	var time = 10;//开奖间隔时间420秒， 7分钟
	var waittime = 3;//开奖等待时间180秒， 3分钟
	var lotterytime = 13;//正在开奖时间，4s
	var gametype = 0; //游戏的状态,0是可投注状态，1是等待开奖状态，2是正在开奖状态,3是游戏非正常状态
	var chipname = "chip0"; //筹码名称
	var chipleft = "9%";//筹码位置
	var mygold = 3000;//我的金币
	var uplimitValue = 5000;//投注上限5000
	var banker = false;//是否是庄家
	var totalChipMoney = 0;//下注金额
 
	var chipdata = {
		"top2_1":{"totalChip":0,"odds":2},
		"top2_2":{"totalChip":0,"odds":24},
		"top2_3":{"totalChip":0,"odds":2},
		"top4_1":{"totalChip":0,"odds":150},
		"top4_2":{"totalChip":0,"odds":150},
		"top4_3":{"totalChip":0,"odds":150},
		"top4_4":{"totalChip":0,"odds":150},
		"top4_5":{"totalChip":0,"odds":150},
		"top4_6":{"totalChip":0,"odds":150},
		"top6_1":{"totalChip":0,"odds":8},
		"top6_2":{"totalChip":0,"odds":8},
		"top6_3":{"totalChip":0,"odds":8},
		"top6_4":{"totalChip":0,"odds":8},
		"top6_5":{"totalChip":0,"odds":8},
		"top6_6":{"totalChip":0,"odds":8},
	};//投注数据
	
	////赋值我的金币
	$(".qb_num").text(mygold);	
	
	////筹码切换
	$(".bottom li").on("click",function(){
		chipname = "chip" + $(this).index();//修改筹码名称
		chipleft = 9 + $(this).index()*17 + "%";//修改筹码位置
		$(this).siblings("li").find("img").removeClass("current");
		$(this).find("img").addClass("current");
		//修改筹码值
		curChip = parseInt($(this).find("span").attr("data-value")) ;
	})
	
	////倒计时
	function game_state(){
		//状态1：正常投注倒计时
		if(gametype == 0)
		{
			$(".start_tz").text("请投注");
			$(".tz").addClass("db");
			setTimeout(function(){
				$(".tz").removeClass("db");
			},1000)
			$(".header_up_b,.t_ts").removeClass("ndb");
			$(".prizing").removeClass("db");
			timer1 = setInterval(function(){
				$(".header_up_b b").text("投注时间还剩")
				thetime = changeTimeType(time);
				$(".timer").text(thetime);
				
				if(time == 0)
				{
					//执行等待开奖函数,清除定时器
					$(".start_tz").text("买定离手");
					$(".tz").addClass("db");
					setTimeout(function(){
						$(".tz").removeClass("db");
					},1000)
					clearInterval(timer1);
					gametype = 1;
					game_state()
				}
				time--;
			},1000)
		}
		//状态2：距离开奖时间还剩
		if(gametype == 1)
		{
			timer2 = setInterval(function(){
				$(".header_up_b b").text("距离开奖还剩")
				thetime = changeTimeType(waittime);
				$(".timer").text(thetime);
				
				if(waittime == 0)
				{
					//执行等待开奖函数,清除定时器
					clearInterval(timer2);
					gametype = 2;
					setTimeout(game_state,1000)
				}
				waittime--;
			},1000)
		}
		//状态3：正在开奖中
		if(gametype == 2)
		{
			$(".header_up_b,.t_ts").addClass("ndb")
			$(".prizing").addClass("db");
			lottery();
			timer3 = setInterval(function(){
				lotterytime--;
				if(lotterytime == 0){
					clearInterval(timer3);
					
					init()
				}
			},1000)
		}	
	}
	
	////充值弹窗
	$(".rcg_lg").click(function(){
		showcharge();
	})
	
	$(".charge_wrap_close").click(function(){
		hidecharge();
	})
	
	//显示充值函数
	function showcharge(){
		$(".page").addClass("db");
	}
	
	//隐藏充值函数
	function hidecharge(){
		$(".page").removeClass("db");
	}
	
	////菜单栏弹出
	$(".note").click(function(){
		$(".note_in22").toggleClass("db")
	})
	
	$(document).click(function(e){
		if(e.target.className == "note"){
			return
		}else{
			$(".note_in22").removeClass("db")
		}
		
	})
	
	//游戏规则
	$(".game_rule").click(function(){
		$(".rule").addClass("db");
	})
	
	$(".pop_close,.btn_return").click(function(){
		$(".rule").removeClass("db");
	})
	
	//投注记录
	$(".record").click(function(){
		$(".record_content").addClass("db");
	})
	$(".pop_close,.btn_return").click(function(){
		$(".record_content").removeClass("db");
	})
	
	$(".record_con").click(function(){
		$(this).next(".record_more2").toggleClass("db")
	})
	
	////往期记录查看
	$(".past").on("click",function(){
		$(".past_content,.past_down").addClass("db");
	})
	$(".past_down").on("click",function(){
		$(".past_content,.past_down").removeClass("db");
	})
	////开奖特效
	function lottery(){
		$(".dicebox").addClass("db")
		$(".boxt").show().animate({"bottom":"21px"},400,function(){
			$(".dicebox").addClass("move")
		}).delay(3000).animate({"bottom":"16px"},10,
		function(){
			$(".dicebox").removeClass("move")
			dicescroll();
		}).delay(500).animate({"bottom":"300px"},500,function(){
			$(this).hide(0);
						
		})
		
		function dicescroll(){
			$(".dice2").addClass("db");
			var timer=setInterval(function(){
				scrollimg1 = Math.ceil(Math.random()*6);
				scrollimg2 = Math.ceil(Math.random()*6);
				scrollimg3 = Math.ceil(Math.random()*6);
				$(".pos1").attr("src","img/dot"+scrollimg1+".png");
				$(".pos2").attr("src","img/dot"+scrollimg2+".png");
				$(".pos3").attr("src","img/dot"+scrollimg3+".png");
			},40)
			
			setTimeout(function(){
				clearInterval(timer);
				$(".pos1").attr("src","img/dot1.png");
				$(".pos2").attr("src","img/dot1.png");
				$(".pos3").attr("src","img/dot5.png");
				setTimeout(function(){
					diceclone = $(".dice2").clone();
					$(".dicebox").removeClass("db");
					diceclone.appendTo("body").addClass("tosmall").css({"left":"50%","marginLeft":"-54px","top":"302px"}).animate(
						{
							"marginLeft":"0",
							"left":"20px",
							"top":"130px",
						},1200,function(){
							$(".tosmall").remove();
							showResult();
						}
					)
				},1000)
			},3000)
		}
	}
	
	///显示中奖结果
	function showResult(){
		$(".top2_1,.top6_1").addClass("current");
		setTimeout(function(){
			$(".reward").addClass("db");
		},1500)
		setTimeout(function(){
			$(".current .moveChip").each(function(index,ele){
				ol = $(this).offset().left;
				ot = $(this).offset().top;
				$(this).css({
					"left":ol,
					"top":ot,
					"zIndex":100
				})
				$(this).appendTo("body").animate({
					"left":"100px",
					"top":"5px"
				},1000);
			})
			$(".top2_1,.top6_1").removeClass("current");
			$(".reward").removeClass("db");
		},3000)
	}
	
	////游戏初始化
	function init(){
		time = 10;//开奖间隔时间420秒， 7分钟
		waittime = 3;//开奖等待时间180秒， 3分钟
		lotterytime = 13;
		gametype = 0;
		clearChip();
		totalChipMoney = 0;
		game_state();
	}
	
	init()
	
	//用户投注
	$(".top_all li").click(function(e){
		if(gametype) {
			//非投注状态
			return
		}
		
		_this = this;
		tarC = $(this).attr("class");//当前点击的元素
		chipdata[tarC].totalChip += curChip;
		
		moneybool = moneyFun();
		uplimitbool = uplimit(chipdata[tarC].totalChip);
		
		if(banker){
			//是庄家， 不能下注
			alert("是庄家， 不能下注");
		}
		
		if(!moneybool) {
			//金币不足，弹出充值窗口
			showcharge();
			chipdata[tarC].totalChip -= curChip;
			return;
		}else if(!uplimitbool){
			//单个投注上限， 弹出上限提示窗口
			alert("单个投注上限， 弹出上限提示窗口");
			chipdata[tarC].totalChip -= curChip;
			return;
		}
		
		mygold -= curChip;
		totalChipMoney = totalChipMoney + curChip;//当期总投注金额
		 
		$(".qb_num").text(mygold);	
		$(this).find(".mb_out").addClass("db").find(".mb").text(chipdata[tarC].totalChip)
		var moveChip = '<span style="left:'+chipleft+'" class="moveChip '+chipname+'"></span>';
		var targetl = $(this).offset().left;
		var targetw = $(this).innerWidth();
		var targett = $(this).offset().top;
		var targeth = $(this).innerHeight(); 
		var disl = Math.random()*(targetw - 15);
		var dist = Math.random()*(targeth - 15);
		var t_l = targetl + disl;
		var t_t = targett + dist;
		$(moveChip).appendTo("body").animate({"left":t_l,"top":t_t},function(){
			$(this).css({"left":disl,"top":dist});
			$(_this).append($(this));
		})
	})
	
	////撤销
	$(".clear_con").on("click",function(){
		mygold += totalChipMoney;
		$(".qb_num").text(mygold);
		clearChip();
	})
	
	////清除下注
	function clearChip(){
		$(".moveChip").remove();
		$(".mb_out").removeClass("db");
		for (var o in chipdata){
			chipdata[o].totalChip = 0;
		}
		totalChipMoney = 0;
	}
	
	//投注金币是否足够
	function moneyFun(){
		if(mygold < curChip){
			return false;
		}else{
			return true;
		}
	}
	
	//投注金币上限
	function uplimit(value){
		if(value > uplimitValue){
			return false;
		}else {
			return true;
		}
	}
	
	//时间转换函数
	function changeTimeType(time){
		m = parseInt(time/60);
		s = time%60;
		return m+"分"+s+"秒";
	}
})
