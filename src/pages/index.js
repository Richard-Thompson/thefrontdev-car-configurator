import * as React from "react"
import { Scene } from "../components/Scene/Scene";
import GlobalStyle from "./global.styles";

const IndexPage = () => (
  <>
    <GlobalStyle />
    {typeof window !== `undefined` && <React.Suspense fallback={null}>
      <Scene />
    </React.Suspense>
    }

  </>
)

export default IndexPage
