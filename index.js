// // // sk - MrNirHMs8FxTJLpLC1fQT3BlbkFJ6KUYwnc4PmFw2ouupUSb
// const token = "EAARy6Lv9bMQBOxf2tya4ZBf5pqElQInA2pzmoLz0fUArJfCQZBn8s5ngNAk1UUwhcuTZATqImp09qt6iXQVcD9Iv8HpGE2ktBdVdb7ZAPZCYtdDiViqZAYviv2CTZBP6UMJaaQ3tAgPPtankxGrRbZCRkXnwnEcMAxYQC75u2RC0GgUZBZCOJdgH9AvO39UvRPZB15aPSJXD5LOcGOXXooHIkPg0Ybq9gMTndmBmolHkHP7"

// "https://graph.facebook.com/v17.0/me?fields=id%2Cname%2Cage_range%2Cgender%2Cabout&access_token=EAARy6Lv9bMQBO3U9eD0lKzlZCZArD31FHt1BV2VbLuP7XpdlsR9RX699hSbkMdqOgh0dlRVj7SU7DzQQYr9070CKHXlvrv5iRJKCCPnpZAlHBNXrD7LPfp6ThkNuLUKKYP799DbAqU2ZBllpdYpVX83ULDd901SazSJjFMyXuhPE0xenkIYZADEYAVzacD1r14h2rnBQxmPX5ZAvFZCZADrIk7ZBuGWlM8VhXlEpUuk0C"

// const api_key = "1252243818769604|zerwFObveoeGzpQA1TfWxeBTnq0"
// const metric = "number_of_fans"
// const id = 101930428115400;
// // https://graph.facebook.com/<API_VERSION>/me/accounts?access_token=<ACCESS_TOKEN>
// let test = () => {
//     fetch(`https://graph.facebook.com/v17.0/me?fields=access_token,link,location&access_token=${token}`)
//         .then(response => {
//             return response.json();
//         })
//         .then(data => {
//             console.log(data)
//         })
// }
// test()
let tabs = document.querySelectorAll(".tabs li");
let tabsArray = Array.from(tabs);
let divs = document.querySelectorAll(".content > div");
let divsArray = Array.from(divs);

// console.log(tabsArray);

tabsArray.forEach((ele) => {
    ele.addEventListener("click", function (e) {
        // console.log(ele);
        tabsArray.forEach((ele) => {
            ele.classList.remove("active");
        });
        e.currentTarget.classList.add("active");
        divsArray.forEach((div) => {
            div.style.display = "none";
        });
        // console.log(e.currentTarget.dataset.cont);
        document.querySelector(e.currentTarget.dataset.cont).style.display = "block";
    });
});

////////////////////////// the start of the logic //////////////////////////////////////
const api_key = "AIzaSyAdHUHi4xwh9WQXOW5PyeoRtOAIkaqh-AY";
const avg = document.querySelector(".avg");
const CHANNEL_ID = 'UCu-j_Dytl2Fc1m1dr6pbrEA';
const PLAYLIST_ID = 'UU' + CHANNEL_ID.slice(2);

function handleChannelSelect() {
    const selectElement = document.getElementById("channelSelect");
    const selectedChannelID = selectElement.value;
    PLAYLIST = selectedChannelID; // Update youtube variable with the selected channel ID
}





function parseYouTubeDurationToMilliseconds(duration) {
    const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
    const matches = duration.match(regex);

    const hours = parseInt(matches[1] || 0);
    const minutes = parseInt(matches[2] || 0);
    const seconds = parseInt(matches[3] || 0);

    const totalMilliseconds = hours * 3600000 + minutes * 60000 + seconds * 1000;
    return totalMilliseconds;
}
        // https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId={PLAYLIST_ID}&maxResults=50&key={API_KEY}'
        // https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${youtube}&key=${api_key}&maxResults=15&order=date

var PLAYLIST = ""
let ids = async () => {
    const month1 = document.querySelector(".months1").value;
    const today = new Date();
    today.setMonth(today.getMonth() - month1);
    const dateString = today.toISOString();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toISOString();
    let allVideoIds = [];
    let pageCounter = 0; // Counter for the number of pages fetched

    const fetchVideos = async (pageToken) => {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${PLAYLIST}&maxResults=50&key=${api_key}&pageToken=${pageToken}`);
        const data = await response.json();
        return data;
    };

    const fetchVideosRecursively = async (pageToken) => {
        const data = await fetchVideos(pageToken);

        data.items.forEach(item => {
            if (item.snippet.publishedAt > dateString && item.snippet.publishedAt < yesterdayString) {
                allVideoIds.push(item.snippet.resourceId.videoId);
                console.log(item.snippet.title + item.snippet.resourceId.videoId);
            }
        });

        pageCounter++; // Increment the page counter

        // Check if there are more pages to fetch and if we have fetched three pages
        if (data.nextPageToken && pageCounter < 4) { // Fetch only 3 pages
            console.log(`Fetching page ${pageCounter + 1}`);
            // Fetch the next page of results recursively
            await fetchVideosRecursively(data.nextPageToken);
        } else {
            console.log("Finished fetching 4 pages.");
        }
    };
    try {
        // Start fetching videos from the first page
        console.log("Fetching page 1");
        await fetchVideosRecursively('');
        const filteredVideoIds = await video(allVideoIds);
        return filteredVideoIds;
    } catch (error) {
        console.error(error);
        throw new Error("Error fetching and processing data");
    }
};


// const best = document.querySelector(".test")
// best.addEventListener("click", () => {
//     console.log(arr)
// })

// // ids(handleChannelSelect())
const box1 = document.querySelector(".box1")
var short = 90000;
var long = 3600000;
const fetchVideoData = (video_id) => {
    return fetch(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails&statistics&id=${video_id}&key=${api_key}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (box1.checked) {
                short = 1;
                long = 90000
            } else {
                short = 90000;
                long = 3600000;
            }
            const videoDuration = data.items[0].contentDetails.duration;
            const durationInMilliseconds = parseYouTubeDurationToMilliseconds(videoDuration);
            if (durationInMilliseconds > short && durationInMilliseconds < long) {
                return data.items[0].id;
            }
            return null;
        })
        .catch(error => {
            console.error(error);
            return null;
        });
};

const video = (arr) => {
    return Promise.all(arr.map(fetchVideoData))
        .then(videoIds => {
            const filteredVideoIds = videoIds.filter(videoId => videoId !== null);
            // console.log(filteredVideoIds);
            return filteredVideoIds;
        });
};

// // Assuming parseYouTubeDurationToMilliseconds function is defined and works correctly.

// // Assuming handleChannelSelect() returns an array of video IDs.

const loader1=document.querySelector(".lds-dual-ring")
const content = document.querySelector(".one")
avg.addEventListener("click", () => {
    const existingAverage = document.querySelector("h1");
    loader1.style="display:inline"
    ids(handleChannelSelect())
        .then(data => video(data))
        .then(filteredVideoIds => {
            const fetchVideoData = async (video_id) => {
                try {
                    const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${video_id}&key=${api_key}`);
                    const data = await response.json();
                    const views_f = parseInt(data.items[0].statistics.viewCount);
                    return views_f;
                } catch (error) {
                    console.error(error);
                    return 0;
                }
            };
            const calculateAverageViews = async (videoIds) => {
                let totalViews = 0;

                if (existingAverage) {
                    existingAverage.remove();
                }
                const average = document.createElement("h1")
                for (let i = 0; i < videoIds.length; i++) {
                    const video_id = videoIds[i];
                    const views = await fetchVideoData(video_id);
                    totalViews += views;
                }
                const averageViews = Math.round(totalViews / videoIds.length);
                content.appendChild(average);
                // average.innerHTML = Math.round(averageViews);
                average.innerHTML = averageViews.toLocaleString('en-US');
                loader1.style="display:none"
                if(isNaN(averageViews)){
                    average.innerHTML="No content published in this time frame.Try changing time frame."
                }
            };

            calculateAverageViews(filteredVideoIds);
            console.log(filteredVideoIds)
            // The filteredVideoIds will contain the result from the video function.
            // You can now use the filteredVideoIds array here or perform further actions.
        })
        .catch(error => {
            console.error(error);
        });

})

////////////////////////// the url logic ///////////////////////////


var channelId = ""
var input = document.querySelector(".url")
var get_id = document.querySelector(".get_id")
var test1 = document.querySelector(".test1")
var PLAYLIST_ID2;
// get_id.addEventListener("click", () => {
//     let test = () => {
//         fetch(`https://www.googleapis.com/youtube/v3/search?q=${input.value}&key=${api_key}&part=snippet&type=channel&maxResults=1`)
//             .then(response => {
//                 return response.json();
//             })
//             .then(data => {
//                 console.log(data)
//                 channelId = data.items[0].id.channelId
//                 PLAYLIST_ID2 = 'UU' + channelId.slice(2);
//             })
//     }
//     test()

//     // const test1 = document.querySelector(".test1")
//     test1.addEventListener("click", () => {
//         // console.log(PLAYLIST_ID)
//         ids()
//     })

// })

// let test = async () => {
//     // Return the fetch Promise
//     const response = await fetch(`https://www.googleapis.com/youtube/v3/search?q=${input.value}&key=${api_key}&part=snippet&type=channel&maxResults=1`);
//     const data = await response.json();
//     console.log(data);
//     console.log('test')
//     var channelId2 = data.items[0].id.channelId;
//     PLAYLIST_ID2 = 'UU' + channelId2.slice(2);
// };
let test = () => {
    // Return the fetch Promise
    return fetch(`https://www.googleapis.com/youtube/v3/search?q=${input.value}&key=${api_key}&part=snippet&type=channel&maxResults=1`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            // console.log(data);
            channelId = data.items[0].id.channelId;
            PLAYLIST_ID2 = 'UU' + channelId.slice(2);
        });
};


let ids2 = async () => {
    try {
        const month1 = document.querySelector(".months1").value;
        const today = new Date();
        today.setMonth(today.getMonth() - month1);
        const dateString = today.toISOString();
        
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayString = yesterday.toISOString();
        
        let allVideoIds = [];

        let pageToken = ''; // Initialize pageToken variable

        for (let page = 1; page <= 4; page++) { // Fetch 4 pages
            const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${PLAYLIST_ID2}&maxResults=50&pageToken=${pageToken}&key=${api_key}`);
            const data = await response.json();

            console.log(`Fetching page ${page}`);
            const videoIds = data.items
                .filter(item => item.snippet.publishedAt > dateString && item.snippet.publishedAt < yesterdayString)
                .map(item => {
                    console.log(item.snippet.title + item.snippet.resourceId.videoId);
                    return item.snippet.resourceId.videoId;
                });

            allVideoIds = allVideoIds.concat(videoIds);

            if (!data.nextPageToken) {
                break; // No more pages to fetch
            }

            pageToken = data.nextPageToken; // Update the pageToken for the next iteration
        }

        const filteredVideoIds = await video2(allVideoIds);
        console.log(filteredVideoIds);
        return filteredVideoIds;
    } catch (error) {
        console.error(error);
        throw new Error("Error fetching and processing data");
    }
};



const box2 = document.querySelector(".box2")
var short = 90000;
var long = 3600000;
const fetchVideoData2 = (video_id1) => {
    return fetch(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails&statistics&id=${video_id1}&key=${api_key}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log("fetchvideodata2")
            if (box2.checked) {
                short = 1;
                long = 60000
            } else {
                short = 60000;
                long = 3600000;
            }
            const videoDuration = data.items[0].contentDetails.duration;
            const durationInMilliseconds = parseYouTubeDurationToMilliseconds(videoDuration);
            if (durationInMilliseconds > short && durationInMilliseconds < long) {
                // console.log(data.items[0].id)
                return data.items[0].id;
            }
            return null;
        })
        .catch(error => {
            console.error(error);
            return null;
        });
};


const video2 = (arr) => {
    return Promise.all(arr.map(fetchVideoData2))
        .then(videoIds => {
            const filteredVideoIds = videoIds.filter(videoId1 => videoId1 !== null);
            // console.log(filteredVideoIds);
            return filteredVideoIds;
        });
};



const avg2 = document.querySelector(".avg_url")
const content2 = document.querySelector(".two")
const loader2=document.querySelector(".lds-dual-ring2")

avg2.addEventListener("click", async () => {
    loader2.style="display:inline"
    try {
        // Wait for the test() function to complete
        await test();

        // Now, proceed with the ids() function
        const data = await ids2();
        const filteredVideoIds = await video2(data);

        const fetchVideoData2 = async (video_id1) => {
            try {
                const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${video_id1}&key=${api_key}`);
                const data = await response.json();
                var views_f = parseInt(data.items[0].statistics.viewCount);
                return views_f;
            } catch (error) {
                console.error(error);
                return 0;
            }
        };

        const calculateAverageViews = async (videoIds) => {
            let totalViews = 0;
            const existingAverage = document.querySelector("h1");
            if (existingAverage) {
                existingAverage.remove();
            }
            const average = document.createElement("h1");
            for (let i = 0; i < videoIds.length; i++) {
                const video_id2 = videoIds[i];
                const views = await fetchVideoData2(video_id2);
                totalViews += views;
            }
            // if (isNaN(views_f)) {
            //     console.log("there is no videos")
            // }
            const averageViews =Math.round(totalViews / videoIds.length);
            content2.appendChild(average);
            console.log(average)
            average.innerHTML = averageViews.toLocaleString('en-US');
            loader2.style="display:none"
            if(isNaN(averageViews)){
                average.innerHTML="No content published in this time frame.Try changing time frame."
            }
        };
        calculateAverageViews(filteredVideoIds);
        console.log(filteredVideoIds);
    } catch (error) {
        // console.error(error);
    }
});


///////////////////////third tab////////////////

var number_of_videos = document.querySelector(".videos");
var enter = document.querySelector(".enter");
var arr = [];


enter.addEventListener("click", () => {
    var inputs = [];

    for (var i = 0; i < parseInt(number_of_videos.value); i++) {
        const input = document.createElement("input");
        input.classList.add("input" + i);
        document.querySelector(".container1").appendChild(input);
        inputs.push(input); // Store the input elements in an array
    }
    var refresh = document.querySelector(".refresh");
    refresh.addEventListener("click", () => {
        // window.location.reload();
        for (var t = 0; t < parseInt(number_of_videos.value); t++) {
            document.querySelector(`.input${t}`).remove()
        }
        document.querySelector(".press").remove()
        document.querySelector("h2").remove()

    })
    console.log(inputs)
    var button = document.createElement("button");
    button.innerHTML = "calculate";
    document.querySelector(".container1").appendChild(button)
    button.classList.add("press");

    button.addEventListener("click", () => {
        var values = inputs.map((input) => input.value); // Retrieve the values of the input fields
        var sum = values.reduce((acc, curr) => acc + parseInt(curr), 0);
        console.log(values)
        // console.log(sum / number_of_videos.value)
        const theAVREGE = document.createElement("h2");
        document.querySelector(".container1").appendChild(theAVREGE)
        theAVREGE.innerText = "The average is " + Math.round((sum / number_of_videos.value))
    });
});
