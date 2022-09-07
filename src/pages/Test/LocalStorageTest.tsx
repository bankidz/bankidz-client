import axios from 'axios';
import { useState } from 'react';
import styled from 'styled-components';
import { BASE_URL } from '@lib/constants/BASE_URL';

const axiosTest = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

function LocalStorageTest() {
  let prev = 'noPrev';
  if (window.localStorage.getItem('userName') !== null) {
    prev = window.localStorage.getItem('userName')!;
  }

  const [userName, setUserName] = useState(prev);
  const [check, setCheck] = useState(false);

  const saveData = () => {
    const userObj = { name: userName };
    window.localStorage.setItem('userName', JSON.stringify(userObj));
  };
  const callData = () => {
    setCheck(true);
  };
  const onChange = (e: any) => {
    setUserName(e.target.value);
    setCheck(false);
  };

  return (
    <Wrapper>
      <input
        name="userName"
        value={userName}
        onChange={onChange}
        placeholder="이름을 입력하세요!"
      />
      <button onClick={saveData}>저장하기</button>
      <button onClick={callData}> 불러오기</button>

      {check ? <p>{window.localStorage.getItem('userName')}</p> : <> </>}
    </Wrapper>
  );
}

export default LocalStorageTest;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  button + button {
    margin-top: 30px;
  }

  button {
    border: 2px solid red;
  }
`;
