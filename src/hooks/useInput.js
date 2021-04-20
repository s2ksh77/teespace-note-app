import React, { useState } from 'react';
import { checkMaxLength } from '../utils/validators';

// validator :
const useInput = initialValue => {
  const [value, setValue] = useState(initialValue);
  const handleChange = e => setValue(checkMaxLength(e));

  return { value, handleChange };
};

export default useInput;
