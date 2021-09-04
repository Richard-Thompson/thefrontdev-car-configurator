import * as React from 'react';
import { CanvasRoot } from 'components/organisms/canvas/canvas';
import GlobalStyle from 'pages/global.styles';

const IndexPage = () => (
  <>
    <GlobalStyle />
    {typeof window !== 'undefined' && (
      <React.Suspense fallback={null}>
        <CanvasRoot />
      </React.Suspense>
    )}
  </>
);

export default IndexPage;
