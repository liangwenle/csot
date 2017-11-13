<template>
 <div style="width: 100%;height: 100%;">
    <div v-show="show==0" id="mainChart"></div>
    <div v-show="show==1" id="chart"></div>
    <div v-show="show==2" id="bmapchart"></div>
    <div v-show="show==3" id="mapchart"></div>
    <div v-show="show==4" id="glMapchart"></div>
    <div v-show="show==5" id="glchart"></div>
 </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
import echarts from "echarts";
import lxtData from "@/assets/lxtData";
import buildingsGeoJSON from "@/assets/buildings";

import "echarts-gl";
import "echarts/extension/bmap/bmap";
import "echarts/map/js/china";
import "echarts/map/js/province/guangdong";

export default {
  name: "MainChart",
  components: {},
  computed: {},
  data() {
    return {
      show: null,
      domIds: [
        "mainChart",
        "chart",
        "bmapchart",
        "mapchart",
        "glMapchart",
        "glchart"
      ],
      geoCoordMap: {
        海门: [121.15, 31.89],
        鄂尔多斯: [109.781327, 39.608266],
        招远: [120.38, 37.35],
        舟山: [122.207216, 29.985295],
        齐齐哈尔: [123.97, 47.33],
        盐城: [120.13, 33.38],
        赤峰: [118.87, 42.28],
        青岛: [120.33, 36.07],
        乳山: [121.52, 36.89],
        金昌: [102.188043, 38.520089],
        泉州: [118.58, 24.93],
        莱西: [120.53, 36.86],
        日照: [119.46, 35.42],
        胶南: [119.97, 35.88],
        南通: [121.05, 32.08],
        拉萨: [91.11, 29.97],
        云浮: [112.02, 22.93],
        梅州: [116.1, 24.55],
        文登: [122.05, 37.2],
        上海: [121.48, 31.22],
        攀枝花: [101.718637, 26.582347],
        威海: [122.1, 37.5],
        承德: [117.93, 40.97],
        厦门: [118.1, 24.46],
        汕尾: [115.375279, 22.786211],
        潮州: [116.63, 23.68],
        丹东: [124.37, 40.13],
        太仓: [121.1, 31.45],
        曲靖: [103.79, 25.51],
        烟台: [121.39, 37.52],
        福州: [119.3, 26.08],
        瓦房店: [121.979603, 39.627114],
        即墨: [120.45, 36.38],
        抚顺: [123.97, 41.97],
        玉溪: [102.52, 24.35],
        张家口: [114.87, 40.82],
        阳泉: [113.57, 37.85],
        莱州: [119.942327, 37.177017],
        湖州: [120.1, 30.86],
        汕头: [116.69, 23.39],
        昆山: [120.95, 31.39],
        宁波: [121.56, 29.86],
        湛江: [110.359377, 21.270708],
        揭阳: [116.35, 23.55],
        荣成: [122.41, 37.16],
        连云港: [119.16, 34.59],
        葫芦岛: [120.836932, 40.711052],
        常熟: [120.74, 31.64],
        东莞: [113.75, 23.04],
        河源: [114.68, 23.73],
        淮安: [119.15, 33.5],
        泰州: [119.9, 32.49],
        南宁: [108.33, 22.84],
        营口: [122.18, 40.65],
        惠州: [114.4, 23.09],
        江阴: [120.26, 31.91],
        蓬莱: [120.75, 37.8],
        韶关: [113.62, 24.84],
        嘉峪关: [98.289152, 39.77313],
        广州: [113.23, 23.16],
        延安: [109.47, 36.6],
        太原: [112.53, 37.87],
        清远: [113.01, 23.7],
        中山: [113.38, 22.52],
        昆明: [102.73, 25.04],
        寿光: [118.73, 36.86],
        盘锦: [122.070714, 41.119997],
        长治: [113.08, 36.18],
        深圳: [114.07, 22.62],
        珠海: [113.52, 22.3],
        宿迁: [118.3, 33.96],
        咸阳: [108.72, 34.36],
        铜川: [109.11, 35.09],
        平度: [119.97, 36.77],
        佛山: [113.11, 23.05],
        海口: [110.35, 20.02],
        江门: [113.06, 22.61],
        章丘: [117.53, 36.72],
        肇庆: [112.44, 23.05],
        大连: [121.62, 38.92],
        临汾: [111.5, 36.08],
        吴江: [120.63, 31.16],
        石嘴山: [106.39, 39.04],
        沈阳: [123.38, 41.8],
        苏州: [120.62, 31.32],
        茂名: [110.88, 21.68],
        嘉兴: [120.76, 30.77],
        长春: [125.35, 43.88],
        胶州: [120.03336, 36.264622],
        银川: [106.27, 38.47],
        张家港: [120.555821, 31.875428],
        三门峡: [111.19, 34.76],
        锦州: [121.15, 41.13],
        南昌: [115.89, 28.68],
        柳州: [109.4, 24.33],
        三亚: [109.511909, 18.252847],
        自贡: [104.778442, 29.33903],
        吉林: [126.57, 43.87],
        阳江: [111.95, 21.85],
        泸州: [105.39, 28.91],
        西宁: [101.74, 36.56],
        宜宾: [104.56, 29.77],
        呼和浩特: [111.65, 40.82],
        成都: [104.06, 30.67],
        大同: [113.3, 40.12],
        镇江: [119.44, 32.2],
        桂林: [110.28, 25.29],
        张家界: [110.479191, 29.117096],
        宜兴: [119.82, 31.36],
        北海: [109.12, 21.49],
        西安: [108.95, 34.27],
        金坛: [119.56, 31.74],
        东营: [118.49, 37.46],
        牡丹江: [129.58, 44.6],
        遵义: [106.9, 27.7],
        绍兴: [120.58, 30.01],
        扬州: [119.42, 32.39],
        常州: [119.95, 31.79],
        潍坊: [119.1, 36.62],
        重庆: [106.54, 29.59],
        台州: [121.420757, 28.656386],
        南京: [118.78, 32.04],
        滨州: [118.03, 37.36],
        贵阳: [106.71, 26.57],
        无锡: [120.29, 31.59],
        本溪: [123.73, 41.3],
        克拉玛依: [84.77, 45.59],
        渭南: [109.5, 34.52],
        马鞍山: [118.48, 31.56],
        宝鸡: [107.15, 34.38],
        焦作: [113.21, 35.24],
        句容: [119.16, 31.95],
        北京: [116.46, 39.92],
        徐州: [117.2, 34.26],
        衡水: [115.72, 37.72],
        包头: [110, 40.58],
        绵阳: [104.73, 31.48],
        乌鲁木齐: [87.68, 43.77],
        枣庄: [117.57, 34.86],
        杭州: [120.19, 30.26],
        淄博: [118.05, 36.78],
        鞍山: [122.85, 41.12],
        溧阳: [119.48, 31.43],
        库尔勒: [86.06, 41.68],
        安阳: [114.35, 36.1],
        开封: [114.35, 34.79],
        济南: [117, 36.65],
        德阳: [104.37, 31.13],
        温州: [120.65, 28.01],
        九江: [115.97, 29.71],
        邯郸: [114.47, 36.6],
        临安: [119.72, 30.23],
        兰州: [103.73, 36.03],
        沧州: [116.83, 38.33],
        临沂: [118.35, 35.05],
        南充: [106.110698, 30.837793],
        天津: [117.2, 39.13],
        富阳: [119.95, 30.07],
        泰安: [117.13, 36.18],
        诸暨: [120.23, 29.71],
        郑州: [113.65, 34.76],
        哈尔滨: [126.63, 45.75],
        聊城: [115.97, 36.45],
        芜湖: [118.38, 31.33],
        唐山: [118.02, 39.63],
        平顶山: [113.29, 33.75],
        邢台: [114.48, 37.05],
        德州: [116.29, 37.45],
        济宁: [116.59, 35.38],
        荆州: [112.239741, 30.335165],
        宜昌: [111.3, 30.7],
        义乌: [120.06, 29.32],
        丽水: [119.92, 28.45],
        洛阳: [112.44, 34.7],
        秦皇岛: [119.57, 39.95],
        株洲: [113.16, 27.83],
        石家庄: [114.48, 38.03],
        莱芜: [117.67, 36.19],
        常德: [111.69, 29.05],
        保定: [115.48, 38.85],
        湘潭: [112.91, 27.87],
        金华: [119.64, 29.12],
        岳阳: [113.09, 29.37],
        长沙: [113, 28.21],
        衢州: [118.88, 28.97],
        廊坊: [116.7, 39.53],
        菏泽: [115.480656, 35.23375],
        合肥: [117.27, 31.86],
        武汉: [114.31, 30.52],
        大庆: [125.03, 46.58]
      },
      mainChart: null,
      chart: null,
      bmapchart: null,
      mapchart: null,
      glMapchart: null,
      glchart: null
    };
  },
  computed: {
    ...mapGetters(["chartType"])
  },
  watch: {
    show(n, o) {
      /*  this.chart.clear();
      console.log(this.chart.isDisposed());
      console.log(this.chart.getOption()); */
      if (o) {
        let c = this.domIds[o];
        this[c].dispose();
      }

      /* 
      this.chart.dispose()
      this.bmapchart.dispose()
      this.mapchart.dispose()
      this.glMapchart.dispose()
      this.glchart.dispose() */

      this.$nextTick(() => {
        switch (n) {
          case 0:
            // this.drowMainChart();
            break;
          case 1:
            this.drowChart();
            break;
          case 2:
            this.drowBMapChart();
            this.setLX_Bmap();
            break;
          case 3:
            this.drowMapChart();
            break;
          case 4:
            this.drowGLMapChart();
            this.setGLMapChart();
            break;
          case 5:
            this.drowGLChart();
            break;
          case 6:
            break;
          default:
            break;
        }
      });

      /* if (n == 1) {
        this.show = 1;
        this.$nextTick(() => {
          this.mapTest();
          this.chart.resize();
        });
      } else if (n == 2) {
        this.show = 1;
        this.$nextTick(() => {
          this.mapTestB();
        });
      } else if (n == 0) {
        this.show = 2;
        this.$nextTick(() => {
          this.testGl();
          this.chart.resize();
        });
      } */
    },
    chartType(n, o) {
      this.show = n;
    }
  },
  methods: {
    ...mapActions(["setChartType","setDiaLogs"]),

    guangDongMapFormJS() {
      this.chart.setOption({
        series: [
          {
            type: "map3D",
            map: "广东"
          }
        ]
      });
    },
    setLX_Bmap() {
      let data = lxtData;
      let hStep = 300 / (data.length - 1);
      let busLines = [].concat.apply(
        [],
        data.map(function(busLine, idx) {
          return {
            coords: busLine,
            lineStyle: {
              normal: {
                color: echarts.color.modifyHSL(
                  "#5A94DF",
                  Math.round(hStep * idx)
                )
              }
            }
          };
        })
      );
      let option = {
        series: [
          {
            type: "lines",
            coordinateSystem: "bmap",
            polyline: true,
            data: busLines,
            silent: true,
            lineStyle: {
              normal: {
                opacity: 0.3,
                width: 1
              }
            },
            progressiveThreshold: 500,
            progressive: 100
          },
          {
            type: "lines",
            coordinateSystem: "bmap",
            polyline: true,
            data: busLines,
            lineStyle: {
              normal: {
                width: 0.02
              }
            },
            effect: {
              constantSpeed: 40,
              show: true,
              trailLength: 0.02,
              symbolSize: 2
            },
            zlevel: 1
          },
          {
            name: "浙A95527",
            type: "effectScatter",
            coordinateSystem: "bmap",
            zlevel: 2,
            rippleEffect: {
              brushType: "stroke"
            },
            label: {
              normal: {
                show: true,
                position: "right",
                formatter: "{b}"
              }
            },
            symbolSize: function(val) {
              return val[2] / 4;
            },
            showEffectOn: "render",
            itemStyle: {
              normal: {
                color: "#f4e925",
                shadowBlur: 10,
                shadowColor: "#333"
              }
            },
            data: [
              {
                name: "浙A95527-告警",
                value: [120.102281, 30.281876, 50]
              }
            ]
          },
          {
            name: "浙AGH2352",
            type: "effectScatter",
            coordinateSystem: "bmap",
            zlevel: 2,
            rippleEffect: {
              brushType: "stroke"
            },
            label: {
              normal: {
                show: true,
                position: "right",
                formatter: "{b}"
              }
            },
            symbolSize: function(val) {
              return val[2] / 4;
            },
            showEffectOn: "render",
            itemStyle: {
              normal: {
                color: "#ff2200",
                shadowBlur: 10,
                shadowColor: "#333"
              }
            },
            data: [
              {
                name: "浙AGH2352-故障",
                value: [120.155575, 30.314324, 70]
              }
            ]
          }
        ]
      };
      this.bmapchart.setOption(option);
    },
    setGLMapChart() {
      let _this = this;
      let convertData = function(data) {
        let res = [];
        for (let i = 0; i < data.length; i++) {
          let geoCoord = _this.geoCoordMap[data[i].name];
          if (geoCoord) {
            res.push({
              name: `厂区 ${i + 1}`,
              value: geoCoord.concat(data[i].value)
            });
          }
        }

        return res;
      };

      let option = {
        visualMap: [
          {
            type: "continuous",
            seriesIndex: 0,
            text: ["能耗值"],
            textStyle: {
              color: "#fff"
            },
            calculable: true,
            max: 300,
            inRange: {
              color: ["#87aa66", "#eba438", "#d94d4c"]
            }
          },
          {
            type: "continuous",
            seriesIndex: 1,
            text: ["产量"],
            textStyle: {
              color: "#fff"
            },
            left: "right",
            max: 100,
            calculable: true,
            inRange: {
              color: ["#000", "blue", "purple"]
            }
          }
        ],
        series: [
          {
            name: "能耗值",
            type: "bar3D",
            coordinateSystem: "geo3D",
            barSize: 1, //柱子粗细
            label: {
              show: true,
              formatter: "{b}"
            },
            tooltip: {
              formatter: (a, b, c) => {
                return `${a.value[2]} kw/h`;
              }
            },
            data: convertData([
              { name: "深圳", value: (Math.random() * 300).toFixed(2) },
              { name: "中山", value: (Math.random() * 300).toFixed(2) },
              { name: "江门", value: (Math.random() * 300).toFixed(2) },
              { name: "惠州", value: (Math.random() * 300).toFixed(2) },
              { name: "清远", value: (Math.random() * 300).toFixed(2) }
            ])
          },
          {
            name: "产量",
            type: "scatter3D",
            // zlevel: 2,
            coordinateSystem: "geo3D",
            symbol: "pin",
            symbolSize: 30,
            opacity: 1,
            label: {
              show: false,
              formatter: "{b}"
            },
            tooltip: {
              formatter: (a, b, c) => {
                return `${a.value[2]} 件/h`;
              }
            },
            itemStyle: {
              borderWidth: 0.5,
              borderColor: "#fff"
            },
            data: convertData([
              {
                name: "深圳",
                value: (Math.random() * 100 + 50).toFixed(2)
              },
              {
                name: "中山",
                value: (Math.random() * 100 + 50).toFixed(2)
              },
              {
                name: "江门",
                value: (Math.random() * 100 + 50).toFixed(2)
              },
              {
                name: "惠州",
                value: (Math.random() * 100 + 50).toFixed(2)
              },
              {
                name: "清远",
                value: (Math.random() * 100 + 50).toFixed(2)
              }
            ])
          }
        ]
      };
      this.glMapchart.setOption(option);
    },
    initChart(name) {
      let dom = document.getElementById(name);
      let existInstance = echarts.getInstanceByDom(dom);
      if (existInstance) {
        return false;
        echarts.dispose(existInstance);
      }
      this[name] = echarts.init(dom);
    },
    drowMainChart() {
      let domId = "mainChart";
      this.initChart(domId);
    },
    drowChart() {
      let domId = "chart";
      this.initChart(domId);

      let regions = buildingsGeoJSON.features.map(function(feature) {
        return {
          name: feature.properties.name,
          value: feature.properties.height,
          height: +feature.properties.height * 3 + 0.1
        };
      });
      echarts.registerMap("buildings", buildingsGeoJSON);
      let option = {
        visualMap: {
          show: false,
          min: 2,
          max: 35,
          inRange: {
            color: [
              "#696868",
              "#594e76",
              "#635177",
              "#7b5675",
              "#94596d",
              "#da6b58",
              "#ff6029",
              "#f23e19",
              "#e42e16"
            ] //aaron
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "厂区建筑 <br/>编号:{b} 能耗:{c} kw/h",
          triggerOn: "mousemove",
          position: [10, 300]
        },
        series: [
          {
            type: "map3D",
            map: "buildings",
            shading: "realistic",
            realisticMaterial: {
              roughness: 0.6,
              textureTiling: 20
            },
            postEffect: {
              enable: true,
              bloom: {
                enable: false
              },
              SSAO: {
                enable: true,
                quality: "medium",
                radius: 10,
                intensity: 1.2
              },
              depthOfField: {
                enable: false,
                focalRange: 5,
                fstop: 1,
                blurRadius: 6
              }
            },
            groundPlane: {
              show: true,
              color: "#181b3a"
            },
            light: {
              main: {
                intensity: 1,
                shadow: true,
                shadowQuality: "high",
                alpha: 30
              },
              ambient: {
                intensity: 0.7
              }
            },
            viewControl: {
              minBeta: -360,
              maxBeta: 360
            },

            label: {
              textStyle: {
                color: "white"
              }
            },

            silent: false,

            instancing: true,

            boxWidth: 200,
            boxHeight: 1,

            data: regions
          }
        ]
      };
      this[domId].setOption(option, { notMerge: true });
      this[domId].resize();
       this[domId].on("click", p => {
         this.setDiaLogs(['b',true])
      });
    },
    drowBMapChart() {
      let domId = "bmapchart";
      this.initChart(domId);

      let option = {
        // 加载 bmap 组件
        bmap: {
          // 百度地图中心经纬度
          center: [120.184158, 30.28849],
          // 百度地图缩放
          zoom: 12,
          // 是否开启拖拽缩放，可以只设置 'scale' 或者 'move'
          roam: true,
          // 百度地图的自定义样式，见 http://developer.baidu.com/map/jsdevelop-11.htm
          // mapStyle: {
          //   style: "midnight"
          // }
          mapStyle: {
            styleJson: [
              {
                featureType: "water",
                elementType: "all",
                stylers: {
                  color: "#031628"
                }
              },
              {
                featureType: "land",
                elementType: "geometry",
                stylers: {
                  color: "#000102"
                }
              },
              {
                featureType: "highway",
                elementType: "all",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "arterial",
                elementType: "geometry.fill",
                stylers: {
                  color: "#000000"
                }
              },
              {
                featureType: "arterial",
                elementType: "geometry.stroke",
                stylers: {
                  color: "#0b3d51"
                }
              },
              {
                featureType: "local",
                elementType: "geometry",
                stylers: {
                  color: "#000000"
                }
              },
              {
                featureType: "railway",
                elementType: "geometry.fill",
                stylers: {
                  color: "#000000"
                }
              },
              {
                featureType: "railway",
                elementType: "geometry.stroke",
                stylers: {
                  color: "#08304b"
                }
              },
              {
                featureType: "subway",
                elementType: "geometry",
                stylers: {
                  lightness: -70
                }
              },
              {
                featureType: "building",
                elementType: "geometry.fill",
                stylers: {
                  color: "#000000"
                }
              },
              {
                featureType: "all",
                elementType: "labels.text.fill",
                stylers: {
                  color: "#857f7f"
                }
              },
              {
                featureType: "all",
                elementType: "labels.text.stroke",
                stylers: {
                  color: "#000000"
                }
              },
              {
                featureType: "building",
                elementType: "geometry",
                stylers: {
                  color: "#022338"
                }
              },
              {
                featureType: "green",
                elementType: "geometry",
                stylers: {
                  color: "#062032"
                }
              },
              {
                featureType: "boundary",
                elementType: "all",
                stylers: {
                  color: "#465b6c"
                }
              },
              {
                featureType: "manmade",
                elementType: "all",
                stylers: {
                  color: "#022338"
                }
              },
              {
                featureType: "point",
                elementType: "all",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "poi",
                elementType: "all",
                stylers: {
                  color: "#93c47d",
                  visibility: "off"
                }
              }
            ]
          }
        },
        series: [
          {
            type: "scatter",
            // 使用百度地图坐标系
            coordinateSystem: "bmap",
            // 数据格式跟在 geo 坐标系上一样，每一项都是 [经度，纬度，数值大小，其它维度...]
            data: [[120, 30, 1]]
          }
        ]
      };

      // let myChart = echarts.init(document.getElementById("mainChart"));
      this[domId].setOption(option, { notMerge: true });
      // 获取百度地图实例，使用百度地图自带的控件
      let bmap = this[domId]
        .getModel()
        .getComponent("bmap")
        .getBMap();
      bmap.addControl(new BMap.MapTypeControl());
    },
    drowMapChart() {
      let domId = "mapchart";
      this.initChart(domId);
      function area(name, color) {
        let a = {
          name: name,
          selected: true,
          itemStyle: {
            emphasis: {
              areaColor: color,
              borderColor: "#f47920",
              borderWidth: 1
            }
          }
        };
        return a;
      }
      let geodata = [
        {
          name: "广州市",
          value: [113.43, 23.26]
        },
        {
          name: "佛山市",
          value: [112.98, 23.01]
        },
        {
          name: "东莞市",
          value: [113.85, 23.01]
        },
        {
          name: "中山市",
          value: [113.38, 22.52]
        },
        {
          name: "江门市",
          value: [112.7, 22.31]
        },
        {
          name: "阳江市",
          value: [111.9, 21.95]
        },
        {
          name: "茂名市",
          value: [110.99, 21.68]
        },
        {
          name: "湛江市",
          value: [110.24, 21.25]
        }
      ];
      let geodata1 = [
        {
          name: "深圳市",
          value: [114.07, 22.62]
        }
      ];
      let option = {
        backgroundColor: "#181b3a",
        geo: {
          map: "广东",
          label: {
            emphasis: {
              show: true,
              color: "#fff"
            }
          },
          roam: true,
          zlevel: 1,
          itemStyle: {
            normal: {
              areaColor: "#031525",
              borderColor: "#3B5077"
            },
            emphasis: {
              areaColor: "rgba(233,0,200,0.3)",
              shadowColor: "rgba(222, 121, 0, 0.5)",
              shadowBlur: 10
            }
          },
          regions: [
            area("深圳市", "#694d9f"),
            area("佛山市", "#45224a"),
            area("茂名市", "#45224a")
          ]
        },
        series: []
      };

      this[domId].setOption(option, { notMerge: true });
      this[domId].resize();
    },
    drowGLMapChart() {
      let domId = "glMapchart";
      this.initChart(domId);

      this[domId].setOption({
        tooltip: {
          show: true
        },

        geo3D: {
          map: "广东",
          roam: true,
          itemStyle: {
            areaColor: "#1d5e98",
            opacity: 1,
            borderWidth: 0.4,
            borderColor: "#000"
          },
          label: {
            show: true,
            textStyle: {
              color: "#000", //地图初始化区域字体颜色
              fontSize: 8,
              opacity: 1,
              backgroundColor: "rgba(0,23,11,0)"
            }
          },
          emphasis: {
            //当鼠标放上去  地区区域是否显示名称
            label: {
              show: true,
              textStyle: {
                color: "#fff",
                fontSize: 3
                // backgroundColor: "rgba(0,23,11,0)"
              }
            },
            itemStyle: {
              areaColor: "#0c4679",
              opacity: 1,
              borderWidth: 0.4,
              borderColor: "#000"
            }
          },
          shading: "lambert",
          light: {
            //光照阴影
            main: {
              color: "#fff", //光照颜色
              intensity: 2, //光照强度
              shadowQuality: "high", //阴影亮度
              shadow: true //是否显示阴影
            }
          }
        }
      });
      this[domId].resize();
    },
    drowGLChart() {
      let domId = "glchart";
      this.initChart(domId);
      this[domId].setOption({
        grid3D: {},
        xAxis3D: {},
        yAxis3D: {},
        zAxis3D: {},
        series: [
          {
            type: "scatter3D",
            symbolSize: 50,
            data: [[-1, -1, -1], [0, 0, 0], [1, 1, 1]],
            itemStyle: {
              opacity: 1
            }
          }
        ]
      });
      this[domId].resize();
    }
  },
  mounted() {
    this.$nextTick(() => {
      // window.onresize = this.resizeAllChart;
      this.show = 4;
    });
  }
};
</script>

<style scoped>
#mainChart,
#chart,
#bmapchart,
#mapchart,
#glMapchart,
#glchart {
  background: #444;
  width: 100%;
  height: 100%;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>