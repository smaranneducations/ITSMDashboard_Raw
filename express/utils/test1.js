function divide(a, b) {
    try {
        if (b === 0) {
            throw new Error("Division by zero"); // Throw custom error message
        }
        return a / b;
    } catch (error) {
      return error;
    
    } finally {

        return "Value returned from finally block" + error.message;
    }
}


console.log(divide(10, 0)); // Output: An error occurred: Division by zero Error occurred: Division by zero
