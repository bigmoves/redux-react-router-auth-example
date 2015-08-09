import React from 'react';

// serializes form data into an object
export function getFormElements(node) {
  const formElements = React.findDOMNode(node);
  return [].slice.call(formElements).reduce((data, element) => {
    if (!element.name) { return data; }
    data[element.name] = element.value;
    return data;
  }, {});
};
