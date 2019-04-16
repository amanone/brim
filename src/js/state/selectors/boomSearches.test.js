/* @flow */
import {Handler} from "../BoomClient"
import {getSomeAreFetching} from "./boomSearches"
import {registerBoomSearch, setBoomSearchStatus} from "../state/actions/boomSearches"
import initTestStore from "../test/initTestStore"

test("#getSomeAreFetching true", () => {
  let store
  store = initTestStore()

  store.dispatchAll([
    registerBoomSearch("A", {handler: new Handler(), tag: "detail"}),
    registerBoomSearch("B", {handler: new Handler(), tag: "detail"})
  ])

  const state = store.getState()

  expect(getSomeAreFetching(state)).toBe(true)
})

test("#getSomeAreFetching false", () => {
  let store
  store = initTestStore()

  store.dispatchAll([
    registerBoomSearch("A", {handler: new Handler(), tag: "detail"}),
    registerBoomSearch("B", {handler: new Handler(), tag: "detail"}),
    setBoomSearchStatus("A", "SUCCESS"),
    setBoomSearchStatus("B", "ERROR")
  ])

  const state = store.getState()

  expect(getSomeAreFetching(state)).toBe(false)
})
