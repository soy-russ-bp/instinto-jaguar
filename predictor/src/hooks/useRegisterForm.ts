import { useMemo, useState } from 'react';
import { FACULTADES_DATA } from '../data/carreras';
import { FormState } from '../types/FormState';
import { validateEmail, validatePasswordMatch, validateSemester } from '../utils/validators';

const INITIAL_STATE: FormState = {
  correo: '',
  password: '',
  confirmPassword: '',
  nombre: '',
  facultadId: '',
  carreraNombre: '',
  contacto: '',
  semestre: '',
};

export const useRegisterForm = () => {
  const [formData, setFormData] = useState<FormState>(INITIAL_STATE);

  const [errorCorreo, setErrorCorreo] = useState<string | null>(null);
  const [errorPassword, setErrorPassword] = useState<string | null>(null);
  const [errorSemestre, setErrorSemestre] = useState<string | null>(null);

  const facultades = FACULTADES_DATA;

  const facultadSeleccionada = useMemo(
    () => FACULTADES_DATA.find(f => f.id === formData.facultadId),
    [formData.facultadId]
  );

  const carrerasDisponibles = facultadSeleccionada?.carreras ?? [];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'correo') setErrorCorreo(null);
    if (name === 'password' || name === 'confirmPassword') setErrorPassword(null);
    if (name === 'semestre') setErrorSemestre(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(formData.correo)) {
      setErrorCorreo('Correo inválido');
      return;
    }

    if (!validatePasswordMatch(formData.password, formData.confirmPassword)) {
      setErrorPassword('Las contraseñas no coinciden');
      return;
    }

    if (!validateSemester(formData.semestre)) {
      setErrorSemestre('Semestre inválido');
      return;
    }

    const user = {
      id: `u_${Date.now()}`,
      ...formData,
      semestre: Number(formData.semestre),
      initials: formData.nombre.trim().charAt(0).toUpperCase(),
      avatarColor: '#880E4F',
    };

    console.log(user);
    alert('Registro exitoso');
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    errorCorreo,
    errorPassword,
    errorSemestre,
    carrerasDisponibles,
    facultades,
  };
};