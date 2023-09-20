import { Component, OnInit, ElementRef, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color } from 'ng2-charts';
import { AmChartsService } from '@amcharts/amcharts3-angular';
// import { Chart } from 'angular-highcharts';

// import 'highcharts/adapters/standalone-framework.src';
// const Highcharts = require('highcharts/highcharts.src');


@Component({
  selector: 'dashboard-chart',
  templateUrl: './dashboard-chart.component.html',
  styleUrls: ['./dashboard-chart.component.less']
})
export class DashboardChartComponent implements OnInit {

  // @ViewChild('chart') public chartEl: ElementRef;

  constructor(
    private AmCharts : AmChartsService
  ) { }

  private chart: any;
  // type = 'bar';
  // data = {
  //   labels: ["Industry", "Food", "Light Industry", "Sport",],
  //   datasets: [
  //     {
  //       data: [65000, 59000, 80000, 81000]
  //     }
  //   ],
  // };
  // options = {
  //   responsive: true,
  //   aspectRatio: 1.5,
  //   colors: ['#006688', '#006688', '#006688', '#006688']
  // };

  // public options = {
  //   'type': 'serial',
  //   'theme': 'light',
  //   'marginTop': 0,
  //   'marginRight': 80,
  //   'dataProvider': [{
  //     field: 'total',

  //   }]
  // }

  
  public options = {
    'type': 'serial',
    'theme': 'dark',
    'marginTop': 0,
    'marginRight': 80,
    'dataProvider': [{
      field: '4',
      total: 6500,
      industry: 3000,
      light_industry: 2000,
      food: 1000,
      sport:500,
    },{
      field: '5',
      total: 7000,
      industry:1500,
      light_industry:3000,
      food:2000,
      sport:500
    },{
      field: '6',
      total: 7500,
      industry: 3000,
      light_industry:1000,
      food:2000,
      sport:1500
    },{
      field: '7',
      total: 5000,
      industry:1000,
      light_industry:1500,
      food:2700,
      sport:300
    },{
      field: '8',
      total: 5500,
      industry: 1000,
      light_industry: 2000,
      food:2000,
      sport:500
    },{
      field: '9',
      total: 6000,
      industry: 500,
      light_industry:3000,
      food:1500,
      sport:1000,
    },{
      field: '10',
      total: 6500,
      industry:2500,
      light_industry:1500,
      food:1800,
      sport:1700
    }],
    'valueAxes': [{
      'axisAlpha': 0,
      'position': 'left'
    }],
    
    'graphs': [{
      'id': 'g1',
      'balloonText': '[[category]]<br><b><span style=\'font-size:14px;\'>[[value]]</span></b>',
      'bullet': 'round',
      'bulletSize': 8,
      'lineColor': '#d1655d',
      'lineThickness': 2,
      'negativeLineColor': '#637bb6',
      // 'fill': '#d1655d',
      'fill': { 
        'fill-opacity': 0.8,
      },
      'type': 'column',
      'valueField': 'total',
    },{
      'id': 'g2',
      'balloonText': '[[category]]<br><b><span style=\'font-size:14px;\'>[[value]]</span></b>',
      'bullet': 'round',
      'bulletSize': 8,
      'lineColor': 'blue',
      'lineThickness': 2,
      'negativeLineColor': '#006688',
      // 'fill': 'blue',
      'fill': { 
        'fill-opacity': 0.8,
      },
      'type': 'column',
      'valueField': 'industry'
    },{
      'id': 'g3',
      'balloonText': '[[category]]<br><b><span style=\'font-size:14px;\'>[[value]]</span></b>',
      'bullet': 'round',
      'bulletSize': 8,
      'lineColor': 'green',
      'lineThickness': 2,
      'negativeLineColor': '#637bb6',
      // 'fill': 'green',
      'fill': { 
        'fill-opacity': 0.8,
      },
      'type': 'column',
      'valueField': 'light_industry'
    },{
      'id': 'g4',
      'balloonText': '[[category]]<br><b><span style=\'font-size:14px;\'>[[value]]</span></b>',
      'bullet': 'round',
      'bulletSize': 8,
      'lineColor': 'yellow',
      'lineThickness': 2,
      'negativeLineColor': '#637bb6',
      // 'fill': 'yellow',
      'fill': { 
        'fill-opacity': 0.8,
      },
      'type': 'column',
      'valueField': 'food'
    },{
      'id': 'g5',
      'balloonText': '[[category]]<br><b><span style=\'font-size:14px;\'>[[value]]</span></b>',
      'bullet': 'round',
      'bulletSize': 8,
      'lineColor': 'lightblue',
      'lineThickness': 2,
      'negativeLineColor': '#637bb6',
      // 'fill': 'lightblue',
      'fill': { 
        'fill-opacity': 0.8,
      },
      'type': 'column',
      'valueField': 'sport'
    }],
    // 'chartScrollbar': {
    //   'graph': 'g1',
    //   'gridAlpha': 0,
    //   'color': '#888888',
    //   'scrollbarHeight': 55,
    //   'backgroundAlpha': 0,
    //   'selectedBackgroundAlpha': 0.1,
    //   'selectedBackgroundColor': '#888888',
    //   'graphFillAlpha': 0,
    //   'autoGridCount': true,
    //   'selectedGraphFillAlpha': 0,
    //   'graphLineAlpha': 0.2,
    //   'graphLineColor': '#c2c2c2',
    //   'selectedGraphLineColor': '#888888',
    //   'selectedGraphLineAlpha': 1
    // },
    // 'chartCursor': {
    //   'categoryBalloonDateFormat': 'YYYY',
    //   'cursorAlpha': 0,
    //   'valueLineEnabled': true,
    //   'valueLineBalloonEnabled': true,
    //   'valueLineAlpha': 0.5,
    //   'fullWidth': true
    // },
    'categoryField': 'field',
    // 'dataDateFormat': 'YYYY',
    
    // 'categoryAxis': {
    //   'minPeriod': 'YYYY',
    //   'parseDates': true,
    //   'minorGridAlpha': 0.1,
    //   'minorGridEnabled': true
    // },
    'export': {
      'enabled': true
    }
  };

  // chart = new Chart({
  //   chart: {
  //     type: 'line'
  //   },
  //   title: {
  //     text: 'Linechart'
  //   },
  //   credits: {
  //     enabled: false
  //   },
  //   series: [
  //     {
  //       name: 'Line 1',
  //       data: [1, 2, 3]
  //     }
  //   ]
  // });

  ngOnInit(): void {
    // this.chart = this.AmCharts.makeChart("chartdiv", {
    //   "type": "serial",
    //   "theme": "light",
    //   "dataProvider": [],
    // });
  }

  showGraph(sort): void {

  }

}
