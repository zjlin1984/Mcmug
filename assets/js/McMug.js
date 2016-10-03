var McMug = {};
//配置项
McMug.options = {
    errorClass: "error",
    errorStyle: {"color":"red","border":"1px solid red"},
    validClass: "valid",
    validStyle: {}
};
//定义静态变量methods
McMug.methods = {
    required: function(value) {
        return value.length > 0;
    },
    email: function(value) {
        return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(value);
    },
    mobile: function(value) {
        return /^1(3|4|5|7|8)\d{9}$/i.test(value); 
    },
    url: function(value) {
        return /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
    },
    minlength: function(value, param) {
        return value.length >= param;
    },
    maxlength: function(value, param) {
        return value.length <= param;
    },
    rangelength: function(value, param) {
        return (value.length >= param[0] && value.length <= param[1]);
    },
    regex: function(value, param) {
        var r = new RegExp(param);
        return r.test(value);
    },
    equalTo: function(value, param) {
        var target = $(param);
        return value == target.val();
    }
};

//获取值
McMug.parseValue = function (element) {
    if (!element || !element.length) {
        return "";
    }
    //需要考虑radio, select, checkbox等各种情况
    return $.trim(element.val());
};

//已经绑定的验证表单
McMug.Validators = [];

//验证器
var McMugValidator = (function () {
    var settings = _.clone(McMug.options);
    var innerValidator = function(options) {
        options = options || {};
        settings = _.extend(settings, options);
    };
    innerValidator.prototype = {
        valid: function() {
            
        }
    };
    return innerValidator;
})();

(function($) {
    $.extend($.fn, {
        merge: function(options) {
            var defaultOptions = {};
            return _.extend(defaultOptions, options);
        },
        validate: function(options) {
            var $this = $(this);
            $this.data("mcmug", options);
//            console.log("hahaha");
            $this.submit(function(event) {
                event.preventDefault();
                if ($this.valid()) {
                    if (options.submit) {
                        options.submit.call(this, event);
                    }
                } else {
                    //显示错误
                }
            });
            var validator = new McMugValidator();
            return validator;
        },
        valid: function(options) {
            if (!options) {
                options = {}; //通过自定义html属性创建验证项
            }
            options = _.extend(options, $(this).data("mcmug"));
            options = $(this).data("mcmug");
            //获取绑定的Validator，合并Validator上的options和Items
            //options = this.merge(options);
            var items = options.items;
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                for (var ii = 0; ii < item.rules.length; ii++) {
                    var rule = item.rules[ii];
                    var validMethod;
                    if (typeof (rule.valid) == "function") {
                        validMethod = rule.valid;
                    } else if (typeof (rule.valid) == "string" && typeof (McMug.methods[rule.valid]) == "function") {
                        validMethod = McMug.methods[rule.valid];
                    } else {
                        throw ("undefined function " + rule.valid);
                    }

                    if (validMethod.apply(this, [McMug.parseValue($(this).find("[name=" + item.element + "]"))].concat( $.makeArray(rule.params)))) {
                        item.isValid = true;
                        //rule.success(item.element);
                    } else {
                        item.isValid = false;
                        console.log("sbsbsbs:" + item.element);
                        //rule.error(item.element);
                        //var errorHandler = getErrorHandler(rule);
                        if (typeof (rule.error) == "function") {
                            rule.error(item.element);
                        } else {
                            //显示判定为error的元素后的元素（一般为error信息）
                            $("input[name = " + item.element + "]").siblings(".formTip").addClass("hidden");
                            $("input[name = " + item.element + "]").next(".formTip").removeClass("hidden");
                            //$("input[name = " + item.element + "]").next().html(rule.message); //message参数待添加
                        }
                        break;
                    }
                }
                if (item.isValid) {
                    $("input[name = "+ item.element +"]").siblings(".formTip").addClass("hidden");
                    $("input[name = " + item.element + "]").next(".formTip").next(".formTip").removeClass("hidden");
                }
            }
            for (var i = 0; i < items.length; i++) {
                if (!items[i].isValid) {
                    return false;
                }
            }
            return true;
        }
    });
})(jQuery);