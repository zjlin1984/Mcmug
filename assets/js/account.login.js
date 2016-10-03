if (top.location.href != location.href) {
    top.location.href = location.href;
}

function callback(data) {
    if (data.Status) {
        if (data.Url) {
            location.href = data.Url;
        } else {
            location.href = "/";
        }
    } else {
        alert(data.Message);
    }
}

function listener(form, options) {
    options = options || {};
    var items = new Array();
    items.push(
    {
        element: "UserName",
        rules: [
            {
                valid: "required"
            }
        ]
    },
    {
        element: "Password",
        rules: [
            {
                valid: "required"
            }
        ]
        });
    options["items"] = items;
    $(form).validate(options);
}