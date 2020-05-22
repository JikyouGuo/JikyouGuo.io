import Axios from 'axios';
import Urls from './Urls';

const appkey = /* 'DuYi1617568049_1564983580140' */ 'KakuJikyou_1567658614549';
const request = Axios.create({
  baseURL: Urls.baseUrl,
  params: {
    appkey
  }
});

/**
 * @param {Number} page
 * @param {Number} size
 */
function findByPage(page, size) {
  return request.get(Urls.findByPage, {
    params: {
      page,
      size
    }
  });
}

function updateStudent(options) {
  return request.get(Urls.updateStu, {
    params: {
      ...options
    }
  });
}

function searchStudent({ sex = -1, search = '', page = 1, size = 1 }) {
  return request.get(Urls.searchSut, {
    params: {
      sex,
      search,
      page,
      size
    }
  });
}

export default {
  findByPage,
  updateStudent,
  searchStudent
};
