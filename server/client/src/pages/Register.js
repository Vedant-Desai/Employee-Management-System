import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../store/auth-context";

const Register = () => {
  const initialState = {
    userName: "",
    email: "",
    phone: "",
    location: "",
    password: "",
  };

  // handle input
  const [user, setUser] = useState(initialState);

  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();

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

    const register = async () => {
      try {
        const response = await fetch(
          `${window.location.origin}/api/auth/register`,
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
          toast.success("Registration Successfull");
          navigate("/login");
        } else {
          toast.error(res_data.message);
        }
      } catch (error) {
        console.log(`Registration Error : ${error}`);
      }
    };
    register();
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
              {/* our main registration code  */}
              <div className="registration-form">
                <h1 className="main-heading mb-3">registration form</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="userName">User Name</label>
                    <input
                      type="text"
                      name="userName"
                      value={user.userName}
                      onChange={handleInput}
                      placeholder="User Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={user.email}
                      onChange={handleInput}
                      placeholder="Email"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone">phone</label>
                    <input
                      type="number"
                      name="phone"
                      value={user.phone}
                      onChange={handleInput}
                      placeholder="Phone Number"
                    />
                  </div>
                  <div>
                    <label htmlFor="location">location</label>
                    <input
                      type="text"
                      name="location"
                      value={user.location}
                      onChange={handleInput}
                      placeholder="Location"
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
                    Register Now
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

export default Register;
