;(function() {
    let myMap;

    ymaps.ready(init);
    
    
    function init(){
        var myMap = new ymaps.Map("map", {
            center: [55.76, 37.64],
            zoom: 11,
            controls: []
        });
        var coords = [
            [55.75, 37.50],
            [55.75, 37.71],
            [55.70, 37.70]
        ];
        var myCollection = new ymaps.GeoObjectCollection({}, {
            draggable: false,
            iconLayout: 'default#image',
            iconImageHref: './img/marker.svg',
            iconImageSize: [46, 57],
            iconImageOffset: [-35, -52]
        });
        for (var i = 0; i < coords.length; i++) {
            myCollection.add(new ymaps.Placemark(coords[i]));
        }
        myMap.geoObjects.add(myCollection);
    
        myMap.behaviors.disable('scrollZoom');
    }
})()

