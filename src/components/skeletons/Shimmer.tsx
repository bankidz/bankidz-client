import styled from 'styled-components';

const Shimmer = () => {
  return (
    <Wrapper>
      <div className="shimmer-wrapper">
        <div className="shimmer"></div>
      </div>
    </Wrapper>
  );
};

export default Shimmer;

const Wrapper = styled.div`
  .shimmer-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    animation: loading 2.5s infinite;
  }

  .shimmer {
    width: 50%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.2);
    transform: skewX(-20deg);
    box-shadow: 0 0 30px 30px rgba(255, 255, 255, 0.05);
  }

  @keyframes loading {
    0% {
      transform: translateX(-150%);
    }
    50% {
      transform: translateX(-60%);
    }
    100% {
      transform: translate(150%);
    }
  }
`;
