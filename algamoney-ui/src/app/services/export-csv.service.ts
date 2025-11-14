import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ExportCSVService {

    private csvTryQuote(data: string) {
        if (data.includes(';')) {
            return '"' + data.replace(/"/g, '""') + '"';
        }

        return data.replace(/"/g, '""');
    }

    private toCsv(header: string[], dados: any[]) {
        let csv = '\ufeff'; // BOM UTF-8
        const csvSeparator = ';'; // ← AGORA USANDO PONTO E VÍRGULA (CORRETO PARA EXCEL BR)

        // Cabeçalho
        header.forEach((h) => {
            csv += this.csvTryQuote(h) + csvSeparator;
        });

        csv += '\n';

        let colunaAtual = 0;
        const totalColunas = header.length;

        // Dados
        dados.forEach((valor) => {
            csv += this.csvTryQuote(valor.toString()) + csvSeparator;
            colunaAtual++;

            // Quebra de linha a cada número de colunas do header
            if (colunaAtual === totalColunas) {
                csv += '\n';
                colunaAtual = 0;
            }
        });

        return csv;
    }

    private export(data: string, mimeTypeAndCharset: string, filename: string) {
        const blob = new Blob([data], { type: mimeTypeAndCharset });

        const nav = (window.navigator as any);
        if (nav.msSaveOrOpenBlob) {
            nav.msSaveOrOpenBlob(blob, filename);
        }
        else {
            const link = document.createElement('a');
            link.style.display = 'none';
            document.body.appendChild(link);

            if (link.download !== undefined) {
                link.href = URL.createObjectURL(blob);
                link.download = filename;
                link.click();
            } else {
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
