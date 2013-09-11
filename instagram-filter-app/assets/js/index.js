KISSY.use('assets/js/caman.js', function(S, Caman) {
    var $ = S.all,
         E = S.Event;

    var setUp = {
        initialize: function() {
            this.setUpFileUploadWay();
            this.setUpFilter();
            this.setupDonwload();
        },
        setUpFileUploadWay: function() {
            var self = this;

            try {
                self.reader = new FileReader();
                self.setUpFileReader();
            }catch(e) {
                alert('no support');
            }
        },
        setUpFileReader: function() {
            var self = this;

            var opts = {
                dragClass: "drag",
                accept: false,
                readAsMap: {
                    'image/*': 'DataURL',
                    'text/*' : 'Text'
                },
                readAsDefault: 'BinaryString',
                on: {
                    beforestart: function(file){
                        //只接受图片
                        return /^image/.test(file.type);
                    },
                    load: function(e, file) {
                        self.readFile(file);
                    }
                }
            };
            FileReaderJS.setupDrop($('#J_CanvasContainer')[0], opts);
            FileReaderJS.setupInput($('#J_Input')[0], opts);
        },
        drawCanvas: function(dataURL) {
            var img = new Image();

            img.onload = function(e) {
                var width = 100,
                    height = 100;

                var canvas = $('<canvas id="J_Canvas">');
                var context = canvas[0].getContext('2d');

                //设置canvas元素的宽度、高度、外边距
                canvas.attr({
                    width: width,
                    height: height
                });

                // 将图片绘制到canvas元素中
                context.drawImage(this, 0, 0, width, height);
                $('#J_CanvasContainer').append(canvas);
            };

            img.src = dataURL;

        },
        readFile: function(file) {
            var self = this;

            self.reader.onload = function(e) {
                self.drawCanvas(e.target.result);
            };

            self.reader.readAsDataURL(file);
        },
//        setUpInput: function() {
//            FileReaderJS.setupInput(document.getElementById('file-input'), opts);
//        },
        setUpFilter: function() {
            var self = this;

            E.delegate(document, 'click', '.J_PresetStyle', function(e) {
                var style = $(e.currentTarget).attr('data-preset');
                e.preventDefault();
                console.log('clicked');

                processImage(style);
            });

            function processImage(effectName) {
                if (!$('#J_CanvasContainer canvas').length) {
                    alert('先上图！');
                    return;
                }

                Caman($('#J_Canvas')[0], function () {
                    // manipulate image here
                    effectName in this && this[effectName]();

                    this.render();

                });
            }
        },
        setupDonwload: function() {
            $('#J_Download').on('click', function(e) {
                var target = $(e.currentTarget);

                var dataURL = $('#J_CanvasContainer canvas')[0].toDataURL("image/png;base64;");
                target.attr('href', dataURL);

            });
        }
    };
    setUp.initialize();


});