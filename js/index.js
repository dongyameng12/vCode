
// ios点击事件不触发
$(function() {  
    FastClick.attach(document.body);  
})
$(document).ready(function () {
    var oneStatus = false
    $('.choose p').on('click',function(){
        var text_span = $(this).children('span').text();
        if(text_span == $('#code_01').text()){
            oneStatus = true
            $(this).children('img').show();
        } else if (text_span == $('#code_02').text() && oneStatus) {
            $(".choose p").unbind("click")
            $(this).children('img').show();
            setTimeout(function () {
                $('#shuaxin').hide();
               $('.choose_ed').html("<p class='success'>验证成功</p>")
            },500)
        } else{
            $('.choose img').hide()
            oneStatus = false
            $('.choose_ed').html("<p class='fail'>验证错误</p>")
            setTimeout(function(){
                resetData()
            },1000)
           
        }
    })
    // 刷新内容
    function resetData (){
        $('.choose_ed').html(" 请顺序点击 &nbsp;[<span id='code_01'>花</span>，<span id='code_02'>有</span>]")
        var dataArr = ['越','花','有','都','你','的','谁','生']
        var newDdata = []
        var getArr = getNumber(0, dataArr.length, 4)
        for (var k = 0; k < getArr.length; k++) {
            newDdata.push(dataArr[getArr[k]])
            $('.choose span:eq('+k+')').text(dataArr[getArr[k]])
        }
        var chooseedArr = getNumber(0,newDdata.length,2)
        $('.choose_ed span:eq(0)').text(newDdata[chooseedArr[0]])
        $('.choose_ed span:eq(1)').text(newDdata[chooseedArr[1]])
    }
     function getNumber(min_number, max_number, chose_length) {
        var chooseArr = []
        for (var i = 0; i < chose_length; i++) {
            var random_num = Math.floor(Math.random() * max_number) + min_number
            if (chooseArr.length > 0) {
                var number = 0
                for (var j = 0; j < chooseArr.length; j++) {
                    if (chooseArr[j] == random_num) {
                        number++
                    }
                }
                if (number > 0) {
                    return getNumber(min_number, max_number, chose_length)
                } else {
                    chooseArr.push(random_num)
                }
            } else {
                chooseArr.push(random_num)
            }
        }
        return chooseArr
    }
    
    showMask()
    //点击刷新按钮
    $('#shuaxin').on('click',function(){
        $('.choose img').hide()
        oneStatus = false
        resetData ()   
    })
    $('.close').on('click',function(){
        hideMask() 
        $('.tc_code').hide();
    })
});
//显示遮罩层
function showMask() {
    $("#mask").css("height", $(document).height());
    $("#mask").css("width", $(document).width());
    $("#mask").show();
    $('body').css('position', 'fixed');
}
//隐藏遮罩层
function hideMask() {
    $("#mask").hide();
    $('body').css('position', 'unset');
}