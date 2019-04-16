/* @flow */

import {createSelector} from "reselect"

import type {State} from "../state/reducers/types"
import {getPrimarySearch} from "./boomSearches"

export const getSearchStats = createSelector<State, void, *, *>(
  getPrimarySearch,
  (search) => {
    if (search) {
      return search.stats
    }
  }
)
