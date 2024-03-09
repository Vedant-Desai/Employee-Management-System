import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth-context";
import { toast } from "react-toastify";

const Login = () => {
  const initialState = {
    email: "",
    password: "",
  };

  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();

  // handle input
  const [user, setUser] = useState(initialState);

  const handleInput = (e) => {
    // console.log(e);
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  // handle form on submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);

    const login = async () => {
      try {
        const response = await fetch(
          `${window.location.origin}/api/auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          }
        );
        const res_data = await response.json();
        console.log("Response From Server", res_data.message);

        if (response.status === 200) {
          storeTokenInLS(res_data.token);
          setUser(initialState);
          navigate("/");
          toast.success("Login Successfull");
        } else {
          toast.error(res_data.message);
          console.log(res_data.message);
        }
      } catch (error) {
        console.log(`Login Error : ${error}`);
      }
    };
    login();
  };

  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image reg-img">
                {/* <img
                  src="/images/register.png"
                  alt="a nurse with a cute look"
                  width="400"
                  height="500"
                /> */}
              </div>
              {/* our main login code  */}
              <div className="registration-form">
                <h1 className="main-heading mb-3">login form</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email">email</label>
                    <input
                      type="email"
                      name="email"
                      value={user.email}
                      onChange={handleInput}
                      placeholder="Email"
                    />
                  </div>
                  <div>
                    <label htmlFor="password">password</label>
                    <input
                      type="password"
                      name="password"
                      value={user.password}
                      onChange={handleInput}
                      placeholder="Password"
                    />
                  </div>
                  <br />
                  <button type="submit" className="btn btn-submit">
                    Login Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default Login;
