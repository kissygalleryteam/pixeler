KISSY.add( function(S, Caman) {
    var $ = S.all,
         E = S.Event;

    var Pixeler = function() {
        if(!$('#J_CanvasContainer').length) {
            $('body').append('<div id="J_CanvasContainer" class="canvas-container" style="display: none;"></div>');
        }
    };

    S.augment(Pixeler, {
        rotateImage: function(dataURL, angle, callback) {
            var self = this;
            var img = new Image();

            img.onload = function(e) {
                var width = this.width,
                    height = this.height;

                var canvas = $('<canvas width="'+ width +'" height="'+ height +'">');
                var context = canvas[0].getContext('2d');

                // 将图片绘制到canvas元素中
                context.drawImage(this, 0, 0, width, height);
                $('#J_CanvasContainer').empty().append(canvas);

                self.processImage('rotate', angle, canvas[0], this, callback);
            };

            img.src = dataURL;


        },
        processImage: function(effectName,angle, canvas, img, callback) {
            if (!$('#J_CanvasContainer canvas').length) {
                alert('先上图！');
                return;
            }

            Caman($('#J_CanvasContainer canvas')[0], function () {

                if(effectName in this) {
                    if(effectName == 'rotate') {
                        this[effectName](angle, canvas, img);
                    } else {
                        this[effectName]();
                    }
                };

                this.render();

                var dataURL = $('#J_CanvasContainer canvas')[0].toDataURL("image/png;base64;");
                callback && callback(dataURL);

            });
        }
    });

    return Pixeler;


},{
    requires: ['assets/js/caman.js']
});