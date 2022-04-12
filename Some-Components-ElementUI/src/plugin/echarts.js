
import Vue from 'vue'

let echarts = require('echarts/lib/echarts');
Vue.prototype.$echarts = echarts
// 引入折线图/柱状图等组件,折线图是line,饼图改为pie,柱形图改为bar
require('echarts/lib/chart/line')
require('echarts/lib/chart/bar')
require('echarts/lib/chart/pie')

// 引入提示框和title组件，图例
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')

