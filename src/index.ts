import * as Dotenv from 'dotenv';
Dotenv.config();
import { Card } from './v4/Card';
import { Cobranca } from './v4/Cobranca';
import { PagSeguro } from './v4/PagSeguro';
import { PaymentMethod } from './v4/PaymentMethod';

// import { Item, PagSeguro } from "./PagSeguro";

// // // CONTROLLER DE ENVIO
// let pgs = new PagSeguro();
// pgs.setSandBoxMode();

// // Criando ítem para compra;
// let i = new Item();
// i.currency = 'BRL';
// i.itemId1 = 'mensalidade';
// i.description = 'Pagamento de um mes.';
// i.amount = '100.00';
// i.quantity = 1;
// i.weight = 0;
// i.shipping = false;

// pgs.createCheckout(i).then(res => {
//     console.log("Res> ", res);
//     console.log("link> ", pgs.getLinkToPay(res));
// });

// pgs.consultarNotificacoes("114D5C06-8369-4A65-89F4-E81B35790A2A").then((res) => {
//     console.log("consultarNotificacoes|Res> ", res);

//     for (let child of res.root.children)
//         console.log("Child> ", child);
// });

// pgs.consultarTransacao("114D5C06-8369-4A65-89F4-E81B35790A2A").then((res) => {
//     console.log("consultarTransacao|Res> ", res);

//     for (let child of res.root.children)
//         console.log("Child> ", child);
// });









// ## V4.0

let pgs = new PagSeguro();

let card = new Card();
card.exp_month = "05";
card.exp_year = "2025";
card.holder.name = "Pips Victor";
card.number = "4111111111111111";
card.security_code = "123";

/**
 * REALIZANDO UMA COBRANÇA EM UM ÚNICO PASSO:
 */

// pgs.cobrar("cobranca_01", card, 5000, "Cobrando um valor aleatório").then((ret: any) => {
//     console.log(ret);
// })

/**
 * REALIZANDO UMA COBRANÇA COM AUTORIZAÇÃO PRÉVIA
 */

// pgs.autorizar("autorizada_02", card, 525, "Cobrança realizada com autorização prévia").then(ret => {
//     let idPs = ret.id_pagseguro;
//     let nxtStep = ret.nextStep;

//     console.log("ret>", ret);

//     pgs.cobrarAutorizada(idPs, nxtStep).then(_ret => {
//         console.log("_ret>", _ret.data);
//     });
// });

// pgs.cobrarAutorizada("CHAR_57C7A8A7-3055-4E68-8744-F637197AFF15", { amount: { value: 525 } }).then(_ret => {
//     console.log("_ret>", _ret.data);
// });

/**
 *  REALIZANDO UMA COBRANÇA POR BOLETO
 */

// pgs.criarBoleto("boleto_07", 800, "Primeiro boleto").then(
//     (ret: any) => {
//         console.log("ret>", ret);
//     }
// );


