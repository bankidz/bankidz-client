import Button from '@components/common/buttons/Button';
import { useAppSelector } from '@store/app/hooks';
import { selectIsKid } from '@store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import EmojiCircle from './EmojiCircle';

function WithdrawContent() {
  const isKid = useAppSelector(selectIsKid);
  let content;
  if (isKid) {
    content = (
      <>
        <section>
          <EmojiCircle variant="present" />
          <div className="text-wrapper">
            <h1>위시리스트 및 목표에 보상받기</h1>
            <p>
              위시리스트나 목표를 향해 돈을 모으고, 부모님에게 이자보상을 받을
              수 있어요
            </p>
          </div>
        </section>
        <section>
          <EmojiCircle variant="creditCard" />
          <div className="text-wrapper">
            <h1>계좌 연결 예정</h1>
            <p>계좌가 연결되면, 번거롭지 않게 자동으로 돈을 모을 수 있어요</p>
          </div>
        </section>
        <section>
          <EmojiCircle variant="friends" />
          <div className="text-wrapper">
            <h1>위시리스트 및 목표에 보상받기</h1>
            <p>
              친구와도 공동으로 목표를 설정하고, 함께 돈을 부모님에게 이자보상을
              받을 수 있어요
            </p>
          </div>
        </section>
      </>
    );
  } else {
    content = (
      <>
        <section>
          <EmojiCircle variant="cash" />
          <div className="text-wrapper">
            <h1>자녀의 올바른 금융습관 형성</h1>
            <p>자녀가 저축경험을 통해 돈의 소중함을 알 수 있어요</p>
          </div>
        </section>
        <section>
          <EmojiCircle variant="books" />
          <div className="text-wrapper">
            <h1>금융 교육 및 생활 꿀팁</h1>
            <p>
              어렵고 잘 모르던 금융 교육과 나에게 딱 맞는 금융생활을 핵심만
              제공해줘요
            </p>
          </div>
        </section>
        <section>
          <EmojiCircle variant="creditCard" />
          <div className="text-wrapper">
            <h1>자녀와의 계좌 연결</h1>
            <p>
              향후 앱 내에서 자녀와의 계좌 연결을 토해 편하게 용돈을 보낼 수
              있어요
            </p>
          </div>
        </section>
      </>
    );
  }

  const navigate = useNavigate();

  return (
    <Wrapper>
      {content}
      <DoubleButtonWrapper>
        <Button
          property="sub"
          label="탈퇴하기"
          onClick={() => navigate('/mypage/manage/withdraw/reason')}
        />
        <Button
          property="default"
          label="돌아가기"
          onClick={() =>
            navigate('/mypage/manage', { state: { direction: 'navigate-pop' } })
          }
        />
      </DoubleButtonWrapper>
    </Wrapper>
  );
}

export default WithdrawContent;

const Wrapper = styled.div`
  margin-top: 40px;

  section {
    width: 100%;
    height: 105px;

    display: flex;
    justify-content: flex-start;
    align-items: center;

    .text-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      margin-left: 16px;

      h1 {
        ${({ theme }) => theme.typo.text.S_16_B};
        color: ${({ theme }) => theme.palette.greyScale.black};
      }
      p {
        margin-top: 8px;
        ${({ theme }) => theme.typo.text.S_12_M};
        color: ${({ theme }) => theme.palette.greyScale.grey600};
        line-height: 150%;
      }
    }
  }
`;

const DoubleButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 16px;

  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  margin-bottom: 31px;
  padding-left: 18px;
  padding-right: 18px;
`;
