function calculateSalary(hoursWorked, hourlyRate, overtimeHours = 0, overtimeRateMultiplier = 1.5) {
    let regularPay = hoursWorked * hourlyRate;
    let overtimePay = overtimeHours * (hourlyRate * overtimeRateMultiplier);
    let totalSalary = regularPay + overtimePay;
    
    return totalSalary;
}

// Example usage:
let salary = calculateSalary(40, 20, 5); // 40 regular hours, $20/hr, 5 overtime hours
console.log("Total Salary: $" + salary);
