import { useState, useCallback } from 'react';

function useInputs(initialForm: any) {
  const [form, setForm] = useState(initialForm);
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((form: any) => ({ ...form, [name]: value }));
  }, []);
  const reset = useCallback(() => setForm(initialForm), [initialForm]);
  return [form, onChange, reset] as const;
}

export default useInputs;

// https://react.vlpt.us/basic/21-custom-hook.html
