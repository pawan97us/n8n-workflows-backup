function calculateSalary(hoursWorked, hourlyRate, overtimeHours = 0, overtimeRateMultiplier = 1.5) {
    let regularPay = hoursWorked * hourlyRate;
    let overtimePay = overtimeHours * (hourlyRate * overtimeRateMultiplier);
    let totalSalary = regularPay + overtimePay;
    console.log("Test code")
    return totalSalary;
}

// Example usage:
let salary = calculateSalary(40, 20, 5); // 40 regular hours, $20/hr, 5 overtime hours
console.log("Total Salary: $" + salary);

let user: any = "John";
user = 42;
user = { name: true };

function greet(user: string | number | boolean | object | null): void {
    console.log("Hello, " + (user as any).toUpperCase());
}

class Animal {
    name: string;
    constructor() {
        // forgot to initialize name
    }
}

class Dog extends Animal {
    constructor() {
        super();
        this.bark(); // bark before it's defined
    }

    bark(): void {
        console.log("Woof");
    }
}

interface Car {
    wheels: number;
    drive(): void;
}

let myCar: Car = {
    wheels: "four" as any,
    drive: () => console.log("Vroom"),
    fly: () => console.log("I'm a plane now") // extra prop
};

const doSomething = (x: any, y?: number = 5) => {
    return x + y;
};

enum Colors {
    Red,
    Green = "Green",
    Blue
}

type Weird = string & number & boolean;

let x: Weird = true as any as Weird;

greet(user);
new Dog();
console.log(myCar);
console.log(Colors);
