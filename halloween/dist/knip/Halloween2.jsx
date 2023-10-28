/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.14 public/model/halloween2.glb 
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/halloween2.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.ramen.geometry} material={materials['cubicity_glass-emit']} position={[-6.312, 0, 0]} />
      <mesh geometry={nodes.gekleurdglas.geometry} material={materials['cubicity_glass-emit']} />
      <mesh geometry={nodes.Moon.geometry} material={materials['Material.002']} position={[-5.902, 3.945, -28.695]} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.tree.geometry} material={materials.cubicity_concrete} />
      <mesh geometry={nodes.Cat.geometry} material={materials.beige} position={[8.365, 2.26, 2.75]} rotation={[0.427, 1.031, -0.361]} scale={0.05} />
      <mesh geometry={nodes.baked_1.geometry} material={materials.cubicity_concrete} />
      <mesh geometry={nodes.baked_2.geometry} material={materials.cubicity_painted} />
      <mesh geometry={nodes.baked_3.geometry} material={materials.cubicity_brick} />
      <mesh geometry={nodes.baked_4.geometry} material={materials['Material.003']} />
      <mesh geometry={nodes.baked_5.geometry} material={materials['Material.001']} />
      <mesh geometry={nodes.baked_6.geometry} material={materials['Material.004']} />
      <mesh geometry={nodes.baked_7.geometry} material={materials['cubicity_concrete.001']} />
      <mesh geometry={nodes.baked_8.geometry} material={materials['procedural dirty metal']} />
      <mesh geometry={nodes.baked_9.geometry} material={materials['cubicity_tree-leaves']} />
      <mesh geometry={nodes.baked_10.geometry} material={materials.mossy_stone_wall} />
      <mesh geometry={nodes.baked_11.geometry} material={materials.cubicity_dirt} />
      <mesh geometry={nodes.baked_12.geometry} material={materials['Material.008']} />
      <mesh geometry={nodes.baked_13.geometry} material={materials['cubicty_roof-tiles_A.001']} />
      <mesh geometry={nodes.baked_14.geometry} material={materials['cubicty_roof-tiles_A']} />
      <mesh geometry={nodes.baked_15.geometry} material={materials.skeletonwhite} />
      <mesh geometry={nodes.baked_16.geometry} material={materials['cubicity_painted.door']} />
      <mesh geometry={nodes.baked_17.geometry} material={materials['cubicity_dirt.pumpkin']} />
      <mesh geometry={nodes.baked_18.geometry} material={materials['cubicity_painted.windowsill']} />
    </group>
  )
}

useGLTF.preload('/halloween2.glb')
