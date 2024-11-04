import {concat, flow, keys, sample} from "lodash";
import {omitId} from "./omitId";

const lastEmpty = (arr: string[]) => concat(arr, '')

export const makeHeader = flow(
    sample,
    omitId,
    keys,
    lastEmpty
)