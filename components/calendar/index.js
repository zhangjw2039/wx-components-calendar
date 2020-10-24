
const WEEKDAY_ZH = ['日', '一', '二', '三', '四', '五', '六']
// 自定义日历组件
Component({
    // 接收的属性
    properties: {

    },
    // 组件私有属性
    data: {
        // 周期
        weekDay: Array,
        // 动态高度
        itemHeight: Number,
        days: Array,
    },
    // 生命周期函数
    lifetimes: {
        // 在组件实例进入页面节点树时执行
        attached: function () {
            this.getScrollWidth()
            this.setData({
                weekDay: WEEKDAY_ZH
            })
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
        // 获取屏幕宽度 动态设置高度
        getScrollWidth() {
            const { windowWidth } = wx.getSystemInfoSync();
            this.setData({
                itemHeight: windowWidth / 7
            })
        },
        refreshCalendar() {
            const now = new Date()
            const dayCount = this.getMonthDayCount(now)
            const year = now.getFullYear()
            const month = now.getMonth()
            console.log(dayCount)
            const days_temp = []
            // debugger
            for (let i = 0; i < dayCount; i++) {
                let day_item = {
                    title: i + 1,
                    key: new Date(`${year}/${month}/${i + 1}`).getDay(),
                    color: new Date(`${year}/${month}/${i + 1}`).getTime() <= new Date().getTime() ? '#323233' : '#99a8b2'
                }
                days_temp.push(day_item)
            }
            console.log(days_temp)
            this.setData({
                days: days_temp
            })

        },
        // 切换月份
        preMonth() {
            console.log('上一个')
        },
        nextMonth() {

        },
        getMonthDayCount(date) {
            const year = date.getFullYear()
            const month = date.getMonth()
            const frist_day = date.getTime()
            date.setMonth(month + 1)
            const last_day = date.getTime()
            return ((last_day - frist_day) / 86400000)
        },
        getYMD() {

        },
    },
})