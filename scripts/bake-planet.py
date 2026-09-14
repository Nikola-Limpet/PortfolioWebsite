"""Bake the original procedural cloud shader once, so browsers only sample a texture.
Run with Python, NumPy and Pillow. The result is stored with the portfolio assets.
"""
from pathlib import Path
import numpy as np
from PIL import Image

width, height = 768, 384
u, v = np.meshgrid(np.linspace(0, 2*np.pi, width), np.linspace(0, np.pi, height))
p = 1.85*np.stack([-np.cos(u)*np.sin(v), np.cos(v), np.sin(u)*np.sin(v)], axis=-1)

def fract(x):
    return x - np.floor(x)

def hash3(p):
    p = fract(p * 0.3183099 + [0.1, 0.2, 0.3]) * 17
    return fract(np.prod(p, axis=-1)*np.sum(p, axis=-1))

def noise3(x):
    cell = np.floor(x)
    f = fract(x)
    f = f*f*(3-2*f)
    result = np.zeros(x.shape[:-1])
    for dx in (0,1):
        for dy in (0,1):
            for dz in (0,1):
                weight = (f[...,0] if dx else 1-f[...,0])*(f[...,1] if dy else 1-f[...,1])*(f[...,2] if dz else 1-f[...,2])
                result += hash3(cell + [dx,dy,dz])*weight
    return result

def fbm(p):
    result = np.zeros(p.shape[:-1])
    amplitude = .5
    for _ in range(5):
        result += amplitude*noise3(p)
        p = p*2.03+1.7
        amplitude *= .5
    return result

def smooth(a,b,x):
    t=np.clip((x-a)/(b-a),0,1)
    return t*t*(3-2*t)

turbulence=fbm(p*3.4)
bands=np.sin(p[...,1]*24+turbulence*6)
mix=(smooth(-.9,.9,bands)*.4+turbulence*.45)[...,None]
surface=np.array([.22,.28,.29])*(1-mix)+np.array([.48,.53,.51])*mix
warm=(smooth(.6,.85,turbulence)*.6)[...,None]
surface=surface*(1-warm)+np.array([.63,.60,.51])*warm
surface *= (.8+fbm(p*19)*.4)[...,None]
image=Image.fromarray(np.uint8(np.clip(surface*255,0,255)))
output=Path(__file__).resolve().parent.parent/'public/space/planet-surface.webp'
image.save(output,quality=92,method=6)
print(f'Baked planet surface: {output.stat().st_size:,} bytes')
