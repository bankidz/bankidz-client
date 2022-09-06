import ForegroundTemplate from '@components/layout/ForegroundTemplate';
import styled from 'styled-components';
import { ReactComponent as ChevronDown } from '@assets/icons/chevronDown.svg';
import { ReactComponent as ChevronUp } from '@assets/icons/chevronUp.svg';
import { useState } from 'react';

const content = [
  {
    index: 0,
    title: '돈길은 무엇인가요?',
    body: '돈길은 자녀가 저축을 재미있고, 쉽게 할 수 있도록 도와주는 챌린지입니다.\n자녀가 저축목표를 달성할 수 있도록 부모는 이자율을 제공하며 응원을 보낼 수 있습니다. ',
  },
  {
    index: 1,
    title: '돈길은 어떻게 이용하나요?',
    body: '돈길 이용방법은 다음과 같습니다.\n\nStep1. 자녀가 저축 목표, 저금액, 기간, 이자율을 선택하고 부모에게 제안합니다.\n\nStep2. 부모는 해당 돈길 목표와 이자율을 확인하고 수락 또는 거절합니다.\n\n*거절할 경우, 한 줄 피드백 작성이 필요합니다.',
  },
  {
    index: 2,
    title: '이자부스터는 무엇인가요?',
    body: '이자부스터는 이자율입니다!\n\n부모는 매주 저금액에 대하여 이자를 제공하며, 이자율은 10%, 20%, 30%입니다.\n각 이자율에 대해 위험 조건이 존재하여, 자녀들이 이자율과 위험도를 고려하여 계약을 선택할 수 있습니다.\n\n예시)\n･ 매 주 저금액 : 1000원\n･ 이자율 : 10%\n･ 매 주 이자액 : 100원',
  },
  {
    index: 3,
    title: '이자부스터가 높으면 무조건 좋은건가요?',
    body: '높은 이자부스터가 좋은 것은 아닙니다!\n이자부스터가 높을수록 위험도 높기 때문에 신중하게 선택해주세요!\n\n[이자부스터 - 위험도]\n10% - 위험은 없음\n20% - 세 번 넘게 저금 안하면, 돈길 실패\n30% - 한 번 넘게 저금 안하면, 돈길 실패',
  },
  {
    index: 4,
    title: '돈길을 이용하면 무엇이 좋나요?',
    body: '돈길과 부모의 이자율을 통해 자녀들이 저축을 즐겁게 경험할 수 있습니다.\n\n저축과 이자율의 개념을 쉽게 이해할 수 있습니다.',
  },
  {
    index: 5,
    title: '돈길을 걸으면 자동으로 돈이 모이나요?',
    body: '돈길을 걷는 것은 실제 통장에 돈이 모이는 것이 아닌, 앱 가상 저금통에 모이는 형식입니다.\n그러므로, 실제 돈을 모으는 것은 저금통이나 은행계좌에 모으거나, 부모님에게 맡기는 식으로 진행해주세요.\n추후 앱 내에서 계좌 연결 기능이 추가될 예정이니, 그때부터는 자동으로 돈을 모을 수 있습니다. ',
  },
  {
    index: 6,
    title: '이전에 진행한 돈길/실패한 돈길들은 어디서 확인 가능한가요?',
    body: '이전에 진행한 돈길들은 모두 마이페이지 > 돈길 기록에서 확인가능합니다!',
  },
  {
    index: 7,
    title: '더 궁금한 점이 있다면?',
    body: '더 궁금한 점이 있다면 아래 링크를 클릭하고 질문을 남겨주세요!',
  },
];

const Faq = () => {
  const [isOpen, setIsOpen] = useState(content.map((v) => false));
  const toggle = (index: number) => {
    const temp = [...isOpen];
    temp[index] = !temp[index];
    setIsOpen(temp);
  };

  return (
    <ForegroundTemplate label="자주 묻는 질문">
      <>
        {content.map((item, index) => (
          <div key={item.title}>
            <Cell>
              <div>
                <p>Q.</p>
                <p>{item.title}</p>
              </div>
              <div onClick={() => toggle(index)}>
                {isOpen[index] ? <ChevronUp /> : <ChevronDown />}
              </div>
            </Cell>
            {isOpen[index] && <CellContent>{item.body}</CellContent>}
          </div>
        ))}
      </>
    </ForegroundTemplate>
  );
};

export default Faq;

const Cell = styled.div`
  display: grid;
  grid-template-columns: auto 48px;
  padding: 11px 6px 11px 26px;

  & > div {
    display: flex;
    align-items: center;
    p {
      margin-right: 8px;
    }
    p:first-child {
      ${({ theme }) => theme.typo.text.T_16_EB}
      color: ${({ theme }) => theme.palette.main.yellow400};
    }
    p:last-child {
      ${({ theme }) => theme.typo.text.S_14_M}
      color: ${({ theme }) => theme.palette.greyScale.black};
      margin-bottom: -3px;
    }
  }
  svg {
    cursor: pointer;
  }
`;

const CellContent = styled.div`
  padding: 16px 26px;
  background-color: ${({ theme }) => theme.palette.greyScale.grey200};
  ${({ theme }) => theme.typo.text.S_14_M}
  color: ${({ theme }) => theme.palette.greyScale.black};
  white-space: pre-wrap;
`;
