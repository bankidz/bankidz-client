import { IOptInDTO } from '@lib/apis/user/user.dto';
import ToggleButton from '@components/common/buttons/ToggleButton';
import ForegroundTemplate from '@components/layout/ForegroundTemplate';
import useToggle from '@lib/hooks/useToggle';
import isEmptyObject from '@lib/utils/isEmptyObject';
import getLocalStorage from '@lib/utils/localStorage/getLocalStorage';
import setLocalStorage from '@lib/utils/localStorage/setLocalStorage';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import styled from 'styled-components';
import queryKeys from '@lib/constants/queryKeys';
import userApi from '@lib/apis/user/userApi';

const Alerts = () => {
  const { mutate: mutateNotice } = useMutation(userApi.patchNoticeAlert, {
    onSuccess: (data) => syncAlert(data),
  });
  const { mutate: mutateService } = useMutation(userApi.patchServiceAlert, {
    onSuccess: (data) => syncAlert(data),
  });

  const [alert, setAlert] = useState<IOptInDTO>(getLocalStorage('alert') || {});

  // 로컬 저장소에 값 없을 시 값 패칭해서 사용
  const syncAlert = (data: IOptInDTO) => {
    setLocalStorage('alert', data);
    setAlert(data);
  };
  const { data } = useQuery(queryKeys.USER_OPTIN, userApi.getUserOptIn, {
    enabled: isEmptyObject(alert),
    onSuccess: (data) => syncAlert(data),
  });

  const [toggleNotice, setToggleNotice, clickToggleNotice] = useToggle(
    alert.noticeOptIn || false,
  );
  const [toggleService, setToggleService, clickToggleService] = useToggle(
    alert.serviceOptIn || false,
  );

  useEffect(() => {
    setToggleNotice(alert.noticeOptIn);
    setToggleService(alert.serviceOptIn);
  }, [alert]);

  return (
    <ForegroundTemplate label="알림 설정">
      <Wrapper>
        <h2>푸쉬 알림</h2>
        <Cell>
          <Text>
            <p>공지 및 이벤트 알림</p>
            <p>이벤트 및 다양한 정보에 대한 소식을 알려드려요</p>
          </Text>
          <ToggleButton
            toggle={toggleNotice}
            onToggleClick={() => clickToggleNotice(mutateNotice)}
          />
        </Cell>
        <Cell>
          <Text>
            <p>가족 활동 알림</p>
            <p>
              자녀의 돈길 생성, 부모의 돈길 수락 등 가족들의 새로운 활동을
              알려드려요
            </p>
          </Text>
          <ToggleButton
            toggle={toggleService}
            onToggleClick={() => clickToggleService(mutateService)}
          />
        </Cell>
      </Wrapper>
    </ForegroundTemplate>
  );
};
export default Alerts;

const Wrapper = styled.div`
  h2 {
    ${({ theme }) => theme.typo.text.T_16_EB}
    padding:40px 26px 20px 26px;
  }
`;
const Cell = styled.div`
  padding: 20px 26px;
  display: grid;
  grid-template-columns: auto 51px;
  grid-gap: 8px;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.palette.greyScale.grey200};
`;

const Text = styled.div`
  & > p:first-child {
    ${({ theme }) => theme.typo.text.S_16_B}
    color: ${({ theme }) => theme.palette.greyScale.black};
  }
  & > p:last-child {
    ${({ theme }) => theme.typo.text.S_12_M}
    color: ${({ theme }) => theme.palette.greyScale.grey600};
    margin-top: 8px;
  }
  margin-right: 8px;
`;
