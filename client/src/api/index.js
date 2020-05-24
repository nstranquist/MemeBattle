// API Functions
const baseURL = 'http://localhost:3000'
const giphyURL = 'https://api.giphy.com/v1/gifs'
const giphyKey = 'nTrx5uhPTyTJrSuSRYBt8etVXyRHLZCs'

//!! Sign Up
export async function signUp(user, pass){
    fetch(baseURL + '/signup', {
        method : 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: 'user=' + user.toString() + '&' + 'pass=' + pass.toString()
    })
        .then( res => res.json())
        .then(json => {
            console.log(json)
            return json
        })

}

//!! Login
export async function login(user, pass){
    fetch(baseURL + '/login', {
        method : 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: 'user=' + user.toString() + '&' + 'pass=' + pass.toString()
    })
        .then( res => res.json())
        .then(json => console.log(json))
}

//!! Get User Collection
export async function userCollection(user){
    fetch(baseURL + '/collection/' + user.toString())
        .then( res => res.json())
        .then( json => console.log(json))
}

//!! Get Prompt
export async function getPrompt(promptID){
    fetch(baseURL + '/prompt/' + promptID.toString())
    .then( res => res.json())
    .then( json => {
        console.log(json)
    })
}

//!! User Win
export async function userWin(user, gifID){
    // Post
    fetch(baseURL + '/win', {
        method : 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: 'user=' + user.toString() + '&' + 'gif=' + gifID.toString()
    })
    .then( res => res.json())
    .then(json => console.log(json))
}

// Get Random GIF
export async function randomGIF(){
    // Build a URL
    const url = giphyURL + '/random?api_key=' + giphyKey + '&rating=R'
    fetch(url).then( res => {
        res.json().then( data =>{
            // Parse into Use Case
            const parsed = {
                id : data.data.id,
                url : 'https://i.giphy.com/media/' + data.data.id + '/200w.gif',
                height : data.data.images.fixed_width.height,
                width : data.data.images.fixed_width.width
            }
            // console.log(parsed)
            return parsed
        });
    });
}

// GIF Search
export async function searchGIF(query){
    // Build a URL
    const url = giphyURL + '/search?api_key=' + giphyKey + '&q=' + query.toString() + '&limit=20&offset=0&rating=R&lang=en'
    fetch(url)
        .then( res => {
        res.json().then( data =>{
            // Map Array to Get Elements
            const parsed = data.data.map(gif => {
                return({
                    id : gif.id,
                    url : 'https://i.giphy.com/media/' + gif.id + '/200w.gif',
                    height : gif.images.fixed_width.height,
                    width : gif.images.fixed_width.width
                })
            })
            // console.log(parsed)
            return parsed
        });
    });
}

// Get Array of GIFs (gifIDs must be an array)
export async function arrayGIF(gifIDs){
    // Build a URL
    const url = giphyURL + '?api_key=' + giphyKey + '&ids=' + gifIDs.join(',')
    console.log(url)
    fetch(url).then( res => {
        res.json().then( data =>{
            // Map Array to Get Elements
            const parsed = data.data.map(gif => {
                return({
                    id : gif.id,
                    url : 'https://i.giphy.com/media/' + gif.id + '/200w.gif',
                    height : gif.images.fixed_width.height,
                    width : gif.images.fixed_width.width
                })
            })
            console.log(parsed)
            return parsed
        });
    });
}

/* Test Cases /
65IQE3xLM1ko2JjpUI
KDiCoKPtVoKRtqm6ek
*/