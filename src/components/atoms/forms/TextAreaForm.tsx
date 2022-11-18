import {
  ChangeEvent,
  Dispatch,
  HTMLAttributes,
  SetStateAction,
  useCallback,
} from 'react';
import styled from 'styled-components';

interface TextAreaFormProps extends HTMLAttributes<HTMLTextAreaElement> {
  textValue: string;
  setTextValue: Dispatch<SetStateAction<string>>;
  height: string;
  autoFocus?: boolean;
}

/**
 * @param textValue TextAreaForm을 사용하는 컴포넌트에서 선언한 state를
 * 주입합니다. 예) const [reason, setReason] = useState('');인 경우 reason
 * @param setTextValue TextAreaForm을 사용하는 컴포넌트에서 선언한
 * state에 대한 setter를 주입합니다.
 * 예) const [reason, setReason] = useState('');인 경우 setReason
 * @param height textarea의 height를 string으로 입력합니다. 예) '168px'
 * @param autoFocus textarea에 대한 autoFocus 속성 사용 유무를 선택합니다.
 * 기본값은 false 입니다.
 */
function TextAreaForm({
  placeholder,
  textValue,
  setTextValue,
  height,
  autoFocus = false,
  ...props
}: TextAreaFormProps) {
  const handleChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(e.target.value);
  }, []);

  return (
    <InputBox
      placeholder={placeholder}
      value={textValue}
      onChange={handleChange}
      height={height}
      autoFocus={autoFocus}
      {...props}
    />
  );
}

export default TextAreaForm;

const InputBox = styled.textarea<{ height: string }>`
  width: 100%;
  height: ${({ height }) => height};
  border-radius: ${({ theme }) => theme.radius.medium};
  padding: 20px 16px;
  resize: none;
  ${({ theme }) => theme.typo.input.TextField_T_16_EB};
  &::placeholder {
    color: ${({ theme }) => theme.palette.greyScale.grey300};
  }
  border: 3px solid ${({ theme }) => theme.palette.main.yellow100};
  outline-color: ${({ theme }) => theme.palette.main.yellow300};
`;
