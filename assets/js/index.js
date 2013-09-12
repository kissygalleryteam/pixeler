KISSY.use('assets/js/pixeler.js', function(S, Pixeler) {
    var $ = S.all,
         E = S.Event;

    var setUp = {
        initialize: function() {
            this.pixeler = new Pixeler();

            this.setUpFileUploadWay();
            this.setUpFilter();
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
                    angle: 180,
                    type: 'jpeg',
                    callback: function(dataURL) {
                        $('#J_Download').attr('href', dataURL);
                    }
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

        }
    };
    setUp.initialize();


});