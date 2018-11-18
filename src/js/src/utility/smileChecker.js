
function checkSmileLoop()
{
  setInterval(function()
  {
    checkSmile();;
  }, 5000);
}


function checkSmile(_register)
{
  if(_register)
  {
    checkSmileLoop();
  }

  $.ajax(
  {
    url:"/account/smile",
    method:"POST",
    dataType:"json",
    success:function(smileResult)
    {
      var notifResult = notifGenerator(smileResult);

      if(checkSmileLogout(smileResult))
      {
        // if is not logged out
        // check notifications
        checkNewNotification(smileResult);
        // check redirect
        checkSmileRedirect(smileResult);
      }
    }
  });

}


function checkSmileLogout(_data)
{
  if(_data.result && _data.result.okay !== true)
  {
    var logoutTxt = 'Logout';
    var logoutUrl = '/logout';

    if(_data.result.logoutTxt)
    {
      logoutTxt = _data.result.logoutTxt;
    }
    if(_data.result.logoutUrl)
    {
      logoutUrl = _data.result.logoutUrl;
    }

    say(
    {
      type: 'warning',
      html: logoutTxt,
      showConfirmButton: false,
      // timer: 1000,
      onClose: () =>
      {
        location.replace(logoutUrl);
      }
    });
    return false;
  }

  return true;
}


function checkSmileRedirect(_data)
{
  if(_data && _data.redirect)
  {
    var a = $('<a href="' + _data.redirect + '"></a>');
    if(a.isAbsoluteURL() || _data.direct)
    {
      location.replace(_data.redirect);
    }
    else
    {
      Navigate({ url: _data.redirect });
    }
    return;
  }
}


function checkNewNotification(_data)
{
  var notifEl = $('.siftal .dashHead .notification');
  if(_data.result && _data.result.newNotif)
  {
    if(notifEl.attr('data-new') === undefined)
    {
      // new notif and does not exist before it
    }

    notifEl.attr('data-new', '');
  }
  else
  {
    notifEl.attr('data-new', null);
  }
}
