# Portfolio — Material & Meaning

Implemented November 2, 2026. Original artwork generated with the built-in imagegen tool. No API-key workflow, stock imagery, paid Unicorn publishing, or fabricated product screenshots. The images are conceptual cover art; visible captions distinguish them from product photography.

## Design

White editorial hero, dark ink typography, sky blue emphasis, and small hot pink accents. A sculptural hero sits beside live HTML text. Four projects form a responsive two-column gallery with descriptive text, all original metrics, working links, and native details. A dark navy profile section separates the work from experience and contact. On mobile everything becomes a single column. Hover effects honor reduced motion; the default page makes no Unicorn requests.

## Assets

All original 1536 × 1024 PNGs are in `public/artwork/`, alongside full-resolution WebP and 768px WebP copies. Only WebP variants are requested by the website. Conversion uses ImageMagick; the generated composition is unchanged.

| Original PNG | Use | Full WebP |
| --- | --- | --- |
| `hero.png` | Intro sculpture | 46 KB |
| `joulhub.png` | Property management architecture | 44 KB |
| `education.png` | Mathematics sculpture | 32 KB |
| `mlc.png` | Concept learning pavilion | 33 KB |
| `alumni.png` | Connection sculpture | 40 KB |

Generation source directory: `/home/yuujin/.codex/generated_images/01a19bbd-7d22-78b2-8769-064bd55859c1`. Original generation files remain there as well.

## Prompts

### Hero

Create a premium editorial 3D artwork for a creative full-stack developer's portfolio website, landscape 3:2. A single beautifully sculpted architectural ribbon forming an abstract impossible lowercase n / portal, with one sky-blue translucent cast-glass arc and one saturated hot-pink lacquered folded plane intersecting through a chalk-white ceramic arch. Palette precise sky blue #0593C6, hot pink #D83095, near-white #FCFFFF, restrained dark navy shadows. Gallery-quality physical object, exquisitely crafted beveled edges, subtle caustics, frosted glass refraction, soft large studio light from upper left, tactile warm-white paper cyclorama, grounded gentle shadow. Object framed centrally with generous 18% breathing room, eye-level three-quarter view, elegant art direction like a contemporary design magazine cover. Rich material detail, clean controlled rendering, memorable simple silhouette. No text, no letters as typography, no logos, no watermark, no UI, no gradient background, no spheres floating around, no busy decorative elements. This is standalone original artwork used beside live HTML typography, not a screenshot of a website.

### Shared project-cover prefix

Original premium 3D editorial artwork for a developer portfolio project cover. Landscape 3:2 aspect ratio. Physically convincing exquisite materials: frosted sky blue glass #0593C6, chalk-white ceramic #FCFFFF, selective hot pink lacquer #D83095. Soft studio lighting, sophisticated product photography, clean architectural composition with strong silhouette and ample breathing room, subtle shadows and beautiful refractions. No text, no numbers, no watermark, no logo, no UI, no screens, no cartoon, no people.

### JoulHub (after shared prefix)

A sculptural architectural maquette of three interlocking contemporary apartment buildings: one tall blue frosted glass rectangular tower with recessed square window rhythm, a lower chalk-white building with open terraces, a single pink narrow roof slab. On a pale icy blue seamless studio ground. Elegant architectural model, not toy houses; three-quarter elevated view, restrained facade details. Forms fill about 65 percent of frame.

### Smart Education (after shared prefix)

A poetic mathematical sculpture: a precise hot pink torus cut to a three-quarter arc stands vertically, interlocked with a translucent blue triangular prism and a thin white circular disc. Perfect geometric proportions, a tactile pale blush studio ground, dramatically simple composition, three-quarter view. Visual metaphor for discovery and mathematics, no symbols.

### MLC (after shared prefix)

An inviting conceptual architectural learning pavilion: a refined chalk-white open colonnade with three tall rounded archways, a sky-blue glass roof plane and a small pink inner wall, on a warm-white seamless ground. Contemporary miniature architecture photographed elegantly with long soft shadows and one sculptural white staircase, no surrounding buildings or plants. An original conceptual model, not a real building.

### Alumni (after shared prefix)

A beautifully crafted sculptural chain of three large interlocking rounded rectangular loops: one translucent sky blue cast glass, one polished hot pink lacquer, one satin white ceramic. Standing together in a balanced impossible-looking but physically plausible arrangement on a deep dark navy #102B36 studio ground. Subtle rim lighting, rich crisp glass edges, premium gallery object, connection and community expressed through joined forms.

## Validation

- Production build and formatting checks pass.
- 24 Playwright checks pass across desktop and mobile, including WCAG axe checks, responsive asset loading, filters, disclosures, existing fragment links, email-copy success/failure, and mocked contact delivery.
- Rendered layouts inspected at desktop and mobile sizes; no horizontal overflow from 320 to 1920px.
- Code review findings addressed: email copying and legacy skills / experience / certifications section links restored.
- The site is available locally at port 5173. This revision has not been deployed, and tests did not send real email.
