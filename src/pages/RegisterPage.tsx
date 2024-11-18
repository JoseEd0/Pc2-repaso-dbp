import React from "react";
import { useForm } from "react-hook-form";
import { register as registerUser } from "../api";

interface RegisterFormInputs {
  fullName: string;
  email: string;
  password: string;
  username: string;
}

const RegisterPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>();

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      await registerUser(data);
      console.log("Registro exitoso");
    } catch (error) {
      console.error("Error en el registro:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Registro</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block">Nombre Completo</label>
          <input
            {...register("fullName", {
              required: "El nombre completo es requerido",
            })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.fullName && (
            <p className="text-red-500">{errors.fullName.message}</p>
          )}
        </div>
        <div>
          <label className="block">Email</label>
          <input
            type="email"
            {...register("email", { required: "El email es requerido" })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className="block">Usuario</label>
          <input
            {...register("username", { required: "El usuario es requerido" })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.username && (
            <p className="text-red-500">{errors.username.message}</p>
          )}
        </div>
        <div>
          <label className="block">Contraseña</label>
          <input
            type="password"
            {...register("password", {
              required: "La contraseña es requerida",
            })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
