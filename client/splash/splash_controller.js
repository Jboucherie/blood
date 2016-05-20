app.controller('SplashController', ['$routeParams', '$scope', function($routeParams, $scope) {
  let SplashCtrl = this;

  loadLiquidFillGauge("fillgauge2", 52);

      ////////////////////////////////////////
    //       BEHOLD, THE FORBIDDEN ZONE.
    ////////////////////////////////////////


    $scope.options = {
      chart: {
        type: 'discreteBarChart',
        height: 200,
        x: function(d){return d.label;},
        y: function(d){return d.value;},
        showValues: true,
        color: function(){return '#700000';},
        valueFormat: function(d){ return d3.format(',f')(d); },
        dispatch: {

        },
        discretebar: {
          dispatch: {
            elementClick: function(e) {$scope.$apply();}
            }
          },
      }
    };

    $scope.data = [
      {
        key: "Blood Levels",
        values: [
                {
                  "label" : "O+" ,
                  "value" : 6
                },
                {
                  "label" : "O-" ,
                  "value" : 5
                },
                {
                  "label" : "A+" ,
                  "value" : 18
                },
                {
                  "label" : "A-" ,
                  "value" : 8
                },
                {
                  "label" : "B+" ,
                  "value" : 17
                },
                {
                  "label" : "B-" ,
                  "value" : 7
                },
                {
                  "label" : "AB+" ,
                  "value" : 16
                },
                {
                  "label" : "AB-" ,
                  "value" : 6
                }
        ]
      }
    ];

    ////////////////////////////////////////
    //  FAREWELL, FROM THE FORBIDDEN ZONE.
    ////////////////////////////////////////


    ////////////////////////////////////////
    //          Leaderboard Chart
    ////////////////////////////////////////


    $scope.donordata = [
              {
               key: " ",
               values: [
                   {
                       "label" : "Drake" ,
                       "value" : 15
                   } ,
                   {
                       "label" : "Calendar" ,
                       "value" : 8
                   } ,
                   {
                       "label" : "Two dogs" ,
                       "value" : 6
                   } ,
                   {
                       "label" : "A bird" ,
                       "value" : 3
                   } ,
                   {
                       "label" : "UI Directive" ,
                       "value" : 2
                   }
               ]
             }

        ];

    let chart;

    nv.addGraph(function() {
      chart = nv.models.multiBarHorizontalChart()
          .x(function(d) { return d.label})
          .y(function(d) { return d.value})
          .height(180)
          .barColor(function(){return '#700000';})
          .margin({left: 100})
          .showValues(true)
          .showControls(false);
      chart.yAxis.tickFormat(d3.format(',.2f'));
      chart.yAxis.axisLabel('Number of Donations').axisLabelDistance(5);
      update();
      nv.utils.windowResize(chart.update);
      $scope.$emit('chartinit');
      return chart;
    });

    let update = () => {
      d3.select('#splash-leaderboard-panel')
        .datum($scope.donordata)
        .call(chart);
    };


  ////////////////////////////////////////
  //
  ////////////////////////////////////////
}]);

