var $outputEl = document.getElementById('out');
var $calc = document.getElementById('calc');

var currentState = 1;

var state = {
  num1: '0',
  operator: '',
  num2: ''
};

$calc.addEventListener('click', router);


function router(event) {
  var type = event.target.dataset.type;
  var value = event.target.dataset.value;

  if (!type) return;

  if (type === 'operator') {
    initOperator(value);
  }

  if (type === 'number') {
    initNumber(value);
  }

  output();
}

function initOperator(operator) {
  if (currentState === 3) {
    calculate(operator);
  }
  if (operator !== '=') {
    state.operator = operator;
  }
}


function initNumber(number) {
  if (currentState === 1) {
    state.num1 = (state.num1 != 0) ? (state.num1 + number) : number;
    return;
  }
  state.num2 = (state.num2 != 0) ? (state.num2 + number) : number;
}


function calculate() {
  state.num1 = actions[state.operator]();
  clear();
}

function clear() {
  state.operator = '';
  state.num2 = '';
}

function output() {
  currentState = 0;
  var res = '';
  Object.keys(state).forEach(function(key){
    if (state[key]) {
      res += state[key] + ' ';
      currentState += 1;
    }
  });
  $outputEl.value = res.trim();
}

var actions = {
  '+': function() {
    return +state.num1 + +state.num2;
  },
  '-': function() {
    return +state.num1 - +state.num2;
  },
  '/': function() {
    return +state.num1 / +state.num2;
  },
  '*': function() {
    return +state.num1 * +state.num2;
  },
  '=': function() {
    return this[state.operator]();
  }
};
