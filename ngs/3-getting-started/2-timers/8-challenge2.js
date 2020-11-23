// Print "Hello World"
// Every second
// And stop after 5 times

// After 5 times. Print "Done" and let Node exit.
let counter = 0;
const timer = setInterval(() => {
       
        console.log("Hello World " + counter);
        counter++;
        if (counter === 5) {
            console.log("Done");
            
            clearInterval(timer);
        }
    }, 1000);

