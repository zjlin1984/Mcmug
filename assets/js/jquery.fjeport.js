jQuery.pikaQajax = function (options) {
    options = $.extend({}, options);
    var originalSuccess = options.success;
    options.dataType = "json";
    options.headers = options.headers || {};
    options.headers["pickq"] = true;
    options.success = function(result, textStatus, jqxhr) {
        if (result.actionCode == "do") {
            if (originalSuccess && $.isFunction(originalSuccess)) {
                originalSuccess(result.actionData, textStatus, jqxhr);
            }
        } else if (result.actionCode == "login") {
            top.location.href = "/account/login";
        } else if (result.actionCode == "error") {
            console.log(result);
        }
    };
    sendAjax(options, 2);
};

function sendAjax(options, retry) {
    var ajaxOnError = options.error;
    options.error = function(jqXhr, textStatus, errorThrown) {
        console.log(jqXhr);
        console.log(textStatus);
        console.log(errorThrown);
        if ((textStatus == "error" || textStatus == "timeout") && retry > 0) {
            options.error = ajaxOnError;
            sendAjax(options, retry - 1);
        } else {
            ajaxOnError(jqXhr, textStatus, errorThrown);
        }
    };
    $.ajax(options);
}

$.extend({
    getQuery: function (key) {
        var queryRegex = new RegExp('(?:\\?|&)' + key + '=(.*?)(?=&|$)', 'gi');
        if (key) {
            var r = [], m;
            while ((m = queryRegex.exec(document.location.search)) != null) r.push(m[1]);
            return r.join(",");
        }
        return "";
    },
    alert:function(message) {
        alert(message);
    },
    showDialog: function(options) {
        var d = dialog(options);
        d.showModal();
    },
    uuid: function(split) {

        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        if (!split) {
            split = '';
        }
        return s4() + s4() + split + s4() + split + s4() + split +
            s4() + split + s4() + s4() + s4();
    }
});

if (!window.console) {
    window.console = { log: function(msg) {} };
}
window.onerror = function (event) {
    console.log(event);
};

$(document).ready(function () {
    //遍历所有的表单
    var pikaqSubmitHandler = function(event) {        
        var $this = $(this);
        $.pikaQajax({
            url: $this.attr("action"),
            data: $this.serialize(),
            dataType: "json",
            type: $this.attr("method"),
            success: function(data) {
                window[$this.attr("pickqcallback")](data);
            }
        });
    };
    $("form[mcmuglistener][pickqcallback]").each(function() {
        console.log(this);
        var $this = $(this);
        var mcmuglistener = $this.attr("mcmuglistener");
        if (mcmuglistener) {
            window[mcmuglistener](this, {
                submit: pikaqSubmitHandler
            });
        }
    });
    $("form[pickqcallback]:not([mcmuglistener])").submit(function(event) {
        event.preventDefault();
        pikaqSubmitHandler.call(this, event);
    });
    $(document).delegate("input[pikaqform]", "click", function () {
        var target = $(this).attr("pikaqform");
        $("#" + target).submit();
    });
});

function gotoPage(pageIndex) {
    $("form[pickqcallback]").find("#hdPageIndex").val(pageIndex);
    $("form[pickqcallback]").submit();
}