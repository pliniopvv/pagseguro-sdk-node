import axios, { AxiosRequestConfig } from "axios";
import xmlParser from 'xml-parser';
import qs from 'qs';

export class PagSeguro {

    private URL = `${process.env.URL_PAGSEGURO}`;
    private email: string;
    private token: string;
    private MODE: string = "production";

    private URL_PAGSEGURO: string;
    private URL_WS_PAGSEGURO: string;
    private URL_STC_PAGSEGURO: string;
    private URL_PAGSEGURO_SANDBOX: string;
    private URL_WS_PAGSEGURO_SANDBOX: string;
    private URL_STC_PAGSEGURO_SANDBOX: string;

    private URL_CHECKOUT: string;
    private URL_CHECKOUT_SANDBOX: string;
    private URL_NOTIFICATIONS: string;
    private URL_NOTIFICATIONS_SANDBOX: string;
    private URL_TRANSACTION: string;
    private URL_TRANSACTION_SANDBOX: string;
    private URL_PAYCHECKOUT_REDIRECT: string;
    private URL_PAYCHECKOUT_REDIRECT_SANDBOX: string;

    private URL_CREDENTIALS: string;
    private checkout_code: string;

    constructor() {
        //CREDENCIAIS
        this.token = process.env.TOKEN;
        this.email = process.env.EMAIL;

        //URLS
        this.URL_PAGSEGURO = process.env.URL_PAGSEGURO;
        this.URL_WS_PAGSEGURO = process.env.URL_WS_PAGSEGURO;
        this.URL_STC_PAGSEGURO = process.env.URL_STC_PAGSEGURO;
        this.URL_PAGSEGURO_SANDBOX = process.env.URL_PAGSEGURO_SANDBOX;
        this.URL_WS_PAGSEGURO_SANDBOX = process.env.URL_WS_PAGSEGURO_SANDBOX;
        this.URL_STC_PAGSEGURO_SANDBOX = process.env.URL_STC_PAGSEGURO_SANDBOX;

        this.URL_CHECKOUT = `${this.URL_WS_PAGSEGURO}/v2/checkout?${this.email}&token=${this.token}`;
        this.URL_CHECKOUT_SANDBOX = `${this.URL_WS_PAGSEGURO_SANDBOX}/v2/checkout?${this.email}&token=${this.token}`;
        this.URL_NOTIFICATIONS = `${this.URL_WS_PAGSEGURO}/v3/transactions/notifications/`;
        this.URL_NOTIFICATIONS_SANDBOX = `${this.URL_WS_PAGSEGURO_SANDBOX}/v3/transactions/notifications/`;
        this.URL_TRANSACTION = `${this.URL_WS_PAGSEGURO}/v2/transactions/`;
        this.URL_TRANSACTION_SANDBOX = `${this.URL_WS_PAGSEGURO_SANDBOX}/v2/transactions/`;
        this.URL_PAYCHECKOUT_REDIRECT = `${this.URL_PAGSEGURO}/v2/checkout/payment.html?code=`;
        this.URL_PAYCHECKOUT_REDIRECT_SANDBOX = `${this.URL_PAGSEGURO_SANDBOX}/v2/checkout/payment.html?code=`;

        this.URL_CREDENTIALS = `email=${this.email}&token=${this.token}`;
    }

    setSandBoxMode() {
        this.MODE = 'sandbox';
    }

    async createCheckout(item: Item): Promise<string> {

        if (process.env.DEBUG) {
            console.log("Url Checkout> ", this.URL_CHECKOUT);
            console.log("item.toBody()> ", item.form());
        }

        let URL;
        if (this.MODE == 'sandbox')
            URL = this.URL_CHECKOUT_SANDBOX;
        else
            URL = this.URL_CHECKOUT;

        let config: AxiosRequestConfig = {
            method: 'post',
            url: URL,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify(item.form())
        }

        let xml: any = await axios(config);
        let obj = xmlParser(xml.data);

        for (let c of obj.root.children)
            if (c.name == 'code')
                this.checkout_code = c.content;

        if (process.env.DEBUG)
            console.log("Code Checkout> ", this.checkout_code);

        return this.checkout_code;
    }

    getLinkToPay(checkoutCode: string): string {
        let URL;
        if (this.MODE == 'sandbox')
            URL = this.URL_CHECKOUT_SANDBOX;
        else
            URL = this.URL_CHECKOUT;

        URL = URL.concat(checkoutCode);
        return URL;
    }

    async consultarNotificacoes(code: string) {

        let URL;
        if (this.MODE == 'sandbox')
            URL = this.URL_NOTIFICATIONS_SANDBOX;
        else
            URL = this.URL_NOTIFICATIONS;

        URL = URL.concat(code);
        URL = URL.concat("?" + this.URL_CREDENTIALS);

        if (process.env.DEBUG)
            console.log("UrlConsultaCompra> ", URL);

        let xml = await axios({
            method: 'get',
            url: URL,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        let obj = xmlParser(xml.data);
        return obj;
    }

    async consultarTransacao(code: string) {
        let URL;
        if (this.MODE == 'sandbox')
            URL = this.URL_TRANSACTION_SANDBOX;
        else
            URL = this.URL_TRANSACTION;

        URL = URL.concat(code);
        URL = URL.concat("?" + this.URL_CREDENTIALS);

        if (process.env.DEBUG)
            console.log("consultaTransactionLink> ", URL);

        let xml = await axios({
            method: 'get',
            url: URL,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        let obj = xmlParser(xml.data);
        return obj;
    }
}

export class Item {

    currency: string;
    itemId1: string;
    description: string;
    amount: string;
    quantity: number;
    weight: number;
    shipping: string | Boolean;

    form() {
        return {
            'currency': this.currency,
            'itemId1': this.itemId1,
            'itemDescription1': this.description,
            'itemAmount1': this.amount,
            'itemQuantity1': this.quantity,
            'itemWeight1': this.weight,
            'shippingAddressRequired': this.shipping
        }
    }
}