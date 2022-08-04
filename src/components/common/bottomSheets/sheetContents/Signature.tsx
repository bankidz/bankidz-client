import { theme } from '@lib/styles/theme';
import { Dispatch, SetStateAction, useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import styled from 'styled-components';

type SignatureProps = {
  setDisabledNext: Dispatch<SetStateAction<boolean>>;
  setSign: Dispatch<SetStateAction<any>>;
};

function Signature({ setDisabledNext, setSign }: SignatureProps) {
  const canvasRef = useRef<any>(null);

  const onEndSign = () => {
    setDisabledNext(false);
    if (canvasRef.current) {
      const signImage = canvasRef.current
        .getTrimmedCanvas()
        .toDataURL('image/png');
      setSign(signImage);
    }
  };
  return (
    <Wrapper>
      <CanvasContainer>
        <SignatureCanvas
          penColor={theme.palette.greyScale.black}
          canvasProps={{ className: 'sigCanvas' }}
          ref={canvasRef}
          onEnd={onEndSign}
          minWidth={2.5}
          maxWidth={4.5}
        />
      </CanvasContainer>
      <p>이곳에 사인을 하면 계약이 진행돼요</p>
    </Wrapper>
  );
}

export default Signature;

const Wrapper = styled.div`
  margin: 9px 16px 32px 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  & > p {
    ${({ theme }) => theme.typo.bottomSheet.T_14_EB}
    color: ${({ theme }) => theme.palette.greyScale.grey600}
  }
`;

const CanvasContainer = styled.div`
  width: 100%;
  height: 346px;
  border-radius: ${({ theme }) => theme.radius.medium};
  border: 3px solid ${({ theme }) => theme.palette.main.yellow100};
  padding: 10px;

  .sigCanvas {
    width: 100%;
    height: 320px;
  }
`;
