interface PaymentStrategy {
    pay(amount: number): void;
}

class CreditCardPayment implements PaymentStrategy {
    pay(amount: number): void {
        console.log(`Processing credit card payment of $${amount}`);
    }
}

class PayPalPayment implements PaymentStrategy {
    pay(amount: number): void {
        console.log(`Processing PayPal payment of $${amount}`);
    }
}

class BitcoinPayment implements PaymentStrategy {
    pay(amount: number): void {
        console.log(`Processing Bitcoin payment of $${amount}`);
    }
}

export class PaymentProcessor {
    private paymentStrategy: PaymentStrategy;

    // Constructor that accepts a string and selects the appropriate payment strategy
    constructor(paymentMethod: string) {
        this.paymentStrategy = this.selectPaymentStrategy(paymentMethod);
    }

    // Method to change the payment strategy at runtime
    setPaymentStrategy(paymentMethod: string): void {
        this.paymentStrategy = this.selectPaymentStrategy(paymentMethod);
    }

    // Select the strategy based on the provided string
    private selectPaymentStrategy(paymentMethod: string): PaymentStrategy {
        switch (paymentMethod.toLowerCase()) {
            case "creditcard":
                return new CreditCardPayment();
            case "paypal":
                return new PayPalPayment();
            case "bitcoin":
                return new BitcoinPayment();
            default:
                throw new Error("Invalid payment method");
        }
    }

    // Process the payment using the current strategy
    processPayment(amount: number): void {
        this.paymentStrategy.pay(amount);
    }
}

/*
// Creating a PaymentProcessor and selecting a strategy using a string
const processor = new PaymentProcessor("paypal");
processor.processPayment(150); // Output: "Processing PayPal payment of $150"

// Change strategy to credit card
processor.setPaymentStrategy("creditcard");
processor.processPayment(200); // Output: "Processing credit card payment of $200"

// Change strategy to bitcoin
processor.setPaymentStrategy("bitcoin");
processor.processPayment(100); // Output: "Processing Bitcoin payment of $100"
 */