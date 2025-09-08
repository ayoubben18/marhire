<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Factura Reserva de Actividad MarHire</title>
  <style>
    body {
      font-family: 'Segoe UI', sans-serif;
      margin: 0;
      padding: 15px;
      color: #333;
      background: #f7f7f7;
      line-height: 1.2;
    }

    .invoice-box {
      background: #fff;
      padding: 15px 20px;
      max-width: 800px;
      margin: auto;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
      border-left: 5px solid #225f54;
    }

    h1 {
      color: #225f54;
      margin-bottom: 3px;
      font-size: 22px;
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
      font-size: 12px;
    }

    .section-title {
      margin-top: 12px;
      font-size: 14px;
      color: #225f54;
      border-bottom: 1px solid #ddd;
      padding-bottom: 3px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 8px;
    }

    table th, table td {
      text-align: left;
      padding: 4px 6px;
      border-bottom: 1px solid #eee;
      font-size: 12px;
    }

    .footer {
      margin-top: 15px;
      text-align: center;
      font-size: 11px;
      color: #aaa;
    }

    .terms {
      font-size: 11px;
      margin-top: 10px;
      color: #666;
      line-height: 1.3;
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
        <h1>Factura Reserva de Actividad MarHire</h1>
      </div>
      <div>
        <strong>N° Factura:</strong> {{ $invoiceData['invoice_number'] }}<br />
        <strong>Fecha:</strong> {{ $invoiceData['invoice_date'] }}<br />
        <strong>Hora:</strong> {{ date('H:i') }}<br />
        <strong>Estado:</strong> 
        @if(strtolower($invoiceData['status']) == 'confirmed')
          <span class="status-confirmed">Confirmado</span>
        @elseif(strtolower($invoiceData['status']) == 'pending')
          <span class="status-pending">Pendiente</span>
        @else
          <span class="status-cancelled">Cancelado</span>
        @endif
      </div>
    </div>

    <div class="section-title">Información del Cliente</div>
    <p>
      <strong>Nombre:</strong> {{ $invoiceData['client_name'] }}<br />
      <strong>Email:</strong> {{ $invoiceData['client_email'] }}<br />
      <strong>Teléfono:</strong> {{ $invoiceData['client_phone'] }}<br />
      @if(isset($invoiceData['client_dob']) && $invoiceData['client_dob'])
      <strong>Fecha de Nacimiento:</strong> {{ $invoiceData['client_dob'] }}<br />
      @endif
      @if(isset($invoiceData['client_country']) && $invoiceData['client_country'])
      <strong>País:</strong> {{ $invoiceData['client_country'] }}<br />
      @endif
      @if(isset($invoiceData['client_flight_number']) && $invoiceData['client_flight_number'])
      <strong>Número de Vuelo:</strong> {{ $invoiceData['client_flight_number'] }}<br />
      @endif
      @if(isset($invoiceData['client_note']) && $invoiceData['client_note'] && $invoiceData['client_note'] !== 'N/A')
      <strong>Nota:</strong> {{ $invoiceData['client_note'] }}<br />
      @endif
    </p>

    <div class="section-title">Detalles de la Reserva</div>
    <p>
      <strong>Actividad:</strong> {{ $invoiceData['service_name'] }}<br />
      @if(isset($invoiceData['activity_duration']))
      <strong>Duración:</strong> {{ $invoiceData['activity_duration'] }}<br />
      @endif
      <strong>Fecha:</strong> {{ $invoiceData['activity_date'] ?? $invoiceData['check_in'] }}@if(isset($invoiceData['time_preference']) && $invoiceData['time_preference']) | <strong>Preferencia de Hora:</strong> {{ ucfirst($invoiceData['time_preference']) }}@endif<br />
      @if(isset($invoiceData['activity_type']))
      <strong>Tipo:</strong> {{ $invoiceData['activity_type'] }}<br />
      @endif
      @if(isset($invoiceData['number_of_people']) && $invoiceData['number_of_people'] > 0)
      <strong>Número de personas:</strong> {{ $invoiceData['number_of_people'] }}<br />
      @endif
    </p>

    <div class="section-title">Tarifas</div>
    <table>
      <thead>
        <tr style="background-color: #f0f0f0;">
          <th style="color: #225f54;">Artículo</th>
          <th style="color: #225f54; text-align: right;">Cantidad</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>Tarifa de actividad{{ isset($invoiceData['number_of_people']) && $invoiceData['number_of_people'] > 0 && isset($invoiceData['price_per_person']) ? ' (' . $invoiceData['number_of_people'] . ' × €' . number_format($invoiceData['price_per_person'], 0) . ')' : '' }}</td><td style="text-align: right;">€{{ number_format($invoiceData['booking_price'], 2) }}</td></tr>
        @if(!empty($invoiceData['addons']))
          @foreach($invoiceData['addons'] as $addon)
          <tr><td>Complemento: {{ $addon['name'] }}</td><td style="text-align: right;">€{{ number_format($addon['price'], 2) }}</td></tr>
          @endforeach
        @endif
        <tr><td>Recogida y guía incluidos</td><td style="text-align: right;">Incluido</td></tr>
      </tbody>
      <tfoot>
        <tr><td>Subtotal</td><td style="text-align: right;">€{{ number_format($invoiceData['booking_price'] + $invoiceData['total_addons'], 2) }}</td></tr>
      </tfoot>
    </table>

    <div class="section-title">Impuestos y Descuentos</div>
    <table>
      <tbody>
        <tr><td>Impuesto (0%)</td><td style="text-align: right;">€0,00</td></tr>
        @if(isset($invoiceData['discount_or_extra']) && $invoiceData['discount_or_extra'] != 0)
        <tr><td>{{ $invoiceData['discount_or_extra'] < 0 ? 'Descuento' : 'Cargo adicional' }}</td><td style="text-align: right;">{{ $invoiceData['discount_or_extra'] < 0 ? '–' : '' }} €{{ number_format(abs($invoiceData['discount_or_extra']), 2) }}</td></tr>
        @else
        <tr><td>Descuento</td><td style="text-align: right;">– €0,00</td></tr>
        @endif
        <tr style="border-top: 2px solid #ccc;"><th>Total</th><th style="text-align: right;">€{{ number_format($invoiceData['grand_total'], 2) }}</th></tr>
      </tbody>
    </table>

    <div class="section-title">Términos de Actividad y Políticas</div>
    <div class="terms">
      - Las actividades deben reservarse con al menos 2 días de antelación<br />
      - La recogida está incluida si se especifica en el anuncio<br />
      - Complementos y mejoras opcionales según disponibilidad<br />
      - Por favor esté listo 15 minutos antes de la hora de recogida o cita<br />
      - Para los términos completos, consulte nuestros <a href="https://www.marhire.com/terms" target="_blank">Términos y Condiciones</a> y <a href="https://www.marhire.com/cancellation-policy" target="_blank">Política de Cancelación</a>
    </div>

    <div class="footer" style="border-top: 1px solid #ddd; padding-top: 20px; margin-top: 40px;">
      <p style="font-size: 14px; color: #444;">
        <strong>Phone:</strong> <a href="tel:{{ str_replace(' ', '', $invoiceData['company_phone']) }}" style="color: #225f54; text-decoration: none; margin-right: 15px;">{{ $invoiceData['company_phone'] }}</a>
        <strong>Email:</strong> <a href="mailto:{{ $invoiceData['company_email'] }}" style="color: #225f54; text-decoration: none; margin-right: 15px;">{{ $invoiceData['company_email'] }}</a>
        <strong>Web:</strong> <a href="https://www.marhire.com" target="_blank" style="color: #225f54; text-decoration: none;">www.marhire.com</a>
      </p>
      <p style="margin-top: 10px; font-size: 13px; color: #888;">
        Gracias por reservar con <strong style="color: #225f54;">MarHire</strong>. ¡Esperamos que disfrute de su experiencia de actividad!
      </p>
    </div>
  </div>
</body>
</html>