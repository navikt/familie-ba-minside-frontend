import { Table } from '@navikt/ds-react';
import {
    TableBody,
    TableDataCell,
    TableHeader,
    TableHeaderCell,
    TableRow,
} from '@navikt/ds-react/Table';

const Dokumentoversikt: React.FC = () => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHeaderCell scope="col">Dokument</TableHeaderCell>
                    <TableHeaderCell scope="col">Sendt inn av</TableHeaderCell>
                    <TableHeaderCell scope="col" align="right">
                        Dato
                    </TableHeaderCell>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableDataCell>Dokumentasjon fra den andre forelderen</TableDataCell>
                    <TableDataCell>Tredjepart</TableDataCell>
                    <TableDataCell align="right">13. okt. 2018</TableDataCell>
                </TableRow>
                <TableRow>
                    <TableDataCell>Ettersendelse til søknad om utvidet barnetrygd</TableDataCell>
                    <TableDataCell>Deg</TableDataCell>
                    <TableDataCell align="right">5. jul. 2018</TableDataCell>
                </TableRow>
                <TableRow>
                    <TableDataCell>Annen dokumentasjon</TableDataCell>
                    <TableDataCell>Nav</TableDataCell>
                    <TableDataCell align="right">13. okt. 2018</TableDataCell>
                </TableRow>
            </TableBody>
        </Table>
    );
};

export default Dokumentoversikt;
