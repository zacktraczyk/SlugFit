import React, { useEffect, useRef } from 'react';
import Lottie from 'lottie-react-native';

interface LoadingWheelProps {
  listening: boolean | undefined;
}
const LoadingWheel: React.FC<LoadingWheelProps> = ({ listening }) => {

  const animationRef = useRef<Lottie>(null);

//   useEffect(() => {

//     animationRef.current?.play(30, 54);
//   })

  return (
    <Lottie
      ref={animationRef}
      source={require('../assets/loading-wheel.json')}
      autoPlay={listening}
      loop={true}
      speed={10}
      
    />
  );
}
export default LoadingWheel;