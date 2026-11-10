import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
    state: () => ({
        activeTab: 0,
        title: '这是一个标题',
    }),

    actions: {
        setActiveTab(tabIndex) {
            this.activeTab = tabIndex
        },

        setTitle(newTitle) {
            this.title = newTitle
        },
    },

    getters: {
        // 例如：获取标题长度
        // titleLength: (state) => state.title.length
    }
})


export default useAppStore