import { z } from "zod";
import { Provider, SCHEMA_PROVIDER } from "./provider";

export const SCHEMA_PROFILE: z.ZodObject<{
  providers: z.ZodArray<typeof SCHEMA_PROVIDER>;
}> = z.object({
  providers: z.array(SCHEMA_PROVIDER),
});

export type ProfileOptions = z.input<typeof SCHEMA_PROFILE>;

export class Profile {
  _options: z.infer<typeof SCHEMA_PROFILE>;

  constructor(options: ProfileOptions) {
    this._options = SCHEMA_PROFILE.parse(options);
  }

  get providers(): Provider[] {
    return this._options.providers.map(
      (options: z.input<typeof SCHEMA_PROVIDER>): Provider =>
        new Provider(options),
    );
  }
}
