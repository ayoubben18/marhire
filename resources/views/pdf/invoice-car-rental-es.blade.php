<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Factura de Alquiler de Coche MarHire</title>
  <style>
    body {
      font-family: 'Segoe UI', sans-serif;
      margin: 0;
      padding: 40px;
      color: #333;
      background: #f7f7f7;
    }

    .invoice-box {
      background: #fff;
      padding: 30px 40px;
      max-width: 800px;
      margin: auto;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
      border-left: 5px solid #225f54;
    }

    h1 {
      color: #225f54;
      margin-bottom: 5px;
    }

    .top-section {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .top-left {
      display: flex;
      align-items: center;
      gap: 15px;
    }

    .top-section div {
      font-size: 14px;
    }

    .section-title {
      margin-top: 30px;
      font-size: 18px;
      color: #225f54;
      border-bottom: 1px solid #ddd;
      padding-bottom: 5px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 15px;
    }

    table th, table td {
      text-align: left;
      padding: 8px 10px;
      border-bottom: 1px solid #eee;
    }

    .footer {
      margin-top: 30px;
      text-align: center;
      font-size: 12px;
      color: #aaa;
    }

    .terms {
      font-size: 13px;
      margin-top: 20px;
      color: #666;
    }

    .status-confirmed {
      color: #28a745;
      font-weight: bold;
    }

    .status-pending {
      color: #f0ad4e;
      font-weight: bold;
    }

    .status-cancelled {
      color: #d9534f;
      font-weight: bold;
    }

    @media print {
      body {
        background: none;
      }

      .invoice-box {
        box-shadow: none;
        border-left: none;
      }
    }
  </style>
</head>
<body>
  <div class="invoice-box">
    <div class="top-section">
      <div class="top-left">
        <h1>Factura de Alquiler de Coche MarHire</h1>
      </div>
      <div>
        <strong>N° de Factura:</strong> {{ $invoiceData['invoice_number'] }}<br />
        <strong>Fecha:</strong> {{ $invoiceData['invoice_date'] }}<br />
        <strong>Hora:</strong> {{ date('H:i') }}<br />
        <strong>Estado:</strong> 
        @if(strtolower($invoiceData['status']) == 'confirmed')
          <span class="status-confirmed">Confirmada</span>
        @elseif(strtolower($invoiceData['status']) == 'pending')
          <span class="status-pending">Pendiente</span>
        @else
          <span class="status-cancelled">Cancelada</span>
        @endif
      </div>
    </div>

    <div class="section-title">Información del Cliente</div>
    <p>
      <strong>Nombre:</strong> {{ $invoiceData['client_name'] }}<br />
      <strong>Correo Electrónico:</strong> {{ $invoiceData['client_email'] }}<br />
      <strong>Teléfono:</strong> {{ $invoiceData['client_phone'] }}<br />
      @if(isset($invoiceData['client_dob']) && $invoiceData['client_dob'])
      <strong>Fecha de Nacimiento:</strong> {{ $invoiceData['client_dob'] }}<br />
      @endif
      @if(isset($invoiceData['client_country']) && $invoiceData['client_country'])
      <strong>País:</strong> {{ $invoiceData['client_country'] }}<br />
      @endif
      @if(isset($invoiceData['client_note']) && $invoiceData['client_note'] && $invoiceData['client_note'] !== 'N/A')
      <strong>Nota:</strong> {{ $invoiceData['client_note'] }}<br />
      @endif
    </p>

    <div class="section-title">Detalles de la Reserva</div>
    <p>
      <strong>Coche:</strong> {{ $invoiceData['service_name'] }} – {{ $invoiceData['transmission'] ?? 'Manual' }} <br />
      @if(isset($invoiceData['rental_duration']))
      <strong>Duración del Alquiler:</strong> {{ str_replace(['Days', 'Day', 'Hours', 'Hour'], ['Días', 'Día', 'Horas', 'Hora'], $invoiceData['rental_duration']) }}<br />
      @endif
      <strong>Recogida:</strong> {{ $invoiceData['pickup_location'] ?? 'N/A' }} – {{ $invoiceData['pickup_date'] ?? $invoiceData['check_in'] }} a las {{ $invoiceData['pickup_time'] ?? '10:00' }}<br />
      <strong>Devolución:</strong> {{ $invoiceData['dropoff_location'] ?? $invoiceData['pickup_location'] ?? 'N/A' }} – {{ $invoiceData['dropoff_date'] ?? $invoiceData['check_out'] }} a las {{ $invoiceData['dropoff_time'] ?? '10:00' }}
    </p>

    <div class="section-title">Cargos</div>
    <table>
      <thead>
        <tr style="background-color: #f0f0f0;">
          <th style="color: #225f54;">Artículo</th>
          <th style="color: #225f54; text-align: right;">Importe</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>Alquiler Base{{ isset($invoiceData['rental_duration']) && isset($invoiceData['daily_rate']) ? ' (' . str_replace(['Days', 'Day', 'Hours', 'Hour'], ['Días', 'Día', 'Horas', 'Hora'], $invoiceData['rental_duration']) . ' × €' . number_format($invoiceData['daily_rate'], 0) . ')' : '' }}</td><td style="text-align: right;">€{{ number_format($invoiceData['booking_price'], 2) }}</td></tr>
        @if(!empty($invoiceData['addons']))
          @foreach($invoiceData['addons'] as $addon)
          <tr><td>Complemento: {{ $addon['name'] }}</td><td style="text-align: right;">€{{ number_format($addon['price'], 2) }}</td></tr>
          @endforeach
        @endif
        <tr><td>Seguro Completo Incluido (con franquicia)</td><td style="text-align: right;">Incluido</td></tr>
      </tbody>
      <tfoot>
        <tr><td>Subtotal</td><td style="text-align: right;">€{{ number_format($invoiceData['booking_price'] + $invoiceData['total_addons'], 2) }}</td></tr>
      </tfoot>
    </table>

    <div class="section-title">Impuestos y Descuentos</div>
    <table>
      <tbody>
        <tr><td>Impuesto (0%)</td><td style="text-align: right;">€0.00</td></tr>
        @if(isset($invoiceData['discount_or_extra']) && $invoiceData['discount_or_extra'] != 0)
        <tr><td>{{ $invoiceData['discount_or_extra'] < 0 ? 'Descuento' : 'Cargo Extra' }}</td><td style="text-align: right;">{{ $invoiceData['discount_or_extra'] < 0 ? '–' : '' }} €{{ number_format(abs($invoiceData['discount_or_extra']), 2) }}</td></tr>
        @else
        <tr><td>Descuento</td><td style="text-align: right;">– €0.00</td></tr>
        @endif
        <tr style="border-top: 2px solid #ccc;"><th>Total</th><th style="text-align: right;">€{{ number_format($invoiceData['grand_total'], 2) }}</th></tr>
      </tbody>
    </table>

    <div class="section-title">Términos y Políticas de Alquiler</div>
    <div class="terms">
      - Duración mínima de alquiler: 3 días completos<br />
      - Las reservas deben realizarse con al menos 2 días de anticipación<br />
      - Política de combustible: Mismo nivel – Por favor, llene el tanque al mismo nivel<br />
      - Kilometraje: Kilómetros ilimitados según el número de días reservados<br />
      - Se puede requerir un depósito reembolsable al recoger, dependiendo del vehículo<br />
      - Seguro completo incluido (con franquicia)<br />
      - Los complementos están sujetos a disponibilidad<br />
      - Para los términos completos, consulte nuestros <a href="https://www.marhire.com/terms" target="_blank">Términos y Condiciones</a> y nuestra <a href="https://www.marhire.com/cancellation-policy" target="_blank">Política de Cancelación</a>
    </div>

    <div class="footer" style="border-top: 1px solid #ddd; padding-top: 20px; margin-top: 40px;">
      <p style="font-size: 14px; color: #444;">
        📞 <a href="tel:{{ str_replace(' ', '', $invoiceData['company_phone']) }}" style="color: #225f54; text-decoration: none; margin-right: 15px;">{{ $invoiceData['company_phone'] }}</a>
        📧 <a href="mailto:{{ $invoiceData['company_email'] }}" style="color: #225f54; text-decoration: none; margin-right: 15px;">{{ $invoiceData['company_email'] }}</a>
        🌐 <a href="https://www.marhire.com" target="_blank" style="color: #225f54; text-decoration: none;">www.marhire.com</a>
      </p>
      <p style="margin-top: 10px; font-size: 13px; color: #888;">
        Gracias por reservar con <strong style="color: #225f54;">MarHire Car</strong>. Esperamos servirle en Marruecos.
      </p>
    </div>
  </div>
</body>
</html>