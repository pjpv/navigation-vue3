import { ref } from 'vue'
import { defineStore } from 'pinia'
import { throttle, uuid } from '@/utils'

export interface Website {
  id: string
  name: string
  url: string
}

export interface WebsiteGroup {
  id: string
  name: string
  data: Website
}

export const useListStore = defineStore('list', () => {
  const list: any = ref([] as WebsiteGroup[])

  const saveToLocalStorage = throttle(() => {
    localStorage.setItem('list', JSON.stringify(list.value))
  }, 300)
  const getFromLocalStorage = () => {
    try {
      const data = localStorage.getItem('list')
      // console.log(data)
      if (data) {
        list.value = JSON.parse(data)
      }
    } catch (e) {
      console.error(e)
    }
  }
  const addGroup = (name: string, index: number = 99999) => {
    list.value.splice(index, 0, {
      id: uuid(),
      name,
      data: [],
    })
    saveToLocalStorage()
  }
  const addWebsite = (name: string, url: string, index: number = 99999) => {
    list.value[index].data.push({
      id: uuid(),
      name,
      url,
    })
    saveToLocalStorage()
  }
  const updateGroup = (name: string, index: number) => {
    list.value[index].name = name
    saveToLocalStorage()
  }
  const updateWebsite = (
    name: string,
    url: string,
    index: number,
    websiteIndex: number
  ) => {
    list.value[index].data[websiteIndex].name = name
    list.value[index].data[websiteIndex].url = url
    saveToLocalStorage()
  }
  const deleteGroup = (index: number) => {
    list.value.splice(index, 1)
    saveToLocalStorage()
  }
  const deleteWebsite = (index: number, websiteIndex: number) => {
    list.value[index].data.splice(websiteIndex, 1)
    saveToLocalStorage()
  }
  const updateGroupSeq = (index: number, newIndex: number) => {
    list.value.splice(newIndex, 0, list.value.splice(index, 1)[0])
    saveToLocalStorage()
  }
  const updateWebsiteSeq = (
    index: number,
    websiteIndex: number,
    newIndex: number
  ) => {
    list.value[index].data.splice(
      newIndex,
      0,
      list.value[index].data.splice(websiteIndex, 1)[0]
    )
    saveToLocalStorage()
  }
  const updateList = (newList: WebsiteGroup[]) => {
    list.value = newList
    saveToLocalStorage()
  }

  getFromLocalStorage()
  return {
    list,
    addGroup,
    addWebsite,
    updateGroup,
    updateWebsite,
    deleteGroup,
    deleteWebsite,
    updateGroupSeq,
    updateWebsiteSeq,
    saveToLocalStorage,
    getFromLocalStorage,
    updateList,
  }
})

export const useEditStatusStore = defineStore('edit-status', () => {
  const editStatus: any = ref(false)

  const saveToLocalStorage = throttle(() => {
    localStorage.setItem('edit-status', editStatus.value ? '1' : '0')
  }, 300)
  // 节流函数，只执行最后一次
  const getFromLocalStorage = () => {
    const data = localStorage.getItem('edit-status')
    if (data) {
      editStatus.value = data === '1'
    }
  }
  const toggleEditStatus = () => {
    editStatus.value = !editStatus.value
    saveToLocalStorage()
  }
  getFromLocalStorage()
  return { editStatus, toggleEditStatus }
})
