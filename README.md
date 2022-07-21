# RxJs Essentials

- RxJs is a Library for reactive Programming using Observables
- In RxJs are Observables and Operators combined to create a Pipeline of Transformations that the Stream of Data flows through

## Observable

- An Observable represents a Stream of Data or Events that will arrive over Time
- It can emit multiple Sorts of Data
- RxJs is processing the Data of an Observable and provides a different Output
- Subjects are Observables that allow to push Data into them

## Pipe

- A Pipe is a Pipeline of Operators that process Data from Observables
- A Pipeline Operator is a pure Function that transform the Stream and can connect multiple Observables and also is composable

## Observer

- An Observer is responsible to check the End Result (processed Data or Error) of the Processing after the Pipeline is done
- The Data go from the Observable through the Pipe (all Operators) to the Observer
