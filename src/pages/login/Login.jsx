import { useContext } from "react";
import "./login.scss";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { saveSession } from "../../services/storageService";
import { AppContext } from "../../router/Router";
import { getUser } from "../../services/userServices";
import { InputAdornment, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import Divider from "@mui/material/Divider";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const {
    user: { userDispatch },
  } = useContext(AppContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const dataUser = await getUser(data.email, data.password);
      if (dataUser) {
        Swal.fire(`Bienvenido! ${dataUser.name}`, "", "success").then(() => {
          userDispatch({
            type: "login",
            payload: {
              isAuthenticated: true,
              user: dataUser,
            },
          });
          navigate("/");
          saveSession(dataUser);
        });
      } else {
        Swal.fire("Ooopss!", "Información incorrecta!", "error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="loginContainer">
      <main className="login">
        <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="login__title">Iniciar Sesión</h1>
          <section className="login__container">
            <div className="login__input-container">
              <TextField
                variant="outlined"
                label="Correo"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <img
                        className="login__icon-form"
                        src="/images/user.svg"
                        alt="user icon"
                      />
                    </InputAdornment>
                  ),
                }}
                className="login__input"
                id="email"
                type="email"
                {...register("email", { required: true })}
              />
            </div>
          </section>
          <section className="login__container">
            <div className="login__input-container">
              <TextField
                variant="outlined"
                label="Contraseña"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <img
                        className="login__icon-form"
                        src="/images/padlock.svg"
                        alt="padlock icon"
                      />
                    </InputAdornment>
                  ),
                }}
                className="login__input"
                id="password"
                type="password"
                {...register("password", { required: true })}
              />
            </div>
          </section>
          <button className="login__btn-submit">Iniciar Sesión</button>
          <p className="login__register">
            No tienes una cuenta?{" "}
            <Link className="login__register-link" to="/register">
              Registrate ahora
            </Link>
          </p>
        </form>
        <Divider className="divider" orientation="vertical" flexItem>
          ・
        </Divider>
        <div className="login__img">
          <img src="/images/influencers.svg" />
        </div>
      </main>
    </div>
  );
};

export default Login;
