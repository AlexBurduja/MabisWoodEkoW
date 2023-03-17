import React, { useCallback} from "react"
import Particles from 'react-tsparticles'
import { loadFull } from "tsparticles";
 
function ParticlesBackground() {
  const particlesInit = useCallback(async (engine) => {
    // console.log(engine);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async container => {
    await container;
}, []);


  return (
   
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

        }
      }
      /> 
  );
}
 
export default ParticlesBackground;