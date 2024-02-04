export class LocalStorageManager {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static saveData(key: string, value: any) {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error('Error saving data to localStorage:', error)
    }
  }

  // Метод для получения данных из localStorage
  static getData(key: string) {
    try {
      const data = localStorage.getItem(key)
      return data ? JSON.parse(data) : null
    } catch (error) {
      console.error('Error getting data from localStorage:', error)
      return null
    }
  }

  // Метод для удаления данных из localStorage
  static removeData(key: string) {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error('Error removing data from localStorage:', error)
    }
  }

  // Метод для очистки всех данных в localStorage
  static clearAllData() {
    try {
      localStorage.clear()
    } catch (error) {
      console.error('Error clearing all data from localStorage:', error)
    }
  }
}
