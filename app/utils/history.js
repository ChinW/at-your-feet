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

export async function getRangeHistory(start, end) {
    let history = await getHistory(start, end)
    return history
}

export function getHistory(startTime = 0, endTime = undefined) {
    return new Promise(resolve => {
        const searchOptions = {text: '', maxResults: 0, startTime}
        if (endTime) {
            searchOptions.endTime = endTime
        }
        chrome.history.search(searchOptions, (history) => {
            // console.log('resolve', history)
            resolve(history)
        });
    });
}