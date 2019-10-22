// To run this test, import it into thhe app.js file.

const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve({
            name: 'Joe Blogg',
            age: 29
        });

        // reject('Somethiing went wrong');
    }, 1500);
    
});
// normally, the above promises will be provide to us 
// by the api libraary like firebase. so will not be writing much. 
// but we will use the callback more, as below

console.log('before');

// resolve a promise or reject
promise.then((data) => {
    console.log('1', data);

    // the return key is important in order the then() below it gets access to the data
    // the next then() only runs after the Promise above it has 'resolved'
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('This is my other promise');
    
        }, 1500);
        
    });
}).then((str) => {
    console.log('Does this run:', str);
}).catch((error) => {
    console.log('error: ', error);
});


console.log('after');