import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ExportCSVService {

    private csvTryQuote(data: string) {
        if (data.includes(',')) {
            return '"' + data.replace(/"/g, '""') + '"';
        }

        return data.replace(/"/g, '""');
    }

    private toCsv(header: string[], dados: any[]) {
        let csv = '\ufeff';
        const csvSeparator = ',';

        header.forEach((d) => {
            csv += this.csvTryQuote(d);
            csv += csvSeparator;
        });

        let quebra = 0;

        csv += '\n';

        dados.forEach((d, i) => {
            csv += this.csvTryQuote(d.toString());
            quebra++;
            csv += csvSeparator;

            if (quebra === header.length) {
                csv += '\n';
                quebra = 0;
            }
        });

        return csv;
    }

    private export(data: string, mimeTypeAndCharset: string, filename: string) {
        const blob = new Blob([data], {
            type: mimeTypeAndCharset
        });

        /* if (window.navigator.msSaveOrOpenBlob) {
            navigator.msSaveOrOpenBlob(blob, filename);
        }
       let newVariable: any = window.navigator;
       var newBlob = new Blob([res.body], { type: "application/csv" });
       if (newVariable && newVariable.msSaveOrOpenBlob) {
           newVariable.msSaveOrOpenBlob(newBlob);
           return;
       } */

        const nav = (window.navigator as any);
        if (nav.msSaveOrOpenBlob) {
            nav.msSaveOrOpenBlob(data, filename)
        }
        else {
            const link = document.createElement('a');
            link.style.display = 'none';
            document.body.appendChild(link);
            if (link.download !== undefined) {
                link.setAttribute('href', URL.createObjectURL(blob));
                link.setAttribute('download', filename);
                link.click();
            }
            else {
                data = mimeTypeAndCharset + ',' + data;
                window.open(encodeURI(data));
            }
            document.body.removeChild(link);
        }
    }

    public exportCsv(header: string[], dados: any[], filename: string) {
        const csv = this.toCsv(header, dados);
        this.export(csv, 'text/csv;charset=utf-8;', filename);
    }

}
