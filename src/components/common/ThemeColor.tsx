import { Helmet } from 'react-helmet-async';
import { theme } from '@lib/styles/theme';

interface ThemeColorProps {
  color?: string;
}

function ThemeColor({ color }: ThemeColorProps) {
  return (
    <Helmet>
      <meta
        name="theme-color"
        content={color ?? theme.palette.greyScale.grey100}
      />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content={color ?? theme.palette.greyScale.grey100}
      />
    </Helmet>
  );
}

export default ThemeColor;
