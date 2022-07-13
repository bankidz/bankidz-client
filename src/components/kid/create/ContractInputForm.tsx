import { HTMLAttributes } from 'react';
import styled from 'styled-components';

interface ContractInputFormProps extends HTMLAttributes<HTMLInputElement> {}

function ContractInputForm({}: ContractInputFormProps) {
  return <Wrapper></Wrapper>;
}

export default ContractInputForm;

const Wrapper = styled.input`
  width: 100%;
  height: 56px;
  border: 3px solid gray;
`;
