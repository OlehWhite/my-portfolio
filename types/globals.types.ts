export interface ITemplate {
  main: string;
  secondary: string;
}

export type TemplateKey = keyof ITemplate;
