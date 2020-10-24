
const WEEKDAY_ZH = ['日', '一', '二', '三', '四', '五', '六']
// 自定义日历组件
Component({
    // 接收的属性
    properties: {
        defaultMonth: {
            type: String,
            value: ''
        },
        dayDot: {
            type: Array,
            value: [
                {time: '2020-10-1', bgColor: '#00416d'},
                {time: '2020-10-10', bgColor: '#1a1a2e'},
                {time: '2020-10-21', bgColor: '#797a7e'},
            ]
        }
    },
    // 组件私有属性
    data: {
        // 周期
        weekDay: Array,
        // 动态高度
        itemHeight: Number,
        days: Array,
        // 当前展示月份的时间
        currentTime: Number,
        // 显示高亮
        lightTime: 0
    },
    // 生命周期函数
    lifetimes: {
        // 在组件实例进入页面节点树时执行
        attached: function () {
            this.getScrollWidth()
            this.setData({
                weekDay: WEEKDAY_ZH
            })
            this.initCalendar()
            this.refreshCalendar()
        },
        moved: function () {
            console.log(2)
        },
        detached: function () {
            console.log(3)
        },
    },
    methods: {
        // 设置初始化数据
        initCalendar() {
            let time 
            if(this.data.defaultMonth) {
                time = this.data.defaultMonth
            }else {
                time = this.getYMD(new Date())
            }
            this.setData({
                currentTime: this.getYMD(new Date(time)),
            })
        },
        // 获取屏幕宽度 动态设置高度
        getScrollWidth() {
            const { windowWidth } = wx.getSystemInfoSync();
            this.setData({
                itemHeight: windowWidth / 7
            })
        },
        refreshCalendar() {
            const time = this.data.currentTime
            const dayCount = this.getMonthDayCount(time)
            const year = new Date(time).getFullYear()
            const month = new Date(time).getMonth() + 1
            const days_temp = []
            for (let i = 0; i < dayCount; i++) {
                let day_item = {
                    title: i + 1,
                    key: new Date(`${year}-${month}-${i + 1}`).getDay(),
                    time: new Date(`${year}-${month}-${i + 1}`).getTime(),
                    color: new Date(`${year}-${month}-${i + 1}`).getTime() <= new Date().getTime() ? '#323233' : '#99a8b2'
                }
                days_temp.push(day_item)
            }
            
            if(this.data.dayDot.length) {
                this.data.dayDot.forEach(element => {
                    const dot_time = new Date(element.time).getTime()
                    const index = days_temp.findIndex(item => item.time == dot_time)
                    if(index !== -1) {
                        days_temp[index].showDot = true 
                        days_temp[index].dotColor = element.bgColor
                    }
                })
            }
            this.setData({
                days: days_temp,
            })
        },
        // 切换月份
        preMonth() {
            const time = this.data.currentTime
            const date = new Date(time)
            date.setMonth(date.getMonth() - 1)
            this.setData({
                currentTime: this.getYMD(date)
            })
            this.refreshCalendar()
        },
        nextMonth() {
            const time = this.data.currentTime
            const date = new Date(time)
            date.setMonth(date.getMonth() + 1)
            this.setData({
                currentTime: this.getYMD(date)
            })
            this.refreshCalendar()
        },
        getMonthDayCount(time) {
            const date = new Date(time)
            const month = date.getMonth()
            const frist_day = date.getTime()
            date.setMonth(month + 1)
            const last_day = date.getTime()
            return ((last_day - frist_day) / 86400000)
        },
        getYMD(date) {
            let year = date.getFullYear()
            let month = date.getMonth() + 1
            month = month < 10 ? '0'+month : month
            return `${year}-${month}`
        },
        // 点击事件
        onDayClick(e) {
            const {currentTarget: {dataset: {time}}} = e
            if(new Date(time) > new Date()) {
                return false
            }
            this.setData({
                lightTime: time
            })
        }
    },
})