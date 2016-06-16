<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
  <title>PROJECT NAME</title>
</head>
<body>
  <script>
  window.user = {{= openTag }}- user {{= closeTag}}
  window.now = {{= openTag }}= now {{= closeTag}}
  </script>
  <div id="app"></div>
  <script src="{{= publicPath}}app{{= hash ? '.' + hash : '' }}.js"></script>
</body>
</html>