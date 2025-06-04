export type OboTokenResponse =
    | {
          token: string;
          ok: true;
      }
    | {
          error: string;
          ok: false;
      };

export const OboTokenResponse = {
    Error: (error: string): OboTokenResponse => ({ error, ok: false }),
    Ok: (token: string): OboTokenResponse => ({ token, ok: true }),
};
