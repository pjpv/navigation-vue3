import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSearchStore = defineStore('search', () => {
  const STORE_KEY = 'searchEngine'
  const searchEngine = ref('baidu')

  const saveToLocalStorage = () => {
    localStorage.setItem(STORE_KEY, searchEngine.value)
  }
  const getFromLocalStorage = () => {
    try {
      const data = localStorage.getItem(STORE_KEY)
      if (data) {
        searchEngine.value = data
      } else {
        saveToLocalStorage()
      }
    } catch (e) {
      console.error(e)
    }
  }
  const updateSearchEngine = (engine: string) => {
    searchEngine.value = engine
    saveToLocalStorage()
  }

  getFromLocalStorage()
  return {
    searchEngine,
    saveToLocalStorage,
    getFromLocalStorage,
    updateSearchEngine,
  }
})
