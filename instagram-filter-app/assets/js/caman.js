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
    Caman.Plugin.register("rotate", function(width, height, x, y) {
        var canvas, ctx;
        canvas = $('<canvas id="J_Canvas">')[0];
        canvas.width = 100;
        canvas.height = 100;

        ctx = canvas.getContext('2d');
        ctx.setTransform(1,0,0,1,0,0);
        ctx.rotate(20*Math.PI/180);
        ctx.drawImage(this.canvas, 0, 0, this.canvas.width, this.canvas.height);
        return this.replaceCanvas(canvas, true);
    });
    Caman.Filter.register("rotate", function(width, height, x, y) {
        if (x == null) {
            x = 0;
        }
        if (y == null) {
            y = 0;
        }
        return this.processPlugin("rotate", Array.prototype.slice.call(arguments, 0));
    });

    delete window.Caman;
    return Caman;

}, {
    requires: ['assets/js/originalCaman.js']
});
