'use client';

import {useEffect, useRef} from 'react';
import * as THREE from 'three';

export function AmbientScene(){
  const mount=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const host=mount.current;if(!host)return;
    const scene=new THREE.Scene();
    const camera=new THREE.PerspectiveCamera(48,1,.1,100);camera.position.z=8;
    const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true});
    renderer.setPixelRatio(Math.min(devicePixelRatio,1.75));host.appendChild(renderer.domElement);
    const geometry=new THREE.IcosahedronGeometry(2.25,3);
    const material=new THREE.MeshBasicMaterial({color:0x7c5cff,wireframe:true,transparent:true,opacity:.16});
    const orb=new THREE.Mesh(geometry,material);orb.position.set(2.7,-.4,0);scene.add(orb);
    const dotsGeometry=new THREE.BufferGeometry();const dots=new Float32Array(210*3);
    for(let i=0;i<dots.length;i+=3){dots[i]=(Math.random()-.5)*18;dots[i+1]=(Math.random()-.5)*12;dots[i+2]=(Math.random()-.5)*8}
    dotsGeometry.setAttribute('position',new THREE.BufferAttribute(dots,3));
    const stars=new THREE.Points(dotsGeometry,new THREE.PointsMaterial({color:0x2dd4bf,size:.025,transparent:true,opacity:.55}));scene.add(stars);
    const resize=()=>{const {clientWidth:w,clientHeight:h}=host;camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h,false)};resize();
    const observer=new ResizeObserver(resize);observer.observe(host);let frame=0;
    const animate=()=>{orb.rotation.x+=.0007;orb.rotation.y+=.0014;stars.rotation.y-=.00012;frame=requestAnimationFrame(animate);renderer.render(scene,camera)};animate();
    return()=>{cancelAnimationFrame(frame);observer.disconnect();geometry.dispose();dotsGeometry.dispose();material.dispose();renderer.dispose();renderer.domElement.remove()};
  },[]);
  return <div ref={mount} className="ambient-scene" aria-hidden="true"/>;
}
