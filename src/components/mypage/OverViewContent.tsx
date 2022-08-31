import styled from 'styled-components';
import { isMetaProperty } from 'typescript';

type OverViewDataProps = {
  data: { name: string; value: any }[];
};

function OverViewContent({ data }: OverViewDataProps) {
  const isKidRecord = data[0].name === '총 저금액';

  return (
    <Wrapper>
      {data.map((item) => (
        <Item key={item.name} isKidRecord={isKidRecord}>
          <p>{item.value}</p>
          <p>{item.name}</p>
        </Item>
      ))}
    </Wrapper>
  );
}

export default OverViewContent;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
`;

const Item = styled.div<{ isKidRecord: boolean }>`
  width: 100%;
  height: 45px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  & > p:first-child {
    ${({ theme, isKidRecord }) =>
      isKidRecord
        ? theme.typo.fixed.GraphNum_T_18_EB
        : theme.typo.fixed.GraphNum_T_21_EB};
    color: ${({ theme }) => theme.palette.greyScale.black};
    margin-bottom: 8px;
  }
  & > p:last-child {
    ${({ theme }) => theme.typo.fixed.GraphSub_S_12_M}
    color: ${({ theme }) => theme.palette.greyScale.grey500};
  }

  &:not(:last-child) {
    border-right: 2px solid ${({ theme }) => theme.palette.greyScale.grey100};
  }
`;
