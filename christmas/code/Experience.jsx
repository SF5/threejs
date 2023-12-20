import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { Suspense } from 'react'
import Model from './Model'
import { Stage } from '@react-three/drei'

import { Environment } from '@react-three/drei'

export default function Experience() {
    return <>

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
        <ambientLight intensity={0.5} />
        <Environment files="./model/christmas_photo_studio_01_1k.exr" background blur={0.8} />
        <Suspense>
            <Stage
                shadows={{ type: 'contact', opacity: 0.2, blur: 3 }}
                environment="forest"
                preset="portrait"
                intensity={2}
            >
                <Model scale={6} />
            </Stage>
        </Suspense>

    </>
}