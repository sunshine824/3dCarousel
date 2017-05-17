/**
 * Created by Gatsby on 2017/5/17.
 */
$(function(){
    var isClick=true; //是否可以点击

    //用数组存储样式
    var options=[
        {zIndex:1,top:'40px',left:0,width:'365px', height:'252px'},
        {zIndex:2,top:'20px',left:'60px',width:'405px',height:'280px'},
        {zIndex:3,top:0,left:'130px',width:'445px',height:'308px'},
        {zIndex:2,top:'20px',left:'240px',width:'405px',height:'280px'},
        {zIndex:1,top:'40px',left:'345px',width:'366px', height:'252px'},
    ]

    //获取所有li
    var ali=$('#focus_Box ul li')

    //初始化css
    for(var i=0;i<options.length;i++){
        ali.eq(i).css(options[i])
    }
    var timer=null;
    //设置定时器
    function start(){
        timer=setInterval(()=>{
            options.unshift(options.pop())
            doNext()
        },3000)
    }

    //执行运动动画
    function doNext(){
        for(var i=0;i<options.length;i++){
            ali.eq(i).css({'z-index':options[i].zIndex})
            ali.eq(i).animate(options[i],300,()=>{
                isClick=true
            })
        }
    }

    //点击上一张
    $('#focus_Box').on('click','.prev',()=>{
        if(!isClick){
            return
        }
        isClick=false;
        options.push(options.shift())
        doNext()
    })

    //点击下一张
    $('#focus_Box').on('click','.next',()=>{
        console.log(isClick)
        if(!isClick){
            return
        }
        isClick=false;
        options.unshift(options.pop())
        doNext()
    })

    //点击任意一张
    $('#focus_Box').on('click','ul li',function(){
        var nowZindex=this.style.zIndex
        for(var i=0;i<3-nowZindex;i++){
            if(parseInt(this.style.left)>=240){  //点击右侧图片
                options.unshift(options.pop())
            }else{                               //点击左侧图片
                options.push(options.shift())
            }
        }
        doNext()
    })

    //鼠标移入移出操作
    $("#focus_Box").hover(()=>{
        clearInterval(timer)
    },()=>{
        //start()
    })

    //默认启动定时器
    start();
})


