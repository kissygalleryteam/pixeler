KISSY.use('assets/js/pixeler.js', function(S, Pixeler) {
    var $ = S.all,
         E = S.Event;

    var setUp = {
        initialize: function() {
            this.pixeler = new Pixeler();

            this.setUpFileUploadWay();
            this.setUpFilter();

            this.addWaterMark();
            this.onlinePic();
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
//            FileReaderJS.setupDrop($('#J_CanvasContainer')[0], opts);
            FileReaderJS.setupInput($('#J_Input')[0], opts);
        },
        readFile: function(file) {
            var self = this;

            self.reader.onload = function(e) {


                self.pixeler.processImage('rotate', {
                    dataURL: e.target.result,
                    angle: 0,
                    type: 'jpeg',
                    callback: function(dataURL) {
                        $('#J_Download').attr('href', dataURL);
                    }
                });

                var dataURL =  $('#J_Download').attr('href', dataURL) || e.target.result;
                $('#J_EffectBtn span').on('click', function(e) {
                    var target = $(e.currentTarget),
                        effectName = target.text(),
                        angle = target.attr('data-angle');

                    self.pixeler.processImage(effectName, {
                        dataURL: dataURL,
                        angle: angle,
                        type: 'jpeg',
                        callback: function(dataURL) {
                            $('#J_Download').attr('href', dataURL);
                        }
                    });
                });

            };
            self.reader.readAsDataURL(file);
        },
        setUpFilter: function() {
            var self = this;

            E.delegate(document, 'click', '.J_PresetStyle', function(e) {
                var effectName = $(e.currentTarget).attr('data-preset');
                e.preventDefault();

                self.pixeler.processImage(effectName);
            });

        },
        addWaterMark: function(){
            var self = this;
            var lastValue='';
            E.on('#J_addLogoText','click',function(ev){
                var value = $('#J_logoText')[0].value.replace(/^\s*|\s*$/g,'');
                if(lastValue!=value){
                    lastValue = value;
                    var canvas = document.querySelectorAll('#J_CanvasContainer canvas')[0];
                    var ctx = canvas.getContext('2d');
                    ctx.rotate(Math.PI*0.25);
                    ctx.font = "100px Times New Roman";
                    ctx.fillStyle = 'rgba(255,0,0,0.5)';
                    ctx.fillText(value, 50, 50);
                    self.toDownload(canvas);
                }
            })
        },
        toDownload:function(canvas){
            var newimg  = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
            $('#J_Download').attr('href', newimg);
        },
        onlinePic: function(){
            E.on('#J_picUrl','keyup',function(ev){
                var code = ev.keyCode;
                if(code==13){
                    var value = ev.target.value;
                    var xhr = new XMLHttpRequest();
                    xhr.open('GET', value, true);
                    xhr.responseType = 'blob';
                    xhr.onload = function() {
                        if (this.status == 200) {
                            blob = this.response;
                            var read= new FileReader()
                            read.readAsDataURL(blob)
                            read.onload = function(){
                                console.log(this.result);
                            }
                        }
                    };
                    xhr.send();
//                    var img = new Image();
//                    img.src=value;
//                    img.setAttribute('crossOrigin','anonymous');
//                    img.onload=function(ev){
//                        var canvas = document.createElement('canvas');
//                        var ctx = canvas.getContext('2d');
//                        ctx.drawImage(img,0,0);
//                        console.log(canvas.toDataURL("image/png"))
//                    }
                }
            });
        }
    };
    setUp.initialize();



    /*drag*/
    var body=document.body;
    body.ondragover = function (ev) {
           ev.preventDefault();
       }
       body.ondrop = function (ev) {
           var files = ev.dataTransfer.files;
           if (files.length == 0) {
               return;
           }
           var file = files[files.length - 1];
           setUp.readFile(file);
           return false;
       }
});