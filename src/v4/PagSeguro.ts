import { Holder } from './Holder';
import { Boleto } from './Boleto';
import { Card } from './Card';
import { Cobranca } from './Cobranca';
import axios from "axios";
import { PaymentMethod } from './PaymentMethod';

export class PagSeguro {

    token: string = "0DD5B8D7BA5B4B33A6E1803AE2163730";

    headers: any;
    constructor() {
        this.headers = {
            "Authorization": this.token,
            "x-api-version": 4.0,
            "Content-Type": "application/json"
        }
    }

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

    async cobrar(idCobranca: string, card: Card, valor: number, msg: string) {
        // axios.post("https://sandbox.api.pagseguro.com/charges",
        //     JSON.stringify(cobranca),
        //     { headers: this.headers })
        //     .then((ret: any) => {
        //         if (ret.data.status == "PAID")
        //             console.log("CARTÃO ACEITO");
        //         else if (ret.data.status == "DECLINED")
        //             console.log("CARTÃO RECUSADO!");
        //             else
        //             console.log("")
        //         // console.log(ret);
        //     });

        let p = new PaymentMethod();
        p.card = card;
        p.capture = true;

        let c = new Cobranca();
        c.payment_method = p;
        c.amount.value = valor;
        c.description = msg;
        c.reference_id = idCobranca;

        let ret: any = await axios.post("https://sandbox.api.pagseguro.com/charges",
            JSON.stringify(c),
            { headers: this.headers });
        return { idPagSeguro: ret.data.id, status: ret.data.status };
    }

    async autorizar(idCobranca: string, card: Card, valor: number, msg: string) {
        let p = new PaymentMethod();
        p.card = card;
        p.capture = false;

        let c = new Cobranca();
        c.payment_method = p;
        c.amount.value = valor;
        c.description = msg;
        c.reference_id = idCobranca;

        let ret: any = await axios.post("https://sandbox.api.pagseguro.com/charges",
            JSON.stringify(c),
            { headers: this.headers });
        return {
            id_pagseguro: ret.data.id, status: ret.data.status, nextStep: {
                "amount": {
                    "value": valor
                }
            }
        };
    }

    async cobrarAutorizada(idPagSeguro: any, nextStep: any) {
        let ret: any = await axios.post(`https://sandbox.api.pagseguro.com/charges/${idPagSeguro}/capture`,
            JSON.stringify(nextStep),
            { headers: this.headers });
        return ret;
    }

    // {
    //     id: 'CHAR_370179B5-07BD-449F-8955-A9CDC00E968C',
    //     reference_id: 'id005',
    //     status: 'PAID',
    //     created_at: '2021-08-08T20:12:26.823-03:00',
    //     paid_at: '2021-08-08T20:12:27.172-03:00',
    //     description: 'Valor cobrado de teste',
    //     amount: {
    //       value: 500,
    //       currency: 'BRL',
    //       summary: { total: 500, paid: 500, refunded: 0 }
    //     },
    //     payment_response: { code: '20000', message: 'SUCESSO', reference: '1628464347172' },
    //     payment_method: {
    //       type: 'CREDIT_CARD',
    //       installments: 1,
    //       capture: true,
    //       card: {
    //         brand: 'visa',
    //         first_digits: '411111',
    //         last_digits: '1111',
    //         exp_month: '5',
    //         exp_year: '2025',
    //         holder: [Object]
    //       },
    //       soft_descriptor: 'sellervirtual'
    //     },
    //     notification_urls: [],
    //     links: [
    //       {
    //         rel: 'SELF',
    //         href: 'https://sandbox.api.pagseguro.com/charges/CHAR_370179B5-07BD-449F-8955-A9CDC00E968C',
    //         media: 'application/json',
    //         type: 'GET'
    //       },
    //       {
    //         rel: 'CHARGE.CANCEL',
    //         href: 'https://sandbox.api.pagseguro.com/charges/CHAR_370179B5-07BD-449F-8955-A9CDC00E968C/cancel',
    //         media: 'application/json',
    //         type: 'POST'
    //       }
    //     ]
    //   }


    async criarBoleto(idCobranca: string, valor: number, msg: string) {

        let holder = new Holder();
        let boleto = new Boleto(5, holder);
        boleto.addInstruction("Era uma vez um gatinho");
        boleto.addInstruction("via PagSeguro");

        let p = new PaymentMethod();
        p.capture = undefined;
        p.type = "BOLETO";
        p.boleto = boleto;

        let c: Cobranca = new Cobranca();
        c.reference_id = idCobranca;
        c.description = msg;
        c.payment_method = p;
        c.amount.value = valor;

        // console.log('cobrança> ', JSON.stringify(c));

        let ret: any = await axios.post("https://sandbox.api.pagseguro.com/charges",
            JSON.stringify(c),
            { headers: this.headers });
        return {
            idPagSeguro: ret.data.id, status: ret.data.status, links: ret.data.links, boleto: ret.data.payment_method.boleto
        };
    }


    //  {
    //     "reference_id": "ex-00001",
    //     "description": "Motivo da cobrança",
    //     "amount": {
    //       "value": 1000,
    //       "currency": "BRL"
    //     },
    //     "payment_method": {
    //       "type": "BOLETO",
    //       "boleto": {
    //         "due_date": "2019-05-08",
    //         "instruction_lines": {
    //           "line_1": "Pagamento processado para DESC Fatura",
    //           "line_2": "Via PagSeguro"
    //         },
    //         "holder": {
    //           "name": "Jose da Silva",
    //           "tax_id": "22222222222",
    //           "email": "jose@email.com",
    //           "address": {
    //             "country": "Brasil",
    //             "region": "São Paulo",
    //             "region_code": "SP",
    //             "city": "Sao Paulo",
    //             "postal_code": "01452002",
    //             "street": "Avenida Brigadeiro Faria Lima",
    //             "number": "1384",
    //             "locality": "Pinheiros"
    //           }
    //         }
    //       }
    //     },
    //     "notification_urls": [
    //       "https://yourserver.com/nas_ecommerce/277be731-3b7c-4dac-8c4e-4c3f4a1fdc46/"
    //     ]
    //   }

    consultar(idPagSeguro: string) {

    }

    consultarReferenciaID(referenciaId: string) {

    }
}