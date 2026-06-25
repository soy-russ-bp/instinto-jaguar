import React, { useState } from 'react';
// Asegúrate de que esta ruta a tus Carreras sea la correcta:
import { FACULTADES_DATA } from '../../../../data/carreras';
import { convertTypeAcquisitionFromJson } from 'typescript';

export const RegisterForm: React.FC = () => {
  // 1. Estado del formulario
  const [formData, setFormData] = useState({
    correo: '',
    password: '',
    confirmPassword: '',
    nombre: '',
    facultadId: '', 
    carreraNombre: '',
    semestre: 0,
  });

  const [errorCorreo, setErrorCorreo] = useState<string | null>(null);

  // 2. Obtener carreras dinámicamente SIN usar un useEffect (así evitamos bucles en blanco)
  const facultadSeleccionada = FACULTADES_DATA.find(f => f.id === formData.facultadId);
  const carrerasDisponibles = facultadSeleccionada ? facultadSeleccionada.carreras : [];

  // 3. Manejadores de eventos
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'semestre' ? parseInt(value, 10) || 0 : value
    }));
    if (name === 'correo') setErrorCorreo(null);
  };

  const handleFacultadChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      facultadId: e.target.value,
      carreraNombre: '' // Reseteamos carrera al cambiar facultad
    }));
  };

  const handleCarreraChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      carreraNombre: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validación de correo institucional
    const emailRegex = /^[a-zA-Z0-9._%+-]+@alumnos\.uady\.mx$/;
    if (!emailRegex.test(formData.correo)) {
      setErrorCorreo('El correo debe ser institucional (@alumnos.uady.mx)');
      return;
    }

    // Generar iniciales para el avatar
    const initials = `${formData.nombre.trim().charAt(0)}`.toUpperCase();

    const finalUserObject = {
      id: `u_${Date.now()}`,
      correo: formData.correo,
      nombre: formData.nombre,
      contraseña: formData.password,
      facultad: facultadSeleccionada?.nombre || '',
      carrera: formData.carreraNombre,
      semestre: formData.semestre,
      initials: initials,
      avatarColor: '#880E4F' // Color fijo inicial para evitar Math.random en el render
    };

    console.log('Usuario listo para guardar:', finalUserObject);
    alert('¡Registro exitoso! Revisa la consola del navegador.');
  };

  return (
    <div style={{ maxWidth: '400px', margin: '20px auto', padding: '20px', fontFamily: 'sans-serif', border: '1px solid #ccc', borderRadius: '8px' }}>
      
      <h2>Registro al Predictor</h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Nombre Completo:</label>
          <input type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} required style={{ width: '100%', padding: '8px' }} />
        </div>


        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Correo Institucional:</label>
          <input type="email" name="correo" value={formData.correo} onChange={handleInputChange} placeholder="A22109847@alumnos.uady.mx" required style={{ width: '100%', padding: '8px' }} />
          {errorCorreo && <p style={{ color: 'red', fontSize: '13px', margin: '5px 0 0' }}>{errorCorreo}</p>}
        </div>

        
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Contraseña:</label>
          <input type="password" name="password" value={formData.password} onChange={handleInputChange} required style={{ width: '100%', padding: '8px' }} />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Confirmar Contraseña:</label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} required style={{ width: '100%', padding: '8px' }} />
        </div>

        
        <div id="separador">
          <hr style={{ margin: '20px 0', border: 'none', borderTop: '1px solid #ccc' }} />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Facultad:</label>
          <select value={formData.facultadId} onChange={handleFacultadChange} required style={{ width: '100%', padding: '8px' }}>
            <option value="">-- Selecciona Facultad --</option>
            {FACULTADES_DATA.map(f => (
              <option key={f.id} value={f.id}>{f.nombre}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Carrera:</label>
          <select value={formData.carreraNombre} onChange={handleCarreraChange} disabled={!formData.facultadId} required style={{ width: '100%', padding: '8px' }}>
            <option value="">-- Selecciona Carrera --</option>
            {carrerasDisponibles.map(c => (
              <option key={c.id} value={c.nombre}>{c.nombre}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Semestre:</label>
          <input type="number" name="semestre" min="1" max="12" value={formData.semestre} onChange={handleInputChange} required style={{ width: '100%', padding: '8px' }} />
        </div>

        <button type="submit" style={{ padding: '10px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Registrar
        </button>
      </form>
    </div>
  );
};