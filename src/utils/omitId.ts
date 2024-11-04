import {omit} from "lodash";

export const omitId = (obj: Record<any, any>) => omit(obj, 'id');
