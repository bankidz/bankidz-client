import TopAppBar from '../common/TopAppBar';

interface StackedProps {
  children: JSX.Element;
  label: string;
}

function Stacked({ children, label }: StackedProps) {
  return (
    <>
      <TopAppBar label={label} />
      {children}
    </>
  );
}

export default Stacked;
