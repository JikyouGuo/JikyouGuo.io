(function() {
  class PieChart {
    constructor() {}
    init() {
      this.getData({ path: '/api/student/findAll' });
    }
    getData(data) {
      $.ajax({
        type: 'GET',
        url: 'https://open.duyiedu.com' + data.path,
        data: { appkey: /* 'DuYi1617568049_1564983580140' */ 'KakuJikyou_1567658614549' },
        success: resp => {
          const data = JSON.parse(resp).data;
          if (data.length > 0) {
            const addressData = this.dataProcessing('address', data);
            this.drawChart($('.chart')[0], addressData);
            const sexData = this.dataProcessing('sex', data);
            this.drawChart($('.chart')[1], sexData);
          } else alert('暂无数据');
        }
      });
    }
    drawChart(dom, data) {
      let type = data.type;
      if (type === 'address') type = '地址';
      if (type === 'sex') type = '性别';
      const chart = echarts.init(dom);
      const option = {
        title: {
          text: '学生' + type + '分布统计',
          subtext: '纯属虚构',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',
          right: 10,
          top: 20,
          bottom: 20,
          data: data.legendData
        },
        series: [
          {
            name: type,
            type: 'pie',
            radius: '55%',
            center: ['40%', '50%'],
            data: data.seriesData,
            // data: [{ value: '个数', name: '类别' }],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      chart.setOption(option);
    }
    dataProcessing(type, data) {
      function rewriteName(name) {
        if (type === 'sex') {
          if (name == 0) name = '男';
          if (name == 1) name = '女';
        } else if ((type = 'address')) {
          name = name.replace(/^(.+) .+/, (_, $1) => $1);
        }
        return name;
      }
      // [ 属性值 ] 样本集合
      const legendData = [];
      // [ { name: 属性值, value: 频数 } ] 样本对应频数
      const seriesData = [];
      // { 属性值: 频数 } 记录频数
      let obj = {};
      // 样本，legendData
      data.forEach(stu => {
        let name = stu[type];
        name = rewriteName(name);
        if (!obj[name]) {
          obj[name] = 1;
          legendData.push(name);
        } else obj[name]++;
      });
      // 频数，seriesData
      for (let prop in obj) {
        let name = prop;
        const value = obj[prop];
        const newObj = { name, value };
        seriesData.push(newObj);
      }
      return { type, legendData, seriesData };
    }
  }

  const pieChart = new PieChart();
  pieChart.init();
})();
