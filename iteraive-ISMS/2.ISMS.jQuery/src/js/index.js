var tableData = [];
var nowPage = 1;
var allPage = 0;
var pageSize = 15;
function bindEvent() {
  $('#menu-list').on('click', 'dd', function() {
    $('.active').removeClass('active');
    $(this).addClass('active');
    var id = $(this).data('id');
    $('.content').fadeOut();
    $('#' + id).fadeIn();
    if (id == 'student-list') {
      nowPage = 1;
      $('#search-inp').val('');
      getTableData();
    }
  });
  $('#add-student-btn').click(function(e) {
    e.preventDefault();
    var data = $('#add-student-form').serializeArray();
    data = formatData(data);
    if (!data) {
      alert('请将信息填写完全后提交');
    } else {
      transferData('/api/student/addStudent', data, function(res) {
        alert('提交成功');
        $('#add-student-form')[0].reset();
        $('#menu-list > dd[data-id=student-list]').click();
      });
    }
  });
  $('#table-body')
    .on('click', '.edit', function(e) {
      $('#modal').slideDown();
      var index = $(this)
        .parents('tr')
        .index();
      renderEditForm(tableData[index]);
    })
    .on('click', '.del', function(e) {
      var index = $(this)
        .parents('tr')
        .index();
      var isDel = confirm('确认删除学号为' + tableData[index].sNo + tableData[index].name + '学生信息?');
      if (isDel) {
        transferData(
          '/api/student/delBySno',
          {
            sNo: tableData[index].sNo
          },
          function(res) {
            alert('删除成功');
            nowPage = 1;
            getTableData($('#search-inp').val());
          }
        );
      }
    });

  $('#mask').click(function() {
    $('#modal').slideUp();
  });
  $('#edit-submit-btn').click(function(e) {
    e.preventDefault();
    var data = $('#edit-form').serializeArray();
    data = formatData(data);
    if (!data) {
      alert('请将信息填写完整后提交');
    } else {
      transferData('/api/student/updateStudent', data, function(res) {
        alert('提交成功');
        $('#modal').slideUp();
        getTableData($('#search-inp').val());
      });
    }
  });
  $('#search-btn').click(function() {
    var val = $('#search-inp').val();
    nowPage = 1;
    getTableData(val);
  });
}
// 将表单数据转换成对象
function formatData(data) {
  var obj = {};
  for (var i = 0; i < data.length; i++) {
    var item = data[i];
    if (!item.value) {
      return false;
    }
    obj[item.name] = item.value;
  }
  return obj;
}
// 获取学生列表数据
function getTableData(val) {
  if (val) {
    var sex = -1;
    var search = val.trim();
    if (val.indexOf('男') > -1) {
      sex = 0;
      search = val.replace('男', '').trim();
    } else if (val.indexOf('女') > -1) {
      sex = 1;
      search = val.replace('女', '').trim();
    }
    transferData(
      '/api/student/searchStudent',
      {
        sex: sex,
        search: search,
        page: nowPage,
        size: pageSize
      },
      function(data) {
        tableData = data.searchList;
        allPage = Math.ceil(data.cont / pageSize);
        renderTable(data.searchList);
      }
    );
  } else {
    transferData(
      '/api/student/findByPage',
      {
        size: pageSize,
        page: nowPage
      },
      function(data) {
        tableData = data.findByPage;
        allPage = Math.ceil(data.cont / pageSize);
        renderTable(data.findByPage);
      }
    );
  }
}
function renderTable(data) {
  var str = '';
  data.forEach(function(item, index) {
    str += '<tr>\
        <td>' + item.sNo + '</td>\
        <td>' + item.name + '</td>\
        <td>' + (item.sex ? '女' : '男') + '</td>\
        <td>' + item.email + '</td>\
        <td>' + (new Date().getFullYear() - item.birth) + '</td>\
        <td>' + item.phone + '</td>\
        <td>' + item.address + '</td>\
        <td>\
            <button class="btn edit">编辑</button>\
            <button class="btn del">删除</button>\
        </td>\
    </tr> ';
  });
  $('#table-body').html(str);
  $('.page').pager({
    nowPage: nowPage,
    allPage: allPage,
    callback: function(page) {
      nowPage = page;
      getTableData($('#search-inp').val());
    }
  });
}
// 回填表单数据
function renderEditForm(data) {
  var form = $('#edit-form')[0];
  for (var prop in data) {
    form[prop] ? (form[prop].value = data[prop]) : '';
  }
}
function transferData(path, data, cb) {
  $.ajax({
    url: 'https://api.duyiedu.com' + path,
    type: 'get',
    data: $.extend(
      {
        appkey: 'KakuJikyou_1567658614549'
      },
      data
    ),
    dataType: 'json',
    success: function(res) {
      if (res.status == 'success') {
        cb(res.data);
      } else {
        alert(res.msg);
      }
    }
  });
}
function init() {
  bindEvent();
  $('#menu-list > dd[data-id=student-list]').click();
}
init();
