// @ts-expect-error
function redirectUrl(url) {
  const X = setTimeout(function () {
    window.location.replace(url);
    return true;
  }, 300);

  if ((window.location = url)) {
    clearTimeout(X);
    return true;
  } else {
    // @ts-expect-error
    if ((window.location.href = url)) {
      clearTimeout(X);
      return true;
    } else {
      clearTimeout(X);
      // @ts-expect-error
      window.location.replace(url);
      return true;
    }
  }
  return false;
}

export default redirectUrl;
