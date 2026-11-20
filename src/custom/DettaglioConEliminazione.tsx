// @ts-nocheck
import { customTicker, customTimers } from "../customGuard.ts";
const __mk = customTicker("DettaglioConEliminazione");
const { setTimeout, setInterval, clearTimeout, clearInterval } = customTimers("DettaglioConEliminazione");
import { Button, Drawer, Field, useTable } from "../floware";

export default function DettaglioConEliminazione(props) {__mk();
  const table = useTable(props.pageId);
  if (!table) return null;
  const riga = table.rows[props.rowIndex];
  if (!riga) return null;
  function rimuovi() {__mk();
    table.removeRow(props.rowIndex);
    props.close();
  }
  return (
    <Drawer title="Dettaglio" onClose={props.close} footer={<><Button variant="secondary" onClick={props.close}>Chiudi</Button><Button variant="danger" onClick={rimuovi}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 6h18M9 6V4h6v2M5 6l1 14h12l1-14M10 10v6M14 10v6" /></svg><span className="sr-only">Rimuovi</span></Button></>}>
      <div className="space-y-3">
        {table.columns.map((colonna, indice) => (__mk(), <Field key={indice} label={colonna}>{table.value(props.rowIndex, colonna)}</Field>))}
      </div>
    </Drawer>
  );
}
