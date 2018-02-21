import * as mdw from '../components/index';

const crosshairs = {
};
let vOffset = 0;
let hOffset = 0;

Object.defineProperty(crosshairs, 'vOffset', {
  enumerable: true,
  configurable: false,
  get() {
    return vOffset;
  },
  set(val) {
    vOffset = val;
    document.getElementById('verticalLineLeft').style.left = `${val}px`;
    document.getElementById('verticalLineRight').style.left = `${parseInt(val, 0) - 376}px`;
  },
});

Object.defineProperty(crosshairs, 'hOffset', {
  enumerable: true,
  configurable: false,
  get() {
    return hOffset;
  },
  set(val) {
    hOffset = val;
    document.getElementById('horizontalLine').style.top = `${val}px`;
  },
});

/**
 * @param {MouseEvent} event
 * @return {void}
 */
function onTemplateImageClick(event) {
  crosshairs.hOffset = event.clientY;
  crosshairs.vOffset = event.clientX;
}

/** @return {void} */
function setupOptions() {
  document
    .querySelector('input[name="largeFontSize"]')
    .addEventListener('change', (event) => {
      const el = document.querySelector('html');
      if (event.target.checked) {
        el.style.setProperty('font-size', '24px');
      } else {
        el.style.setProperty('font-size', '');
      }
    });
  document
    .querySelector('input[name="rtl"]')
    .addEventListener('change', (event) => {
      const el = document.querySelector('html');
      if (event.target.checked) {
        el.setAttribute('dir', 'rtl');
      } else {
        el.setAttribute('dir', 'ltr');
      }
    });
}

/**
 * @param {HTMLElement} element
 * @param {string} classname
 * @return {boolean}
 */
function hasSomeParentHasClass(element, classname) {
  if (element.className && element.className.split(' ').indexOf(classname) >= 0) {
    return true;
  }
  return element.parentNode && hasSomeParentHasClass(element.parentNode, classname);
}

/**
 * @param {NodeList} nodelist
 * @param {Function} callback
 * @param {Object} scope
 * @return {void}
 */
function forEachNode(nodelist, callback, scope) {
  for (let i = 0; i < nodelist.length; i += 1) {
    callback.call(scope, nodelist[i], i, nodelist);
  }
}

/** @return {void} */
function start() {
  setupOptions();
  forEachNode(document.querySelectorAll('.mdw-textfield'), (element) => {
    new mdw.TextField(element);
  });
  forEachNode(document.querySelectorAll('.mdw-list__row'), (element) => {
    new mdw.ListRow(element);
  });
  forEachNode(document.querySelectorAll('.mdw-button'), (element) => {
    if (!hasSomeParentHasClass(element, 'no-js')) {
      new mdw.Button(element);
    }
  });
  forEachNode(document.querySelectorAll('.mdw-tab'), (element) => {
    new mdw.Tab(element);
  });
  forEachNode(document.querySelectorAll('.mdw-tab__action'), (element) => {
    new mdw.TabItem(element);
  });
  forEachNode(document.querySelectorAll('.target'), (element) => {
    element.addEventListener('click', onTemplateImageClick);
  });
}

start();
