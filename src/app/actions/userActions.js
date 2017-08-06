export function setName(name) {
    return {
        type: "SET_NAME",
        payload: name
    }
}

export function setAge(age) {
    return {
        type: "SET_AGE",
        payload: age
    }
}

// if asynchronous operation! (such as a fetch)
// don't know if this works....
export function getData() {
    return {
        type: "GET_DATA",
        payload: new Promise((resolve, reject) => {
            fetch('https://intense-river-24910.herokuapp.com/api/product-reviews').then(response => {
                resolve(response)
            })
        })
    }
}

// ^ ^ ^ change something reducer name to "GET_DATA_FULFILLED" (that's something redux-promise-middleware appends)
