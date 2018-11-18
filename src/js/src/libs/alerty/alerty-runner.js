
if($('html').attr('lang') === 'fa')
{
  say = alerty.mixin(
  {
    heightAuto: false,
    confirmButtonText: 'تایید',
    cancelButtonText: 'انصراف',
    closeButtonAriaLabel: 'بستن  پنجره'
  });
}
else
{
  say = alerty.mixin(
  {
    heightAuto: false
  });
}


function deleteConfirmer(_this)
{
  _data  = null;
  _title = null
  _text  = null;
  if(_this !== undefined && _this)
  {
    _data  = _this.attr('data-data');
    _title = _this.attr('data-title');
    _text  = _this.attr('data-msg');
  }
  var myLang = $('html').attr('lang');

  if(_data === undefined)
  {
    logy('data not sended!');
    // return false;
  }
  if(!_title)
  {
    if(myLang === 'fa')
    {
      _title = 'آیا تایید می‌کنید؟';
    }
    else
    {
      _title = 'Do you confirm?';
    }
  }
  if(!_text)
  {
    _text = '';
  }


  say({
    title: _title,
    text: _text,
    type: 'warning',
    focusConfirm: false,
    showCancelButton: true,
    reverseButtons: true
  }).then((result) =>
  {
    if (result.value)
    {
      // send ajax request if elemet is exist
      if(_this)
      {
        console.log(_this);
        _this.ajaxify({link: true, type: 'post'});
      }
      // say(
      // {
      //   type: 'success',
      //   title: 'Deleted request sended',
      //   showConfirmButton: false,
      //   timer: 500
      // });
    }
    else if (result.dismiss === alerty.DismissReason.cancel)
    {
      // say(
      //   'Cancelled',
      //   'Your imaginary file is safe :)',
      //   'error'
      // )
    }
  });
}


function showUserProfile()
{
  $(document).on('click', '.siftal .profileShow', function(_e)
  {
    var $this   = $(this);

    var userImg = $this.find('img');
    // on click
    say(
    {

      html: $this.attr('data-desc'),
      footer: $this.attr('data-footer'),
      showCloseButton: true,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: $this.attr('data-confirmTxt'),
      cancelButtonText: $this.attr('data-cancelTxt'),

      imageUrl: userImg.attr('src'),
      imageAlt: userImg.attr('alt'),
      imageWidth: 100,
      imageHeight: 100,

    }).then((myResult) =>
    {
      if (myResult.value)
      {
        // press profile btn
        if($this.attr('data-confirmLink'))
        {
          Navigate({ url: $this.attr('data-confirmLink') });
        }
      }
      else if (myResult.dismiss === alerty.DismissReason.cancel)
      {
        logoutConfirmer($this);
      }
    });

  });

  $(document).on('click', '.siftal .alerty2-footer a', function(_e)
  {
    say.close();
  });

}



function logoutConfirmer($this)
{
  myTitle     = $this.attr('data-logoutConfirmTxt');
  myLogoutTxt = $this.attr('data-logoutTxt');
  myLogouturl = $this.attr('data-logoutUrl');

  say({
    title: myTitle,
    type: 'question',
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonColor: '#d33',
    reverseButtons: true
  }).then((result) =>
  {
    if (result.value)
    {
      say(
      {
        type: 'success',
        html: myLogoutTxt,
        showConfirmButton: false,
        timer: 1000,
        onClose: () =>
        {
          location.replace(myLogouturl);
        }
      });

    }
    else if (result.dismiss === alerty.DismissReason.cancel)
    {
      // do nothing
    }
  });
}