var myApp=angular.module('myApp', []);
myApp.controller('flowerController', function($scope) {
  
  $scope.flowers = [{
        img:'photo/redroses101.jpg',
        name: 'Троянда червона',
        descr: '101',
        price: '2200'
    },{
        img:'photo/roseswhite15.jpg',
        name: 'Троянда біла',
        descr: '15',
        price: '2200'
    },{
        img:'photo/roseryellow25.jpg',
        name: 'Троянда жовта',
        descr: '25',
        price: '2200'
    },{
        img:'photo/lily&roses15.jpg',
        name: 'Лілії та троянди',
        descr: '15',
        price: '2200'
    },{
        img:'photo/orcide7.jpg',
        name: 'Орхідеї',
        descr: '7',
        price: '2200'
    },{
        img:'photo/rosesbaj17.jpg',
        name: 'Троянди пастельні',
        descr: '17',
        price: '2200'
    },{
        img:'photo/alstromera15.jpg',
        name: 'Альстромери',
        descr: '15',
        price: '2200'
    },{
        img:'photo/fildflowers.jpg',
        name: 'Польові квіти',
        descr: '15',
        price: '2200'
    },{
        img:'photo/tulip25.jpg',
        name: 'Тюльпани',
        descr: '25',
        price: '2200'
    },{
        img:'photo/chrisantem13.jpg',
        name: 'Хризантеми',
        descr: '13',
        price: '2200'
    },{
        img:'photo/mixwhite&yellow.jpg',
        name: 'Квітковий мікс',
        descr: '35',
        price: '2200'
    },{
        img:'photo/pivon15.jpg',
        name: 'Півони',
        descr: '15',
        price: '2200'
    },{
        img:'photo/lilywhite7.jpg',
        name: 'Лілія біла',
        descr: '7',
        price: '2200'
    },{
        img:'photo/rosescolor35.jpg',
        name: 'Троянда кольорова',
        descr: '35',
        price: '2200'
    }]
});