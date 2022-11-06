import styled from 'styled-components';
import PaidDongilList from './PaidDongilList';
import WalkingDongilList from './WalkingDongilList';
import Menu from '@components/common/Menu';

function InterestHistorySection() {
  return (
    <Wrapper>
      <h1>이자내역</h1>
      <MenuWrapper>
        <Menu defaultId="1">
          <div className="header-wrapper">
            <Menu.Header id="1">걷고있는 돈길</Menu.Header>
            <Menu.Header id="2">지급 완료한 돈길</Menu.Header>
          </div>
          <Menu.Body id="1">
            <WalkingDongilList />
          </Menu.Body>
          <Menu.Body id="2">
            <PaidDongilList />
          </Menu.Body>
        </Menu>
      </MenuWrapper>
    </Wrapper>
  );
}

export default InterestHistorySection;

const Wrapper = styled.div`
  > h1 {
    margin-top: 80px;
    ${({ theme }) => theme.typo.fixed.HomeSubtitle_T_16_EB};
    color: ${({ theme }) => theme.palette.greyScale.black};
  }
`;

const MenuWrapper = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  .header-wrapper button {
    ${({ theme }) => theme.typo.text.T_14_EB};
    color: ${({ theme }) => theme.palette.greyScale.grey500};
    border-bottom: solid 1px ${({ theme }) => theme.palette.greyScale.grey200};
    width: 162px;
    height: 26px;

    &.active {
      color: ${({ theme }) => theme.palette.greyScale.black};
      transition: ${({ theme }) => theme.transition.inputFocus};
      border-bottom: solid 1px ${({ theme }) => theme.palette.greyScale.black};
    }
  }
`;
