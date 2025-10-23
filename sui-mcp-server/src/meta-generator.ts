import fs from 'fs';
import path from 'path';
import { parse } from 'vue-docgen-api';
import { MetaManifest, ComponentMeta, PropSchema } from './types';

const COMPONENT_DIR = path.resolve(process.env.COMP_REPO || './libs/sui-core/src/app/components/');
const OUT_FILE = path.resolve(__dirname, '..', 'component-meta.json');

function walk(dir: string, files: string[] = []): string[] {
  if (!fs.existsSync(dir)) return files;
  fs.readdirSync(dir).forEach((file) => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full, files);
    else if (/\.vue$/.test(file)) files.push(full);
  });
  return files;
}

async function generateMeta() {
  const manifest: MetaManifest = {};
  const componentFiles = walk(COMPONENT_DIR);

  for (const file of componentFiles) {
    try {
      const doc = await parse(file); // parse returns a Promise

      const fileName = path.basename(file, '.vue'); // e.g., sm-banner
      const meta: ComponentMeta = {
        exportName: doc.displayName || fileName,
        path: path.relative(process.cwd(), file),
        packageImport: `@siteminder/sui-core/components/${fileName}`, // NEW
        props: {},
        children: doc.slots?.some(slot => slot.name === 'default') ? 'node|string' : undefined,
        examples: [],
        a11y: [],
      };

      if (doc.props) {
        Object.entries(doc.props).forEach(([propName, info]: any) => {
          meta.props[propName] = {
            type: info.type?.name || 'unknown',
            required: info.required || false,
            defaultValue: info.defaultValue?.value,
            description: info.description || '',
            enum: info.values || undefined,
          } as PropSchema;
        });
      }

      manifest[meta.exportName] = meta;
    } catch (err) {
      console.warn('Failed to parse Vue file', file, err);
    }
  }

  fs.writeFileSync(OUT_FILE, JSON.stringify(manifest, null, 2));
  console.log(`Saved component metadata to ${OUT_FILE}`);
}

generateMeta().catch(err => {
  console.error('Meta generation failed:', err);
  process.exit(1);
});
