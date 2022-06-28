import { useState, useCallback } from 'react';

// ref: https://react.vlpt.us/basic/21-custom-hook.html
function useInputs(initialForm: any) {
  const [form, setForm] = useState(initialForm);
  // change
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((form: any) => ({ ...form, [name]: value }));
  }, []);
  const reset = useCallback(() => setForm(initialForm), [initialForm]);
  return [form, onChange, reset] as const;
}

export default useInputs;
