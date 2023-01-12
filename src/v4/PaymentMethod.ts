import { Holder } from './Holder';
import { Boleto } from './Boleto';
import { Card } from './Card';
export class PaymentMethod {
    // "payment_method": {
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
    type: string = "CREDIT_CARD";
    boleto: Boleto | undefined;
    installments = 1;
    capture: boolean = true;
    card: Card | undefined;
}