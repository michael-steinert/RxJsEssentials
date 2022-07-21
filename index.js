const { Observable } = require("rxjs");
const { pluck, map, filter } = require("rxjs/operators");

const { users } = require("./users");

/* Instantiate Class Observable to create an Observable */
const observable = new Observable((subscriber) => {
  /* Observable is emitting Data and processing it */
  subscriber.next(users);
  /* If an Completion occurs the following Emissions of the Observable are ignored */
  subscriber.complete();
  subscriber.next(users);
}).pipe(
  /* Operator `pluck` extracts Data from Objects and provides them to other Operators */
  pluck("data"),
  /* Operator `filter` filters Data and keeps them that match the Condition - it keeps the Data there are more than 10 Users */
  filter((users) => {
    return users.length >= 10;
  }),
  /* Operator `map` operates on each Element in the Observable and returns the Element on which that Condition match */
  map((users) => {
    return users.filter((user) => {
      return user.status === "active";
    });
  }),
  map((users) => {
    return (
      users.reduce((sum, user) => {
        return sum + user.age;
      }, 0) / users.length
    );
  }),
  map((average) => {
    if (average < 18) {
      throw new Error(`Average Age is too small (${average})`);
    } else {
      return average;
    }
  }),
  map((average) => {
    return `The Average Age is ${average}`;
  })
);

const observer = {
  /* Everything worked as expected during the Pipe */
  next: (x) => {
    return console.log("Observer got a next Value: " + x);
  },
  /* Error occurs during the Pipe - if an Error occurs the following Emissions of the Observable are ignored */
  error: (error) => {
    console.error("Observer got an Error: " + error);
  },
  /* Pipe has passed as expected - if an Error occurs the following Emissions of the Observable are ignored */
  complete: () => {
    console.log("Observer got a complete Notification");
  },
};

const observer2 = {
  /* Everything worked as expected during the Pipe */
  next: (x) => {
    console.log("Observer 2 got a next Value: " + x);
  },
  /* Error occurs during the Pipe - if an Completion occurs the following Emissions of the Observable are ignored */
  error: (error) => {
    console.error("Observer 2 got an Error: " + error);
  },
  /* Pipe has passed as expected - if an Completion occurs the following Emissions of the Observable are ignored */
  complete: () => {
    console.log("Observer 2 got a complete Notification");
  },
};

/* Connecting Observable and Observer */
observable.subscribe(observer);

observable.subscribe(observer2);
