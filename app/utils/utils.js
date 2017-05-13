/**
 * Created by Chi on 13/05/2017.
 */

export const formatTime = function(unixTime) {
    var date = new Date(unixTime);
    return [date.getFullYear(), date.getMonth()+1, date.getDate()].join("/");
}

export const groupByDay = (array) => {
    var newArray = {};
    array.map((item) => {
        const key = formatTime(item["lastVisitTime"]);
        if (key in newArray) {
            newArray[key].push(item);
        } else {
            newArray[key] = [item];
        }
    });
    const result = {};
    for (let key in newArray){
        result[new Date(key).getTime()] = newArray[key];
    }
    return result;
}

export const getHour = (timestamp) => {
    // let date = new Date(unixTime * 1000);
}


export const sortByDomain = (mList) => {
    var head = /([a-z0-9]+:\/\/)?/;
    var domain = /[a-z0-9\.]*(:0-9*)?/;
    var urls = Array.from(new Set(mList.map(function (x) {
        return x.url;
    }).map(function (x) {
        return x.replace(head, "");
    }).map(function (x) {
        return domain.exec(x)[0];
    })));

    var urlAndCount = [];
    for (var i in urls) {
        var url = urls[i];
        urlAndCount.push({"url": url, "objs": []});
    }

    // console.log(urlAndCount)

    for (var i in mList) {
        var mObj = mList[i];
        for (var j in urlAndCount) {
            if (urlAndCount[j]["url"] == domain.exec(mObj.url.replace(head, ""))[0]) {
                urlAndCount[j]["objs"].push(mObj);
                break;
            }
        }
    }

    urlAndCount.sort(function (a, b) {
        return b["objs"].length - a["objs"].length;
    });

    // var orderList = [];
    // for (var i in urlAndCount) {
    //     tmp = tmp.concat(urlAndCount[i]["objs"]);
    // }

    const targetDomains = urlAndCount.slice(0, 10);
    const DomainLabels = targetDomains.map(domain => domain.url)
    const domainData = targetDomains.map(domain => domain.objs.length)
    return {targetDomains, DomainLabels, domainData};
}

export const sortByUrl = (mList) => {
    var urlAndObjs = [];
    for (var i in mList) {
        var mObj = mList[i];
        if (urlAndObjs[mObj.url] == null) {
            urlAndObjs[mObj.url] = [mObj];
        } else {
            urlAndObjs[mObj.url].push(mObj);
        }
    }
    urlAndObjs.sort(function (a, b) {
        return b.length - a.length;
    });

    var tmp=[];
    for(var i in urlAndObjs){
        tmp=tmp.concat(urlAndObjs[i]);
    }
    return tmp;
}