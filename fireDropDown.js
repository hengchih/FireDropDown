/**
 * Created by hengchih on 2014/8/21.
 */


(function ($) {
    $.fn.fireDropDown = function (parameter) {
        return this.each(function () {
            var $this = $(this);
            var $options = $this.find('option');
            var optionBlockString = '<dl>';
            var optionObj = {};
            var $optionBlock;
            var $dts;
            $this.on('click mousedown', function (ev) {
                ev.preventDefault();
                return false;
            });

            for (var i = 0; i < $options.length; i++) {
                var optionText = $($options[i]).text();
                var optionValue = $($options[i]).val()
                optionObj[optionText] = optionValue;
                optionBlockString += '<dt>' + $($options[i]).text() + '</dt>';
            }

            optionBlockString += '</dl>';

            $optionBlock = $(optionBlockString).css({
                'display': 'none',
                'position': 'absolute',
                'z-index': '999999999',
                'top': $this.offset().top + (typeof parameter['yShift'] !== 'undefined' && parseInt(parameter.yShift)),
                'left': $this.offset().left + (typeof parameter['xShift'] !== 'undefined' && parseInt(parameter.xShift)),
                'width': parameter.width || $this.width(),
                'background': parameter.background || '#fff',
                'color': parameter.color || '#000',
                'border': parameter.border || '1px solid #7F9DB9'
            });

            $dts = $optionBlock.find('dt');
            $dts.css({
                'box-sizing': 'border-box',
                'padding': '2px',
                'font-size': parameter.fontSize || '12px',
                'cursor': 'pointer'
            })
                .hover(function () {
                    $(this).css({
                        'background': (typeof parameter['hover'] !== 'undefined' && parameter.hover.background) || '#1E90FF',
                        'color': (typeof parameter['hover'] !== 'undefined' && parameter.hover.color) || '#fff'
                    })
                }, function () {
                    $(this).css({
                        'background': parameter.background || '#fff',
                        'color': parameter.color || '#000'
                    })
                });

            $optionBlock.appendTo('body');

            $this.on('mouseover', function (ev) {
                $optionBlock.fadeIn('fast');
            });

            $optionBlock.on('mouseleave', function (ev) {
                $optionBlock.hide();
            });

            $dts.on('click', function (ev) {
                try {
                    var dtValue = optionObj[$(this).text()];
                    $optionBlock.hide();
                    $this.val(dtValue).trigger('change');
                } catch (e) {
                }
            });
        });
    };
})(jQuery);



