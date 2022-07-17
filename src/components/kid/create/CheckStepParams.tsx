import React from 'react';
import { Navigate, useLocation, useParams } from 'react-router-dom';

type LocationState = {
  from: string;
};

function CheckStepParams({ children }: { children: JSX.Element }) {
  const { step } = useParams();
  const location = useLocation();
  // 현재 path랑 state 값 비교해서 검사하려했는데, 애초에 직접 접근할때는 state값이 안들어감.
  // 그래서 state 값 있으면 무조건 정상적으로 보내주도록..?
  //const { from } = location.state as LocationState;
  console.log(step, location);
  if (location.state) {
    return <>{children}</>;
  } else {
    return <Navigate to="/" />;
  }
}
export default CheckStepParams;
