const Blog = require('../models/blog')


  async function pagination(req, res, next)  {
  try {
    req.pagination = {}

    let sizeFromQuery = parseInt(req.query.size)
    let pageFromQuery = parseInt(req.query.page)

    let size = 20,
      page = 1 // default values
    if (!isNaN(sizeFromQuery) && sizeFromQuery > 0 && sizeFromQuery < 21) size = sizeFromQuery

    const numberOfResults = await Blog.find(req.findFilter).countDocuments().exec()

    const totalPages = Math.ceil(numberOfResults / size)
    if (!isNaN(pageFromQuery) && pageFromQuery > 0 && pageFromQuery <= totalPages) page = pageFromQuery

    const start = (page - 1) * size
    const end = page * size
    if (start > 0) {
      req.pagination.previousPage = {
        page: page - 1,
        limit: size,
      }
    }
    if (end < numberOfResults) {
      req.pagination.nextPage = {
        page: page + 1,
        limit: size,
      }
    }

    req.pagination.page = page
    req.pagination.sizePerPage = size
    req.pagination.totalPages = totalPages
    req.pagination.start = (page - 1) * size
    req.pagination.end = page * size
    req.pagination.numberOfResults = numberOfResults

    req.pageInfo = { results: numberOfResults, totalPages }
    if (req.pagination.previousPage) req.pageInfo.previousPage = req.pagination.previousPage
    req.pageInfo.currentPage = req.pagination.page
    if (req.pagination.nextPage) req.pageInfo.nextPage = req.pagination.nextPage

    next()
  } catch (err) {
    err.source = 'pagination middleware'
    next(err)
  }
  };
  const readingTime = (article) => {
    const noOfWords = article.split(' ').length
    // assuming the average person reads 200 words a minute
    const wordsPerMinute = noOfWords / 200
    return Math.round(wordsPerMinute) === 0 ? 1 : Math.round(wordsPerMinute)
  }
  
 

  module.exports ={ 
    pagination,
    readingTime
}