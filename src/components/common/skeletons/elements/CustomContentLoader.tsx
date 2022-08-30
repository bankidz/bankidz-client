import ContentLoader from 'react-content-loader';

interface CustomContentLoaderProps {
  children: React.ReactNode;
}

function CustomContentLoader({ children }: CustomContentLoaderProps) {
  return (
    <ContentLoader
      width={'100%'}
      height={'100%'}
      backgroundColor="#FAFAFC" // grey100
      foregroundColor="#EAEAEC" // grey200
      speed={1.2}
    >
      {children}
    </ContentLoader>
  );
}

export default CustomContentLoader;
