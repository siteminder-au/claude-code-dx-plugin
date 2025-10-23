import { ComponentMeta } from './types';

export function generateSnippet(
  component: ComponentMeta,
  props: Record<string, any> = {}
): string {
  const propStrings = Object.entries(props)
    .map(([k, v]) => {
      if (k === 'children') return '';
      if (typeof v === 'string') return `:${k}="'${v}'"`;
      if (typeof v === 'boolean') return v ? `:${k}="true"` : '';
      return `:${k}='${JSON.stringify(v)}'`;
    })
    .filter(Boolean)
    .join(' ');

  // Use packageImport if available, fallback to path
  const importPath = component.packageImport || component.path;

  return `<template>
  <${component.exportName} ${propStrings}>
    ${props.children || ''}
  </${component.exportName}>
</template>

<script setup lang="ts">
import { ${component.exportName} } from '${importPath.replace(/\\/g, '/')}';
</script>`;
}
