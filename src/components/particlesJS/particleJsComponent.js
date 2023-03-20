import React, { useCallback, lazy, Suspense } from "react";
// import { loadFull } from "tsparticles";

const Particles = dynamic(() => import('react-tsparticles').then((module) => module.default), {
  ssr: false,
});
const loadFull = dynamic(() => import('tsparticles').then((module) => module.loadFull), {
  ssr: false,
});

function ParticlesBackground() {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async container => {
    await container;
  }, []);

  return (
    <Suspense fallback={<div>Loading particles...</div>}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: "transparent"
          },
          particles: {
            color: { value: "#fff" },
            number: {
              density: {
                enable: true,
                area: 1080
              },
              value: 400
            },
            opacity: {
              value: 0.7
            },
            shape: {
              type: "circle"
            },
            size: {
              value: 10
            },
            wobble: {
              enable: true,
              distance: 10,
              speed: 10
            },
            zIndex: {
              value: { min: 0, max: 100 }
            }
          }

        }}
      />
    </Suspense>
  );
}

export default ParticlesBackground;
