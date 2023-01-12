import { PaymentMethod } from './PaymentMethod';
export class Cobranca {
      // {
    //     "reference_id": "ex-00003",
    //     "description": "Motivo da cobrança",
    //     "amount": {
    //       "value": 1500,
    //       "currency": "BRL"
    //     },
    //     "payment_method": {
    //       "type": "CREDIT_CARD",
    //       "installments": 1,
    //       "capture": true,
    //       "card": {
    //         "number": "4111111111111111",
    //         "exp_month": "03",
    //         "exp_year": "2026",
    //         "security_code": "123",
    //         "holder": {
    //           "name": "Jose da Silva"
    //         }
    //       }
    //     }
    //   }

    reference_id: string;
    description: string;
    amount = {
        value: 0,
        currency: "BRL"
    };
    payment_method: PaymentMethod;

    constructor() {
        // this.amount.currency = "BRL";
    }
}