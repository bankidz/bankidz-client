import useAxiosPrivate from '@hooks/api/useAxiosPrivate';
import { useAppDispatch, useAppSelector } from '@store/app/hooks';
import { register, selectAuth, setRole } from '@store/slices/authSlice';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TRequestStatus } from 'src/pages/OnBoarding/OAuthRedirectHandler';
import styled from 'styled-components';
import CommonSheet from '../bottomSheet/CommonSheet';
import RoleButton from '../button/RoleButton';
import { axiosPublic } from '@lib/api/axios';
import axios from 'axios';

function RegisterRole() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuth);

  function handleDadButtonClick() {
    dispatch(setRole({ isKid: false, isFemale: false }));
  }
  function handleMomButtonClick() {
    dispatch(setRole({ isKid: false, isFemale: true }));
  }
  function handleSonButtonClick() {
    dispatch(setRole({ isKid: true, isFemale: false }));
  }
  function handleDaughterButtonClick() {
    dispatch(setRole({ isKid: true, isFemale: true }));
  }

  const [registerRequestStatus, setRegisterRequestStatus] =
    useState<TRequestStatus>('idle');
  const canRegister =
    auth.isKid !== null &&
    auth.isFemale !== null &&
    registerRequestStatus === 'idle';
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  async function handleRegister() {
    try {
      // setRegisterRequestStatus('pending');
      // const response = await axiosPrivate.patch('/user', {
      //   birthday: auth.birthday,
      //   isKid: auth.isKid,
      //   isFemale: auth.isFemale,
      // });
      dispatch(
        register({
          axiosPrivate,
          birthday: auth.birthday,
          isKid: auth.isKid,
          isFemale: auth.isFemale,
        }),
      ).unwrap();
      // navigate('/');
    } catch (err: any) {
      console.log(err.response.data.message);
    } finally {
      setRegisterRequestStatus('idle');
    }

    // } catch (error) {
    //   console.error(error);
    // } finally {
    //   setRegisterRequestStatus('idle');
    // }
    // }
  }

  return (
    <Wrapper>
      <span className="header">프로필을 선택해요</span>
      <button onClick={handleRegister}>Submit</button>
      <div className="button-wrapper">
        {/* 아빠 */}
        <RoleButton
          onClick={handleDadButtonClick}
          isKid={false}
          isFemale={false}
          isSelected={auth.isKid === false && auth.isFemale === false}
        />
        {/* 엄마 */}
        <RoleButton
          onClick={handleMomButtonClick}
          isKid={false}
          isFemale={true}
          isSelected={auth.isKid === false && auth.isFemale === true}
        />
        {/* 아들 */}
        <RoleButton
          onClick={handleSonButtonClick}
          isKid={true}
          isFemale={false}
          isSelected={auth.isKid === true && auth.isFemale === false}
        />
        {/* 딸 */}
        <RoleButton
          onClick={handleDaughterButtonClick}
          isKid={true}
          isFemale={true}
          isSelected={auth.isKid === true && auth.isFemale === true}
        />
      </div>
      {/* <CommonSheet
        open={open}
        onDismiss={onDismiss}
        label={'다음'}
        onClickNext={onClickNextButton}
        sheetRef={sheetRef}
        disabledNext={disabledNext}
      >
      </CommonSheet> */}
    </Wrapper>
  );
}

export default RegisterRole;

const Wrapper = styled.div`
  width: 100%;

  .header {
    width: 100%;
    height: 24px;

    margin-top: 64px;
    margin-left: 10px;
    ${({ theme }) => theme.typo.input.Title_T_24_EB};
    color: ${({ theme }) => theme.palette.greyScale.black};
  }

  .button-wrapper {
    margin-top: 96px;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    row-gap: 16px;
    column-gap: 16px;
  }
`;

// dispatch(
//   register({
//     axiosPrivate,
//     birthday: auth.birthday,
//     isKid: auth.isKid,
//     isFemale: auth.isFemale,
//   }),
// ).unwrap();
// navigate('/');
// } catch (error) {
//   console.error(error);
// } finally {
//   setRegisterRequestStatus('idle');
// }
// }

// console.log('f called');
// async function test() {
//   try {
//     console.log('in');
//     const response = await axiosPrivate.get('/family');
//     // const response = await axiosPublic.get('/health');
//     console.log(response.data);
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.log(error.message);
//     }
//   }
// }
// test();

// useEffect(() => {
//   console.log('useEffect!');
//   async function fetchData() {
//     console.log('in func!');
//     try {
//       const response = await axiosPrivate.get('/family');
//       console.log('res');
//       console.log(response.data);
//       // const responseData: TFamilyState[] = response.data.data.familyUserList;
//       // const parents = responseData.filter((v) => v.isKid === false);
//       // if (parents.length === 1) {
//       //   dispatch(dispatchParent(parents[0].isFemale));
//       // }
//       // setParents(parents);
//     } catch (e) {
//       alert('서버 통신 오류');
//     }
//   }
//   fetchData();
// }, []);
