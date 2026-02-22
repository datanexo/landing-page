import React from 'react';
import ReactDOM from 'react-dom/client';
import PersonCube from './PersonCube.jsx';

const cofounders = [
  { name: 'Kevin Kovacs', role: 'Data & IA Engineer', imageUrl: 'assets/kevin-kovacs.png' },
  { name: 'Franco Perrupato', role: 'AI Engineer & Robotics', imageUrl: 'assets/franco-perrupato.png' },
  { name: 'Ezequiel Formaggio', role: 'Backend & Infraestructure', imageUrl: 'assets/ezequiel-formaggio.png' },
  { name: 'Agustín Bustos Barton', role: 'Machine Learning & Analytics', imageUrl: 'assets/agustin-bustos.png' },
  { name: 'Santiago Otero', role: 'Marketing & Communications', imageUrl: 'assets/santiago-otero.png' }
];

const rootEl = document.getElementById('cubes-root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <div className="person-cubes-row">
      {cofounders.map((person, i) => (
        <div key={i} className="person-cube-item" style={{ '--caption-delay': `${0.4 + i * 0.12}s` }}>
          <PersonCube
            name={person.name}
            role={person.role}
            imageUrl={person.imageUrl}
            entranceDelay={i * 0.14}
            maxAngle={28}
            borderStyle="2px solid rgba(255,255,255,0.4)"
            faceColor="#000"
            rippleColor="#fff"
            rippleSpeed={1.5}
            rippleOnClick
          />
          <div className="person-cube-caption">
            <h2 className="person-cube-caption-name">{person.name}</h2>
            <p className="person-cube-caption-role">{person.role}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
