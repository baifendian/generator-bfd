<% if (isJSP) { %>

<% } %>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
  <title>Project Name</title>
</head>
<body>
  <div id="app"></div>
  <script src="/build/app<%= hash ? '.' + hash : '' %>.js"></script>
</body>
</html>