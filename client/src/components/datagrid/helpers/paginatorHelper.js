const calculateMaximumPages = function (pageLength = 0, totalRecords = 0) {
  return totalRecords !== 0 ? Math.round(totalRecords / pageLength) : 0
}

const calculateCurrentPage = function (offset, pageLength) {
  return Math.round(offset / pageLength) + 1
}

const pagination = function (currentPage, maxPage) {
  let current = currentPage,
    last = maxPage,
    delta = 2,
    left = current - delta,
    right = current + delta + 1,
    range = [],
    rangeWithDots = [],
    l

  for (let i = 1; i <= last; i++) {
    if (i === 1 || i === last || (i >= left && i < right)) {
      range.push(i)
    }
  }

  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1)
      } else if (i - l !== 1) {
        rangeWithDots.push('...')
      }
    }
    rangeWithDots.push(i)
    l = i
  }

  return rangeWithDots
}

export {
  calculateCurrentPage,
  calculateMaximumPages,
  pagination
}
