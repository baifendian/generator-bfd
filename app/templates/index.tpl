<% if (isJSP) { %><test></test><% } %>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Project Name</title>
</head>
<body>
  <div id="app"></div>
  <script src="/build/app<%= hash ? '.' + hash : '' %>.js"></script>
</body>
</html>