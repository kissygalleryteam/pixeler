KISSY.add('gallery/pixeler/1.0/index', function(S, Caman) {
    var $ = S.all;

    var Pixeler = function() {
        if(!$('#J_CanvasContainer').length) {
            $('body').append('<div id="J_CanvasContainer" class="canvas-container" style="display: none;"></div>');
        }
    };

    function paintCanvasWithDataURL(dataURL, callback) {
        var img = new Image();

        img.onload = function(e) {
            var width = this.width,
                height = this.height;

            var canvas = $('<canvas width="'+ width +'" height="'+ height +'">');
            var context = canvas[0].getContext('2d');

            // 将图片绘制到canvas元素中
            context.drawImage(this, 0, 0, width, height);
            $('#J_CanvasContainer').empty().append(canvas);

            callback && callback.call(this,e);
        };

        img.src = dataURL;
    }

    S.augment(Pixeler, {
        processImage: function(effectName, config) {

            paintCanvasWithDataURL(config.dataURL, function() {
                var img = this;

                Caman($('#J_CanvasContainer canvas')[0], function () {

                    if(effectName in this) {
                        if(effectName == 'rotate') {
                            this[effectName](config.angle, $('#J_CanvasContainer canvas')[0], img);
                        } else {
                            this[effectName]();
                        }
                    };

                    this.render(function() {
                        config.type = config.type == 'jpg'?'jpeg' : config.type;
                        var dataURL = $('#J_CanvasContainer canvas')[0].toDataURL("image/"+ config.type);
                        config.callback && config.callback(dataURL);
                    });

                });
            });


        }
    });

    delete window.Caman;
    return Pixeler;


},{
    requires: ['./originalCaman.js']
});