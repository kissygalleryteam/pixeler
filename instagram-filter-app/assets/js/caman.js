KISSY.add(function(S){
    var Caman = window.Caman;

    delete window.Caman;
    return Caman;

}, {
    requires: ['assets/js/originalCaman.js']
});
