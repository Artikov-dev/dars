export class EmailClient {
    sendEmail(emailAddress: string, subject: string, body: string) {
        console.log(`[Email] ${emailAddress} manziliga | Mavzu: ${subject} | ${body}`);
    }
}
