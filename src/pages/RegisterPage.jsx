import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { IoPersonAdd,IoLogIn, IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";
import ReCaptcha from "react-google-recaptcha";

function RegisterPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signup, isAuthenticated, errors: registerErrors, clearErrors } = useAuth();
    const [passwordShown, setPasswordShown] = useState(false);
    const [captchaValue, setCaptchaValue] = useState(null);
    const togglePasswordVisibility = () => setPasswordShown(!passwordShown);
    const navigate = useNavigate();

    // Redirige si el usuario ya está autenticado
    useEffect(() => {
        if (isAuthenticated) navigate("/products");
    }, [isAuthenticated, navigate]);

    // Limpia errores al desmontar el componente
    useEffect(() => {
        return () => clearErrors(); // Si clearErrors está estabilizado con useCallback
    }, []);

    const onSubmit = handleSubmit(async (data) => {
        await signup(data); // Llama al método signup del contexto
    });

    return (
        <div className="flex items-center justify-center h-screen" aria-hidden="false">
            <div className="bg-zinc-800 max-w-md p-10 rounded-md">
                <form onSubmit={onSubmit}>
                    <h1 className="text-3xl font-bold my-2">Registrar</h1>

                    <label htmlFor="username">Usuario</label>
                    <input
                        type="text"
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                        placeholder="Username"
                        {...register("username", { required: true, minLength: 5 })}
                    />
                    {errors.username?.type === "required" && (
                        <p className="text-red-500">Nombre de usuario requerido</p>
                    )}
                    {errors.username?.type === "minLength" && (
                        <p className="text-red-500">La longitud mínima es de 5 caracteres</p>
                    )}

                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                        placeholder="Email"
                        {...register("email", {
                            required: true,
                            pattern: {
                                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                                message: "Por favor introduce un email válido",
                            },
                        })}
                    />
                    {errors.email?.type === "required" && (
                        <p className="text-red-500">Email es requerido</p>
                    )}
                    {errors.email?.message && (
                        <p className="text-red-500">{errors.email.message}</p>
                    )}

                    <label htmlFor="password">Password</label>
                    <div className="relative">
                        <input
                            type={passwordShown ? "text" : "password"}
                            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                            placeholder="Password"
                            {...register("password", { required: true, minLength: 6 })}
                        />
                        <span
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                            onClick={togglePasswordVisibility}
                        >
                            {passwordShown ? <IoEyeSharp size={24} /> : <IoEyeOffSharp size={24} />}
                        </span>
                    </div>
                    {errors.password?.type === "required" && (
                        <p className="text-red-500">Contraseña requerida</p>
                    )}
                    {errors.password?.type === "minLength" && (
                        <p className="text-red-500">La longitud mínima es de 6 caracteres</p>
                    )}

                    {registerErrors.length > 0 && (
                        <div className="bg-red-500 p-2 my-2 text-white">
                            {registerErrors.map((error, i) => (
                                <p key={i}>{error}</p>
                            ))}
                        </div>
                    )}

                    <button
                        className="bg-zinc-700 px-3 py-3 my-3 rounded-md"
                        type="submit"
                        disabled={!captchaValue}
                    >
                        <IoPersonAdd size={30} />
                    </button>
                    <ReCaptcha
                        sitekey="6LeQA6AqAAAAAM717ThnkiAqQm2leobzfLLDFcpy"
                        onChange={(value) => setCaptchaValue(value)}
                        aria-hidden="false"
                    />
                </form>

                <div className="flex gap-x-2 justify-between pt-5 mt-5 items-center">
                    ¿Ya tienes una cuenta?
                    <Link to="/login" className="text-sky-500 flex items-center gap-x-1">
                    ¡Inicia sesión!<IoLogIn size={30} />
                    </Link>
                    </div>

            </div>
        </div>
    );
}

export default RegisterPage;
