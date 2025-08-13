import React, { useState, useEffect, useMemo } from 'react';
import { createTheme, ThemeProvider, useMediaQuery } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { motion, AnimatePresence } from 'framer-motion';
import blue from '@mui/material/colors/blue';
import { alpha } from '@mui/material/styles';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";

const committeeData = [
  {
    name: 'UNHRC',
    description: 'The Human Rights Council is an inter-governmental body responsible for promoting and protecting human rights around the globe.',
    link: 'https://forms.gle/1r86TkH4Wp1i9TRZ9',
    color: blue[900],
    watermarkPosition: { top: -80, left: -80 },
  },
  {
    name: 'ECOSOC',
    description: 'The Economic and Social Council is at the heart of the UN system to advance the three dimensions of sustainable development.',
    link: 'https://forms.gle/sPzVugn3A3gwwunW9',
    color: blue[800],
    watermarkPosition: { top: -80, right: -80 },
  },
  {
    name: 'SPECPOL',
    description: 'The Special Political and Decolonization Committee deals with a variety of subjects including decolonization and peacekeeping.',
    link: 'https://forms.gle/Sb6F6ZGXru1iMv1m8',
    color: blue[700],
    watermarkPosition: { bottom: -80, right: -80 },
  },
  {
    name: 'UNRWA',
    description: 'The United Nations Relief and Works Agency supports the relief and human development of Palestinian refugees in the Near East.',
    link: 'https://forms.gle/BLeympn2DAjMeYfG6',
    color: blue[600],
    watermarkPosition: { bottom: -80, left: -80 },
  },
];

function App() {
  const [current, setCurrent] = useState(0);
  const isMobile = useMediaQuery('(max-width:600px)');
  const [init, setInit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });

    setTimeout(() => {
      setIsLoading(false);
    }, 2500);

  }, []);

  const SPRING_OPTIONS = {
    type: 'spring',
    mass: 3,
    stiffness: 400,
    damping: 50,
  };

  const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: { main: blue[700] },
    },
    typography: { fontFamily: '"Josefin Sans", sans-serif' },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          @import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;700&display=swap');
        `,
      },
    },
  });

  const CARD_MAX_WIDTH = 400;
  const CARD_MIN_WIDTH = 200;
  const panAmount = 75;

  const shatteredLinkSx = {
    color: blue[300],
    textDecoration: 'none',
    position: 'relative',
    display: 'inline-block',
    transition: 'all 0.2s',
    '&:hover': {
      color: blue[400],
      textShadow: `
        -2px -2px 0px ${blue[900]},
        2px 2px 0px ${blue[500]}
      `,
    },
  };

  const particlesOptions = useMemo(
    () => ({
      background: { color: { value: '#1a1a2e' } },
      fpsLimit: 60,
      interactivity: {
        events: { onHover: { enable: true, mode: 'repulse' } },
        modes: { repulse: { distance: 100, duration: 0.4 } },
      },
      particles: {
        color: { value: '#ffffff' },
        links: { enable: false },
        move: { direction: 'none', enable: true, outModes: 'out', random: true, speed: 0.3, straight: false },
        number: { density: { enable: true, area: 800 }, value: 150 },
        opacity: { value: { min: 0.1, max: 0.5 } },
        shape: { type: 'circle' },
        size: { value: { min: 1, max: 3 } },
      },
      detectRetina: true,
    }),
    []
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <AnimatePresence>
        {isLoading && (
          <motion.div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'black',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 9999,
            }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <motion.img
              src={`${process.env.PUBLIC_URL}/icon.png`}
              alt="Loading"
              style={{ width: 80, height: 80 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.75, ease: "easeInOut" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 2.5 }}>
        {init && (
          <motion.div
            animate={{ x: -(current - (committeeData.length - 1) / 2) * panAmount }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            style={{
              position: 'fixed', top: 0,
              width: `calc(100% + ${committeeData.length * panAmount}px)`,
              left: `-${(committeeData.length * panAmount) / 2}px`,
              height: '100vh', zIndex: -1,
            }}
          >
            <Particles id="tsparticles" options={particlesOptions} />
          </motion.div>
        )}

        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          p: 2,
          position: 'relative',
          justifyContent: isMobile ? 'center' : 'flex-start',
        }}>
            <img src={`${process.env.PUBLIC_URL}/icon.png`} alt="Logo" style={{ width: 40, height: 40, marginRight: 16 }} />
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
                GSL Tournament
            </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 112px)', width: '100%', position: 'relative', overflow: 'hidden' }}>
          <Box sx={{ width: '100%', maxWidth: '1200px' }}>
            <motion.div style={{ display: 'flex', width: `${committeeData.length * 100}%`, x: `-${current * (100 / committeeData.length)}%` }} animate={{ x: `-${current * (100 / committeeData.length)}%` }} transition={SPRING_OPTIONS}>
              {committeeData.map((committee, i) => (
                <Box key={committee.name} sx={{ width: `${100 / committeeData.length}%`, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                  <Box sx={{ position: 'absolute', width: '100%', aspectRatio: 'auto', py: {xs: 15, sm: 18}, maxWidth: CARD_MAX_WIDTH, minWidth: CARD_MIN_WIDTH, backdropFilter: 'blur(8px)', borderRadius: 4, }} />
                  <Paper sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    bgcolor: committee.color,
                    width: '100%',
                    maxWidth: CARD_MAX_WIDTH,
                    minWidth: CARD_MIN_WIDTH,
                    p: { xs: 2.5, sm: 3 },
                    borderRadius: 4,
                    textAlign: 'center',
                    boxShadow: (t) => t.shadows[8],
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transform: isMobile ? 'translateY(-24px)' : 'none',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: isMobile ? 'scale(1.02) translateY(-24px)' : 'scale(1.02)',
                      boxShadow: (t) => t.shadows[12],
                    },
                  }}>
                    <img
                        src={`${process.env.PUBLIC_URL}/unemblem.png`}
                        alt="Watermark"
                        style={{
                            position: 'absolute',
                            width: '250px',
                            height: '250px',
                            opacity: 0.08,
                            pointerEvents: 'none',
                            ...committee.watermarkPosition,
                        }}
                    />

                    <Box>
                      <Typography variant={isMobile ? 'h6' : 'h5'} sx={{ mb: 2, fontWeight: 700 }}>{committee.name}</Typography>
                      <Typography variant="body2" sx={{ px: 1, fontStyle: 'italic', opacity: 0.9 }}>{committee.description}</Typography>
                    </Box>

                    <Box sx={{ width: '100%', mt: 2 }}>
                      <Divider sx={{ my: 2, bgcolor: 'rgba(255, 255, 255, 0.2)' }} />
                      <Button
                        variant="outlined"
                        href={committee.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          borderColor: alpha('#fff', 0.3),
                          color: 'white',
                          '&:hover': {
                            borderColor: alpha('#fff', 0.7),
                            bgcolor: alpha('#fff', 0.1)
                          }
                        }}
                      >
                        Write your GSL
                      </Button>
                    </Box>
                  </Paper>
                </Box>
              ))}
            </motion.div>

            {isMobile ? (
              <>
                <Button onClick={() => setCurrent((prev) => (prev - 1 + committeeData.length) % committeeData.length)} sx={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-100%)', zIndex: 10, color: 'white', '&:hover': { color: blue[500] }, minWidth: 0, p: 1, }}>
                  <ArrowLeftIcon sx={{ fontSize: { xs: '2.5rem', md: '3rem' } }} />
                </Button>
                <Button onClick={() => setCurrent((prev) => (prev + 1) % committeeData.length)} sx={{ position: 'absolute', bottom: 20, right: '50%', transform: 'translateX(100%)', zIndex: 10, color: 'white', '&:hover': { color: blue[500] }, minWidth: 0, p: 1, }}>
                  <ArrowRightIcon sx={{ fontSize: { xs: '2.5rem', md: '3rem' } }} />
                </Button>
              </>
            ) : (
              <>
                <Button onClick={() => setCurrent((prev) => (prev - 1 + committeeData.length) % committeeData.length)} sx={{ position: 'absolute', top: '50%', left: { xs: 'calc(50% - 200px)', sm: 'calc(50% - 300px)', md: 'calc(50% - 400px)' }, transform: 'translateY(-50%)', zIndex: 10, color: 'white', '&:hover': { color: blue[500] }, minWidth: 0, p: 1, }}>
                  <ArrowLeftIcon sx={{ fontSize: { xs: '2.5rem', md: '3rem' } }} />
                </Button>
                <Button onClick={() => setCurrent((prev) => (prev + 1) % committeeData.length)} sx={{ position: 'absolute', top: '50%', right: { xs: 'calc(50% - 200px)', sm: 'calc(50% - 300px)', md: 'calc(50% - 400px)' }, transform: 'translateY(-50%)', zIndex: 10, color: 'white', '&:hover': { color: blue[500] }, minWidth: 0, p: 1, }}>
                  <ArrowRightIcon sx={{ fontSize: { xs: '2.5rem', md: '3rem' } }} />
                </Button>
              </>
            )}
          </Box>
        </Box>
        <Typography variant="caption" sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, textAlign: 'center', p: 1, zIndex: 10 }}>
            Powered by{' '}
            <Link href="https://www.instagram.com/dpmun.i/" target="_blank" rel="noopener noreferrer" sx={shatteredLinkSx}>
            dpmun.i
            </Link>
        </Typography>
      </motion.div>
    </ThemeProvider>
  );
}

export default App;