KISSY.ready(function(S) {
    var $ = S.all;

    var canvasEl = $('#J_Canvas')[0],
        picArr = [
            '../instagram-filter-app/assets/img/horse.jpg',
            '../instagram-filter-app/assets/img/010.jpg'
        ];

    processImage(getRandomPic());


    $('.change-image-btn').on('click', function() {
        var randomPic = getRandomPic();

        processImage(randomPic);
    });

    function getRandomPic() {
        var randomIndex = Math.round(Math.random());

        return picArr[randomIndex];
    }

    function processImage(randomPic) {
        Caman(canvasEl, "" + randomPic, function () {
            // manipulate image here
            this['lomo']();
            this.render();
        });
    }


});
