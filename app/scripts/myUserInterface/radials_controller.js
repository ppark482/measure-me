(function(){
  angular.module('FinalProject')
    .controller('RadialControl', ['$rootScope', '$scope', 
      function ($rootScope, $scope) {

    var div1 = d3.select(document.getElementById('div1'));
    var div2 = d3.select(document.getElementById('div2'));
    var div3 = d3.select(document.getElementById('div3'));
    var div4 = d3.select(document.getElementById('div4'));

    start();

    function onClick1() {
      deselect();
      div1.attr("class","selectedRadial");
    }

    function onClick2() {
      deselect();
      div2.attr("class","selectedRadial");
    }

    function onClick3() {
      deselect();
      div3.attr("class","selectedRadial");
    }

    function labelFunction(val,min,max) {

    }

    function deselect() {
      div1.attr("class","radial");
      div2.attr("class","radial");
      div3.attr("class","radial");
    }

    function start() {

      var rp1 = radialProgress(document.getElementById('div1'))
        .label("RADIAL 1")
        .onClick(onClick1)
        .diameter(150)
        .value(78)
        .render();
      var rp2 = radialProgress(document.getElementById('div2'))
        .label("RADIAL 2")
        .onClick(onClick2)
        .diameter(150)
        .value(132)
        .render();
      var rp3 = radialProgress(document.getElementById('div3'))
        .label("RADIAL 3")
        .onClick(onClick3)
        .diameter(150)
        .minValue(100)
        .maxValue(200)
        .value(150)
        .render();
    }

      } // end function
    ]); // end controller
}()); // end iif