// Open Graph cards (1200×630 PNG), generated at build time with satori + resvg.
// /og/<post-id>.png for every article, /og/<case-study-id>.png for every case study, /og/site.png for everything else.
import type { APIRoute, GetStaticPaths } from 'astro';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { getPosts, getWork, fmtDate, readingTime } from '../../lib/content';

interface Card { title: string; eyebrow: string; meta: string }

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPosts();
  const work = await getWork();
  return [
    { params: { slug: 'site' }, props: { title: 'Building digital solutions that work.', eyebrow: 'PHP Developer / WordPress Developer', meta: 'WordPress · Laravel · PHP' } },
    ...posts.map((p) => ({ params: { slug: p.id }, props: { title: p.data.title, eyebrow: `Article · ${p.data.tags.join(' · ') || 'Notes'}`, meta: `${fmtDate(p.data.date)} · ${readingTime(p.body)} min read` } })),
    ...work.map((w) => ({ params: { slug: w.id }, props: { title: w.data.title, eyebrow: `Case study · ${w.data.category}`, meta: w.data.stack.join(' / ') } })),
  ];
};

const font = (pkg: string, file: string) => readFile(join(process.cwd(), 'node_modules', '@fontsource', pkg, 'files', file));
let fonts: Promise<Buffer[]> | undefined;

const h = (type: string, style: Record<string, unknown>, children?: unknown) => ({ type, props: { style, children } });

export const GET: APIRoute = async ({ props }) => {
  const { title, eyebrow, meta } = props as Card;
  fonts ??= Promise.all([font('inter', 'inter-latin-400-normal.woff'), font('space-grotesk', 'space-grotesk-latin-700-normal.woff'), font('jetbrains-mono', 'jetbrains-mono-latin-400-normal.woff')]);
  const [regular, display, mono] = await fonts;
  const size = title.length > 110 ? 48 : title.length > 60 ? 62 : 84;

  const svg = await satori(
    // satori sizes a padded 100%-height box past the canvas, so the content sits in an absolute inner frame
    h('div', { width: 1200, height: 630, display: 'flex', background: '#F5F4F0', color: '#171717', fontFamily: 'Inter' }, [h('div', { position: 'absolute', top: 64, left: 80, right: 80, bottom: 60, display: 'flex', flexDirection: 'column' }, [
      h('div', { display: 'flex', alignItems: 'center', fontFamily: 'Mono', fontSize: 24, color: '#666666', textTransform: 'uppercase', letterSpacing: '0.04em' }, [h('div', { width: 14, height: 14, background: '#D95B35', marginRight: 18 }), h('div', { display: 'flex' }, eyebrow)]),
      h('div', { display: 'flex', flexGrow: 1, alignItems: 'center', fontFamily: 'Display', fontSize: size, fontWeight: 700, lineHeight: 1.02, letterSpacing: '-0.04em', maxWidth: 1040 }, title),
      h('div', { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '2px solid #171717', paddingTop: 28, fontSize: 26 }, [
        h('div', { display: 'flex', alignItems: 'baseline', fontFamily: 'Display', fontWeight: 700, fontSize: 34, letterSpacing: '-0.04em' }, [
          h('div', { display: 'flex' }, 'KFD'), h('div', { display: 'flex', color: '#D95B35' }, '.'),
        ]),
        h('div', { display: 'flex', fontFamily: 'Mono', color: '#666666', fontSize: 22, textTransform: 'uppercase' }, meta),
      ]),
    ])]) as any,
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Inter', data: regular, weight: 400, style: 'normal' },
        { name: 'Display', data: display, weight: 700, style: 'normal' },
        { name: 'Mono', data: mono, weight: 400, style: 'normal' },
      ],
    },
  );
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
