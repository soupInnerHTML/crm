import {omit} from "lodash";

export const omitId = (obj: Record<string, string>) => omit(obj, 'id');
