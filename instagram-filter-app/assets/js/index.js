KISSY.use('assets/js/caman.js', function(S, Caman) {
    var $ = S.all;

    var setUp = {
        initialize: function() {
            this.setUpFileUploadWay();
            this.setUpFilter();
        },
        setUpFileUploadWay: function() {
            try {
                var reader = new FileReader();
                this.setUpFileReader();
            }catch(e) {
                this.setUpInput();
            }
        },
        setUpFileReader: function() {
            console.log('file reader');
            var canvasContainer = $('#J_CanvasContainer');
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
                        var img = new Image(),
                            imgWidth, newWidth,
                            imgHeight, newHeight,
                            ratio;

                        var maxWidth = maxHeight = 500;
                        // 删除容器内的canvas元素
                        canvasContainer.all('canvas').remove();

                        //图片读取成功后触发，这样才能找到图片原始宽度和高度
                        img.onload = function() {

                            imgWidth  = this.width;
                            imgHeight = this.height;

                            // 控制在500*500px
                            if (imgWidth >= maxWidth || imgHeight >= maxHeight) {
                                if (imgWidth > imgHeight) {
                                    //ratio是希望处理图片时，依旧可以保证比例的正确
                                    ratio = imgWidth / maxWidth;
                                    newWidth = maxWidth;
                                    newHeight = imgHeight / ratio;

                                } else {
                                    ratio = imgHeight / maxHeight;
                                    newHeight = maxHeight;
                                    newWidth = imgWidth / ratio;
                                }

                            } else {
                                newHeight = imgHeight;
                                newWidth = imgWidth;
                            }

                            // 创建一个Canvas
                            originalCanvas = $('<canvas id="J_Canvas">');
                            var originalContext = originalCanvas[0].getContext('2d');

                            // 设置canvas元素的宽度、高度、外边距
                            originalCanvas.attr({
                                width: newWidth,
                                height: newHeight
                            });

                            // 将图片绘制到canvas元素中
                            originalContext.drawImage(this, 0, 0, newWidth, newHeight);

                            // 移除图片元素（已经不需要了，接下来使用canvas处理就好）
                            img = null;
                            canvasContainer.append(originalCanvas);

                        };

                        // 设置图片的src，直接读取二进制图片数据
                        // 触发img的load事件

                        img.src = e.target.result;

                    }
                }
            };
            FileReaderJS.setupDrop(canvasContainer[0], opts);
        },
        setUpInput: function() {
            console.log('file input');
        },
        setUpFilter: function() {

        }
    };
    setUp.initialize();

//    var canvasEl = $('#J_Canvas')[0],
//        picArr = [
//            '../instagram-filter-app/assets/img/horse.jpg',
//            '../instagram-filter-app/assets/img/010.jpg'
//        ];
//
//    processImage(getRandomPic());
//
//
//    $('.change-image-btn').on('click', function() {
//        var randomPic = getRandomPic();
//
//        processImage(randomPic);
//    });
//
//    function getRandomPic() {
//        var randomIndex = Math.round(Math.random());
//
//        return picArr[randomIndex];
//    }
//
//    function processImage(randomPic) {
//        Caman(canvasEl, "" + randomPic, function () {
//            // manipulate image here
//            this['sinCity']();
//            this.render();
//        });
//    }
});