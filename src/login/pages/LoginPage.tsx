import React, { useState, useEffect } from "react";
import { useLogin } from "../hooks/useLogin";
import { useLoginAudit } from "../hooks/useLoginAudit";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { PixelCanvasComponent2 } from "../../core/components/PixelCanvas2";
import Logo from "../../assets/logo-essalud.png";
import logoCorazon from "../../assets/logo-corazon.png";
import logoUgas from "../../assets/logo-ugas.png";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importamos los iconos
import "../assets/main.css"; // Importamos el archivo CSS con los estilos personalizados
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { jwtDecode } from 'jwt-decode';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formValid, setFormValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseña
  const { executeLogin, loading, error } = useLogin();
  const { saveAudit } = useLoginAudit();
  const navigate = useNavigate();
  const { executeRecaptcha } = useGoogleReCaptcha();

  useEffect(() => {
    setFormValid(username.trim() !== "" && password.trim() !== "");
  }, [username, password]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formValid || loading) return;

    if (!executeRecaptcha) {
      toast.error("reCAPTCHA no está disponible");
      return;
    }

    try {
      const recaptchaToken = await executeRecaptcha('login');

      const success = await executeLogin(username, password, recaptchaToken);

      if (success) {
        const decodedToken: any = jwtDecode(localStorage.getItem('access_token') || '');
        const idUser = decodedToken.id;
        const username = decodedToken.sub;

        // Registrar la auditoría de acceso exitosa
        await saveAudit({
          user: {
            idUser: idUser
          },
          username,
          success: true,
        });

        toast.success(`Bienvenido(a) ${username}! 👋`);
        navigate("/home");
      } else {
        // Registrar la auditoría de acceso fallida
        await saveAudit({
          username,
          success: false,
        });

        toast.error(error || "Credenciales incorrectas");
      }
    } catch (err) {
      console.error("Error al ejecutar reCAPTCHA:", err);
      toast.error("Error al ejecutar reCAPTCHA");

      // Registrar la auditoría de acceso fallida en caso de error
      await saveAudit({
        username,
        success: false,
      });
    }
  };

  return (
    <div className="login-page">
      {/* Superponer el PixelCanvasComponent2 sobre el fondo */}
      <div className="pixel-canvas-overlay">
        <PixelCanvasComponent2 />
      </div>
      <div className="login-container">
        {/* Card de Login */}
        <div className="card shadow-lg login-card">
          <div className="text-center mb-4">
            <div className="logo-wrapper">
              <img src={Logo} alt="Logo Essalud" className="logo-img essalud-logo" />
              <div className="logo-divider">
                <img src={logoUgas} alt="Logo Ugas" className="logo-img ugas-logo" />
              </div>
            </div>
          </div>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label title-form">Usuario</label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ingresa tu usuario"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label title-form">Contraseña</label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingresa tu contraseña"
                />
                <button
                  type="button"
                  className="btn toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <div className="d-grid gap-2">
              <button
                type="submit"
                className="btn button-ugas"
                disabled={!formValid || loading}
              >
                {loading ? "Cargando..." : "Iniciar sesión"}
              </button>
            </div>
          </form>
          <div className="mt-3 text-center">
            <img
              src={logoCorazon}
              alt="Logo Corazón"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => (
  <GoogleReCaptchaProvider reCaptchaKey="6LfJ-TkpAAAAAGk-luwLSzw3ihrxMprK85ckCalL">
    <LoginPage />
  </GoogleReCaptchaProvider>
);

export default App;