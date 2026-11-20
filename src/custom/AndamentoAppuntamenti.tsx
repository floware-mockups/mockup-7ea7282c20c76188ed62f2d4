// @ts-nocheck
import { customTicker, customTimers } from "../customGuard.ts";
const __mk = customTicker("AndamentoAppuntamenti");
const { setTimeout, setInterval, clearTimeout, clearInterval } = customTimers("AndamentoAppuntamenti");
import { useState } from "react";
import { Button, Card, useTable } from "../floware";

export default function AndamentoAppuntamenti(props) {__mk();
  const table = useTable(props.pageId);
  const [giorno, setGiorno] = useState("");
  if (!table) return null;
  const indice = table.column("Giorno");
  if (indice < 0) return <p>La colonna Giorno non è disponibile.</p>;
  const ordine = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica"];
  const presenti = [...new Set(table.rows.map(r => (__mk(), r[indice])))];
  const giorni = ordine.filter(g => (__mk(), presenti.includes(g))).concat([]);
  const altri = presenti.filter(g => (__mk(), !ordine.includes(g)));
  const elenco = [...giorni, ...altri];
  const conteggi = elenco.map(g => ((__mk(), { giorno: g, numero: table.rows.filter(r => (__mk(), r[indice] === g)).length })));
  const massimo = Math.max(1, ...conteggi.map(c => (__mk(), c.numero)));
  const punti = conteggi.map((c, i) => ((__mk(), { giorno: c.giorno, numero: c.numero, x: conteggi.length === 1 ? 50 : 8 + i * 84 / (conteggi.length - 1), y: 85 - c.numero / massimo * 65 })));
  const filtro = presenti.includes(giorno) ? giorno : "";
  const righe = table.rows.map((r, i) => ((__mk(), { valori: r, indice: i }))).filter(r => (__mk(), !filtro || r.valori[indice] === filtro));
  return (
    <Card title="Appuntamenti per giorno">
      <div className="space-y-4 text-(--mk-text)">
        <p className="text-sm text-(--mk-muted)">Seleziona un punto per filtrare la tabella di questo riquadro. Ogni punto indica il numero di appuntamenti del giorno.</p>
        {punti.length > 0 ? <div className="overflow-x-auto">
          <div className="relative" style={{ height: "240px", minWidth: "620px" }}>
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <line x1="4" y1="90" x2="96" y2="90" stroke="var(--mk-border)" strokeWidth="0.4" />
              <polyline points={punti.map(p => (__mk(), String(p.x) + "," + String(p.y))).join(" ")} fill="none" stroke="var(--mk-primary)" strokeWidth="0.8" />
            </svg>
            {punti.map(p => (__mk(), <div key={p.giorno} className="absolute" style={{ left: String(p.x) + "%", top: String(p.y) + "%", transform: "translate(-50%, -50%)" }}>
              <Button variant={filtro === p.giorno ? "primary" : "secondary"} onClick={() => (__mk(), setGiorno(p.giorno))}>{p.giorno}: {p.numero}</Button>
            </div>))}
          </div>
        </div> : <p>Nessun appuntamento disponibile.</p>}
        <div className="flex flex-wrap items-center gap-3">
          <p aria-live="polite">{filtro ? "Giorno: " + filtro : "Tutti i giorni"} · {righe.length} appuntamenti</p>
          <Button variant="secondary" disabled={!filtro} onClick={() => (__mk(), setGiorno(""))}>Mostra tutti</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <caption className="text-left font-semibold">Appuntamenti collegati al grafico</caption>
            <thead><tr>{table.columns.map((c, i) => (__mk(), <th key={i} className="border-b border-(--mk-border) p-2">{c}</th>))}</tr></thead>
            <tbody>{righe.map(r => (__mk(), <tr key={r.indice}>{table.columns.map((c, i) => (__mk(), <td key={i} className="border-b border-(--mk-divider) p-2">{r.valori[i]}</td>))}</tr>))}</tbody>
          </table>
        </div>
      </div>
    </Card>
  );
}
