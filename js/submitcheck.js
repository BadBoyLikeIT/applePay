/**
 * Created by Lishuai on 2016/12/14.
 */

$(".help-block").hide();

$(document).ready(function () {

    var total = 0;
    var num1 = 0;
    var num2 = 0;
    var num3 = 0;

    $("#order1_btn").click(function () {
        var num = $("#order1_num").val();
        if (num == "" || num < 0) {
            num1 = 0;
            $("#order1_num").val(0);
            $("#money1").val(0 + "元");
        } else {

            num1 = num;
            if (Math.floor(num / 2) != 0) {
                $("#delivery1_num").html("\"买就送\"活动另赠" + Math.floor(num / 2) + "个苹果").show();
            } else {
                $("#delivery1_num").hide();
            }

            var money1 = computeMoney(num, 8);
            $("#money1").val(money1 + "元");

            computeTotalMoney();
            $("#total").val(total);
            $("#total_str").val("总价格:" + total + "元");
        }
    });

    $("#order2_btn").click(function () {
        var num = $("#order2_num").val();
        if (num == "" || num < 0) {
            num2 = 0;
            $("#order2_num").val(0);
            $("#money2").val(0 + "元");
        } else {

            num2 = num;
            if (Math.floor(num / 2) != 0) {
                $("#delivery2_num").html("\"买就送\"活动另赠" + Math.floor(num / 2) + "个苹果").show();
            } else {
                $("#delivery2_num").hide();
            }

            var money2 = computeMoney(num, 12);
            $("#money2").val(money2 + "元");

            computeTotalMoney();
            $("#total").val(total);
            $("#total_str").val("总价格:" + total + "元");
        }
    });

    $("#order3_btn").click(function () {
        var num = $("#order3_num").val();
        if (num == "" || num < 0) {
            num3 = 0;
            $("#order3_num").val(0);
            $("#money3").val(0 + "元");
        } else {

            num3 = num;
            if (Math.floor(num / 2) != 0) {
                $("#delivery3_num").html("\"买就送\"活动另赠" + Math.floor(num / 2) + "个苹果").show();
            } else {
                $("#delivery3_num").hide();
            }

            var money3 = computeMoney(num, 15);
            $("#money3").val(money3 + "元");

            computeTotalMoney();
            $("#total").val(total);
            $("#total_str").val("总价格:" + total + "元");
        }
    });

    $("#order-form").submit(function (event) {
        // Prevent default posting of form - put here to work in case of errors
        event.preventDefault();

        //开始验证表单内容格式是否合法
        num1 = $("#order1_num").val();
        num2 = $("#order2_num").val();
        num3 = $("#order3_num").val();

        num1 = num1 == "" ? 0 : num1;
        num2 = num2 == "" ? 0 : num2;
        num3 = num3 == "" ? 0 : num3;

        if (num1 == 0 && num2 == 0 && num3 == 0) {
            alert("error");
            return;
        } else {
            computeTotalMoney();
            $("#total").val(total);
            $("#total_str").val("总价格:" + total + "元");
        }


        // setup some local variables
        var $form = $(this);

        // Let's select and cache all the fields
        var $inputs = $form.find("input, select, button, textarea");

        // Serialize the data in the form
        var serializedData = $form.serialize();

        // Let's disable the inputs for the duration of the Ajax request.
        // Note: we disable elements AFTER the form data has been serialized.
        // Disabled form elements will not be serialized.
        $inputs.prop("disabled", true);

        $.ajax({
            url: "order.php",
            type: "post",
            data: serializedData,
            success: function (data) {
                //var result = JSON.parse(data);
                if (data == "true") {
                    orderAlert(true);
                } else {
                    orderAlert(false);
                }
            },
            error: function (request) {

            },
            complete: function () {
                // Reenable the inputs
                $inputs.prop("disabled", false);
            }
        });
    });

    function computeMoney(num, price) {
        return num * price;
    }

    function computeTotalMoney() {
        total = num1 * 8 + num2 * 12 + num3 * 15;
    }

    function orderAlert(isSuccess) {

        var str = isSuccess ? "下单成功" : "下单失败";

        swal({
            title: str,
            type: "info",
            showCancelButton: false,
            closeOnConfirm: false,
            showLoaderOnConfirm: true
        }, function () {
            location.href = "index.html"
        });
    }
});