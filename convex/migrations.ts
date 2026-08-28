import { Migrations } from "@convex-dev/migrations";
import { components } from "./_generated/api";
import schema from "./schema";

export const migrations = new Migrations(components.migrations, { schema });

export const renameFeeToOpenFee = migrations.define({
  table: "options",
  migrateOne: async (_ctx, doc) => {
    const legacyDoc = doc as typeof doc & {
      fee?: number;
      openFee?: number;
    };

    if (legacyDoc.openFee !== undefined) {
      return {};
    }

    if (legacyDoc.fee === undefined) {
      return {};
    }

    return {
      openFee: legacyDoc.fee,
      fee: undefined,
      closeFee: legacyDoc.closeFee,
    };
  },
});

export const run = migrations.runner();
