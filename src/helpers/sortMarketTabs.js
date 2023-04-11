import { customMarketTabs } from "../api";

export const sortMarketTabs = listOfQuote => {
  let reference_array = customMarketTabs();

  reference_array = reference_array.map(element => {
    return element.toUpperCase();
  })

  listOfQuote = listOfQuote.slice(1).map(element => {
    return element.toUpperCase();
  })

  let notPresent = []

  let newlist = listOfQuote.map(a => {
    if (reference_array.includes(a)) {
      return a
    }
    return notPresent.push(a)
  })

  newlist = newlist.filter(element => {
    return !Number.isInteger(element) && element != undefined && element != null
  })

  newlist = _.sortBy(newlist, x => _.findIndex(reference_array, y => x === y))

  // newlist = newlist.concat(notPresent)

  let listWithAll = ['All']

  listWithAll = listWithAll.concat(newlist)

  return listWithAll
}