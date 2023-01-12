export class Card {
        //         "card": {
        //         "number": "4111111111111111",
        //         "exp_month": "03",
        //         "exp_year": "2026",
        //         "security_code": "123",
        //         "holder": {
        //           "name": "Jose da Silva"
        //         }

        number: string;
        exp_month: string;
        exp_year: string;
        security_code: string;
        holder = {
            name: ""
        }
}