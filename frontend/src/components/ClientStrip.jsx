import React from 'react';
import useReveal from '../lib/useReveal';

// Clients and brands whose films appear in Selected Works (text wordmarks; no logo files used).
const CLIENTS = [
  'Savola', 'Al Nahdi', 'Goody', 'KAEC', "Lay's", 'ALJ Toyota', 'IKEA', 'InMobi · Glance', 'Sri Aditya', 'MEMCO', 'Jeddah Central', 'Masar'
];

const ClientStrip = () => {
  const [ref, inView] = useReveal({ threshold: 0.2 });
  return (
    <section id="clients" data-bg="#080812" data-veil=".85" aria-label="Clients">
      <div ref={ref} className={`client-strip reveal ${inView ? 'in' : ''}`}>
        <div className="label">Trusted by · Saudi Arabia · UAE · India</div>
        <ul>
          {CLIENTS.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ClientStrip;
