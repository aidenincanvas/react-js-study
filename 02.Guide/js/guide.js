$(document).ready(function(){

    // 애니메이션 Duration
    var aniDuration = 300 ;

    // scroll 된 영역 측정
    var scrolled = $('html,body').scrollTop();

    // nav bar gap size
    var navbarGap = $("nav").outerHeight();

    $(".scroll-action-btn").click(function(){
        var target_name = $(this).prop("id");

        $('html,body').animate({scrollTop : $("#anchor-" + target_name).offset().top - navbarGap}, aniDuration);
    });

    // 수정내역 슬라이더

    // 수정내역 슬라이더 넓이
    var sliderWidth = $("#modification-log-slider").outerWidth();

    $("#modification-log-slider").css({
        "right" : - sliderWidth + "px"
    });

    $(".open-log").click(function(){
        var target_id = $(this).parents("tr").prop("id");

        $("#modification-log-slider").addClass("in");
        $("#" + target_id + " td:last-child .modification-list table").clone().appendTo("#modification-log");
        $("#modification-log").fadeIn();

        // 수정내역 없음 출력을 위한 개발 필요
        // if ($("#" + target_id + " td:last-child").has("div") == null) {
        //     $("#modification-log").html("수정내역이 없습니다.");
        // }
    });

    $(".close-slider").click(function(){
        $("#modification-log-slider").removeClass("in");
        $("#modification-log").fadeOut(function(){$("#modification-log").empty()});
    });



    ///////////////////
    // 최근내역 자동표시
    ///////////////////

    // 일주일 이전
    var today = new Date();
    today = formatDate(today);

    // 일주일 이전
    var recentRange = new Date();

    /* 오늘로부터 1주일전 날짜 반환 */
    function lastWeek() {
        var dayOfMonth = recentRange.getDate();
        recentRange.setDate(dayOfMonth - 7);
        recentRange = formatDate(recentRange);
    }
    lastWeek();

    // 최근내역 자동표시 - 날짜비교
    function recentModification (selectedRow){

        var lastModifyDate = new Date ($("#" + selectedRow + " .log-table tbody tr:last-child td.date").html());

        lastModifyDate = formatDate(lastModifyDate);

        if (recentRange < lastModifyDate){

            $("#" + selectedRow).css({
                "background":"orange"
            });
        } else {
            return false;
        }
    }

    // 최근내역 자동표시 - 각 row에 ID 자동으로 부여
    var i = 0;

    $("#html-list-tbl > tbody > tr").each(function() {
        i++;
        $(this).attr("id", "row-" + i);
        setId = "row-" + i;

        $(this).find(".log-table").each(function(){
            recentModification (setId);
        });
    });

    // 최근내역 자동표시 - 포멧변환
    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('');
    }
});
