import React, { Component, PropTypes } from 'react';
import { Layout, Menu, Breadcrumb, Table } from 'antd';
const { Header, Content, Footer } = Layout;
import '../assets/global.scss';
import Chart from 'chart.js';
import { TodayLinesOptions, TodayPieOptions } from '../chartOptions/todayCharts';
import { getTodayHistory } from '../utils/history'
import { groupByDay, sortByDomain, sortByUrl, computHour } from '../utils/utils'
import moment from 'moment'
import { getDatas, saveDatas } from '../utils/storage'

moment.locale('zh-cn');

export default class TodayPage extends Component {

  static propTypes = {

  };

  constructor(props, context) {
    super(props, context);
    this.updatePieChart = this.updatePieChart.bind(this)
    this.updateLineChart = this.updateLineChart.bind(this)
    this.state = {
        history: [],
        urlList: []
    }
  }

  componentDidMount() {
      this._linesCTX = document.getElementById("lines");
      this._lineChart = new Chart(this._linesCTX, TodayLinesOptions);
      this._pieCTX = document.getElementById("pie");
      this._pieChart = new Chart(this._pieCTX, TodayPieOptions);
      getTodayHistory().then(history => {
          // const todayTimes = groupByDay(history)
          // console.log('todayTimes', todayTimes)
          const urlList = sortByUrl(history)
        //   console.log(urlList)
          this.updatePieChart(history)
          this.updateLineChart(history)
          this.setState({
              history,
              urlList
          })
      })
  }

  updatePieChart(history) {
        const {DomainLabels, domainData} = sortByDomain(history)
        this._pieChart.data.labels = DomainLabels
        this._pieChart.data.datasets[0].data = domainData
        this._pieChart.update()
  }

  updateLineChart(history) {
        const {hourLabels, hourData} = computHour(history)
        this._lineChart.data.labels = hourLabels
        this._lineChart.data.datasets[0].data = hourData
        this._lineChart.update()
  }

  render() {
      const history = this.state.history
      return (
         <section className="today-page">
             <div className="today">
                 <h2>>>今日足迹</h2>
                 <div className="info-blocks">
                     <div className="pv info-block">
                         <h2>{history.length}</h2> <p>次足迹</p>
                     </div>
                     <div className="time info-block">
                         <h2>4小时32分钟12秒</h2><p>浏览时间</p>
                     </div>
                 </div>
                 <div className="charts">
                     <div className="left">
                         <canvas id="lines"></canvas>
                     </div>
                     <div className="right">
                         <canvas id="pie"></canvas>
                     </div>
                 </div>
             </div>
             <TodayRank
                data={this.state.urlList}
             />
         </section>
      );
  }
}

class TodayRank extends Component {
    static defaultProps = {
        data: []
    }

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="today-rank">
                <h2>>>今日排行</h2>
                <Table columns={columns} dataSource={this.props.data} />
            </div>
        )
    }
}

const columns = [{
    title: '站点',
    dataIndex: 'title',
    width: 400,
    render: (value, row, index) => {
        // console.log(value, row, index)
        return <a href={row.url} target="_blank">{value.length < 1 ? row.url : value }</a>
    },
    sorter: (a, b) => a.name.length - b.name.length,
}, {
    title: '浏览次数',
    dataIndex: 'visitCount',
    sorter: (a, b) => a.visitCount - b.visitCount,
}, {
    title: '输入地址栏次数',
    dataIndex: 'typedCount',
    sorter: (a, b) => a.typedCount - b.typedCount,
}, {
    title: '最后访问时间',
    dataIndex: 'lastVisitTime',
    render: (value) => {
        return moment(value).fromNow();
    }
}];