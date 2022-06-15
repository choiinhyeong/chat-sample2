import {isChildMenu} from '@/assets/js/modules/menu/menu-common';
import { v3ImgPreviewFn } from 'v3-img-preview'
import router from "@/router";

export const lengthCheck = res => {
  return !!(res && res.items && res.items.length > 0);
};

export const collectionCheck = (items, key) => {
  return !!(items && items.length > 0 && items[0][key] > 0);
}

export const getItems = res => {
  return res.items;
};

export const getItem = res => {
  return res.items[0];
};

export const getCheckItems = res => {
  if(lengthCheck(res)){
    return res.items;
  }
  return [];
}

export const isSuccess = res => {
  return !!(res && res.result && res.result.number === 200);
};

export const getResult = res => {
  if(res && res.result){
    return res.result;
  }
  return {
    number: 500,
    message: '오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
  };
};

export const getPaging = res => {
  if(res && res.paging){
    return res.paging;
  }
  return {
    hasMore: false,
    totalCount: 0,
    pageSize: 10,
    pageNo: 1
  }
}

export const ymdStrToFormat = (ymdStr, format) => {
  return ymdStr.substr(0, 4) + format + ymdStr.substr(4, 2) + format + ymdStr.substr(6, 2);
}

export const hhmmStrToFormat = (hhmm, division) => {
  return hhmm.substr(0, 2) + division + hhmm.substr(2, 2);
}

export const ymdStrToDate = (ymd) => {
  return new Date(Number(ymd.substr(0, 4)), Number(ymd.substr(4, 2))-1, Number(ymd.substr(6, 2)));
}

export const timestampToDateFormat = (timestamp, format) => {
  let d = new Date();

  if (timestamp !== null && timestamp !== '')
    d = new Date(timestamp);
  return dateToDateFormat(d, format);
}

export const ymdStrToDateFormat = (ymd, format) => {
  return dateToDateFormat(ymdStrToDate(ymd), format);
}

const week = ['일', '월', '화', '수', '목', '금', '토'];

export const dateToDateFormat = (d, format) => {
  const yyyy = d.getFullYear(),
        mm = ('0' + (d.getMonth() + 1)).slice(-2),	// Months are zero based. Add leading 0.
        dd = ('0' + d.getDate()).slice(-2),			// Add leading 0.
        w = (week[d.getDay()]),
        hh = d.getHours(),
        min = ('0' + d.getMinutes()).slice(-2);		// Add leading 0.

  let h = hh, ampm = 'AM';
  let time;
  if (hh > 12) {
    h = hh - 12;
    ampm = 'PM';
  } else if (hh === 12) {
    h = 12;
    ampm = 'PM';
  } else if (hh === 0) {
    h = 12;
  }
  if(format === 'yyyy'){
    time = yyyy;
  } else if (format === 'yyyy-MM-dd') {
    time = yyyy + '-' + mm + '-' + dd;
  }else if(format === 'yyyy.MM.dd'){
    time = yyyy + '.' + mm + '.' + dd;
  }else if(format === 'yyyyMMdd'){
    time = yyyy + '' + mm + '' + dd;
  }else if(format === 'yyyy-MM-dd(w)'){
    time = `${yyyy}-${mm}-${dd} (${w})`;
  }else if(format === 'yyyy.MM.dd(w)'){
    time = `${yyyy}.${mm}.${dd} (${w})`;
  }else if(format === 'yyyy.MM.dd hh:mm'){
    time = yyyy + '.' + mm + '.' + dd + ' ' + hh + ':' + min;
  }else if(format === 'yyyy-MM-dd, hh:mm'){
    time = yyyy + '-' + mm + '-' + dd + ', ' + hh + ':' + min;
  }else if(format === 'yyyy-MM-dd(w), hh:mm'){
    time = `${yyyy}-${mm}-${dd}(${w}), ${hh}:${min}`;
  }else if(format === 'hh:mm'){
    time = hh + ':' + min;
  }else if(format === 'hhmm'){
    time = hh + '' + min;
  }else if(format === 'hh:mm(A)'){
    time = h + ':' + min + '(' + ampm + ')';
  }else if(format === '(A) hh:mm'){
    if(ampm === 'AM') ampm = '오전';
    else ampm = '오후';
    time = ampm + h + ':' + min;
  } else{
    time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;
  }
  return time;
}

export const getCalcDate = (dParam, calcNum, format) => {
  let date = new Date();
  let ymdDt = '';

  // Year기준
  if (dParam.toUpperCase() === 'Y') {
    ymdDt = new Date(date.setFullYear(date.getFullYear() + calcNum));
  }
  // Month기준
  else if (dParam.toUpperCase() === 'M') {
    ymdDt = new Date(date.setMonth(date.getMonth() + calcNum));
  }
  // Day기준
  else if (dParam.toUpperCase() === 'D') {
    ymdDt = new Date(date.setDate(date.getDate() + calcNum));
  }
  return dateToDateFormat(ymdDt, format);
}

export const getTodayDate = (format) => {
  let date = new Date();
  let year = date.getFullYear();
  let month = '' + (date.getMonth()+1);
  let day = '' + date.getDate();

  if(month.length < 2){
    month = '0' + month;
  }

  if(day.length < 2){
    day = '0' + day;
  }

  let today = '';

  if(format === 'yyyy'){
    today = year.toString();
  } else if(format === 'yyyy.mm.dd'){
    today = year.toString() + '.' + month + '.' + day;
  }else if(format === 'yyyy-mm-dd'){
    today = year.toString() + '-' + month + '-' + day;
  }else{
      today = year.toString() + month + day;
  }


  return today;
}

// export const queryToValue = (query, isNum, defaultVal) => {
//   if(query){
//     return isNum ? parseInt(query) : query;
//   }else{
//     if(defaultVal !== null && defaultVal !== undefined){
//       return defaultVal;
//     }else{
//       return isNum ? 1 : '';
//     }
//   }
// }

// export const itemsToOptions = (items, {nameKey, valueKey}) => {
//   return items.map(item => ({
//     name: item[nameKey],
//     value: item[valueKey]
//   }));
// }

export const phoneNumberMask = ( phoneNumber ) => {
  if (!phoneNumber) return phoneNumber
  phoneNumber = phoneNumber.replace(/[^0-9]/g, '')
  let res = ''
  if (phoneNumber.length < 3) {
    res = phoneNumber
  } else {
    if (phoneNumber.substr(0, 2) === '02') {
      if (phoneNumber.length <= 5) {//02-123-5678
        res = phoneNumber.substr(0, 2) + '-' + phoneNumber.substr(2, 3)
      } else if (phoneNumber.length > 5 && phoneNumber.length <= 9) {//02-123-5678
        res = phoneNumber.substr(0, 2) + '-' + phoneNumber.substr(2, 3) + '-' + phoneNumber.substr(5)
      } else if (phoneNumber.length > 9) {//02-1234-5678
        res = phoneNumber.substr(0, 2) + '-' + phoneNumber.substr(2, 4) + '-' + phoneNumber.substr(6)
      }
    } else {
      if (phoneNumber.length < 4) {
        res = phoneNumber
      } else if (phoneNumber.length < 7) {
        res = phoneNumber.substr(0, 3) + '-' + phoneNumber.substr(3)
      } else if (phoneNumber.length < 11) {
        res = phoneNumber.substr(0, 3) + '-' + phoneNumber.substr(3, 3) + '-' + phoneNumber.substr(6)
      } else {
        res = phoneNumber.substr(0, 3) + '-' + phoneNumber.substr(3, 4) + '-' + phoneNumber.substr(7)
      }
    }
  }
  return res;
}

const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

export const convertToStorageBytes = (x) => {
  let n = parseInt(x, 10) || 0, l = 0;
  while (n > 1024) {
    n = n / 1024;
    l++;
  }
  return (n.toFixed(n >= 10 ? 0 : 1) + ' ' + units[l]);
}

export const paginate = (array, page_number, page_size) => {
  // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
  return array.slice((page_number - 1) * page_size, page_number * page_size);
}

export const validate = (store, target, validateObj) => {
  let result = true;
  let msg = null;
  for(let i = 0; i < validateObj.length; i++ ){
    if(validateObj[i].type === 'number'){
      if(target[validateObj[i].key] === null || target[validateObj[i].key] === undefined) {
        msg = validateObj[i].msg;
        result = false;
        break;
      }
    }else{
      if(!target[validateObj[i].key]){
        msg = validateObj[i].msg;
        result = false;
        break;
      }
    }
  }

  if(!result){
    alert(msg);
    // store.commit(`common/${MUT_SHOW_ALERT}`, {
    //   title: msg
    // });
  }

  return result;
}

// 페이징 정보 등록
export const setPaging = (target, res) => {
  const paging = getPaging(res);
  Object.keys(paging).forEach(key => {
    target[key] = paging[key];
  });
}

export const setParams = (params, item) => {
  Object.keys(params).forEach(key => {
    if(item[key] !== null && item[key] !== undefined){
      params[key] = item[key];
    }
  });
}

export const setParamsWithExclusive = (params, item, exclusives) => {
  Object.keys(params).forEach(key => {
    if(!exclusives.includes(key)){
      if(item[key] !== null && item[key] !== undefined){
        params[key] = item[key];
      }
    }
  });
}

export const setParamsWithArray = (params, item, arrayValues) => {
  Object.keys(params).forEach(key => {
    if(arrayValues.includes(key)){
      if(item[key]){
        params[key] = item[key].split(',').map(x => parseInt(x));
      }else{
        params[key] = []
      }
    }else{
      if(item[key] !== null && item[key] !== undefined){
        params[key] = item[key];
      }
    }
  });
}


export const initParams = (params) => {
  Object.keys(params).forEach(key => {
    if(params[key] instanceof Number){
      params[key] = 0;
    }else if(params[key] instanceof Array){
      params[key] = [];
    }else if(key.indexOf("Yn") > -1){
      params[key] = '';
    }else{
      params[key] = null;
    }
  });
}

export const initParamsWithExclusive = (params, exclusives) => {
  Object.keys(params).forEach(key => {
    if(!exclusives.includes(key)){
      if(params[key] instanceof Number){
        params[key] = 0;
      }else if(params[key] instanceof Array){
        params[key] = [];
      }else if(key.indexOf("Yn") > -1){
        params[key] = '';
      }else{
        params[key] = null;
      }
    }
  });
}
/*
  입력된 Parameter를 Router에 Query String으로 추가하는 기능.

  @사용처: 검색조건을 Query String에 담는다.
  @파라미터:
    router - 라우터
    query - 라우터 query string 으로 추가할 오브젝트
    param - query string에 추가될 값
 */
export const setQueryByParams = (router, query, param) => {
  Object.entries(param).forEach(([key, value]) => {
    if (value) query[key] = value;
  });
  router.push({query: query});
}
/*
  Router에 Query String 이 존재하면 Parameter에 넣어주는 기능.

  @사용처: Query String을 검색조건에 담는다.
  @파라미터:
    initialize - target 초기화 여부
    router - 라우터
    param - query string 값이 저장될 변수
*/
export const setParamsByQuery = (route, target, initialize) => {
  if (initialize) initParams(target);
  if(route && route.query) {
    Object.keys(target).forEach(key => {
      if (route.query[key] !== null && route.query[key] !== undefined) target[key] = route.query[key];
    });
  }
}

/**
 * URL로 직접 pageNo나 pageSize 입력시 반영되지 않는 오류 방지
 * 사용법 const paging = ref(initPaging(route));
 * @param route
 * @returns {{pageNo: number, pageSize: number, totalCount: number}}
 */
export const initPaging  = (route) => {
  const paging = {pageNo: 1, pageSize: 10, totalCount: 0}
  if(route.query && route.query.pageNo > 0){
    paging.pageNo = route.query.pageNo
  }

  if(route.query && route.query.pageSize > 0){
    paging.pageSize = route.query.pageSize
  }
  return paging;
}

// export const getRegisterTimeFormat = (timestamp, now) => {
//   if(!now) now = new Date().getTime();
//   const diff = now - timestamp;
//   const sec = diff /1000;
//   const min = sec / 60;
//   const hour = min / 60;
//   const day = hour / 24;
//
//   if(day > 30){
//     return timestampToDateFormat(now, 'yyyy.MM.dd');
//   }else if(hour > 24){
//     const day = hour / 24;
//     return `${day.toFixed(0)}일전`;
//   }else if(hour < 1){
//     return `${min.toFixed(0)}분전`;
//   }else{
//     return `${hour.toFixed(0)}시간전`;
//   }
// }

export const goToTop = (targetId, _duration, _adjust) => {
  const targetEle = document.getElementById(targetId);
  if (!targetEle) return;

  // - Get current &amp; target positions
  const scrollEle = document.documentElement || window.scrollingElement,
      currentY = scrollEle.scrollTop,
      targetY = targetEle.offsetTop - (_adjust || 0);
  animateScrollTo(currentY, targetY, _duration);

  // - Animate and scroll to target position
  function animateScrollTo(_startY, _endY, _duration) {
    _duration = _duration ? _duration : 600;
    const unitY = (targetY - currentY) / _duration;
    const startTime = new Date().getTime();
    const endTime = new Date().getTime() + _duration;
    const scrollTo = function() {
      let now = new Date().getTime();
      let passed = now - startTime;
      if (now <= endTime) {
        scrollEle.scrollTop = currentY + (unitY * passed);
        requestAnimationFrame(scrollTo);
      }
    };
    requestAnimationFrame(scrollTo);
  }
}

export const numberComma = (val) => {
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const valueReplaceBlank = (val, str) => {
  // return val.toString().replaceAll(',', '');
  return val.toString().replaceAll(str, '');
}

export const getCalendar = (year, month) => {
  const getCalendarData = (year, month) => {
    const currentMonth = parseInt(month);
    const prevMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1;
    const prevYear = prevMonth === 12 ? year - 1 : year;
    const nextYear = nextMonth === 1 ? year + 1 : year;

    const calendar = [[],[],[],[],[],[]];

    const setDate = new Date(year, month - 1, 1);
    //이번 달의 처음 요일을 구합니다.
    const firstDayName = setDate.getDay();
    const lastDay = new Date(targetDay.getFullYear(),targetDay.getMonth() + 1,0).getDate();
    const prevLastDay = new Date(targetDay.getFullYear(),targetDay.getMonth(),0).getDate();
    let startDayCount = 1;
    let lastDayCount = 1;

    //1~6주차를 위해 6번 반복합니다.
    for (let i = 0; i < 6; i++) {
      //일요일~토요일을 위해 7번 반복합니다.
      for (let j = 0; j < 7; j++) {
        // 이번달 이전...
        if (i === 0 && j < firstDayName) {
          calendar[i].push({
            'year': prevYear,
            'month': prevMonth,
            'day': (prevLastDay - (firstDayName - 1) + j)
          });
        }
        else if (i === 0 && j >= firstDayName) {
          calendar[i].push({
            'year': year,
            'month': currentMonth,
            'day': startDayCount
          })
          setFixDayCount(startDayCount++)
        }
        else if (i > 0 && startDayCount <= lastDay) {
          //일요일일 때, 토요일일 때, 나머지 요일 일 때
          calendar[i].push({
            'year': year,
            'month': currentMonth,
            'day': startDayCount
          });
          setFixDayCount(startDayCount++)
        }
        // startDayCount > lastDay: 이번 달의 마지막 날 이후일 때
        // 다음 달임...
        else if (startDayCount > lastDay) {
          // calendar[i].push(lastDayCount++)
          calendar[i].push({
            'year': nextYear,
            'month': nextMonth,
            'day': lastDayCount++
          });
        }
      }
    }
    return calendar;
    //캘린더 div 태그에 내용 붙임
  };

  const setFixDayCount = number => {
    //캘린더 하루마다 아이디를 만들어주기 위해 사용
    let fixNum = "";
    if (number < 10) {
      fixNum = "0" + number;
    } else {
      fixNum = number;
    }
    return fixNum;
  };

  const targetDay = (year > 0 && month > 0) ? new Date(year, (month - 1), 1) : new Date();
  if (targetDay.getMonth() + 1 < 10) {
    return getCalendarData(targetDay.getFullYear(), "0" + (targetDay.getMonth() + 1));
  } else {
    return getCalendarData(targetDay.getFullYear(), "" + (targetDay.getMonth() + 1));
  }
}

export const getCurrentIdx = (routeStr, menuObj) => {
  const path = routeStr;
  const menus = menuObj;
  for(let i=0; i < menus.value.length; i++){
    if(menus.value[i].children && menus.value[i].children.length ){
      for(let j=0; j < menus.value[i].children.length; j++){
        if(menus.value[i].children[j].children && menus.value[i].children[j].children.length ){
          for(let l=0; l < menus.value[i].children[j].children.length; l++){
            if(isChildMenu(path, menus.value[i].children[j].children[l].menuUrl)){
              menus.value[i].children[j].isActive = true;
              // store.commit(`menu/${MUT_SET_MENU_IDX}`, i);
              return i;
            }
          }
        }else{
          if(isChildMenu(path, menus.value[i].children[j].menuUrl)){
            menus.value[i].children[j].isActive = true;
            // store.commit(`menu/${MUT_SET_MENU_IDX}`, i);
            return i;
          }
        }
      }
    }
  }
}

/*
  selectbox year(년도) 옵션

  @사용처: CommonSelectBox 년도 설정 시 사용
  @파라미터:
    startYear - 시작 년도(기본값:1900년), startYear 설정 시 해당 년도부터 시작
    plusYear - plusYear 입력 시 해당 년도부터 설정한 수만큼 보여줌 설정 안하면 해당 년도까지 설정됨
    order - 기본값은 desc
    asc(오름차순) 설정시 : 1900 , desc(내림차순) 설정시 : 2022
                          .                   .
                          .                   .
                         2022                1900
*/
export const yearOptions = (startYear= 1900, plusYear, order = 'desc') => {
  const year = [];
  const nowYear = (new Date()).getFullYear();

  for(let i = startYear; i <= (plusYear ? (nowYear + plusYear) : nowYear); i++){
    year.push({name: i, value: (i).toString()});
  }
  return order === 'asc' ? year : year.reverse();
}

/*
  @사용처: Input Box 숫자만 입력받고 싶을때 사용
  @사용법: <input type="text" v-model.number="scaleDetail.score" @keyup="numberOnly"/>
 */
export const numberOnly = ($event) => {
  // let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
  // if (keyCode < 48 || keyCode > 57) $event.preventDefault();
  let regExp = /^[0-9]*$/;
  // 숫자가 아닐경우...
  if (!regExp.exec($event.target.value))
    $event.target.value = $event.target.value.replace(/[^0-9]/g, '');
}

/*
  공통코드명 가져오기
  @파라미터
    store - 스토어
    cd - 공통코드명 가져올 코드
*/
export const getCdNm = (store, cd) => {
  let cdNm = null;
  store.state.code.codes.filter(code => {
    if (code.cd === cd) cdNm = code.cdNm
  });
  return cdNm;
}

export const goBack = () => {
  router.go(-1);
}

export const imgPreview = (imgSrc) => {
  // v3ImgPreviewFn(imgSrc)
  v3ImgPreviewFn({
    showToolbar:false,
    url:imgSrc
  })
}