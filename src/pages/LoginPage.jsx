import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoPersonAdd, IoLogIn, IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";
import ReCaptcha from 'react-google-recaptcha';

function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signin, isAuthenticated, errors: signInErrors } = useAuth();
  const [passwordShown, setPasswordShown] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);
  const togglePasswordVisibility = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/principal');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = handleSubmit(async (values) => {
    signin(values);
  });

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-[#2c4790] to-[#1b2f5e]"aria-hidden="false">
      <div className="bg-white max-w-md w-full p-8 rounded-lg shadow-lg">
        
        {/* Error messages */}
        {signInErrors.length > 0 && signInErrors.map((error, i) => (
          <div key={i} className="bg-red-500 text-white p-2 my-2 rounded-md">
            {error}
          </div>
        ))}

        <form onSubmit={onSubmit}>
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Iniciar Sesión</h1>

          {/* Email Input */}
          <label htmlFor="email" className="block text-gray-700 text-lg">Correo Electrónico</label>
          <input 
            type="email" 
            className="w-full bg-gray-100 text-gray-800 px-4 py-2 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email"
            {...register("email", { 
              required: 'Email es requerido',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Por favor introduce un email válido',
              },
            })}
          />
          {errors.email && <p className='text-red-500 mt-1'>{errors.email.message}</p>}

          {/* Password Input */}
          <label htmlFor="password" className="block text-gray-700 text-lg mt-4">Contraseña</label>
          <div className="relative mt-2">
            <input 
              type={passwordShown ? "text" : "password"} 
              className="w-full bg-gray-100 text-gray-800 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
              {...register("password", { 
                required: 'Contraseña es requerida',
                minLength: { value: 6, message: 'La longitud mínima es de 6 caracteres' }
              })}
            />
            <div 
              className="absolute right-2 top-2 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {passwordShown ? <IoEyeSharp size={24} /> : <IoEyeOffSharp size={24} />}
            </div>
          </div>
          {errors.password && <p className='text-red-500 mt-1'>{errors.password.message}</p>}

          {/* Submit Button */}
          <button 
            className="bg-blue-500 text-white px-6 py-3 rounded-md mt-6 w-full hover:bg-blue-600 transition duration-300 text-lg font-semibold"
            type="submit"
            disabled={!captchaValue}
          >
            <IoLogIn size={24} className="inline-block" />
            <span className="ml-2">Iniciar Sesión</span>
          </button>

          {/* Recaptcha */}
          <ReCaptcha
            sitekey="6Lcv-5IqAAAAAM5Ip1QiXqsguEr7GRPP7rrdmrTQ"
            onChange={setCaptchaValue}
            aria-hidden="false"
            className="mt-4"
          />

          {/* Link to Register */}
          <div className="flex items-center justify-between mt-6">
            <span className="text-black">
              ¿No tienes una cuenta?
            </span>
            <Link to="/register" className="text-blue-500 flex items-center">
              Crear una <IoPersonAdd size={24} className="ml-1" />
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
