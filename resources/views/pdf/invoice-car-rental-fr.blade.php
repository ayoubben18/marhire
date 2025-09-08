<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <title>Facture de Location de Voiture MarHire</title>
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
        <h1>Facture de Location de Voiture MarHire</h1>
      </div>
      <div>
        <strong>N° de Facture :</strong> {{ $invoiceData['invoice_number'] }}<br />
        <strong>Date :</strong> {{ $invoiceData['invoice_date'] }}<br />
        <strong>Heure :</strong> {{ date('H:i') }}<br />
        <strong>Statut :</strong> 
        @if(strtolower($invoiceData['status']) == 'confirmed')
          <span class="status-confirmed">Confirmée</span>
        @elseif(strtolower($invoiceData['status']) == 'pending')
          <span class="status-pending">En attente</span>
        @else
          <span class="status-cancelled">Annulée</span>
        @endif
      </div>
    </div>

    <div class="section-title">Informations Client</div>
    <p>
      <strong>Nom :</strong> {{ $invoiceData['client_name'] }}<br />
      <strong>Email :</strong> {{ $invoiceData['client_email'] }}<br />
      <strong>Téléphone :</strong> {{ $invoiceData['client_phone'] }}<br />
      @if(isset($invoiceData['client_dob']) && $invoiceData['client_dob'])
      <strong>Date de Naissance :</strong> {{ $invoiceData['client_dob'] }}<br />
      @endif
      @if(isset($invoiceData['client_country']) && $invoiceData['client_country'])
      <strong>Pays :</strong> {{ $invoiceData['client_country'] }}<br />
      @endif
      @if(isset($invoiceData['client_flight_number']) && $invoiceData['client_flight_number'])
      <strong>Numéro de Vol :</strong> {{ $invoiceData['client_flight_number'] }}<br />
      @endif
      @if(isset($invoiceData['client_note']) && $invoiceData['client_note'] && $invoiceData['client_note'] !== 'N/A')
      <strong>Note :</strong> {{ $invoiceData['client_note'] }}<br />
      @endif
    </p>

    <div class="section-title">Détails de la Réservation</div>
    <p>
      <strong>Voiture :</strong> {{ $invoiceData['service_name'] }} – {{ $invoiceData['transmission'] ?? 'Manuelle' }} <br />
      @if(isset($invoiceData['rental_duration']))
      <strong>Durée de Location :</strong> {{ str_replace(['Days', 'Day', 'Hours', 'Hour'], ['Jours', 'Jour', 'Heures', 'Heure'], $invoiceData['rental_duration']) }}<br />
      @endif
      <strong>Prise en charge :</strong> {{ $invoiceData['pickup_location'] ?? 'N/A' }} – {{ $invoiceData['pickup_date'] ?? $invoiceData['check_in'] }} à {{ $invoiceData['pickup_time'] ?? '10:00' }}<br />
      <strong>Restitution :</strong> {{ $invoiceData['dropoff_location'] ?? $invoiceData['pickup_location'] ?? 'N/A' }} – {{ $invoiceData['dropoff_date'] ?? $invoiceData['check_out'] }} à {{ $invoiceData['dropoff_time'] ?? '10:00' }}
    </p>

    <div class="section-title">Frais</div>
    <table>
      <thead>
        <tr style="background-color: #f0f0f0;">
          <th style="color: #225f54;">Article</th>
          <th style="color: #225f54; text-align: right;">Montant</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>Location de Base{{ isset($invoiceData['rental_duration']) && isset($invoiceData['daily_rate']) ? ' (' . str_replace(['Days', 'Day', 'Hours', 'Hour'], ['Jours', 'Jour', 'Heures', 'Heure'], $invoiceData['rental_duration']) . ' × €' . number_format($invoiceData['daily_rate'], 0) . ')' : '' }}</td><td style="text-align: right;">€{{ number_format($invoiceData['booking_price'], 2) }}</td></tr>
        @if(!empty($invoiceData['addons']))
          @foreach($invoiceData['addons'] as $addon)
          <tr><td>Option : {{ $addon['name'] }}</td><td style="text-align: right;">€{{ number_format($addon['price'], 2) }}</td></tr>
          @endforeach
        @endif
        <tr><td>Assurance Complète Incluse (avec franchise)</td><td style="text-align: right;">Incluse</td></tr>
      </tbody>
      <tfoot>
        <tr><td>Sous-total</td><td style="text-align: right;">€{{ number_format($invoiceData['booking_price'] + $invoiceData['total_addons'], 2) }}</td></tr>
      </tfoot>
    </table>

    <div class="section-title">Taxes et Réductions</div>
    <table>
      <tbody>
        <tr><td>Taxe (0%)</td><td style="text-align: right;">€0.00</td></tr>
        @if(isset($invoiceData['discount_or_extra']) && $invoiceData['discount_or_extra'] != 0)
        <tr><td>{{ $invoiceData['discount_or_extra'] < 0 ? 'Réduction' : 'Frais Supplémentaires' }}</td><td style="text-align: right;">{{ $invoiceData['discount_or_extra'] < 0 ? '–' : '' }} €{{ number_format(abs($invoiceData['discount_or_extra']), 2) }}</td></tr>
        @else
        <tr><td>Réduction</td><td style="text-align: right;">– €0.00</td></tr>
        @endif
        <tr style="border-top: 2px solid #ccc;"><th>Total</th><th style="text-align: right;">€{{ number_format($invoiceData['grand_total'], 2) }}</th></tr>
      </tbody>
    </table>

    <div class="section-title">Conditions et Politiques de Location</div>
    <div class="terms">
      - Durée minimale de location : 3 jours complets<br />
      - Les réservations doivent être effectuées au moins 2 jours à l'avance<br />
      - Politique de carburant : Même niveau – Veuillez refaire le plein au même niveau<br />
      - Kilométrage : Kilométrage illimité selon le nombre de jours réservés<br />
      - Un dépôt remboursable peut être requis lors de la prise en charge, selon le véhicule<br />
      - L'assurance complète est incluse (avec franchise)<br />
      - Les options sont sous réserve de disponibilité<br />
      - Pour les conditions complètes, consultez nos <a href="https://www.marhire.com/terms" target="_blank">Conditions Générales</a> et notre <a href="https://www.marhire.com/cancellation-policy" target="_blank">Politique d'Annulation</a>
    </div>

    <div class="footer" style="border-top: 1px solid #ddd; padding-top: 20px; margin-top: 40px;">
      <p style="font-size: 14px; color: #444;">
        <strong>Phone:</strong> <a href="tel:{{ str_replace(' ', '', $invoiceData['company_phone']) }}" style="color: #225f54; text-decoration: none; margin-right: 15px;">{{ $invoiceData['company_phone'] }}</a>
        <strong>Email:</strong> <a href="mailto:{{ $invoiceData['company_email'] }}" style="color: #225f54; text-decoration: none; margin-right: 15px;">{{ $invoiceData['company_email'] }}</a>
        <strong>Web:</strong> <a href="https://www.marhire.com" target="_blank" style="color: #225f54; text-decoration: none;">www.marhire.com</a>
      </p>
      <p style="margin-top: 10px; font-size: 13px; color: #888;">
        Merci d'avoir réservé avec <strong style="color: #225f54;">MarHire Car</strong>. Nous sommes impatients de vous servir au Maroc.
      </p>
    </div>
  </div>
</body>
</html>