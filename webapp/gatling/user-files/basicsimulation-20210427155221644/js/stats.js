var stats = {
    type: "GROUP",
name: "Global Information",
path: "",
pathFormatted: "group_missing-name-b06d1",
stats: {
    "name": "Global Information",
    "numberOfRequests": {
        "total": "1000",
        "ok": "1000",
        "ko": "0"
    },
    "minResponseTime": {
        "total": "682",
        "ok": "682",
        "ko": "-"
    },
    "maxResponseTime": {
        "total": "2707",
        "ok": "2707",
        "ko": "-"
    },
    "meanResponseTime": {
        "total": "1844",
        "ok": "1844",
        "ko": "-"
    },
    "standardDeviation": {
        "total": "541",
        "ok": "541",
        "ko": "-"
    },
    "percentiles1": {
        "total": "1867",
        "ok": "1867",
        "ko": "-"
    },
    "percentiles2": {
        "total": "2367",
        "ok": "2367",
        "ko": "-"
    },
    "percentiles3": {
        "total": "2633",
        "ok": "2633",
        "ko": "-"
    },
    "percentiles4": {
        "total": "2660",
        "ok": "2660",
        "ko": "-"
    },
    "group1": {
    "name": "t < 800 ms",
    "count": 9,
    "percentage": 1
},
    "group2": {
    "name": "800 ms < t < 1200 ms",
    "count": 162,
    "percentage": 16
},
    "group3": {
    "name": "t > 1200 ms",
    "count": 829,
    "percentage": 83
},
    "group4": {
    "name": "failed",
    "count": 0,
    "percentage": 0
},
    "meanNumberOfRequestsPerSecond": {
        "total": "250",
        "ok": "250",
        "ko": "-"
    }
},
contents: {
"req_request-1-46da4": {
        type: "REQUEST",
        name: "request_1",
path: "request_1",
pathFormatted: "req_request-1-46da4",
stats: {
    "name": "request_1",
    "numberOfRequests": {
        "total": "1000",
        "ok": "1000",
        "ko": "0"
    },
    "minResponseTime": {
        "total": "682",
        "ok": "682",
        "ko": "-"
    },
    "maxResponseTime": {
        "total": "2707",
        "ok": "2707",
        "ko": "-"
    },
    "meanResponseTime": {
        "total": "1844",
        "ok": "1844",
        "ko": "-"
    },
    "standardDeviation": {
        "total": "541",
        "ok": "541",
        "ko": "-"
    },
    "percentiles1": {
        "total": "1867",
        "ok": "1867",
        "ko": "-"
    },
    "percentiles2": {
        "total": "2367",
        "ok": "2367",
        "ko": "-"
    },
    "percentiles3": {
        "total": "2633",
        "ok": "2633",
        "ko": "-"
    },
    "percentiles4": {
        "total": "2660",
        "ok": "2660",
        "ko": "-"
    },
    "group1": {
    "name": "t < 800 ms",
    "count": 9,
    "percentage": 1
},
    "group2": {
    "name": "800 ms < t < 1200 ms",
    "count": 162,
    "percentage": 16
},
    "group3": {
    "name": "t > 1200 ms",
    "count": 829,
    "percentage": 83
},
    "group4": {
    "name": "failed",
    "count": 0,
    "percentage": 0
},
    "meanNumberOfRequestsPerSecond": {
        "total": "250",
        "ok": "250",
        "ko": "-"
    }
}
    }
}

}

function fillStats(stat){
    $("#numberOfRequests").append(stat.numberOfRequests.total);
    $("#numberOfRequestsOK").append(stat.numberOfRequests.ok);
    $("#numberOfRequestsKO").append(stat.numberOfRequests.ko);

    $("#minResponseTime").append(stat.minResponseTime.total);
    $("#minResponseTimeOK").append(stat.minResponseTime.ok);
    $("#minResponseTimeKO").append(stat.minResponseTime.ko);

    $("#maxResponseTime").append(stat.maxResponseTime.total);
    $("#maxResponseTimeOK").append(stat.maxResponseTime.ok);
    $("#maxResponseTimeKO").append(stat.maxResponseTime.ko);

    $("#meanResponseTime").append(stat.meanResponseTime.total);
    $("#meanResponseTimeOK").append(stat.meanResponseTime.ok);
    $("#meanResponseTimeKO").append(stat.meanResponseTime.ko);

    $("#standardDeviation").append(stat.standardDeviation.total);
    $("#standardDeviationOK").append(stat.standardDeviation.ok);
    $("#standardDeviationKO").append(stat.standardDeviation.ko);

    $("#percentiles1").append(stat.percentiles1.total);
    $("#percentiles1OK").append(stat.percentiles1.ok);
    $("#percentiles1KO").append(stat.percentiles1.ko);

    $("#percentiles2").append(stat.percentiles2.total);
    $("#percentiles2OK").append(stat.percentiles2.ok);
    $("#percentiles2KO").append(stat.percentiles2.ko);

    $("#percentiles3").append(stat.percentiles3.total);
    $("#percentiles3OK").append(stat.percentiles3.ok);
    $("#percentiles3KO").append(stat.percentiles3.ko);

    $("#percentiles4").append(stat.percentiles4.total);
    $("#percentiles4OK").append(stat.percentiles4.ok);
    $("#percentiles4KO").append(stat.percentiles4.ko);

    $("#meanNumberOfRequestsPerSecond").append(stat.meanNumberOfRequestsPerSecond.total);
    $("#meanNumberOfRequestsPerSecondOK").append(stat.meanNumberOfRequestsPerSecond.ok);
    $("#meanNumberOfRequestsPerSecondKO").append(stat.meanNumberOfRequestsPerSecond.ko);
}
