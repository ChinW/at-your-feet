import React, { Component, PropTypes } from 'react';
import { Layout, Menu, Breadcrumb, Table, DatePicker } from 'antd';
const { Header, Content, Footer } = Layout;
const { RangePicker } = DatePicker;
import '../assets/global.scss';
import Chart from 'chart.js';
import { TodayLinesOptions, TodayPieOptions } from '../chartOptions/todayCharts';
import { getTodayHistory, getRangeHistory } from '../utils/history'
import { groupByDay, sortByDomain, sortByUrl, computHour } from '../utils/utils'
import moment from 'moment'

moment.locale('zh-cn');

export default class HistoryPage extends Component {

  static propTypes = {

  };

  constructor(props, context) {
    super(props, context);
    this.updatePieChart = this.updatePieChart.bind(this)
    this.updateLineChart = this.updateLineChart.bind(this)
    this.onDateChange = this.onDateChange.bind(this)
    this.fetchHistory = this.fetchHistory.bind(this)
    this.state = {
        history: [],
        urlList: [],
        startDate: moment().subtract(10, 'days')._d.getTime(),
        endDate: new Date().getTime()
    }
  }

  componentDidMount() {
      this._linesCTX = document.getElementById("lines");
      this._lineChart = new Chart(this._linesCTX, TodayLinesOptions);
      this._pieCTX = document.getElementById("pie");
      this._pieChart = new Chart(this._pieCTX, TodayPieOptions);
      const {startDate, endDate} = this.state
      this.fetchHistory(startDate, endDate)
  }

  fetchHistory(startDate, endDate) {
      if(startDate && endDate) {
        getRangeHistory(startDate, endDate).then(history => {
            const urlList = sortByUrl(history)
            this.updatePieChart(history)
            this.updateLineChart(history)
            this.setState({
                history,
                urlList
            })
        })
      } else {
        getTodayHistory().then(history => {
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
  }

  onDateChange(date, dateString) {
    const startDate = new Date(dateString[0])
    const endDate = new Date(dateString[1])
    this.fetchHistory(startDate.getTime(), endDate.getTime())
  }

  updatePieChart(history) {
        const {DomainLabels, domainData} = sortByDomain(history)
        this._pieChart.data.labels = DomainLabels
        this._pieChart.data.datasets[0].data = domainData
        this._pieChart.update()
  }

  updateLineChart(history) {
        const {dayLabels, dayData} = groupByDay(history)
        this._lineChart.data.labels = dayLabels
        this._lineChart.data.datasets[0].data = dayData
        this._lineChart.update()
  }

  render() {
      const {history, startDate, endDate} = this.state
      return (
         <section className="today-page">
              <RangePicker 
                defaultValue={[moment(startDate), moment(endDate)]}
                onChange={this.onDateChange}
                style={{float: "right"}}
               />
             <div className="today">
                 <h2>>>历史足迹</h2>
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
             <HistoryRank
                data={this.state.urlList}
             />
         </section>
      );
  }
}

class HistoryRank extends Component {
    static defaultProps = {
        data: []
    }

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="today-rank">
                <h2>>>历史排行</h2>
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