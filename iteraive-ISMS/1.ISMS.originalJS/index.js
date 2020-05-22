var form = document.getElementById('add-student-form'),
  dds = [...document.querySelectorAll('.left-menu dl dd')],
  tbody = document.querySelector('#student-list table tbody'),
  modal = document.querySelector('.modal'),
  editForm = document.getElementById('edit-student-form'),
  editBtns = [...editForm.querySelectorAll('button')],
  prevBtn = document.getElementById('prev-btn'),
  nextBtn = document.getElementById('next-btn'),
  pageOffset = document.getElementById('page-offset');

var tableData = [],
  current = 1,
  pageSize = 15,
  totlePage = 0;

function init() {
  regEvent();
  dds[0].click();
}

init();

/**
 * 注册事件
 */
function regEvent() {
  // 菜单项目 => 学生列表，添加学生；页面切换
  var menuItems = document.querySelector('.left-menu dl');
  menuItems.onclick = e => {
    if (e.target.tagName === 'DD') {
      changeClass(e.target, 'active');
      if (e.target.getAttribute('data-id') === 'student-list') getTableData(); // 如果点击学生列表，渲染表格
    }
  };

  // 添加页面提交按钮
  var commitBtn = document.getElementById('commit-btn');
  commitBtn.onclick = e => {
    e.preventDefault();
    var studentObj = getFormData(form);
    if (!studentObj) alert('Please complete the form.');
    else {
      transferData('/api/student/addStudent', studentObj, () => {
        form.reset();
        var flag = confirm('Added successfully.\nWhether to jump to the student list?');
        if (flag) {
          dds[0].click();
        }
      });
    }
  };

  // 表格内按钮
  tbody.onclick = e => {
    if (e.target.tagName !== 'BUTTON') {
      return;
    }
    var stuData = tableData[e.target.getAttribute('data-index')];
    // 编辑按钮
    if (e.target.className.includes('edit')) {
      modal.classList.add('active');
      // 传入单个学生数据
      renderEditForm(stuData);
    }
    // 删除按钮
    if (e.target.className.includes('delete')) {
      var userConfirm = confirm('Are you sure to delete?');
      if (userConfirm) {
        transferData('/api/student/delBySno', { sNo: stuData.sNo }, () => {
          alert('Deleted successfully.');
        });
        dds[0].click();
      }
    }
  };

  // 编辑页面按钮
  editBtns.forEach(btn => {
    btn.onclick = e => {
      e.preventDefault();
      modal.classList.remove('active');
      dds[0].click();
    };
  });
  // 提交按钮
  editBtns[0].onclick = e => {
    var stuObj = getFormData(editForm);
    transferData('/api/student/updateStudent', stuObj, () => {
      alert('Modified successfully.');
    });
  };

  // 翻页按钮
  prevBtn.onclick = e => {
    if (current > 1) {
      current--;
      getTableData();
    }
  };
  nextBtn.onclick = e => {
    if (current < totlePage) {
      current++;
      getTableData();
    }
  };
}

/**
 * 改变元素的类（toggle("active"): dd && page）
 * @param {HTMLElement} dom 要改变的元素
 * @param {String} str 要改变的类
 */
function changeClass(dom, str) {
  // change dd
  dds.forEach(dd => dd.classList.remove('active'));
  dom.classList.toggle(str);

  // change page
  var pages = [...document.querySelectorAll('.page')];
  var page = document.getElementById(dom.getAttribute('data-id'));
  pages.forEach(dom => dom.classList.remove('active'));
  page.classList.add('active');
}

/**
 * @param {HTMLElement} form
 */
function getFormData(form) {
  var studentObj = {};

  var types = [];
  var inputs = [...form.querySelectorAll('input')];
  inputs.forEach(input => {
    types.push(input.getAttribute('name'));
  });
  types = [...new Set(types)];

  for (let i = 0; i < types.length; i++) {
    var type = types[i];
    var value = form[type].value;
    if (!value) {
      return;
    }
    if (type === 'sex' || type === 'birth') studentObj[type] = Number(value);
    else studentObj[type] = value;
  }
  return studentObj;
}

/**
 * 向后端存储数据
 * @param {String} url 接口地址
 * @param {*} param 请求参数
 */
function saveData(url, param) {
  var result = null;
  var xhr = null;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    xhr = new ActiveXObject('Microsoft.XMLHTTP');
  }
  if (typeof param == 'string') {
    xhr.open('GET', url + '?' + param, false);
  } else if (typeof param == 'object') {
    var str = '';
    for (var prop in param) {
      str += prop + '=' + param[prop] + '&';
    }
    xhr.open('GET', url + '?' + str, false);
  } else {
    xhr.open('GET', url + '?' + param.toString(), false);
  }
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        result = JSON.parse(xhr.responseText);
      } else {
        result = {
          status: xhr.status,
          msg: xhr.status + '服务器错误'
        };
      }
    }
  };
  xhr.send();
  return result;
}

/**
 * 获取学生列表并渲染
 */
function getTableData() {
  // transferData("/api/student/findAll", {}, resp => {
  transferData('/api/student/findByPage', { page: current, size: pageSize }, resp => {
    if (resp.status === 'success') {
      renderTable(resp.data.findByPage);
      tableData = resp.data.findByPage;
      // 渲染页数
      totlePage = Math.ceil(resp.data.cont / pageSize);
      pageOffset.innerHTML = `${current}/${totlePage}`;
      // 改变pager样式
      if (current === 1) prevBtn.classList.add('disabled');
      else prevBtn.classList.remove('disabled');
      if (current === totlePage) nextBtn.classList.add('disabled');
      else nextBtn.classList.remove('disabled');
    }
  });
}

/**
 * 请求数据
 * @param {String} path 请求路径
 * @param {Object} data 携带数据
 * @param {Function} cb 成功回调
 */
function transferData(path, data, cb) {
  var resp = saveData('https://api.duyiedu.com' + path, {
    appkey: 'KakuJikyou_1567658614549',
    ...data
  });
  // 此处的 ...data 可用 Object.assign({config}, data)
  if (resp.status === 'success') {
    cb(resp);
  } else alert(resp.msg);
}

/**
 * 渲染表格
 * @param {Array} data 服务器返回数据 resp.data
 */
function renderTable(data) {
  var str = ``;
  data.forEach((item, index) => {
    str += `
        <tr>
            <td>${item.name}</td>
            <td>${item.sex ? '女' : '男'}</td>
            <td>${item.sNo}</td>
            <td>${item.email}</td>
            <td>${new Date().getFullYear() - item.birth}</td>
            <td>${item.phone}</td>
            <td>${item.address}</td>
            <td>
                <button class="btn edit" data-index="${index}">编辑</button>
                <button class="btn delete" data-index="${index}">删除</button>
            </td>
        </tr>
        `;
  });
  tbody.innerHTML = str;
}

/**
 * 渲染编辑页表单
 * @param {Object} stuData 单个学生数据
 */
function renderEditForm(stuData) {
  Object.keys(stuData).forEach(type => {
    // in 判断是否在form中存在
    if (type in editForm) editForm[type].value = stuData[type];
  });
}
