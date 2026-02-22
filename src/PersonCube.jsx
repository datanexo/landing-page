// Single card-cube: tilt on hover, ripple on click, front face = person card.
// Cube logic inspired by Can Tastemel (lambda.ai) https://cantastemel.com

import { useCallback, useEffect, useRef } from 'react';
import gsap from 'gsap';
import './PersonCube.css';

const PersonCube = ({
  name,
  role,
  imageUrl,
  logoUrl = 'logo.svg',
  entranceDelay = 0,
  maxAngle = 28,
  easing = 'power3.out',
  duration = { enter: 0.25, leave: 0.5 },
  borderStyle = '2px solid rgba(255,255,255,0.4)',
  faceColor = '#000',
  rippleOnClick = true,
  rippleColor = '#fff',
  rippleSpeed = 1.5
}) => {
  const wrapRef = useRef(null);
  const cubeRef = useRef(null);
  const enterDur = duration.enter;
  const leaveDur = duration.leave;

  /* Entrance: spin in from the left like throwing dice */
  useEffect(() => {
    const wrap = wrapRef.current;
    const cube = cubeRef.current;
    if (!wrap || !cube) return;
    const fromX = -420;
    const spinX = 720;
    const spinY = 540;
    gsap.fromTo(
      wrap,
      { x: fromX },
      {
        x: 0,
        duration: 1.6,
        delay: entranceDelay,
        ease: 'back.out(1.15)',
        overwrite: 'auto'
      }
    );
    gsap.fromTo(
      cube,
      { rotateX: spinX, rotateY: spinY },
      {
        rotateX: 0,
        rotateY: 0,
        duration: 1.6,
        delay: entranceDelay,
        ease: 'back.out(1.15)',
        overwrite: 'auto'
      }
    );
  }, [entranceDelay]);

  const tiltFromPointer = useCallback(
    (clientX, clientY) => {
      if (!wrapRef.current || !cubeRef.current) return;
      const rect = wrapRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const halfW = rect.width / 2;
      const halfH = rect.height / 2;
      const nx = halfW ? (clientX - cx) / halfW : 0;
      const ny = halfH ? (clientY - cy) / halfH : 0;
      const clamp = (v, m) => Math.max(-m, Math.min(m, v));
      const rotateY = clamp(nx, 1) * maxAngle;
      const rotateX = clamp(-ny, 1) * maxAngle;
      gsap.to(cubeRef.current, {
        duration: enterDur,
        ease: easing,
        overwrite: true,
        rotateX,
        rotateY
      });
    },
    [maxAngle, enterDur, easing]
  );

  const resetTilt = useCallback(() => {
    if (!cubeRef.current) return;
    gsap.to(cubeRef.current, {
      duration: leaveDur,
      rotateX: 0,
      rotateY: 0,
      ease: 'power3.out'
    });
  }, [leaveDur]);

  const onPointerMove = useCallback(
    e => {
      tiltFromPointer(e.clientX, e.clientY);
    },
    [tiltFromPointer]
  );

  const onTouchMove = useCallback(
    e => {
      e.preventDefault();
      if (e.touches[0]) tiltFromPointer(e.touches[0].clientX, e.touches[0].clientY);
    },
    [tiltFromPointer]
  );

  const onClick = useCallback(
    e => {
      if (!rippleOnClick || !cubeRef.current) return;
      const faces = cubeRef.current.querySelectorAll('.person-cube-face');
      const animDur = 0.3 / rippleSpeed;
      const hold = 0.5 / rippleSpeed;
      gsap.to(faces, {
        backgroundColor: rippleColor,
        duration: animDur,
        ease: 'power3.out'
      });
      gsap.to(faces, {
        backgroundColor: faceColor,
        duration: animDur,
        delay: animDur + hold,
        ease: 'power3.out'
      });
    },
    [rippleOnClick, faceColor, rippleColor, rippleSpeed]
  );

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    el.addEventListener('pointermove', onPointerMove);
    el.addEventListener('pointerleave', resetTilt);
    el.addEventListener('click', onClick);
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    el.addEventListener('touchend', resetTilt);
    return () => {
      el.removeEventListener('pointermove', onPointerMove);
      el.removeEventListener('pointerleave', resetTilt);
      el.removeEventListener('click', onClick);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', resetTilt);
    };
  }, [onPointerMove, resetTilt, onClick, onTouchMove]);

  const wrapperStyle = {
    '--person-cube-border': borderStyle,
    '--person-cube-bg': faceColor
  };

  return (
    <div
      ref={wrapRef}
      className="person-cube-wrap"
      style={wrapperStyle}
      role="article"
      aria-label={`${name}, ${role}`}
    >
      <div ref={cubeRef} className="person-cube">
        <div className="person-cube-face person-cube-face--front card-face">
          <div className="card-face-photo-wrap">
            <img src={imageUrl} alt={name} className="card-face-photo" />
          </div>
        </div>
        <div className="person-cube-face person-cube-face--back logo-face">
          <img src={logoUrl} alt="" className="person-cube-logo" aria-hidden="true" />
        </div>
        <div className="person-cube-face person-cube-face--top logo-face">
          <img src={logoUrl} alt="" className="person-cube-logo" aria-hidden="true" />
        </div>
        <div className="person-cube-face person-cube-face--bottom logo-face">
          <img src={logoUrl} alt="" className="person-cube-logo" aria-hidden="true" />
        </div>
        <div className="person-cube-face person-cube-face--left logo-face">
          <img src={logoUrl} alt="" className="person-cube-logo" aria-hidden="true" />
        </div>
        <div className="person-cube-face person-cube-face--right logo-face">
          <img src={logoUrl} alt="" className="person-cube-logo" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
};

export default PersonCube;
