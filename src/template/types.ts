export type Template = {
  execute(providers: Map<string, any>, options: any): Promise<any>;
};
