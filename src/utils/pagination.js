// const pagination = async (query, callback) => {
//   const { page, limit, order } = query;
//   const reqPageIndex = page > 0 ? parseInt(page) : 1;
//   const pageIndex = page > 0 ? parseInt(page) - 1 : 0;
//   const perPageLimit = limit > 0 ? parseInt(limit) : 10;
//   const offset = pageIndex * perPageLimit;
//   const isPageNext = reqPageIndex * perPageLimit;
//   const sortOrder =
//     (order && order === 'DESC') || order === 'desc' ? 'DESC' : 'ASC';
//   const result = {};
//   const pagination = {};
//   const { doc, totalDoc, filter } = await callback(perPageLimit, offset, sortOrder);
//   result.result = doc;
//   pagination.currentPage = reqPageIndex;
//   pagination.currentPageLimit = perPageLimit;
//   pagination.total = totalDoc;
//   pagination.totalPage = Math.ceil(totalDoc / perPageLimit);
//   if (reqPageIndex > 1) {
//     pagination.prevPage = reqPageIndex - 1;
//     pagination.prevPageLimit = perPageLimit;
//   } else {
//     pagination.prevPage = null;
//     pagination.prevPageLimit = null;
//   }
//   if (isPageNext < totalDoc) {
//     pagination.nextPage = reqPageIndex + 1;
//     pagination.nextPageLimit = perPageLimit;
//   } else {
//     pagination.nextPage = null;
//     pagination.nextPageLimit = null;
//   }
//   result.pagination = pagination;
//   result.filter = filter;
//   return result;
// };

// export default pagination;



// pagination.js

const pagination = async (query, callback) => {
  const { page = 1, limit = 10, order = 'ASC' } = query;
  const pageIndex = parseInt(page);
  const perPageLimit = parseInt(limit);
  const sortOrder = order.toUpperCase() === 'DESC' ? -1 : 1;
  const offset = (pageIndex - 1) * perPageLimit;

  try {
    // Execute the callback function to fetch data with pagination
    const { doc, totalDoc } = await callback(perPageLimit, offset, sortOrder);

    // Calculate pagination details
    const pagination = {
      currentPage: pageIndex,
      currentPageLimit: perPageLimit,
      total: totalDoc,
      totalPage: Math.ceil(totalDoc / perPageLimit),
      prevPage: pageIndex > 1 ? pageIndex - 1 : null,
      prevPageLimit: perPageLimit,
      nextPage: offset + perPageLimit < totalDoc ? pageIndex + 1 : null,
      nextPageLimit: perPageLimit
    };

    // Return results including pagination details
    return { result: doc, pagination };
  } catch (error) {
    // Handle errors
    console.error("Pagination error:", error);
    throw error;
  }
}

export default pagination;

