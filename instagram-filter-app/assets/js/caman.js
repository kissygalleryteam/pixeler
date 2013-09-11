KISSY.add(function(S){
    (function() {
        try {
            var a = new Uint8Array(1);
            return; //no need
        } catch(e) { }

        function subarray(start, end) {
            return this.slice(start, end);
        }

        function set_(array, offset) {
            if (arguments.length < 2) offset = 0;
            for (var i = 0, n = array.length; i < n; ++i, ++offset)
                this[offset] = array[i] & 0xFF;
        }

        // we need typed arrays
        function TypedArray(arg1) {
            var result;
            if (typeof arg1 === "number") {
                result = new Array(arg1);
                for (var i = 0; i < arg1; ++i)
                    result[i] = 0;
            } else
                result = arg1.slice(0);
            result.subarray = subarray;
            result.buffer = result;
            result.byteLength = result.length;
            result.set = set_;
            if (typeof arg1 === "object" && arg1.buffer)
                result.buffer = arg1.buffer;

            return result;
        }

        window.Uint8Array = TypedArray;
        window.Uint32Array = TypedArray;
        window.Int32Array = TypedArray;
    })();

    var $ = S.all;
    var Caman = window.Caman;

    // plugins
    Caman.Plugin.register("rotate", function(angle, oldCanvas, img) {
//        var canvas, ctx;
//        canvas = $('<canvas id="J_Canvas" width="'+ width +'" height="'+ height +'">')[0];
//
//        ctx = canvas.getContext('2d');
//        ctx.setTransform(1,0,0,1,0,0);
//        ctx.translate(width/2, height/2);
//        ctx.rotate(angle*Math.PI/180);
//        ctx.drawImage(this.canvas, 0, 0, this.canvas.width, this.canvas.height);

        var canvas =  $('<canvas id="J_Canvas" >')[0];

        //获取图片的高宽
        var w = oldCanvas.width;
        var h = oldCanvas.height;
        //角度转为弧度
        if(!angle){
            angle = 0;
        }
        var rotation = Math.PI * angle / 180;
        var c = Math.round(Math.cos(rotation) * 1000) / 1000;
        var s = Math.round(Math.sin(rotation) * 1000) / 1000;
        //旋转后canvas标签的大小
        canvas.height = Math.abs(c*h) + Math.abs(s*w);
        canvas.width = Math.abs(c*w) + Math.abs(s*h);
        //绘图开始
        var context = canvas.getContext("2d");
        context.save();
        //改变中心点
        if (rotation <= Math.PI/2) {
            context.translate(s*h,0);
        } else if (rotation <= Math.PI) {
            context.translate(canvas.width,-c*h);
        } else if (rotation <= 1.5*Math.PI) {
            context.translate(-c*w,canvas.height);
        } else {
            context.translate(0,-s*w);
        }
        //旋转90°
        context.rotate(rotation);
        //绘制
        context.drawImage(img, 0, 0, w, h);

        // 垃圾回收
        img = null

        return this.replaceCanvas(canvas, true);
    });
    Caman.Filter.register("rotate", function(angle) {
        if (angle == null) {
            return;
        }
        return this.processPlugin("rotate", Array.prototype.slice.call(arguments, 0));
    });

    delete window.Caman;
    return Caman;

}, {
    requires: ['assets/js/originalCaman.js']
});
