export async function getTodayHistory() {
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth() + 1
    const day = today.getDate()
    const todayBegins = new Date(`${year}-${month}-${day}`)
    console.log(todayBegins)
    let history = await getHistory(todayBegins.getTime())
    return history
}

export function getHistory(startTime = 0) {
    return new Promise(resolve => {
        chrome.history.search({text: '', maxResults: 0, startTime}, (history) => {
            // console.log('resolve', history)
            resolve(history)
        });
    });
}