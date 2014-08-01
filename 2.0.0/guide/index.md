Pixeler
=======
Pixeler的诞生意味着对图片的旋转、缩放、裁剪以及添加各种滤镜效果可以直接在浏览器端完成了！！！

你想要lomo效果么？

想要缩放到一定尺寸么？

想要直接下载处理过后的图片么？

no problem！Pixeler 都可以帮你实现！

（画外音：爷爷的，这么好的插件，必须来一个啊！）

## 使用方法

1. 将一张图片旋转2.0.0度

           KISSY.use('kg/pixeler/2.0.0/index', function(S, Pixeler) {
               var pixeler = new Pixeler();

               var reader = new FileReader();

               reader.onload = function(e) {
                   pixeler.processImage('rotate', {
                        dataURL: e.target.result,
                        angle: 2.0.0,
                        type: 'jpeg',
                        callback: function(dataURL) {
                            $('#J_Download').attr('href', dataURL);
                        }
                   });
               };

               reader.readAsDataURL(file); //file对象可由input或者FileReader获得
           });

   回调函数内的dataURL就是原图旋转90度后的二进制数据（经过base64编码）了。

   如果你能提供未编码的二进制数据，那得先转为base64编码过的dataURL，参考[base64转换工具](https://github.com/dankogai/js-base64)。

   本插件修改自[CamanJS](https://github.com/meltingice/CamanJS)。

2. 给图片添加lomo滤镜，更多滤镜效果参考[Caman滤镜](http://camanjs.com/examples/)。


           KISSY.use('kg/pixeler/2.0.0/index', function(S, Pixeler) {
               var pixeler = new Pixeler();

               var reader = new FileReader();

               reader.onload = function(e) {
                   pixeler.processImage('lomo', {
                        dataURL: e.target.result,
                        callback: function(dataURL) {
                            $('#J_Download').attr('href', dataURL);
                        }
                   });
               };

               reader.readAsDataURL(file); //file对象可由input或者FileReader获得
           });


浏览器支持：IE10+、FF22.0+、chrome28.0+、safari6.0+