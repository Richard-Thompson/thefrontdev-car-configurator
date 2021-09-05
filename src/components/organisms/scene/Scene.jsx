import React, { Suspense } from 'react';
import Effects from 'components/effects/Postprocessing';
import CarModel from 'components/organisms/car-model/Car';
import { Controls } from 'components/atoms/controls/controls';
import { Background } from 'components/atoms/background/Background';
import { Lights } from 'components/molecules/lights/Lights';
import { UpdateBrightness } from 'components/utility/update-helpers/UpdateBrightness';
import { UpdateIntroCamera } from 'components/utility/update-helpers/UpdateIntroCamera';
import { UpdateZoomInCamera } from 'components/utility/update-helpers/UpdateZoomInCamera';
import { PlayAudio } from 'components/utility/update-helpers/PlayAudio';

export const Scene = () => (
  <>
    <Controls />
    {/* <color attach="background" args={["black"]} roughness={1.0} /> */}
    <gridHelper args={[10, 10]} />
    <Suspense fallback={null}>
      <Background>
        {({ background }) => <UpdateBrightness background={background} />}
      </Background>

      <Lights />

      <CarModel>
        {(props) => (
          <>
            <UpdateIntroCamera {...props} />
            <UpdateZoomInCamera {...props} />
            <PlayAudio {...props} />
          </>
        )}
      </CarModel>
      <Effects />
    </Suspense>
  </>
);
