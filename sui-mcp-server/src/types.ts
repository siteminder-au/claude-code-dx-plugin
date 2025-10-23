export type PropSchema = {
  type: string | { name?: string; value?: any };
  required?: boolean;
  defaultValue?: any;
  description?: string;
  enum?: string[];
};

export interface ComponentMeta {
  exportName: string;
  path: string;
  packageImport?: string; // NEW
  props: Record<string, PropSchema>;
  children?: string;
  examples: any[];
  a11y: any[];
}

export type MetaManifest = Record<string, ComponentMeta>;