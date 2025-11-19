/**
 * Formats a date string from yyyy-mm-dd to dd.mm.yyyy
 * @param dateString - Date string in format yyyy-mm-dd
 * @returns Formatted date string in format dd.mm.yyyy or original string if invalid
 */
export const formatDate = (dateString: string): string => {
  if (!dateString) return '—'
  
  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) {
    return dateString
  }
  
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  
  return `${day}.${month}.${year}`
}

