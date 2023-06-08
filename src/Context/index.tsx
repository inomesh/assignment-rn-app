import React, {useState} from 'react';

export const RootContext = React.createContext();

export const useStore = () => {
  const [values, setValues] = useState({
    image: '',
    isImageCaptured: false,
    adhaar: '',
    isAdhaarCaptured: false,
  });

  const handleChangeValue = ({field, value}: any) => {
    setValues(pre => ({
      ...pre,
      [field]: value,
    }));
  };

  return {
    values,
    handleChangeValue,
  };
};
