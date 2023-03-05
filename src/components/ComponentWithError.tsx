import React from 'react';

interface ComponentWithErrorProps {
  message: string;
}
const ComponentWithError: React.FC<ComponentWithErrorProps> = ({ message }) => {
  React.useEffect(() => {
    throw new Error(message);
  }, []);

  return null;
};

export default ComponentWithError;
