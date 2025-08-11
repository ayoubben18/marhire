<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <title>Facture Location de Bateau MarHire</title>
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
        <h1>Facture Location de Bateau MarHire</h1>
      </div>
      <div>
        <strong>N° Facture:</strong> {{ $invoiceData['invoice_number'] }}<br />
        <strong>Date:</strong> {{ $invoiceData['invoice_date'] }}<br />
        <strong>Heure:</strong> {{ date('H:i') }}<br />
        <strong>Statut:</strong> 
        @if(strtolower($invoiceData['status']) == 'confirmed')
          <span class="status-confirmed">Confirmé</span>
        @elseif(strtolower($invoiceData['status']) == 'pending')
          <span class="status-pending">En attente</span>
        @else
          <span class="status-cancelled">Annulé</span>
        @endif
      </div>
    </div>

    <div class="section-title">Informations Client</div>
    <p>
      <strong>Nom:</strong> {{ $invoiceData['client_name'] }}<br />
      <strong>Email:</strong> {{ $invoiceData['client_email'] }}<br />
      <strong>Téléphone:</strong> {{ $invoiceData['client_phone'] }}<br />
      @if(isset($invoiceData['client_dob']) && $invoiceData['client_dob'])
      <strong>Date de naissance:</strong> {{ $invoiceData['client_dob'] }}<br />
      @endif
      @if(isset($invoiceData['client_country']) && $invoiceData['client_country'])
      <strong>Pays:</strong> {{ $invoiceData['client_country'] }}<br />
      @endif
      @if(isset($invoiceData['client_note']) && $invoiceData['client_note'] && $invoiceData['client_note'] !== 'N/A')
      <strong>Note:</strong> {{ $invoiceData['client_note'] }}<br />
      @endif
    </p>

    <div class="section-title">Détails de la Réservation</div>
    <p>
      <strong>Bateau:</strong> {{ $invoiceData['service_name'] }} – {{ $invoiceData['departure_location'] ?? 'Port de plaisance' }}<br />
      @if(isset($invoiceData['rental_duration']))
      <strong>Durée de location:</strong> {{ $invoiceData['rental_duration'] }}<br />
      @endif
      <strong>Départ:</strong> {{ $invoiceData['departure_location'] ?? 'Port de plaisance' }} – {{ $invoiceData['departure_date'] ?? $invoiceData['check_in'] }} à {{ $invoiceData['departure_time'] ?? '10:00' }}<br />
    </p>

    <div class="section-title">Tarifs</div>
    <table>
      <thead>
        <tr style="background-color: #f0f0f0;">
          <th style="color: #225f54;">Article</th>
          <th style="color: #225f54; text-align: right;">Montant</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>Location de base{{ isset($invoiceData['rental_duration']) && isset($invoiceData['hourly_rate']) ? ' (' . $invoiceData['rental_duration'] . ' × €' . number_format($invoiceData['hourly_rate'], 0) . ')' : '' }}</td><td style="text-align: right;">€{{ number_format($invoiceData['booking_price'], 2) }}</td></tr>
        @if(!empty($invoiceData['addons']))
          @foreach($invoiceData['addons'] as $addon)
          <tr><td>Option: {{ $addon['name'] }}</td><td style="text-align: right;">€{{ number_format($addon['price'], 2) }}</td></tr>
          @endforeach
        @endif
        <tr><td>Capitaine et carburant inclus</td><td style="text-align: right;">Inclus</td></tr>
      </tbody>
      <tfoot>
        <tr><td>Sous-total</td><td style="text-align: right;">€{{ number_format($invoiceData['booking_price'] + $invoiceData['total_addons'], 2) }}</td></tr>
      </tfoot>
    </table>

    <div class="section-title">Taxes et Remises</div>
    <table>
      <tbody>
        <tr><td>Taxe (0%)</td><td style="text-align: right;">€0,00</td></tr>
        @if(isset($invoiceData['discount_or_extra']) && $invoiceData['discount_or_extra'] != 0)
        <tr><td>{{ $invoiceData['discount_or_extra'] < 0 ? 'Remise' : 'Frais supplémentaires' }}</td><td style="text-align: right;">{{ $invoiceData['discount_or_extra'] < 0 ? '–' : '' }} €{{ number_format(abs($invoiceData['discount_or_extra']), 2) }}</td></tr>
        @else
        <tr><td>Remise</td><td style="text-align: right;">– €0,00</td></tr>
        @endif
        <tr style="border-top: 2px solid #ccc;"><th>Total</th><th style="text-align: right;">€{{ number_format($invoiceData['grand_total'], 2) }}</th></tr>
      </tbody>
    </table>

    <div class="section-title">Conditions de Location et Politiques</div>
    <div class="terms">
      - Les locations de bateaux doivent être réservées au moins 2 jours à l'avance<br />
      - Options de durée : horaire, demi-journée, ou journée complète selon l'annonce<br />
      - Capitaine et carburant inclus sauf indication contraire<br />
      - Veuillez arriver 15 minutes avant le départ<br />
      - Options et services supplémentaires sous réserve de disponibilité<br />
      - Pour les conditions complètes, consultez nos <a href="https://www.marhire.com/terms" target="_blank">Conditions Générales</a> et <a href="https://www.marhire.com/cancellation-policy" target="_blank">Politique d'Annulation</a>
    </div>

    <div class="footer" style="border-top: 1px solid #ddd; padding-top: 20px; margin-top: 40px;">
      <p style="font-size: 14px; color: #444;">
        📞 <a href="tel:{{ str_replace(' ', '', $invoiceData['company_phone']) }}" style="color: #225f54; text-decoration: none; margin-right: 15px;">{{ $invoiceData['company_phone'] }}</a>
        📧 <a href="mailto:{{ $invoiceData['company_email'] }}" style="color: #225f54; text-decoration: none; margin-right: 15px;">{{ $invoiceData['company_email'] }}</a>
        🌐 <a href="https://www.marhire.com" target="_blank" style="color: #225f54; text-decoration: none;">www.marhire.com</a>
      </p>
      <p style="margin-top: 10px; font-size: 13px; color: #888;">
        Merci d'avoir réservé avec <strong style="color: #225f54;">MarHire</strong>. Nous avons hâte de vous accueillir à bord.
      </p>
    </div>
  </div>
</body>
</html>