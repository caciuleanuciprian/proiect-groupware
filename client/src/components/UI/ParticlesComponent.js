import Particles from "react-tsparticles";

const ParticlesComponent = () => {
  const particlesInit = (main) => {};
  const particlesLoaded = (container) => {};
  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          color: {
            value: "#ffffff",
          },
          position: "50% 50%",
          repeat: "no-repeat",
          size: "cover",
        },
        fullScreen: {
          zIndex: -1,
        },
        particles: {
          color: {
            value: ["#5bc0eb", "#fde74c", "#9bc53d", "#e55934", "#fa7921"],
          },
          move: {
            direction: "top",
            enable: true,
            path: {},
            outModes: {
              bottom: "out",
              left: "out",
              right: "out",
              top: "out",
            },
            speed: 5,
            spin: {},
          },
          number: {
            value: 30,
          },
          opacity: {
            random: {
              enable: true,
              minimumValue: 0.4,
            },
            value: {
              min: 0.4,
              max: 0.8,
            },
            animation: {
              speed: 1,
              minimumValue: 0.1,
            },
          },
          size: {
            random: {
              enable: true,
              minimumValue: 300,
            },
            value: {
              min: 300,
              max: 400,
            },
            animation: {
              enable: true,
              speed: 100,
              minimumValue: 300,
            },
          },
        },
      }}
    />
  );
};

export default ParticlesComponent;
