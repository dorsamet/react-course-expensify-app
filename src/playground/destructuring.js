//Object

// const person = {
//     name: 'Dor',
//     age: 29,
//     location: {
//         city: 'Tel Aviv',
//         temp: 34
//     }
// };

// let { name = 'Anonymous', age, location } = person;

// let {city, temp: temperature } = location;

// console.log(name);
// console.log(temperature);

// const book = {
//     title: 'Ego is the Enemy',
//     author: 'Ryan Holiday',
//     publisher: {
//         name: 'Penguin'
//     }
// };

// let { name: publisherName = 'Self-Published' } = book.publisher;

// console.log(publisherName);

const address = [ '1299 S Juniper St', 'Tel Aviv', 'Israel', '02446' ];

const [street, city, state, zip] = address;
