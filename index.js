import {createStore} from "redux";

// DOM references
const divToggle = document.querySelector('.toggle');
const counter = document.querySelector('h1');
const btnIncrease = document.querySelector('#increase');
const btnDecrease = document.querySelector('#decrease');

// action.type이 될 문자열 지정
const TOGGLE_SWITCH = 'TOGGLE_SWITCH';
const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';

// action creator함수
const toggleSwitch = () => ({ type:TOGGLE_SWITCH });
const increase = difference => ({ type:INCREASE,difference }); // difference : 상태를 업데이트하기 위해 참고할 값을 임의로 넣은 것
const decrease = () => ({ type:DECREASE });

// 초기값 설정
const initialState = {
    toggle : false,
    counter: 0
};

// 리듀서 함수 정의 : 현재state와 action객체를 파라미터로 받아온다.
function reducer(state = initialState, action){
              // state가 undefined일 때는 initialState를 기본값으로 사용한다.(default function parameter)

    switch (action.type) {  // action.type에 따라 각각 다른작업을 처리
        case TOGGLE_SWITCH:
            return {
                ...state,
                toggle: !state.toggle
            };

        case INCREASE:
            return {
                ...state,
                counter: state.counter + action.difference
            };

        case DECREASE:
            return {
                ...state,
                counter: state.counter - 1
            };

        default:
            return state;
    }
}


const store = createStore(reducer); // 이 프로젝트의 store를 생성함 ==> store에 있는 내장함수를 사용할 수 있다.


//render 함수 만들기 : 이미 html로 만들어진 UI의 속성을 상태에 따라 변경하는 함수
const render = () => {
    // 현재상태를 불러오는 store내장함수
    const state = store.getState();

    // toggle 처리
    if(state.toggle){
        divToggle.classList.add('active');
    }else{
        divToggle.classList.remove('active');
    }

    // 카운터 처리
    counter.innerText = state.counter;
};

render();   // 상태가 업데이트될 때 마다 호출된다. (store.subscribe함수로 구독될예정--> 구독되면? 액션이 발생하여 상태가 업데이트 될 때 마다 호출된다.)

// 상태를 구독하기 : [액션발생 >> 상태가 업데이트] 될 때 마다 render가 호출됨 >> 함수형태지만 값이 변경된 state값이 호출되는 것
store.subscribe(render); //


// action 발생시키기 : 각 지정이벤트마다 dispatch함수에 action객체를 넣어서 발생시킴
divToggle.onclick = () => {
    store.dispatch(toggleSwitch());
};

btnIncrease.onclick = () => {
    store.dispatch(increase(1));
};
btnDecrease.onclick = () => {
    store.dispatch(decrease());
};





