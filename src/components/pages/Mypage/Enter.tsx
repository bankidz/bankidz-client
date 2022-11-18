import { useState } from 'react';
import styled from 'styled-components';
import TextAreaForm from '@components/atoms/forms/TextAreaForm';
import Button from '@components/atoms/buttons/Button';

const DOMAIN = `${process.env.REACT_APP_DOMAIN}`;

function Enter() {
  const [familyCode, setReason] = useState('');

  const handleWithdrawButtonClick = () => {
    window.location.href = `${DOMAIN}/link/${familyCode}`;
  };

  return (
    <Wrapper>
      <header>
        <h1>연결할 가족을 찾아요</h1>
      </header>
      <InputWrapper>
        <TextAreaForm
          placeholder="다른 가족에게 전달받은 코드를 입력해요"
          textValue={familyCode}
          setTextValue={setReason}
          height="185px"
          autoFocus
        />
      </InputWrapper>
      <DoubleButtonWrapper>
        <Button
          property="default"
          label="연결하기"
          onClick={handleWithdrawButtonClick}
          state={familyCode !== ''}
        />
      </DoubleButtonWrapper>
    </Wrapper>
  );
}

export default Enter;

const Wrapper = styled.div`
  width: 100vw;
  height: calc(100vh - 48px);
  position: absolute;
  overflow-x: hidden;

  header h1 {
    ${({ theme }) => theme.typo.text.T_21_EB};
    color: ${({ theme }) => theme.palette.greyScale.black};
    margin-left: 26px;
    margin-right: 26px;
    /* margin-top: 40px; */
    margin-top: 20px;
  }
`;

const InputWrapper = styled.div`
  /* margin-top: 32px; */
  margin-top: 16px;
  width: 100%;
  padding: 0px 18px;
  box-sizing: border-box;
`;

const DoubleButtonWrapper = styled.div`
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  margin-bottom: 31px;
  padding-left: 18px;
  padding-right: 18px;
`;
