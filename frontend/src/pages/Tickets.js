import { useEffect, useState } from "react";
import api from "../services/api";

export default function Tickets() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    async function fetchTickets() {
      try {
        const res = await api.get("/tickets"); // 👈 necesitamos backend /tickets GET
        setTickets(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchTickets();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Lista de Tickets</h1>
      <ul className="space-y-2">
        {tickets.map((t) => (
          <li
            key={t.ticket_id}
            className="p-4 border rounded shadow-sm bg-white"
          >
            <h2 className="font-semibold">{t.titulo}</h2>
            <p>{t.descripcion}</p>
            <p className="text-sm text-gray-500">Estado: {t.estado}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
