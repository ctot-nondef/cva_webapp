/* eslint-disable */
import axios from 'axios'
import qs from 'qs'
let domain = ''
let axiosInstance = axios.create()
export const getDomain = () => {
  return domain
}
export const setDomain = ($domain) => {
  domain = $domain
}
export const getAxiosInstance = () => {
  return axiosInstance
}
export const setAxiosInstance = ($axiosInstance) => {
  axiosInstance = $axiosInstance
}
export const request = (method, url, body, queryParameters, form, config) => {
  method = method.toLowerCase()
  let keys = Object.keys(queryParameters)
  let queryUrl = url
  if (keys.length > 0) {
    queryUrl = url + '?' + qs.stringify(queryParameters)
  }
  // let queryUrl = url+(keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
  if (body) {
    return axiosInstance[method](queryUrl, body, config)
  } else if (method === 'get' || method === 'delete' || method === 'head' || method === 'option') {
    return axiosInstance[method](queryUrl, config)
  } else {
    return axiosInstance[method](queryUrl, qs.stringify(form), config)
  }
}
/*==========================================================
 *
 ==========================================================*/
/**
 *
 * request: api_token_auth_create
 * url: api_token_auth_createURL
 * method: api_token_auth_create_TYPE
 * raw_url: api_token_auth_create_RAW_URL
 * @param data -
 */
export const api_token_auth_create = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/api-token-auth/'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['data'] !== undefined) {
    body = parameters['data']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, config)
}
export const api_token_auth_create_RAW_URL = function() {
  return '/api-token-auth/'
}
export const api_token_auth_create_TYPE = function() {
  return 'post'
}
export const api_token_auth_createURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/api-token-auth/'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 *
 * request: api_annotations_list
 * url: api_annotations_listURL
 * method: api_annotations_list_TYPE
 * raw_url: api_annotations_list_RAW_URL
 * @param page - A page number within the paginated result set.
 * @param pageSize - Number of results to return per page.
 * @param title -
 * @param description -
 * @param collection -
 * @param category -
 * @param createdBy -
 */
export const api_annotations_list = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/api/annotations/'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['page'] !== undefined) {
    queryParameters['page'] = parameters['page']
  }
  if (parameters['pageSize'] !== undefined) {
    queryParameters['page_size'] = parameters['pageSize']
  }
  if (parameters['title'] !== undefined) {
    queryParameters['title'] = parameters['title']
  }
  if (parameters['description'] !== undefined) {
    queryParameters['description'] = parameters['description']
  }
  if (parameters['collection'] !== undefined) {
    queryParameters['collection'] = parameters['collection']
  }
  if (parameters['category'] !== undefined) {
    queryParameters['category'] = parameters['category']
  }
  if (parameters['createdBy'] !== undefined) {
    queryParameters['created_by'] = parameters['createdBy']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const api_annotations_list_RAW_URL = function() {
  return '/api/annotations/'
}
export const api_annotations_list_TYPE = function() {
  return 'get'
}
export const api_annotations_listURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/api/annotations/'
  if (parameters['page'] !== undefined) {
    queryParameters['page'] = parameters['page']
  }
  if (parameters['pageSize'] !== undefined) {
    queryParameters['page_size'] = parameters['pageSize']
  }
  if (parameters['title'] !== undefined) {
    queryParameters['title'] = parameters['title']
  }
  if (parameters['description'] !== undefined) {
    queryParameters['description'] = parameters['description']
  }
  if (parameters['collection'] !== undefined) {
    queryParameters['collection'] = parameters['collection']
  }
  if (parameters['category'] !== undefined) {
    queryParameters['category'] = parameters['category']
  }
  if (parameters['createdBy'] !== undefined) {
    queryParameters['created_by'] = parameters['createdBy']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 *
 * request: api_annotations_read
 * url: api_annotations_readURL
 * method: api_annotations_read_TYPE
 * raw_url: api_annotations_read_RAW_URL
 * @param id - A unique integer value identifying this annotation.
 * @param title -
 * @param description -
 * @param collection -
 * @param category -
 * @param createdBy -
 */
export const api_annotations_read = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/api/annotations/{id}/'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['title'] !== undefined) {
    queryParameters['title'] = parameters['title']
  }
  if (parameters['description'] !== undefined) {
    queryParameters['description'] = parameters['description']
  }
  if (parameters['collection'] !== undefined) {
    queryParameters['collection'] = parameters['collection']
  }
  if (parameters['category'] !== undefined) {
    queryParameters['category'] = parameters['category']
  }
  if (parameters['createdBy'] !== undefined) {
    queryParameters['created_by'] = parameters['createdBy']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const api_annotations_read_RAW_URL = function() {
  return '/api/annotations/{id}/'
}
export const api_annotations_read_TYPE = function() {
  return 'get'
}
export const api_annotations_readURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/api/annotations/{id}/'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['title'] !== undefined) {
    queryParameters['title'] = parameters['title']
  }
  if (parameters['description'] !== undefined) {
    queryParameters['description'] = parameters['description']
  }
  if (parameters['collection'] !== undefined) {
    queryParameters['collection'] = parameters['collection']
  }
  if (parameters['category'] !== undefined) {
    queryParameters['category'] = parameters['category']
  }
  if (parameters['createdBy'] !== undefined) {
    queryParameters['created_by'] = parameters['createdBy']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 *
 * request: api_categories_list
 * url: api_categories_listURL
 * method: api_categories_list_TYPE
 * raw_url: api_categories_list_RAW_URL
 * @param page - A page number within the paginated result set.
 * @param pageSize - Number of results to return per page.
 * @param name -
 */
export const api_categories_list = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/api/categories/'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['page'] !== undefined) {
    queryParameters['page'] = parameters['page']
  }
  if (parameters['pageSize'] !== undefined) {
    queryParameters['page_size'] = parameters['pageSize']
  }
  if (parameters['name'] !== undefined) {
    queryParameters['name'] = parameters['name']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const api_categories_list_RAW_URL = function() {
  return '/api/categories/'
}
export const api_categories_list_TYPE = function() {
  return 'get'
}
export const api_categories_listURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/api/categories/'
  if (parameters['page'] !== undefined) {
    queryParameters['page'] = parameters['page']
  }
  if (parameters['pageSize'] !== undefined) {
    queryParameters['page_size'] = parameters['pageSize']
  }
  if (parameters['name'] !== undefined) {
    queryParameters['name'] = parameters['name']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 *
 * request: api_categories_read
 * url: api_categories_readURL
 * method: api_categories_read_TYPE
 * raw_url: api_categories_read_RAW_URL
 * @param id - A unique integer value identifying this category.
 * @param name -
 */
export const api_categories_read = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/api/categories/{id}/'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['name'] !== undefined) {
    queryParameters['name'] = parameters['name']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const api_categories_read_RAW_URL = function() {
  return '/api/categories/{id}/'
}
export const api_categories_read_TYPE = function() {
  return 'get'
}
export const api_categories_readURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/api/categories/{id}/'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['name'] !== undefined) {
    queryParameters['name'] = parameters['name']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 *
 * request: api_collections_list
 * url: api_collections_listURL
 * method: api_collections_list_TYPE
 * raw_url: api_collections_list_RAW_URL
 * @param page - A page number within the paginated result set.
 * @param pageSize - Number of results to return per page.
 * @param title -
 * @param createdBy -
 */
export const api_collections_list = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/api/collections/'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['page'] !== undefined) {
    queryParameters['page'] = parameters['page']
  }
  if (parameters['pageSize'] !== undefined) {
    queryParameters['page_size'] = parameters['pageSize']
  }
  if (parameters['title'] !== undefined) {
    queryParameters['title'] = parameters['title']
  }
  if (parameters['createdBy'] !== undefined) {
    queryParameters['created_by'] = parameters['createdBy']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const api_collections_list_RAW_URL = function() {
  return '/api/collections/'
}
export const api_collections_list_TYPE = function() {
  return 'get'
}
export const api_collections_listURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/api/collections/'
  if (parameters['page'] !== undefined) {
    queryParameters['page'] = parameters['page']
  }
  if (parameters['pageSize'] !== undefined) {
    queryParameters['page_size'] = parameters['pageSize']
  }
  if (parameters['title'] !== undefined) {
    queryParameters['title'] = parameters['title']
  }
  if (parameters['createdBy'] !== undefined) {
    queryParameters['created_by'] = parameters['createdBy']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 *
 * request: api_collections_read
 * url: api_collections_readURL
 * method: api_collections_read_TYPE
 * raw_url: api_collections_read_RAW_URL
 * @param id - A unique integer value identifying this collection.
 * @param title -
 * @param createdBy -
 */
export const api_collections_read = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/api/collections/{id}/'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['title'] !== undefined) {
    queryParameters['title'] = parameters['title']
  }
  if (parameters['createdBy'] !== undefined) {
    queryParameters['created_by'] = parameters['createdBy']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const api_collections_read_RAW_URL = function() {
  return '/api/collections/{id}/'
}
export const api_collections_read_TYPE = function() {
  return 'get'
}
export const api_collections_readURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/api/collections/{id}/'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['title'] !== undefined) {
    queryParameters['title'] = parameters['title']
  }
  if (parameters['createdBy'] !== undefined) {
    queryParameters['created_by'] = parameters['createdBy']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* The endpoint to query external elasticsearch index;
the query matches all fields
* request: api_dboe_query_list
* url: api_dboe_query_listURL
* method: api_dboe_query_list_TYPE
* raw_url: api_dboe_query_list_RAW_URL
     * @param q -
*/
export const api_dboe_query_list = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/api/dboe-query/'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const api_dboe_query_list_RAW_URL = function() {
  return '/api/dboe-query/'
}
export const api_dboe_query_list_TYPE = function() {
  return 'get'
}
export const api_dboe_query_listURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/api/dboe-query/'
  if (parameters['q'] !== undefined) {
    queryParameters['q'] = parameters['q']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 *
 * request: api_documents_list
 * url: api_documents_listURL
 * method: api_documents_list_TYPE
 * raw_url: api_documents_list_RAW_URL
 * @param page - A page number within the paginated result set.
 * @param pageSize - Number of results to return per page.
 * @param esId -
 */
export const api_documents_list = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/api/documents/'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['page'] !== undefined) {
    queryParameters['page'] = parameters['page']
  }
  if (parameters['pageSize'] !== undefined) {
    queryParameters['page_size'] = parameters['pageSize']
  }
  if (parameters['esId'] !== undefined) {
    queryParameters['es_id'] = parameters['esId']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const api_documents_list_RAW_URL = function() {
  return '/api/documents/'
}
export const api_documents_list_TYPE = function() {
  return 'get'
}
export const api_documents_listURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/api/documents/'
  if (parameters['page'] !== undefined) {
    queryParameters['page'] = parameters['page']
  }
  if (parameters['pageSize'] !== undefined) {
    queryParameters['page_size'] = parameters['pageSize']
  }
  if (parameters['esId'] !== undefined) {
    queryParameters['es_id'] = parameters['esId']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 *
 * request: api_documents_read
 * url: api_documents_readURL
 * method: api_documents_read_TYPE
 * raw_url: api_documents_read_RAW_URL
 * @param id - A unique integer value identifying this es_document.
 * @param esId -
 */
export const api_documents_read = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/api/documents/{id}/'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['esId'] !== undefined) {
    queryParameters['es_id'] = parameters['esId']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const api_documents_read_RAW_URL = function() {
  return '/api/documents/{id}/'
}
export const api_documents_read_TYPE = function() {
  return 'get'
}
export const api_documents_readURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/api/documents/{id}/'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['esId'] !== undefined) {
    queryParameters['es_id'] = parameters['esId']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 *
 * request: api_users_list
 * url: api_users_listURL
 * method: api_users_list_TYPE
 * raw_url: api_users_list_RAW_URL
 * @param page - A page number within the paginated result set.
 * @param pageSize - Number of results to return per page.
 * @param username -
 * @param collections -
 */
export const api_users_list = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/api/users/'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['page'] !== undefined) {
    queryParameters['page'] = parameters['page']
  }
  if (parameters['pageSize'] !== undefined) {
    queryParameters['page_size'] = parameters['pageSize']
  }
  if (parameters['username'] !== undefined) {
    queryParameters['username'] = parameters['username']
  }
  if (parameters['collections'] !== undefined) {
    queryParameters['collections'] = parameters['collections']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const api_users_list_RAW_URL = function() {
  return '/api/users/'
}
export const api_users_list_TYPE = function() {
  return 'get'
}
export const api_users_listURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/api/users/'
  if (parameters['page'] !== undefined) {
    queryParameters['page'] = parameters['page']
  }
  if (parameters['pageSize'] !== undefined) {
    queryParameters['page_size'] = parameters['pageSize']
  }
  if (parameters['username'] !== undefined) {
    queryParameters['username'] = parameters['username']
  }
  if (parameters['collections'] !== undefined) {
    queryParameters['collections'] = parameters['collections']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 *
 * request: api_users_read
 * url: api_users_readURL
 * method: api_users_read_TYPE
 * raw_url: api_users_read_RAW_URL
 * @param id - A unique integer value identifying this user.
 * @param username -
 * @param collections -
 */
export const api_users_read = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/api/users/{id}/'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['username'] !== undefined) {
    queryParameters['username'] = parameters['username']
  }
  if (parameters['collections'] !== undefined) {
    queryParameters['collections'] = parameters['collections']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const api_users_read_RAW_URL = function() {
  return '/api/users/{id}/'
}
export const api_users_read_TYPE = function() {
  return 'get'
}
export const api_users_readURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/api/users/{id}/'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['username'] !== undefined) {
    queryParameters['username'] = parameters['username']
  }
  if (parameters['collections'] !== undefined) {
    queryParameters['collections'] = parameters['collections']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 *
 * request: authenticate_create
 * url: authenticate_createURL
 * method: authenticate_create_TYPE
 * raw_url: authenticate_create_RAW_URL
 * @param data -
 */
export const authenticate_create = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/authenticate/'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['data'] !== undefined) {
    body = parameters['data']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, config)
}
export const authenticate_create_RAW_URL = function() {
  return '/authenticate/'
}
export const authenticate_create_TYPE = function() {
  return 'post'
}
export const authenticate_createURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/authenticate/'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
