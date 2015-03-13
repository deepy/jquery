(function ($) {
    $.fn.elementRound = function (rounding, validation) {
        return this.each(function () {

            var name = $(this).attr('id');
            var roundedName = name + "Rounded";
            var validator;

            var originalElement = $(this);
            var roundedElement = originalElement.clone().attr('id', roundedName);

            roundedElement.insertAfter(originalElement);

            if (jQuery.isFunction(validation)) {
                validator = validation;
            } else {
                switch (validation) {
                case "notNaN":
                    validator = function (val) {
                    return (val != "" && !isNaN(val));
                }
                    break;
                case "number":
                    validator = function () {}
                    break;
                }
            }

            roundedElement.focus(function (e) {
                e.preventDefault();
                originalElement.show();
                roundedElement.hide();
                originalElement.focus()
            });
            originalElement.blur(function () {
                roundedElement.show();
                originalElement.hide();
                if (validator(originalElement.val())) {
                    roundedElement.val(rounding(originalElement.val()));
                }
            });

            originalElement.change(function () {
                if ($(this).val().indexOf(",") >= 0) {
                    $(this).val($(this).val().replace(",", "."))
                }
                if (validator($(this).val())) {
                    roundedElement.val(rounding($(this).val()));
                }
            });


            originalElement.change();
            originalElement.hide();
            roundedElement.show();
        });
    };

}(jQuery));