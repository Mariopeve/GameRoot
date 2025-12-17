<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f6f9fc;
      margin: 0;
      padding: 20px;
      color: #333;
    }
    .container {
      background-color: white;
      max-width: 600px;
      margin: 0 auto;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    h1 {
      color: #1ABC9C;
      text-align: center;
    }
    p {
      font-size: 16px;
      line-height: 1.5;
    }
    .codigo {
      background-color: #eaf8f7;
      border: 1px solid #1ABC9C;
      padding: 10px;
      border-radius: 5px;
      margin-top: 15px;
      font-family: monospace;
      white-space: pre-wrap;
    }
    footer {
      margin-top: 30px;
      font-size: 12px;
      color: #999;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Gracias por tu compra en GameRoot</h1>
    <p>Muchas gracias por tu compra, has gastado <strong>{{ $total }}€</strong>.</p>
    <p>A continuación te mostramos los códigos de los juegos adquiridos:</p>
    <div class="codigo">{{ $codigos }}</div>
    <p>Disfruta jugando :)</p>
    <footer>GameRoot - Tu tienda de juegos favorita</footer>
  </div>
</body>
</html>
