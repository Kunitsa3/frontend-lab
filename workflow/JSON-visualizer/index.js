const jsonWrapper = document.querySelector('.json-wrapper');
const buildTreeButton = document.querySelector('.build-tree-btn');

function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

function createAndAppendParagraph(parent, innerHtml) {
  const newParagraph = document.createElement('p');
  newParagraph.innerHTML = innerHtml;
  parent.append(newParagraph);
}

function createAndAppendDivWithClass(parent, className) {
  const div = document.createElement('div');
  div.className = className;
  parent.append(div);
  return div;
}

function highlightDifferentDataTypes(data) {
  switch (typeof data) {
    case 'number':
      return 'red';

    case 'string':
      return 'purple';

    case 'bigint':
      return 'yellow';

    case 'boolean':
      return 'green';

    default:
      return 'blue';
  }
}

function addTypeWrapper(valueToCheckType, valueToReturn = valueToCheckType) {
  switch (typeof valueToCheckType) {
    case 'string':
      return `"${valueToReturn}"`;

    case 'object':
      if (!valueToReturn) return valueToReturn;

      return Array.isArray(valueToCheckType) ? `[${valueToReturn}]` : `{${valueToReturn}}`;

    default:
      return valueToReturn;
  }
}

function buildJsonTree(jsonStr, parentDiv) {
  for (let key in jsonStr) {
    if (!!jsonStr[key] && typeof jsonStr[key] === 'object') {
      const paragraphInnerHTML = `<span class="complex-type-length">${Object.keys(jsonStr[key]).length}</span>`;
      const complexTypeText = `${key}: ${addTypeWrapper(jsonStr[key], paragraphInnerHTML)}`;
      const divForArrowAndParagraph = createAndAppendDivWithClass(parentDiv, 'arrow-and-paragraph-wrapper');

      divForArrowAndParagraph.addEventListener('click', () => {
        divForArrowAndParagraph.classList.toggle('hide-children');
      });

      createAndAppendDivWithClass(divForArrowAndParagraph, 'black-arrow');
      createAndAppendParagraph(divForArrowAndParagraph, complexTypeText);

      buildJsonTree(jsonStr[key], createAndAppendDivWithClass(parentDiv, 'offset'));
    } else {
      const colorClass = highlightDifferentDataTypes(jsonStr[key]);
      const paragraphTextValue = `${key}: <span class=${colorClass}>${addTypeWrapper(jsonStr[key])}</span>`;

      createAndAppendParagraph(parentDiv, paragraphTextValue);
    }
  }
}

buildTreeButton.addEventListener('click', () => {
  const jsonString = document.querySelector('#json-string-input').value;
  jsonWrapper.innerHTML = '';

  if (isJson(jsonString)) {
    buildJsonTree(JSON.parse(jsonString), jsonWrapper);
  } else {
    createAndAppendParagraph(jsonWrapper, 'Invalid value');
  }
});
