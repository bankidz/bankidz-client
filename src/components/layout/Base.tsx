import TabBar from '../common/TabBar';

interface BaseProps {
  children: JSX.Element;
}

function Base({ children }: BaseProps) {
  return (
    <>
      {children}
      <TabBar />
    </>
  );
}

export default Base;
