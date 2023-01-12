import { Holder } from './Holder';
export class Boleto {
    // "boleto": {
    //     "due_date": "2019-05-08",
    //     "instruction_lines": {
    //       "line_1": "Pagamento processado para DESC Fatura",
    //       "line_2": "Via PagSeguro"
    //     },
    due_date: string;
    instruction_lines: any;
    holder: Holder;
    private c_lines: number = 0;

    private fixD(d: number) {
        if (d < 10)
            return "0" + d;
        else
            return d.toString();
    }

    constructor(dias: number, pagador: Holder) {
        let d = new Date();
        d.setDate(d.getDate() + dias);

        let mes = this.fixD((d.getMonth() + 1));
        let dia = this.fixD(d.getDate());

        this.due_date = d.getFullYear() + "-" + mes + "-" + dia;
        this.instruction_lines = {};
        this.holder = pagador;
    }

    addInstruction(instruction: string) {
        let calc: string = "line_" + (this.c_lines + 1);
        this.c_lines++;
        this.instruction_lines[calc] = instruction;
    }
}