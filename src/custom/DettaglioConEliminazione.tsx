// @ts-nocheck
import { customTicker, customTimers } from "../customGuard.ts";
const __mk = customTicker("DettaglioConEliminazione");
const { setTimeout, setInterval, clearTimeout, clearInterval } = customTimers("DettaglioConEliminazione");
import { useState } from "react";
import { Button, Drawer, Field, useTable } from "../floware";

export default function DettaglioConEliminazione(props) {__mk();
  const table = useTable(props.pageId);
  const [conferma, setConferma] = useState(false);
  const riga = table ? table.rows[props.rowIndex] : null;
  function rimuovi() {__mk();
    if (!table || !riga) return;
    table.removeRow(props.rowIndex);
    props.close();
  }
  return (
    <Drawer title="Dettaglio della riga" onClose={props.close} footer={<Button variant="secondary" onClick={props.close}>Chiudi</Button>}>
      {!table || !riga ? <p>Riga non disponibile.</p> : <div className="space-y-5 text-(--mk-text)">
        <div className="rounded-lg border border-(--mk-border) bg-(--mk-subtle) p-4 space-y-3">
          <p className="font-semibold">Rimozione della riga</p>
          {conferma ? <div className="space-y-3">
            <p>Confermi la rimozione di questa riga? L’operazione non può essere annullata.</p>
            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" onClick={() => (__mk(), setConferma(false))}>Annulla</Button>
              <Button variant="danger" onClick={rimuovi}>Conferma rimozione</Button>
            </div>
          </div> : <Button variant="danger" onClick={() => (__mk(), setConferma(true))}>
            <span className="inline-flex items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0">
                <path d="M3 6h18M9 6V4h6v2M5 6l1 14h12l1-14M10 10v6M14 10v6" />
              </svg>
              <span>Rimuovi riga</span>
            </span>
          </Button>}
        </div>
        <div className="space-y-3">
          {table.columns.map((colonna, indice) => (__mk(), <Field key={indice} label={colonna}>{table.value(props.rowIndex, colonna)}</Field>))}
        </div>
      </div>}
    </Drawer>
  );
}
