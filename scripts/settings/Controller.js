var OPTIONS = (function (opt) {

    opt.Controller = (function (data, view) {
        var cells = view.getCells(),
            areas = view.getAreas(),
            opacity_range = view.getOpacityRange(),
            speed_range = view.getSpeedRange(),
            speed_output = view.getSpeedOutput(),
            c_length = cells.length,
            a_length = areas.length,
            panel_height,
            position,
            i;

        chrome.storage.sync.get(function (items) {
            panel_height = items.area_height || '105px';
            position = items.position || 'bottom_right';
        });

        for (i = 0; i < c_length; i++) {
            cells[i].onmousedown = function (e) {
                this.style.outline = '1px solid blue';
                // chrome.tabs.query({}, function (tabs) {
                //     for (var i = 0; i < tabs.length; i++) {
                //         chrome.tabs.sendMessage(tabs[i].id, {message: 'src'}, function (response) {});
                //     }
                // });
                panel.arrow_down.setSrc(view.findImg(this));
                panel.arrow_up.setSrc(view.findImg(this));

                // panel.arrow_down.getDomElement().style.width = view.getImage(this).style.width;
                // panel.arrow_down.getDomElement().style.height = view.getImage(this).style.height;
                // panel.arrow_up.getDomElement().style.width = view.getImage(this).style.width;
                // panel.arrow_up.getDomElement().style.height = view.getImage(this).style.height;
                // console.log(panel.arrow_down.getDomElement().height);

                data.setSrc(view.findImg(this));
                panel_height = view.getImageHeight(this) * 2 + 5 + 'px';
                data.setAreaHeight(panel_height);
                chrome.storage.sync.get(function (items) {
                    if (items.position === 'center_right' || items.position === 'center_left') {
                        panel.resetPosition(panel_height);
                    }
                });

                for (i = 0; i < a_length; i++) {
                    areas[i].style.height = panel_height;
                }

                view.setCenterRight(panel_height);
                view.setCenterLeft(panel_height);
               window.location.reload();
            };

            cells[i].onmouseup = function () {
                this.style.outline = '';
            };

            cells[i].onmouseout = function () {
                this.style.outline = '';
            }
        }

        for (i = 0; i < a_length; i++) {
            areas[i].onclick = function () {
                var that = this;
                chrome.storage.sync.get(function (items) {
                    var height = items.area_height || '105px';
                    data.setPosition(that.id, height);
                    position = data.getPosition();
                });
                window.location.reload();
            };
        }

        opacity_range.oninput = function () {
            //panel.setOpacity(this.value);
            panel.arrow_up.setOpacity(this.value);
            panel.arrow_down.setOpacity(this.value);
        };

        opacity_range.onchange = function () {
            data.setOpacity(this.value);
            chrome.tabs.query({}, function (tabs) {
                for (var i = 0; i < tabs.length; i++) {
                    chrome.tabs.sendMessage(tabs[i].id, {message: 'opacity'}, function (response) {
                    });
                }
            });
        };

        speed_range.onchange = function () {
            data.setSpeed(this.value);
            chrome.tabs.query({}, function (tabs) {
                for (var i = 0; i < tabs.length; i++) {
                    chrome.tabs.sendMessage(tabs[i].id, {message: 'speed'}, function (response) {
                    });
                }
            });
        };

        speed_range.oninput = function () {
            speed_output.textContent = this.value + 'px';
        };

        opacity_range.onkeydown = function () {
            return false;
        };

        speed_range.onkeydown = function () {
            return false;
        };

        window.addEventListener('resize', function () {
            view.updateCenterLeft(panel_height);
            view.updateCenterRight(panel_height);
            if (position === 'center_right' || position === 'center_left') {
                panel.resetPosition(panel_height);
            }
        }, false);

    }(opt.Model, opt.View));

    return opt;

}(OPTIONS || {}));

