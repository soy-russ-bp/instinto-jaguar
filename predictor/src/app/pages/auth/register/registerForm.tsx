import React from 'react';
import { useRegisterForm } from '../../../../hooks/useRegisterForm';
// @ts-ignore: side-effect import for CSS
import './register.styles.css';
import { FormField } from '../../../../components/auth/FormField';
export const RegisterForm: React.FC = () => {
  const {
    formData,
    handleChange,
    handleSubmit,
    errorCorreo,
    errorPassword,
    errorSemestre,
    carrerasDisponibles,
    facultades,
  } = useRegisterForm();

  return (
    <div className="register-container">
      <div className="register-card">

        <h2 className="register-title">Registro al Predictor</h2>

        <form onSubmit={handleSubmit}>

          <FormField label="Nombre(s) y Apellido(s)">
            <input name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Ej: Juan Pérez"
            required />
          </FormField>

          <FormField label="Correo institucional" error={errorCorreo}>
            <input name="correo" value={formData.correo} onChange={handleChange} required />
          </FormField>

          <FormField label="Contraseña">
            <input type="password" name="password" value={formData.password} onChange={handleChange} />
          </FormField>

          <FormField label="Confirmar contraseña" error={errorPassword}>
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
          </FormField>

          <div
            style={{
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              margin: '16px 0',
            }}
          />

          <FormField label="Facultad">
            <select name="facultadId" value={formData.facultadId} onChange={handleChange} required>
              <option value="">Selecciona</option>
              {facultades.map(f => (
                <option key={f.id} value={f.id}>{f.nombre}</option>
              ))}
            </select>
          </FormField>

          <FormField label="Carrera">
            <select
              name="carreraNombre"
              value={formData.carreraNombre}
              onChange={handleChange}
              disabled={!formData.facultadId}
              required
            >
              <option value="">Selecciona</option>
              {carrerasDisponibles.map(c => (
                <option key={c.id} value={c.nombre}>{c.nombre}</option>
              ))}
            </select>
          </FormField>

          <FormField label="Semestre" error={errorSemestre}>
            <input type="number" name="semestre" value={formData.semestre} onChange={handleChange} required />

          </FormField>

          <FormField label="Contacto (Opcional para comunicación en caso de Ganar)">  
            <input name="contacto" value={formData.contacto} onChange={handleChange} />
          </FormField>

          <button type="submit">Crear cuenta</button>

        </form>
      </div>
    </div>
  );
};