import * as firebase from 'firebase';
// '* as' means take all exports from firebase into a variable called firebase

// Firebase configuration
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics(); // this is causing build issue - cms

// referencing database as a variable
const database = firebase.database();

export { firebase, database as default };


// *reference codes of various things tested in firebase database

// try out new subscriber event codes 'child_removed' similar to 'value'
// the below shows the auto-gen id and content of deleted list.
// database.ref('expenses').on('child_removed', (snapshot) => {
// console.log(snapshot.key, snapshot.val());
// });

// try out new subscriber event codes 'child_changed' similar to 'value'
// the below shows the auto-gen id and content of changed item.
// database.ref('expenses').on('child_changed', (snapshot) => {
//   console.log(snapshot.key, snapshot.val());
// });

// try out new subscriber event codes 'child_added' similar to 'value'
// the child_added works a little differently. It will fire for 
// items already in the database and fire again each time new item is added
// database.ref('expenses').on('child_added', (snapshot) => {
//   console.log(snapshot.key, snapshot.val());
// });


//reading data from the expenses db each time it updates
// const onValueChange = database.ref('expenses').on('value', (snapshot) => {
//     const expenses = [];

//   snapshot.forEach((childSnapshot) => {
//     expenses.push({
//       id: childSnapshot.key,
//       ...childSnapshot.val()
//     })
//   });
  
//   console.log(expenses); 
// });

//reading data from the expenses db *once
// every data has a reference either to the object content, id or auto gen key/id
// using 'key' with  childSnapshot allows access to that data ref
// depending where the childSnapshot is getting called from 
// e.g. the below childSnapshot ref's the autogen key. 
// then we 'spread' what comes back with childSnapshot.val()
// NB the variable 'childSnapshot' can be called anything
// database.ref('expenses')
// .once('value')
// .then((snapshot) => {
//   const expenses = []; // array to accept data from the object list

//  snapshot.forEach((childSnapshot) => {
//   expenses.push({
//     id: childSnapshot.key,
//     ...childSnapshot.val()
//   });
//  });

// console.log(expenses);
// });

// Setting up sample expenses list in firebase
// database.ref('expenses').push({
//   description: 'Books',
//   amount: 120,
//   createdAt: 20191010126,
//   note: 'Books expenses'

// });


// updating the Notes content. Copy the key id from firebase
// database.ref('notes/-LqvJaQy10yQH-ym_4KY').update({
//   body: 'Buy Food'
// });


//using object to store data list like and array
//Using push to auto genate keys/ids for the object for 'notes'
// database.ref('notes').push({
//   title: 'Course Topics',
//   body: 'React Native, Angular, Python'
// });




// Fetching data from firebase database

// setup data dump to output name, job title and company
//  const OnMemVavlueChange = database.ref().on('value', (snapshot) => {
//      const data = snapshot.val();
//      // console.log('data dump', data); // used to check the data dump
//      console.log(`${data.name} is a ${data.job.title} at ${data.job.company} `);
//  });

//  setTimeout(() => {
//     database.ref('job/company').set('Google');
//  }, 2000);

//using on() method
// updates each time data changes
// const onValueChange = database.ref().on('value', (snapshot) => {
//     console.log(snapshot.val()); 
// }, (e) => {
//     console.log('Error with data fetching', e);
// });

// // using code to update the data
// setTimeout(() => {
//     database.ref('age').set('32');
// }, 3500);

// setTimeout(() => {
//     database.ref().off(); // unsubscribing from the callback
// }, 7000);


// setTimeout(() => {
//     database.ref('age').set('23');
// }, 10500);



// using once() method
// the data that is returned is known as a snapshot
// for specific data provide the location in the ref()
// database.ref()
// .once('value')
// .then((snapshot) => {
//     const val = snapshot.val(); // val() is a function but takes no argument & return data requested
//     console.log(val);
// })
// .catch((e) => {
//     console.log('Error fetching data', e);
// });
    
// database connection and testing parsing data to the database
// ref() is a way to break the data into sections, like related tables;
// database.ref().set({
//     name: 'Joe Blogg',
//     age: 37,
//     isSingle: false,
//     stressLevel: 6,
//     job: {
//         title: 'Developer',
//         company: 'Google'
//     },
//     location: {
//         city: 'London',
//         country: 'UK'
//     }
// }).then(() => {
//     console.log('Data is saved!'); // just info to say all good
// }).catch((e) => {
//     console.log('This failed', e); // e for error
// });

// using update. updates take only objects
// for nested object use slash and place key in single quotes
// database.ref().update({
//     stressLevel: 9,
//     'job/company': 'Amazon',
//     'location/city': 'London'
// });

// below code enables deletion of isSingle from the database
// database.ref('isSingle').remove().then(() => {
//     console.log('The data isSingle has been removed!');
// }).catch((e) => {
//     console.log('There was a problem removing the data', e);
// });
