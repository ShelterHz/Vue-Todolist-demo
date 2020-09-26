import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 所有的任务列表
    list: [],
    // 文本框的内容
    inputValue: '',
    // 下一个Id
    nextId: 5,
    viewKey: 'all'
  },
  mutations: {
    // 将 actions 异步获取的列表接收，并更改 state
    initList(state, list) {
      state.list = list
    },
    // 为 store 中的 inputValue 赋值
    setInputValue(state, val) {
      state.inputValue = val
    },
    // 添加列表项
    addItem(state) {
      // 设置一个 类似于 list 中的数据结构对象
      const obj = {
        id: state.nextId,
        info: state.inputValue.trim(),
        done: false
      }
      // 更改 state 中的list
      state.list.push(obj)
      // 防止 id 冲突
      state.nextId++
      state.inputValue = ''
    },
    // 根据Id删除对应的任务事项
    removeItem(state, id) {
      // 根据Id查找对应项的索引
      const i = state.list.findIndex(x => x.id === id)
      // 根据索引，删除对应的元素
      if (i !== -1) {
        state.list.splice(i, 1)
      }
    },
    // 修改列表项的选中状态
    changeStatus(state, param) {
      const i = state.list.findIndex(x => x.id === param.id)
      if (i !== -1) {
        state.list[i].done = param.status
      }
    },
    // 清除已完成的任务
    cleanDone(state) {
      state.list = state.list.filter(x => x.done === false)
    },
    // 修改视图的关键字
    changeViewKey(state, key) {
      state.viewKey = key
    }
  },
  actions: {
    getList(context) {
      // 异步获取数据，解构赋值得到data
      axios.get('/list.json').then(({ data }) => {
        // console.log(data)
        // 想在 ations 中更改 state 的数据，则要借助 matutions
        context.commit('initList', data)
      })
    }
  },
  getters: {
    // 统计未完成的任务的条数
    unDoneLength(state) {
      return state.list.filter(x => x.done === false).length
    },
    // 按需展示列表
    infolist(state) {
      // 点击全部/已做/未做按钮之后 viewKey 发生更改
      // 如果是全部按钮被点击，就展示全部数据，否则展示其他被处理的数据
      if (state.viewKey === 'all') {
        return state.list
      }
      if (state.viewKey === 'undone') {
        return state.list.filter(x => !x.done)
      }
      if (state.viewKey === 'done') {
        return state.list.filter(x => x.done)
      }
      return state.list
    }
  }
})
