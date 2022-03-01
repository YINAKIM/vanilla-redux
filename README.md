[리덕스?](https://ko.redux.js.org/introduction/getting-started/)   
리덕스는 리액트에 종속되는 라이브러리가 아닌, 자바스크립트 앱읠 위한 상태관리 라이브러리다.   
---
💡 setting  

1. parcel번들러 설치       
*번들러(bundler)란?    
dependency가 있는 자바스크립트 파일들을 최적화, 압축하여 하나 혹은 여러개의 static 파일로 빌드해주는 컴파일러
>yarn global add parcel-bundler (또는 npm install -g parcel-bundler)

2. 프로젝트 디렉토리에 package.json생성
>yarn init -y (또는  npm init)

3.  리덕스 다운받기
>yarn add redux (또는 npm install redux)
---

## 리덕스의 핵심개념
[리덕스의 핵심개념 정리](https://yina-note.notion.site/react-dd127ec1b4234efabc9c16e15f708c47)

- **액션** : type속성을가지는 자바스크립트 객체
- **액션생성 함수** : 상태변화를 일으킬 때 마다 action객체를 생성(반환)하는 함수
- **리듀서** :  [현재state]와 [action객체]를 파라미터로 받고, 새로운 state객체를 반환하는 함수
- **스토어** : redux가 제공하는 createStore함수로 생성되는 "프로젝트당 1개의 스토어", 스토어생성 후 내장함수를 사용할 수 있다.
- **디스패치** : store의내장함수(store.dispatch), action객체를 파라미터로 받아, 액션을 발생시키는 함수
- **구독** :   store의내장함수(store.subscribe), 함수형태의 값을 파라미터로 받아 호출한다.
---

#### 리듀서 로직
>action객체를 만들어서 발생시킨다    
> → reducer가 (현재state,전달받은 action객체)를 파라미터로 받는다  
> → action.type에 따라 각각 다른작업을 처리   
> → 새로운 상태(state)를 만들어서 리턴.      

#### 디스패치 로직
>dispatch(action)함수 호출    
> → 스토어가 reducer함수를 실행시킴    
> → new state객체 리턴   

#### 구독(subscribe) 로직
>subscribe(특정함수)    
> → dispatch(action) 실행될 때 마다 특정함수가 호출된다.   



## redux사용해서 상태관리하기
1. 하드코딩되어있는 DOM reference생성
```javascript
const divToggle = document.querySelector('.toggle');
```

2. 상태변화를 감지할 수 있는 **action.type을 지정**
```javascript
const TOGGLE_SWITCH = 'TOGGLE_SWITCH';
```

3. 각 type별 **action생성함수** 선언
```javascript
const toggleSwitch = () => ({ type:TOGGLE_SWITCH });
```

4. **state초기값** 설정(reducer에 default function parameter로 지정)
```javascript
const initialState = {
    toggle : false,
    counter: 0
};
``` 

5. **reducer 함수** 정의, state와 action을 받는다.   
   action.type에 따라 각각 다른작업을 처리, type이 지정되지 않은 액션은 받은state를 그대로 반환
```javascript
function reducer(state = initialState, action){
    switch (action.type) {
        case TOGGLE_SWITCH:
            return {
                ...state,
                toggle: !state.toggle
            };
        
        default:
            return state;
    }
}
```

6. redux의 createStore(reducer)로 **스토어생성**
```javascript
const store = createStore(reducer); 
```

7. **store.getState()로 현재상태**를 불러와, 그 값에 따라 UI의 속성을 변경할 render함수 선언   
   → initialState가 가지고있는 속성값들을 각각 변경한다.  
```javascript
const render = () => {
    const state = store.getState();
    // initialState의 속성인 toggle, counter를 각각 변경하는 로직수행 
}
```

8. 상태가 업데이트 될 때마다 render함수가 호출되도록 호출
```javascript
render(); 
```

9. store.subscribe(체인지리스너) : dispatch함수 호출시 매번 실행될 콜백함수(체인지리스너)를 받아       
   액션발생에 따라 상태가 업데이트될 때 마다 subscribe에 인자로 받은 콜백함수가 실행되도록 한다.
```javascript
store.subscribe(render);
```

10. store.dispatch(action) 함수를 각 이벤트리스너 함수에 실행시킨다.    
    (action을 직접 받지 않고, **action생성함수**를 콜백함수로 받아서 실행시킨다.)
```javascript
divToggle.onclick = () => {
    store.dispatch(toggleSwitch());
};
```


## 리덕스의 세가지 규칙
1. 단일 store를 사용한다.
2. state는 읽기전용이다.
3. reducer는 순수한 함수여야 한다.   
[자세한 설명](https://www.notion.so/yina-note/redux-3-2a0cff1cec8c46f38b168dfcf4104003) 


