export class Payment {
    private payments: Map<string, number> = new Map();

    makePayment(payerName: string, amount: number, currency: string = "USD"): boolean {
        if (amount <= 0) {
            console.log(`  Xatolik: Noto'g'ri to'lov summasi (${amount})`);
            return false;
        }
        this.payments.set(payerName, amount);
        console.log(`  To'lov amalga oshirildi: ${amount} ${currency}`);
        return true;
    }

    refundPayment(payerName: string, amount?: number, currency: string = "USD"): boolean {
        const currentAmount = this.payments.get(payerName);
        const refundAmount = amount ?? currentAmount;

        if (refundAmount !== undefined && refundAmount > 0) {
            this.payments.delete(payerName);
            console.log(`  To'lov qaytarildi: ${refundAmount} ${currency}`);
            return true;
        }

        console.log(`  To'lov ma'lumoti topilmadi: ${payerName}`);
        return false;
    }
}
