import API from '../utils/api';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';

export const fetchCategories = () => dispatch => {
  return API.fetchCategories().then(categories => {
    dispatch(getCategories(categories))
  })
}

export const getCategories = categories => ({
  type: GET_CATEGORIES,
  categories
})

export const updateCategory = category => ({
  type: UPDATE_CATEGORY,
  category
})
