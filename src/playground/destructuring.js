//
// Object destructuring
//

// const person = {
//     name: 'Joe',
//     age: 34,
//     location: {
//         city: 'London',
//         temp: 25
//     }
// }

// const {name, age} = person // destructuring code syntax
// console.log(`${name} is ${age}`);

// // const {city, temp} = person.location; // normal variable call
// // if (temp && city) {
// //     console.log(`The temperature is ${temp} in ${city}.`);
// // }

// const {city, temp: temperature} = person.location; // using the renamed variable syntax
// if (temperature && city) {
//     console.log(`The temperature is ${temperature} in ${city}.`);
// }

// challenge - default name value 'Self-Published'
// const book = {
//     title: 'Ego is the Enemy',
//     author: 'Ryan Holiday',
//     publisher: {
//         name: 'Penguin' 
//     }
// };

// const {name: PublisherName = 'Self-Published'} = book.publisher;
// console.log(`The publisher name is ${PublisherName}`);

//
// Array destructuring
//


// const address = ['21 London Road', 'Ealing', 'London', 'W7 2DD'];

// // array destructuring NB. the variable names below 
// // reference values in array by position only as the variable do not exist in the array
// const [street, borough, city, postcode] = address; // array destructuring syntax
// console.log(`You are in ${borough}, ${city}.`);

//
// Challenge - Array destructuring
//

const item = ['Coffee (hot)', '£2.00', '£2.50',  '£2.75']

const [coffee, small, medium, large] = item;
console.log(`A medium ${coffee} cost ${medium} `);