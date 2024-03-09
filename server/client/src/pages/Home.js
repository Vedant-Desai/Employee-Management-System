import React from "react";

const Home = () => {
  return (
    <>
      <main>
        <section className="section-hero">
          <div className="container grid grid-two-cols">
            <div className="hero-content">
              <p>We are the Best IT Company</p>
              <h1>Welcome to I-Pangram</h1>
              <p>
                Are you ready to take your business to the next level with
                cutting-edge IT solutions? Look no further! At I-Pangram, we
                specialize in providing innovative IT services and solutions
                tailored to meet your unique needs.
              </p>
            </div>

            {/* hero images  */}
            <div className="hero-image">
              <img
                src="/images/home.png"
                alt="coding together"
                width="400"
                height="500"
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
