'use strict';

function route (handle, pathname, request, response) {
  if(typeof handle[pathname] === 'function') {
    handle[pathname](request, response);
  } else {
    handle.error(response);
  }
}

exports.route = route;
