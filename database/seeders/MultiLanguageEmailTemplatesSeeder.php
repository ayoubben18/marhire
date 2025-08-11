<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class MultiLanguageEmailTemplatesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $now = Carbon::now();
        
        // Available variables for all templates
        $availableVariables = json_encode([
            '{{client_name}}' => 'Customer full name',
            '{{client_email}}' => 'Customer email',
            '{{booking_reference}}' => 'Booking reference number',
            '{{booking_id}}' => 'Booking ID',
            '{{listing_title}}' => 'Service/Product name',
            '{{check_in_date}}' => 'Check-in/Start date',
            '{{check_out_date}}' => 'Check-out/End date',
            '{{total_amount}}' => 'Total price',
            '{{currency}}' => 'Currency symbol',
            '{{admin_email}}' => 'Admin email address'
        ]);

        // French Templates
        $frenchTemplates = [
            [
                'category' => null,
                'event_type' => 'booking_received',
                'locale' => 'fr',
                'subject' => 'Votre demande de réservation a été reçue – MarHire',
                'body_html' => '<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <title>Confirmation de réservation</title>
  <style>
    body { font-family: Arial, sans-serif; background: #f8f8f8; margin: 0; padding: 0; }
    .email-container { max-width: 600px; margin: auto; background: #fff; border: 1px solid #ddd; padding: 20px; }
    .header { background-color: #225f54; color: #fff; text-align: center; padding: 15px; font-size: 20px; font-weight: bold; }
    .section-title { font-size: 16px; font-weight: bold; color: #225f54; margin-top: 25px; }
    .content-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
    .content-table td { padding: 8px 10px; border-bottom: 1px solid #eee; font-size: 14px; }
    .help-box {
      background-color: #f1fdfb;
      border: 1px solid #cbe8e4;
      padding: 15px;
      border-radius: 6px;
      font-size: 14px;
      margin-top: 10px;
    }
    .help-box a {
      font-weight: bold;
    }
    .footer { font-size: 12px; color: #666; text-align: center; margin-top: 30px; padding-top: 15px; border-top: 1px solid #ddd; }
    a { color: #225f54; text-decoration: none; }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">Votre demande de réservation a été reçue – MarHire</div>
    <p>Bonjour <strong>{{client_name}}</strong>,</p>
    <p>Merci d\'avoir réservé avec <strong>MarHire</strong>. Nous avons reçu votre demande de réservation et elle est actuellement en cours d\'examen. Veuillez trouver la facture jointe à cet e-mail.</p>

    <div class="section-title">Résumé de la réservation</div>
    <table class="content-table">
      <tr><td><strong>N° de facture:</strong></td><td>{{booking_reference}}</td></tr>
      <tr><td><strong>Statut:</strong></td><td style="color: #f0ad4e; font-weight: bold;">En attente</td></tr>
      <tr><td><strong>Service:</strong></td><td>{{listing_title}}</td></tr>
      <tr><td><strong>Arrivée:</strong></td><td>{{check_in_date}}</td></tr>
      <tr><td><strong>Départ:</strong></td><td>{{check_out_date}}</td></tr>
      <tr><td><strong>Total:</strong></td><td><strong>{{currency}} {{total_amount}}</strong></td></tr>
    </table>

    <div class="section-title">Informations client</div>
    <table class="content-table">
      <tr><td><strong>Nom:</strong></td><td>{{client_name}}</td></tr>
      <tr><td><strong>Email:</strong></td><td>{{client_email}}</td></tr>
    </table>

    <div class="section-title">Besoin d\'aide?</div>
    <div class="help-box">
      Notre équipe de support est là pour vous aider à tout moment:<br><br>
      Email: <a href="mailto:info@marhire.com">info@marhire.com</a><br>
      Téléphone / WhatsApp: <a href="tel:+212660745055">+212 660 745 055</a><br>
      Site Web: <a href="https://www.marhire.com">www.marhire.com</a>
    </div>

    <div class="footer">
      Merci d\'avoir choisi <strong>MarHire</strong>.<br />
      <em><a href="https://www.marhire.com/terms">Conditions générales</a> | <a href="https://www.marhire.com/cancellation-policy">Politique d\'annulation</a></em>
    </div>
  </div>
</body>
</html>',
                'default_body_html' => '<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <title>Confirmation de réservation</title>
  <style>
    body { font-family: Arial, sans-serif; background: #f8f8f8; margin: 0; padding: 0; }
    .email-container { max-width: 600px; margin: auto; background: #fff; border: 1px solid #ddd; padding: 20px; }
    .header { background-color: #225f54; color: #fff; text-align: center; padding: 15px; font-size: 20px; font-weight: bold; }
    .section-title { font-size: 16px; font-weight: bold; color: #225f54; margin-top: 25px; }
    .content-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
    .content-table td { padding: 8px 10px; border-bottom: 1px solid #eee; font-size: 14px; }
    .help-box {
      background-color: #f1fdfb;
      border: 1px solid #cbe8e4;
      padding: 15px;
      border-radius: 6px;
      font-size: 14px;
      margin-top: 10px;
    }
    .help-box a {
      font-weight: bold;
    }
    .footer { font-size: 12px; color: #666; text-align: center; margin-top: 30px; padding-top: 15px; border-top: 1px solid #ddd; }
    a { color: #225f54; text-decoration: none; }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">Votre demande de réservation a été reçue – MarHire</div>
    <p>Bonjour <strong>{{client_name}}</strong>,</p>
    <p>Merci d\'avoir réservé avec <strong>MarHire</strong>. Nous avons reçu votre demande de réservation et elle est actuellement en cours d\'examen. Veuillez trouver la facture jointe à cet e-mail.</p>

    <div class="section-title">Résumé de la réservation</div>
    <table class="content-table">
      <tr><td><strong>N° de facture:</strong></td><td>{{booking_reference}}</td></tr>
      <tr><td><strong>Statut:</strong></td><td style="color: #f0ad4e; font-weight: bold;">En attente</td></tr>
      <tr><td><strong>Service:</strong></td><td>{{listing_title}}</td></tr>
      <tr><td><strong>Arrivée:</strong></td><td>{{check_in_date}}</td></tr>
      <tr><td><strong>Départ:</strong></td><td>{{check_out_date}}</td></tr>
      <tr><td><strong>Total:</strong></td><td><strong>{{currency}} {{total_amount}}</strong></td></tr>
    </table>

    <div class="section-title">Informations client</div>
    <table class="content-table">
      <tr><td><strong>Nom:</strong></td><td>{{client_name}}</td></tr>
      <tr><td><strong>Email:</strong></td><td>{{client_email}}</td></tr>
    </table>

    <div class="section-title">Besoin d\'aide?</div>
    <div class="help-box">
      Notre équipe de support est là pour vous aider à tout moment:<br><br>
      Email: <a href="mailto:info@marhire.com">info@marhire.com</a><br>
      Téléphone / WhatsApp: <a href="tel:+212660745055">+212 660 745 055</a><br>
      Site Web: <a href="https://www.marhire.com">www.marhire.com</a>
    </div>

    <div class="footer">
      Merci d\'avoir choisi <strong>MarHire</strong>.<br />
      <em><a href="https://www.marhire.com/terms">Conditions générales</a> | <a href="https://www.marhire.com/cancellation-policy">Politique d\'annulation</a></em>
    </div>
  </div>
</body>
</html>',
                'default_subject' => 'Votre demande de réservation a été reçue – MarHire',
                'available_variables' => $availableVariables,
                'is_active' => true,
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'category' => null,
                'event_type' => 'booking_confirmed',
                'locale' => 'fr',
                'subject' => 'Votre réservation est confirmée – MarHire',
                'body_html' => '<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <title>Réservation confirmée</title>
  <style>
    body { font-family: Arial, sans-serif; background: #f8f8f8; margin: 0; padding: 0; }
    .email-container { max-width: 600px; margin: auto; background: #fff; border: 1px solid #ddd; padding: 20px; }
    .header { background-color: #225f54; color: #fff; text-align: center; padding: 15px; font-size: 20px; font-weight: bold; }
    .section-title { font-size: 16px; font-weight: bold; color: #225f54; margin-top: 25px; }
    .content-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
    .content-table td { padding: 8px 10px; border-bottom: 1px solid #eee; font-size: 14px; }
    .help-box {
      background-color: #f1fdfb;
      border: 1px solid #cbe8e4;
      padding: 15px;
      border-radius: 6px;
      font-size: 14px;
      margin-top: 10px;
    }
    .help-box a {
      font-weight: bold;
    }
    .footer { font-size: 12px; color: #666; text-align: center; margin-top: 30px; padding-top: 15px; border-top: 1px solid #ddd; }
    a { color: #225f54; text-decoration: none; }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">Votre réservation est confirmée – MarHire</div>
    <p>Bonjour <strong>{{client_name}}</strong>,</p>
    <p>Excellente nouvelle! Votre réservation avec <strong>MarHire</strong> est maintenant confirmée. Veuillez trouver votre facture confirmée en pièce jointe.</p>

    <div class="section-title">Détails de la réservation confirmée</div>
    <table class="content-table">
      <tr><td><strong>N° de facture:</strong></td><td>{{booking_reference}}</td></tr>
      <tr><td><strong>Statut:</strong></td><td style="color: #5cb85c; font-weight: bold;">Confirmé</td></tr>
      <tr><td><strong>Service:</strong></td><td>{{listing_title}}</td></tr>
      <tr><td><strong>Arrivée:</strong></td><td>{{check_in_date}}</td></tr>
      <tr><td><strong>Départ:</strong></td><td>{{check_out_date}}</td></tr>
      <tr><td><strong>Total:</strong></td><td><strong>{{currency}} {{total_amount}}</strong></td></tr>
    </table>

    <div class="section-title">Informations client</div>
    <table class="content-table">
      <tr><td><strong>Nom:</strong></td><td>{{client_name}}</td></tr>
      <tr><td><strong>Email:</strong></td><td>{{client_email}}</td></tr>
    </table>

    <div class="section-title">Besoin d\'aide?</div>
    <div class="help-box">
      Notre équipe de support est là pour vous aider à tout moment:<br><br>
      Email: <a href="mailto:info@marhire.com">info@marhire.com</a><br>
      Téléphone / WhatsApp: <a href="tel:+212660745055">+212 660 745 055</a><br>
      Site Web: <a href="https://www.marhire.com">www.marhire.com</a>
    </div>

    <div class="footer">
      Merci d\'avoir choisi <strong>MarHire</strong>.<br />
      <em><a href="https://www.marhire.com/terms">Conditions générales</a> | <a href="https://www.marhire.com/cancellation-policy">Politique d\'annulation</a></em>
    </div>
  </div>
</body>
</html>',
                'default_body_html' => '<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <title>Réservation confirmée</title>
  <style>
    body { font-family: Arial, sans-serif; background: #f8f8f8; margin: 0; padding: 0; }
    .email-container { max-width: 600px; margin: auto; background: #fff; border: 1px solid #ddd; padding: 20px; }
    .header { background-color: #225f54; color: #fff; text-align: center; padding: 15px; font-size: 20px; font-weight: bold; }
    .section-title { font-size: 16px; font-weight: bold; color: #225f54; margin-top: 25px; }
    .content-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
    .content-table td { padding: 8px 10px; border-bottom: 1px solid #eee; font-size: 14px; }
    .help-box {
      background-color: #f1fdfb;
      border: 1px solid #cbe8e4;
      padding: 15px;
      border-radius: 6px;
      font-size: 14px;
      margin-top: 10px;
    }
    .help-box a {
      font-weight: bold;
    }
    .footer { font-size: 12px; color: #666; text-align: center; margin-top: 30px; padding-top: 15px; border-top: 1px solid #ddd; }
    a { color: #225f54; text-decoration: none; }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">Votre réservation est confirmée – MarHire</div>
    <p>Bonjour <strong>{{client_name}}</strong>,</p>
    <p>Excellente nouvelle! Votre réservation avec <strong>MarHire</strong> est maintenant confirmée. Veuillez trouver votre facture confirmée en pièce jointe.</p>

    <div class="section-title">Détails de la réservation confirmée</div>
    <table class="content-table">
      <tr><td><strong>N° de facture:</strong></td><td>{{booking_reference}}</td></tr>
      <tr><td><strong>Statut:</strong></td><td style="color: #5cb85c; font-weight: bold;">Confirmé</td></tr>
      <tr><td><strong>Service:</strong></td><td>{{listing_title}}</td></tr>
      <tr><td><strong>Arrivée:</strong></td><td>{{check_in_date}}</td></tr>
      <tr><td><strong>Départ:</strong></td><td>{{check_out_date}}</td></tr>
      <tr><td><strong>Total:</strong></td><td><strong>{{currency}} {{total_amount}}</strong></td></tr>
    </table>

    <div class="section-title">Informations client</div>
    <table class="content-table">
      <tr><td><strong>Nom:</strong></td><td>{{client_name}}</td></tr>
      <tr><td><strong>Email:</strong></td><td>{{client_email}}</td></tr>
    </table>

    <div class="section-title">Besoin d\'aide?</div>
    <div class="help-box">
      Notre équipe de support est là pour vous aider à tout moment:<br><br>
      Email: <a href="mailto:info@marhire.com">info@marhire.com</a><br>
      Téléphone / WhatsApp: <a href="tel:+212660745055">+212 660 745 055</a><br>
      Site Web: <a href="https://www.marhire.com">www.marhire.com</a>
    </div>

    <div class="footer">
      Merci d\'avoir choisi <strong>MarHire</strong>.<br />
      <em><a href="https://www.marhire.com/terms">Conditions générales</a> | <a href="https://www.marhire.com/cancellation-policy">Politique d\'annulation</a></em>
    </div>
  </div>
</body>
</html>',
                'default_subject' => 'Votre réservation est confirmée – MarHire',
                'available_variables' => $availableVariables,
                'is_active' => true,
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'category' => null,
                'event_type' => 'booking_cancelled',
                'locale' => 'fr',
                'subject' => 'Votre réservation a été annulée – MarHire',
                'body_html' => '<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <title>Réservation annulée</title>
  <style>
    body { font-family: Arial, sans-serif; background: #f8f8f8; margin: 0; padding: 0; }
    .email-container { max-width: 600px; margin: auto; background: #fff; border: 1px solid #ddd; padding: 20px; }
    .header { background-color: #225f54; color: #fff; text-align: center; padding: 15px; font-size: 20px; font-weight: bold; }
    .section-title { font-size: 16px; font-weight: bold; color: #225f54; margin-top: 25px; }
    .content-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
    .content-table td { padding: 8px 10px; border-bottom: 1px solid #eee; font-size: 14px; }
    .help-box {
      background-color: #f1fdfb;
      border: 1px solid #cbe8e4;
      padding: 15px;
      border-radius: 6px;
      font-size: 14px;
      margin-top: 10px;
    }
    .help-box a {
      font-weight: bold;
    }
    .footer { font-size: 12px; color: #666; text-align: center; margin-top: 30px; padding-top: 15px; border-top: 1px solid #ddd; }
    a { color: #225f54; text-decoration: none; }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">Votre réservation a été annulée – MarHire</div>
    <p>Bonjour <strong>{{client_name}}</strong>,</p>
    <p>Nous vous informons que votre réservation avec <strong>MarHire</strong> a été annulée. Si vous avez des questions concernant cette annulation, n\'hésitez pas à nous contacter.</p>

    <div class="section-title">Détails de la réservation annulée</div>
    <table class="content-table">
      <tr><td><strong>N° de facture:</strong></td><td>{{booking_reference}}</td></tr>
      <tr><td><strong>Statut:</strong></td><td style="color: #d9534f; font-weight: bold;">Annulé</td></tr>
      <tr><td><strong>Service:</strong></td><td>{{listing_title}}</td></tr>
      <tr><td><strong>Date prévue d\'arrivée:</strong></td><td>{{check_in_date}}</td></tr>
      <tr><td><strong>Date prévue de départ:</strong></td><td>{{check_out_date}}</td></tr>
      <tr><td><strong>Montant total:</strong></td><td><strong>{{currency}} {{total_amount}}</strong></td></tr>
    </table>

    <div class="section-title">Informations client</div>
    <table class="content-table">
      <tr><td><strong>Nom:</strong></td><td>{{client_name}}</td></tr>
      <tr><td><strong>Email:</strong></td><td>{{client_email}}</td></tr>
    </table>

    <div class="section-title">Besoin d\'aide?</div>
    <div class="help-box">
      Notre équipe de support est là pour vous aider à tout moment:<br><br>
      Email: <a href="mailto:info@marhire.com">info@marhire.com</a><br>
      Téléphone / WhatsApp: <a href="tel:+212660745055">+212 660 745 055</a><br>
      Site Web: <a href="https://www.marhire.com">www.marhire.com</a>
    </div>

    <div class="footer">
      Merci pour votre compréhension.<br />
      <em><a href="https://www.marhire.com/terms">Conditions générales</a> | <a href="https://www.marhire.com/cancellation-policy">Politique d\'annulation</a></em>
    </div>
  </div>
</body>
</html>',
                'default_body_html' => '<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <title>Réservation annulée</title>
  <style>
    body { font-family: Arial, sans-serif; background: #f8f8f8; margin: 0; padding: 0; }
    .email-container { max-width: 600px; margin: auto; background: #fff; border: 1px solid #ddd; padding: 20px; }
    .header { background-color: #225f54; color: #fff; text-align: center; padding: 15px; font-size: 20px; font-weight: bold; }
    .section-title { font-size: 16px; font-weight: bold; color: #225f54; margin-top: 25px; }
    .content-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
    .content-table td { padding: 8px 10px; border-bottom: 1px solid #eee; font-size: 14px; }
    .help-box {
      background-color: #f1fdfb;
      border: 1px solid #cbe8e4;
      padding: 15px;
      border-radius: 6px;
      font-size: 14px;
      margin-top: 10px;
    }
    .help-box a {
      font-weight: bold;
    }
    .footer { font-size: 12px; color: #666; text-align: center; margin-top: 30px; padding-top: 15px; border-top: 1px solid #ddd; }
    a { color: #225f54; text-decoration: none; }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">Votre réservation a été annulée – MarHire</div>
    <p>Bonjour <strong>{{client_name}}</strong>,</p>
    <p>Nous vous informons que votre réservation avec <strong>MarHire</strong> a été annulée. Si vous avez des questions concernant cette annulation, n\'hésitez pas à nous contacter.</p>

    <div class="section-title">Détails de la réservation annulée</div>
    <table class="content-table">
      <tr><td><strong>N° de facture:</strong></td><td>{{booking_reference}}</td></tr>
      <tr><td><strong>Statut:</strong></td><td style="color: #d9534f; font-weight: bold;">Annulé</td></tr>
      <tr><td><strong>Service:</strong></td><td>{{listing_title}}</td></tr>
      <tr><td><strong>Date prévue d\'arrivée:</strong></td><td>{{check_in_date}}</td></tr>
      <tr><td><strong>Date prévue de départ:</strong></td><td>{{check_out_date}}</td></tr>
      <tr><td><strong>Montant total:</strong></td><td><strong>{{currency}} {{total_amount}}</strong></td></tr>
    </table>

    <div class="section-title">Informations client</div>
    <table class="content-table">
      <tr><td><strong>Nom:</strong></td><td>{{client_name}}</td></tr>
      <tr><td><strong>Email:</strong></td><td>{{client_email}}</td></tr>
    </table>

    <div class="section-title">Besoin d\'aide?</div>
    <div class="help-box">
      Notre équipe de support est là pour vous aider à tout moment:<br><br>
      Email: <a href="mailto:info@marhire.com">info@marhire.com</a><br>
      Téléphone / WhatsApp: <a href="tel:+212660745055">+212 660 745 055</a><br>
      Site Web: <a href="https://www.marhire.com">www.marhire.com</a>
    </div>

    <div class="footer">
      Merci pour votre compréhension.<br />
      <em><a href="https://www.marhire.com/terms">Conditions générales</a> | <a href="https://www.marhire.com/cancellation-policy">Politique d\'annulation</a></em>
    </div>
  </div>
</body>
</html>',
                'default_subject' => 'Votre réservation a été annulée – MarHire',
                'available_variables' => $availableVariables,
                'is_active' => true,
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'category' => null,
                'event_type' => 'booking_reminder',
                'locale' => 'fr',
                'subject' => 'Rappel de réservation à venir – MarHire',
                'body_html' => '<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <title>Rappel de réservation</title>
  <style>
    body { font-family: Arial, sans-serif; background: #f8f8f8; margin: 0; padding: 0; }
    .email-container { max-width: 600px; margin: auto; background: #fff; border: 1px solid #ddd; padding: 20px; }
    .header { background-color: #225f54; color: #fff; text-align: center; padding: 15px; font-size: 20px; font-weight: bold; }
    .section-title { font-size: 16px; font-weight: bold; color: #225f54; margin-top: 25px; }
    .content-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
    .content-table td { padding: 8px 10px; border-bottom: 1px solid #eee; font-size: 14px; }
    .help-box {
      background-color: #f1fdfb;
      border: 1px solid #cbe8e4;
      padding: 15px;
      border-radius: 6px;
      font-size: 14px;
      margin-top: 10px;
    }
    .help-box a {
      font-weight: bold;
    }
    .footer { font-size: 12px; color: #666; text-align: center; margin-top: 30px; padding-top: 15px; border-top: 1px solid #ddd; }
    a { color: #225f54; text-decoration: none; }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">Rappel de réservation à venir – MarHire</div>
    <p>Bonjour <strong>{{client_name}}</strong>,</p>
    <p>Ceci est un rappel amical que votre réservation avec <strong>MarHire</strong> approche. Nous avons hâte de vous servir!</p>

    <div class="section-title">Détails de votre réservation à venir</div>
    <table class="content-table">
      <tr><td><strong>N° de facture:</strong></td><td>{{booking_reference}}</td></tr>
      <tr><td><strong>Statut:</strong></td><td style="color: #5cb85c; font-weight: bold;">Confirmé</td></tr>
      <tr><td><strong>Service:</strong></td><td>{{listing_title}}</td></tr>
      <tr><td><strong>Arrivée:</strong></td><td>{{check_in_date}}</td></tr>
      <tr><td><strong>Départ:</strong></td><td>{{check_out_date}}</td></tr>
      <tr><td><strong>Total:</strong></td><td><strong>{{currency}} {{total_amount}}</strong></td></tr>
    </table>

    <div class="section-title">Informations client</div>
    <table class="content-table">
      <tr><td><strong>Nom:</strong></td><td>{{client_name}}</td></tr>
      <tr><td><strong>Email:</strong></td><td>{{client_email}}</td></tr>
    </table>

    <div class="section-title">Besoin d\'aide?</div>
    <div class="help-box">
      Notre équipe de support est là pour vous aider à tout moment:<br><br>
      Email: <a href="mailto:info@marhire.com">info@marhire.com</a><br>
      Téléphone / WhatsApp: <a href="tel:+212660745055">+212 660 745 055</a><br>
      Site Web: <a href="https://www.marhire.com">www.marhire.com</a>
    </div>

    <div class="footer">
      Merci d\'avoir choisi <strong>MarHire</strong>.<br />
      <em><a href="https://www.marhire.com/terms">Conditions générales</a> | <a href="https://www.marhire.com/cancellation-policy">Politique d\'annulation</a></em>
    </div>
  </div>
</body>
</html>',
                'default_body_html' => '<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <title>Rappel de réservation</title>
  <style>
    body { font-family: Arial, sans-serif; background: #f8f8f8; margin: 0; padding: 0; }
    .email-container { max-width: 600px; margin: auto; background: #fff; border: 1px solid #ddd; padding: 20px; }
    .header { background-color: #225f54; color: #fff; text-align: center; padding: 15px; font-size: 20px; font-weight: bold; }
    .section-title { font-size: 16px; font-weight: bold; color: #225f54; margin-top: 25px; }
    .content-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
    .content-table td { padding: 8px 10px; border-bottom: 1px solid #eee; font-size: 14px; }
    .help-box {
      background-color: #f1fdfb;
      border: 1px solid #cbe8e4;
      padding: 15px;
      border-radius: 6px;
      font-size: 14px;
      margin-top: 10px;
    }
    .help-box a {
      font-weight: bold;
    }
    .footer { font-size: 12px; color: #666; text-align: center; margin-top: 30px; padding-top: 15px; border-top: 1px solid #ddd; }
    a { color: #225f54; text-decoration: none; }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">Rappel de réservation à venir – MarHire</div>
    <p>Bonjour <strong>{{client_name}}</strong>,</p>
    <p>Ceci est un rappel amical que votre réservation avec <strong>MarHire</strong> approche. Nous avons hâte de vous servir!</p>

    <div class="section-title">Détails de votre réservation à venir</div>
    <table class="content-table">
      <tr><td><strong>N° de facture:</strong></td><td>{{booking_reference}}</td></tr>
      <tr><td><strong>Statut:</strong></td><td style="color: #5cb85c; font-weight: bold;">Confirmé</td></tr>
      <tr><td><strong>Service:</strong></td><td>{{listing_title}}</td></tr>
      <tr><td><strong>Arrivée:</strong></td><td>{{check_in_date}}</td></tr>
      <tr><td><strong>Départ:</strong></td><td>{{check_out_date}}</td></tr>
      <tr><td><strong>Total:</strong></td><td><strong>{{currency}} {{total_amount}}</strong></td></tr>
    </table>

    <div class="section-title">Informations client</div>
    <table class="content-table">
      <tr><td><strong>Nom:</strong></td><td>{{client_name}}</td></tr>
      <tr><td><strong>Email:</strong></td><td>{{client_email}}</td></tr>
    </table>

    <div class="section-title">Besoin d\'aide?</div>
    <div class="help-box">
      Notre équipe de support est là pour vous aider à tout moment:<br><br>
      Email: <a href="mailto:info@marhire.com">info@marhire.com</a><br>
      Téléphone / WhatsApp: <a href="tel:+212660745055">+212 660 745 055</a><br>
      Site Web: <a href="https://www.marhire.com">www.marhire.com</a>
    </div>

    <div class="footer">
      Merci d\'avoir choisi <strong>MarHire</strong>.<br />
      <em><a href="https://www.marhire.com/terms">Conditions générales</a> | <a href="https://www.marhire.com/cancellation-policy">Politique d\'annulation</a></em>
    </div>
  </div>
</body>
</html>',
                'default_subject' => 'Rappel de réservation à venir – MarHire',
                'available_variables' => $availableVariables,
                'is_active' => true,
                'created_at' => $now,
                'updated_at' => $now
            ]
        ];

        // Spanish Templates
        $spanishTemplates = [
            [
                'category' => null,
                'event_type' => 'booking_received',
                'locale' => 'es',
                'subject' => 'Su solicitud de reserva ha sido recibida – MarHire',
                'body_html' => '<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Confirmación de reserva</title>
  <style>
    body { font-family: Arial, sans-serif; background: #f8f8f8; margin: 0; padding: 0; }
    .email-container { max-width: 600px; margin: auto; background: #fff; border: 1px solid #ddd; padding: 20px; }
    .header { background-color: #225f54; color: #fff; text-align: center; padding: 15px; font-size: 20px; font-weight: bold; }
    .section-title { font-size: 16px; font-weight: bold; color: #225f54; margin-top: 25px; }
    .content-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
    .content-table td { padding: 8px 10px; border-bottom: 1px solid #eee; font-size: 14px; }
    .help-box {
      background-color: #f1fdfb;
      border: 1px solid #cbe8e4;
      padding: 15px;
      border-radius: 6px;
      font-size: 14px;
      margin-top: 10px;
    }
    .help-box a {
      font-weight: bold;
    }
    .footer { font-size: 12px; color: #666; text-align: center; margin-top: 30px; padding-top: 15px; border-top: 1px solid #ddd; }
    a { color: #225f54; text-decoration: none; }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">Su solicitud de reserva ha sido recibida – MarHire</div>
    <p>Hola <strong>{{client_name}}</strong>,</p>
    <p>Gracias por reservar con <strong>MarHire</strong>. Hemos recibido su solicitud de reserva y actualmente está bajo revisión. Por favor, encuentre la factura adjunta a este correo electrónico.</p>

    <div class="section-title">Resumen de la reserva</div>
    <table class="content-table">
      <tr><td><strong>N° de factura:</strong></td><td>{{booking_reference}}</td></tr>
      <tr><td><strong>Estado:</strong></td><td style="color: #f0ad4e; font-weight: bold;">Pendiente</td></tr>
      <tr><td><strong>Servicio:</strong></td><td>{{listing_title}}</td></tr>
      <tr><td><strong>Entrada:</strong></td><td>{{check_in_date}}</td></tr>
      <tr><td><strong>Salida:</strong></td><td>{{check_out_date}}</td></tr>
      <tr><td><strong>Total:</strong></td><td><strong>{{currency}} {{total_amount}}</strong></td></tr>
    </table>

    <div class="section-title">Información del cliente</div>
    <table class="content-table">
      <tr><td><strong>Nombre:</strong></td><td>{{client_name}}</td></tr>
      <tr><td><strong>Correo:</strong></td><td>{{client_email}}</td></tr>
    </table>

    <div class="section-title">¿Necesita ayuda?</div>
    <div class="help-box">
      Nuestro equipo de soporte está aquí para ayudarle en cualquier momento:<br><br>
      Correo: <a href="mailto:info@marhire.com">info@marhire.com</a><br>
      Teléfono / WhatsApp: <a href="tel:+212660745055">+212 660 745 055</a><br>
      Sitio web: <a href="https://www.marhire.com">www.marhire.com</a>
    </div>

    <div class="footer">
      Gracias por elegir <strong>MarHire</strong>.<br />
      <em><a href="https://www.marhire.com/terms">Términos y Condiciones</a> | <a href="https://www.marhire.com/cancellation-policy">Política de cancelación</a></em>
    </div>
  </div>
</body>
</html>',
                'default_body_html' => '<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Confirmación de reserva</title>
  <style>
    body { font-family: Arial, sans-serif; background: #f8f8f8; margin: 0; padding: 0; }
    .email-container { max-width: 600px; margin: auto; background: #fff; border: 1px solid #ddd; padding: 20px; }
    .header { background-color: #225f54; color: #fff; text-align: center; padding: 15px; font-size: 20px; font-weight: bold; }
    .section-title { font-size: 16px; font-weight: bold; color: #225f54; margin-top: 25px; }
    .content-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
    .content-table td { padding: 8px 10px; border-bottom: 1px solid #eee; font-size: 14px; }
    .help-box {
      background-color: #f1fdfb;
      border: 1px solid #cbe8e4;
      padding: 15px;
      border-radius: 6px;
      font-size: 14px;
      margin-top: 10px;
    }
    .help-box a {
      font-weight: bold;
    }
    .footer { font-size: 12px; color: #666; text-align: center; margin-top: 30px; padding-top: 15px; border-top: 1px solid #ddd; }
    a { color: #225f54; text-decoration: none; }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">Su solicitud de reserva ha sido recibida – MarHire</div>
    <p>Hola <strong>{{client_name}}</strong>,</p>
    <p>Gracias por reservar con <strong>MarHire</strong>. Hemos recibido su solicitud de reserva y actualmente está bajo revisión. Por favor, encuentre la factura adjunta a este correo electrónico.</p>

    <div class="section-title">Resumen de la reserva</div>
    <table class="content-table">
      <tr><td><strong>N° de factura:</strong></td><td>{{booking_reference}}</td></tr>
      <tr><td><strong>Estado:</strong></td><td style="color: #f0ad4e; font-weight: bold;">Pendiente</td></tr>
      <tr><td><strong>Servicio:</strong></td><td>{{listing_title}}</td></tr>
      <tr><td><strong>Entrada:</strong></td><td>{{check_in_date}}</td></tr>
      <tr><td><strong>Salida:</strong></td><td>{{check_out_date}}</td></tr>
      <tr><td><strong>Total:</strong></td><td><strong>{{currency}} {{total_amount}}</strong></td></tr>
    </table>

    <div class="section-title">Información del cliente</div>
    <table class="content-table">
      <tr><td><strong>Nombre:</strong></td><td>{{client_name}}</td></tr>
      <tr><td><strong>Correo:</strong></td><td>{{client_email}}</td></tr>
    </table>

    <div class="section-title">¿Necesita ayuda?</div>
    <div class="help-box">
      Nuestro equipo de soporte está aquí para ayudarle en cualquier momento:<br><br>
      Correo: <a href="mailto:info@marhire.com">info@marhire.com</a><br>
      Teléfono / WhatsApp: <a href="tel:+212660745055">+212 660 745 055</a><br>
      Sitio web: <a href="https://www.marhire.com">www.marhire.com</a>
    </div>

    <div class="footer">
      Gracias por elegir <strong>MarHire</strong>.<br />
      <em><a href="https://www.marhire.com/terms">Términos y Condiciones</a> | <a href="https://www.marhire.com/cancellation-policy">Política de cancelación</a></em>
    </div>
  </div>
</body>
</html>',
                'default_subject' => 'Su solicitud de reserva ha sido recibida – MarHire',
                'available_variables' => $availableVariables,
                'is_active' => true,
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'category' => null,
                'event_type' => 'booking_confirmed',
                'locale' => 'es',
                'subject' => 'Su reserva está confirmada – MarHire',
                'body_html' => '<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Reserva confirmada</title>
  <style>
    body { font-family: Arial, sans-serif; background: #f8f8f8; margin: 0; padding: 0; }
    .email-container { max-width: 600px; margin: auto; background: #fff; border: 1px solid #ddd; padding: 20px; }
    .header { background-color: #225f54; color: #fff; text-align: center; padding: 15px; font-size: 20px; font-weight: bold; }
    .section-title { font-size: 16px; font-weight: bold; color: #225f54; margin-top: 25px; }
    .content-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
    .content-table td { padding: 8px 10px; border-bottom: 1px solid #eee; font-size: 14px; }
    .help-box {
      background-color: #f1fdfb;
      border: 1px solid #cbe8e4;
      padding: 15px;
      border-radius: 6px;
      font-size: 14px;
      margin-top: 10px;
    }
    .help-box a {
      font-weight: bold;
    }
    .footer { font-size: 12px; color: #666; text-align: center; margin-top: 30px; padding-top: 15px; border-top: 1px solid #ddd; }
    a { color: #225f54; text-decoration: none; }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">Su reserva está confirmada – MarHire</div>
    <p>Hola <strong>{{client_name}}</strong>,</p>
    <p>¡Excelentes noticias! Su reserva con <strong>MarHire</strong> ahora está confirmada. Por favor, encuentre su factura confirmada adjunta.</p>

    <div class="section-title">Detalles de la reserva confirmada</div>
    <table class="content-table">
      <tr><td><strong>N° de factura:</strong></td><td>{{booking_reference}}</td></tr>
      <tr><td><strong>Estado:</strong></td><td style="color: #5cb85c; font-weight: bold;">Confirmado</td></tr>
      <tr><td><strong>Servicio:</strong></td><td>{{listing_title}}</td></tr>
      <tr><td><strong>Entrada:</strong></td><td>{{check_in_date}}</td></tr>
      <tr><td><strong>Salida:</strong></td><td>{{check_out_date}}</td></tr>
      <tr><td><strong>Total:</strong></td><td><strong>{{currency}} {{total_amount}}</strong></td></tr>
    </table>

    <div class="section-title">Información del cliente</div>
    <table class="content-table">
      <tr><td><strong>Nombre:</strong></td><td>{{client_name}}</td></tr>
      <tr><td><strong>Correo:</strong></td><td>{{client_email}}</td></tr>
    </table>

    <div class="section-title">¿Necesita ayuda?</div>
    <div class="help-box">
      Nuestro equipo de soporte está aquí para ayudarle en cualquier momento:<br><br>
      Correo: <a href="mailto:info@marhire.com">info@marhire.com</a><br>
      Teléfono / WhatsApp: <a href="tel:+212660745055">+212 660 745 055</a><br>
      Sitio web: <a href="https://www.marhire.com">www.marhire.com</a>
    </div>

    <div class="footer">
      Gracias por elegir <strong>MarHire</strong>.<br />
      <em><a href="https://www.marhire.com/terms">Términos y Condiciones</a> | <a href="https://www.marhire.com/cancellation-policy">Política de cancelación</a></em>
    </div>
  </div>
</body>
</html>',
                'default_body_html' => '<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Reserva confirmada</title>
  <style>
    body { font-family: Arial, sans-serif; background: #f8f8f8; margin: 0; padding: 0; }
    .email-container { max-width: 600px; margin: auto; background: #fff; border: 1px solid #ddd; padding: 20px; }
    .header { background-color: #225f54; color: #fff; text-align: center; padding: 15px; font-size: 20px; font-weight: bold; }
    .section-title { font-size: 16px; font-weight: bold; color: #225f54; margin-top: 25px; }
    .content-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
    .content-table td { padding: 8px 10px; border-bottom: 1px solid #eee; font-size: 14px; }
    .help-box {
      background-color: #f1fdfb;
      border: 1px solid #cbe8e4;
      padding: 15px;
      border-radius: 6px;
      font-size: 14px;
      margin-top: 10px;
    }
    .help-box a {
      font-weight: bold;
    }
    .footer { font-size: 12px; color: #666; text-align: center; margin-top: 30px; padding-top: 15px; border-top: 1px solid #ddd; }
    a { color: #225f54; text-decoration: none; }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">Su reserva está confirmada – MarHire</div>
    <p>Hola <strong>{{client_name}}</strong>,</p>
    <p>¡Excelentes noticias! Su reserva con <strong>MarHire</strong> ahora está confirmada. Por favor, encuentre su factura confirmada adjunta.</p>

    <div class="section-title">Detalles de la reserva confirmada</div>
    <table class="content-table">
      <tr><td><strong>N° de factura:</strong></td><td>{{booking_reference}}</td></tr>
      <tr><td><strong>Estado:</strong></td><td style="color: #5cb85c; font-weight: bold;">Confirmado</td></tr>
      <tr><td><strong>Servicio:</strong></td><td>{{listing_title}}</td></tr>
      <tr><td><strong>Entrada:</strong></td><td>{{check_in_date}}</td></tr>
      <tr><td><strong>Salida:</strong></td><td>{{check_out_date}}</td></tr>
      <tr><td><strong>Total:</strong></td><td><strong>{{currency}} {{total_amount}}</strong></td></tr>
    </table>

    <div class="section-title">Información del cliente</div>
    <table class="content-table">
      <tr><td><strong>Nombre:</strong></td><td>{{client_name}}</td></tr>
      <tr><td><strong>Correo:</strong></td><td>{{client_email}}</td></tr>
    </table>

    <div class="section-title">¿Necesita ayuda?</div>
    <div class="help-box">
      Nuestro equipo de soporte está aquí para ayudarle en cualquier momento:<br><br>
      Correo: <a href="mailto:info@marhire.com">info@marhire.com</a><br>
      Teléfono / WhatsApp: <a href="tel:+212660745055">+212 660 745 055</a><br>
      Sitio web: <a href="https://www.marhire.com">www.marhire.com</a>
    </div>

    <div class="footer">
      Gracias por elegir <strong>MarHire</strong>.<br />
      <em><a href="https://www.marhire.com/terms">Términos y Condiciones</a> | <a href="https://www.marhire.com/cancellation-policy">Política de cancelación</a></em>
    </div>
  </div>
</body>
</html>',
                'default_subject' => 'Su reserva está confirmada – MarHire',
                'available_variables' => $availableVariables,
                'is_active' => true,
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'category' => null,
                'event_type' => 'booking_cancelled',
                'locale' => 'es',
                'subject' => 'Su reserva ha sido cancelada – MarHire',
                'body_html' => '<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Reserva cancelada</title>
  <style>
    body { font-family: Arial, sans-serif; background: #f8f8f8; margin: 0; padding: 0; }
    .email-container { max-width: 600px; margin: auto; background: #fff; border: 1px solid #ddd; padding: 20px; }
    .header { background-color: #225f54; color: #fff; text-align: center; padding: 15px; font-size: 20px; font-weight: bold; }
    .section-title { font-size: 16px; font-weight: bold; color: #225f54; margin-top: 25px; }
    .content-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
    .content-table td { padding: 8px 10px; border-bottom: 1px solid #eee; font-size: 14px; }
    .help-box {
      background-color: #f1fdfb;
      border: 1px solid #cbe8e4;
      padding: 15px;
      border-radius: 6px;
      font-size: 14px;
      margin-top: 10px;
    }
    .help-box a {
      font-weight: bold;
    }
    .footer { font-size: 12px; color: #666; text-align: center; margin-top: 30px; padding-top: 15px; border-top: 1px solid #ddd; }
    a { color: #225f54; text-decoration: none; }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">Su reserva ha sido cancelada – MarHire</div>
    <p>Hola <strong>{{client_name}}</strong>,</p>
    <p>Le informamos que su reserva con <strong>MarHire</strong> ha sido cancelada. Si tiene alguna pregunta sobre esta cancelación, no dude en contactarnos.</p>

    <div class="section-title">Detalles de la reserva cancelada</div>
    <table class="content-table">
      <tr><td><strong>N° de factura:</strong></td><td>{{booking_reference}}</td></tr>
      <tr><td><strong>Estado:</strong></td><td style="color: #d9534f; font-weight: bold;">Cancelado</td></tr>
      <tr><td><strong>Servicio:</strong></td><td>{{listing_title}}</td></tr>
      <tr><td><strong>Fecha de entrada prevista:</strong></td><td>{{check_in_date}}</td></tr>
      <tr><td><strong>Fecha de salida prevista:</strong></td><td>{{check_out_date}}</td></tr>
      <tr><td><strong>Importe total:</strong></td><td><strong>{{currency}} {{total_amount}}</strong></td></tr>
    </table>

    <div class="section-title">Información del cliente</div>
    <table class="content-table">
      <tr><td><strong>Nombre:</strong></td><td>{{client_name}}</td></tr>
      <tr><td><strong>Correo:</strong></td><td>{{client_email}}</td></tr>
    </table>

    <div class="section-title">¿Necesita ayuda?</div>
    <div class="help-box">
      Nuestro equipo de soporte está aquí para ayudarle en cualquier momento:<br><br>
      Correo: <a href="mailto:info@marhire.com">info@marhire.com</a><br>
      Teléfono / WhatsApp: <a href="tel:+212660745055">+212 660 745 055</a><br>
      Sitio web: <a href="https://www.marhire.com">www.marhire.com</a>
    </div>

    <div class="footer">
      Gracias por su comprensión.<br />
      <em><a href="https://www.marhire.com/terms">Términos y Condiciones</a> | <a href="https://www.marhire.com/cancellation-policy">Política de cancelación</a></em>
    </div>
  </div>
</body>
</html>',
                'default_body_html' => '<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Reserva cancelada</title>
  <style>
    body { font-family: Arial, sans-serif; background: #f8f8f8; margin: 0; padding: 0; }
    .email-container { max-width: 600px; margin: auto; background: #fff; border: 1px solid #ddd; padding: 20px; }
    .header { background-color: #225f54; color: #fff; text-align: center; padding: 15px; font-size: 20px; font-weight: bold; }
    .section-title { font-size: 16px; font-weight: bold; color: #225f54; margin-top: 25px; }
    .content-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
    .content-table td { padding: 8px 10px; border-bottom: 1px solid #eee; font-size: 14px; }
    .help-box {
      background-color: #f1fdfb;
      border: 1px solid #cbe8e4;
      padding: 15px;
      border-radius: 6px;
      font-size: 14px;
      margin-top: 10px;
    }
    .help-box a {
      font-weight: bold;
    }
    .footer { font-size: 12px; color: #666; text-align: center; margin-top: 30px; padding-top: 15px; border-top: 1px solid #ddd; }
    a { color: #225f54; text-decoration: none; }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">Su reserva ha sido cancelada – MarHire</div>
    <p>Hola <strong>{{client_name}}</strong>,</p>
    <p>Le informamos que su reserva con <strong>MarHire</strong> ha sido cancelada. Si tiene alguna pregunta sobre esta cancelación, no dude en contactarnos.</p>

    <div class="section-title">Detalles de la reserva cancelada</div>
    <table class="content-table">
      <tr><td><strong>N° de factura:</strong></td><td>{{booking_reference}}</td></tr>
      <tr><td><strong>Estado:</strong></td><td style="color: #d9534f; font-weight: bold;">Cancelado</td></tr>
      <tr><td><strong>Servicio:</strong></td><td>{{listing_title}}</td></tr>
      <tr><td><strong>Fecha de entrada prevista:</strong></td><td>{{check_in_date}}</td></tr>
      <tr><td><strong>Fecha de salida prevista:</strong></td><td>{{check_out_date}}</td></tr>
      <tr><td><strong>Importe total:</strong></td><td><strong>{{currency}} {{total_amount}}</strong></td></tr>
    </table>

    <div class="section-title">Información del cliente</div>
    <table class="content-table">
      <tr><td><strong>Nombre:</strong></td><td>{{client_name}}</td></tr>
      <tr><td><strong>Correo:</strong></td><td>{{client_email}}</td></tr>
    </table>

    <div class="section-title">¿Necesita ayuda?</div>
    <div class="help-box">
      Nuestro equipo de soporte está aquí para ayudarle en cualquier momento:<br><br>
      Correo: <a href="mailto:info@marhire.com">info@marhire.com</a><br>
      Teléfono / WhatsApp: <a href="tel:+212660745055">+212 660 745 055</a><br>
      Sitio web: <a href="https://www.marhire.com">www.marhire.com</a>
    </div>

    <div class="footer">
      Gracias por su comprensión.<br />
      <em><a href="https://www.marhire.com/terms">Términos y Condiciones</a> | <a href="https://www.marhire.com/cancellation-policy">Política de cancelación</a></em>
    </div>
  </div>
</body>
</html>',
                'default_subject' => 'Su reserva ha sido cancelada – MarHire',
                'available_variables' => $availableVariables,
                'is_active' => true,
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'category' => null,
                'event_type' => 'booking_reminder',
                'locale' => 'es',
                'subject' => 'Recordatorio de próxima reserva – MarHire',
                'body_html' => '<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Recordatorio de reserva</title>
  <style>
    body { font-family: Arial, sans-serif; background: #f8f8f8; margin: 0; padding: 0; }
    .email-container { max-width: 600px; margin: auto; background: #fff; border: 1px solid #ddd; padding: 20px; }
    .header { background-color: #225f54; color: #fff; text-align: center; padding: 15px; font-size: 20px; font-weight: bold; }
    .section-title { font-size: 16px; font-weight: bold; color: #225f54; margin-top: 25px; }
    .content-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
    .content-table td { padding: 8px 10px; border-bottom: 1px solid #eee; font-size: 14px; }
    .help-box {
      background-color: #f1fdfb;
      border: 1px solid #cbe8e4;
      padding: 15px;
      border-radius: 6px;
      font-size: 14px;
      margin-top: 10px;
    }
    .help-box a {
      font-weight: bold;
    }
    .footer { font-size: 12px; color: #666; text-align: center; margin-top: 30px; padding-top: 15px; border-top: 1px solid #ddd; }
    a { color: #225f54; text-decoration: none; }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">Recordatorio de próxima reserva – MarHire</div>
    <p>Hola <strong>{{client_name}}</strong>,</p>
    <p>Este es un recordatorio amistoso de que su reserva con <strong>MarHire</strong> se acerca. ¡Esperamos atenderle pronto!</p>

    <div class="section-title">Detalles de su próxima reserva</div>
    <table class="content-table">
      <tr><td><strong>N° de factura:</strong></td><td>{{booking_reference}}</td></tr>
      <tr><td><strong>Estado:</strong></td><td style="color: #5cb85c; font-weight: bold;">Confirmado</td></tr>
      <tr><td><strong>Servicio:</strong></td><td>{{listing_title}}</td></tr>
      <tr><td><strong>Entrada:</strong></td><td>{{check_in_date}}</td></tr>
      <tr><td><strong>Salida:</strong></td><td>{{check_out_date}}</td></tr>
      <tr><td><strong>Total:</strong></td><td><strong>{{currency}} {{total_amount}}</strong></td></tr>
    </table>

    <div class="section-title">Información del cliente</div>
    <table class="content-table">
      <tr><td><strong>Nombre:</strong></td><td>{{client_name}}</td></tr>
      <tr><td><strong>Correo:</strong></td><td>{{client_email}}</td></tr>
    </table>

    <div class="section-title">¿Necesita ayuda?</div>
    <div class="help-box">
      Nuestro equipo de soporte está aquí para ayudarle en cualquier momento:<br><br>
      Correo: <a href="mailto:info@marhire.com">info@marhire.com</a><br>
      Teléfono / WhatsApp: <a href="tel:+212660745055">+212 660 745 055</a><br>
      Sitio web: <a href="https://www.marhire.com">www.marhire.com</a>
    </div>

    <div class="footer">
      Gracias por elegir <strong>MarHire</strong>.<br />
      <em><a href="https://www.marhire.com/terms">Términos y Condiciones</a> | <a href="https://www.marhire.com/cancellation-policy">Política de cancelación</a></em>
    </div>
  </div>
</body>
</html>',
                'default_body_html' => '<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Recordatorio de reserva</title>
  <style>
    body { font-family: Arial, sans-serif; background: #f8f8f8; margin: 0; padding: 0; }
    .email-container { max-width: 600px; margin: auto; background: #fff; border: 1px solid #ddd; padding: 20px; }
    .header { background-color: #225f54; color: #fff; text-align: center; padding: 15px; font-size: 20px; font-weight: bold; }
    .section-title { font-size: 16px; font-weight: bold; color: #225f54; margin-top: 25px; }
    .content-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
    .content-table td { padding: 8px 10px; border-bottom: 1px solid #eee; font-size: 14px; }
    .help-box {
      background-color: #f1fdfb;
      border: 1px solid #cbe8e4;
      padding: 15px;
      border-radius: 6px;
      font-size: 14px;
      margin-top: 10px;
    }
    .help-box a {
      font-weight: bold;
    }
    .footer { font-size: 12px; color: #666; text-align: center; margin-top: 30px; padding-top: 15px; border-top: 1px solid #ddd; }
    a { color: #225f54; text-decoration: none; }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">Recordatorio de próxima reserva – MarHire</div>
    <p>Hola <strong>{{client_name}}</strong>,</p>
    <p>Este es un recordatorio amistoso de que su reserva con <strong>MarHire</strong> se acerca. ¡Esperamos atenderle pronto!</p>

    <div class="section-title">Detalles de su próxima reserva</div>
    <table class="content-table">
      <tr><td><strong>N° de factura:</strong></td><td>{{booking_reference}}</td></tr>
      <tr><td><strong>Estado:</strong></td><td style="color: #5cb85c; font-weight: bold;">Confirmado</td></tr>
      <tr><td><strong>Servicio:</strong></td><td>{{listing_title}}</td></tr>
      <tr><td><strong>Entrada:</strong></td><td>{{check_in_date}}</td></tr>
      <tr><td><strong>Salida:</strong></td><td>{{check_out_date}}</td></tr>
      <tr><td><strong>Total:</strong></td><td><strong>{{currency}} {{total_amount}}</strong></td></tr>
    </table>

    <div class="section-title">Información del cliente</div>
    <table class="content-table">
      <tr><td><strong>Nombre:</strong></td><td>{{client_name}}</td></tr>
      <tr><td><strong>Correo:</strong></td><td>{{client_email}}</td></tr>
    </table>

    <div class="section-title">¿Necesita ayuda?</div>
    <div class="help-box">
      Nuestro equipo de soporte está aquí para ayudarle en cualquier momento:<br><br>
      Correo: <a href="mailto:info@marhire.com">info@marhire.com</a><br>
      Teléfono / WhatsApp: <a href="tel:+212660745055">+212 660 745 055</a><br>
      Sitio web: <a href="https://www.marhire.com">www.marhire.com</a>
    </div>

    <div class="footer">
      Gracias por elegir <strong>MarHire</strong>.<br />
      <em><a href="https://www.marhire.com/terms">Términos y Condiciones</a> | <a href="https://www.marhire.com/cancellation-policy">Política de cancelación</a></em>
    </div>
  </div>
</body>
</html>',
                'default_subject' => 'Recordatorio de próxima reserva – MarHire',
                'available_variables' => $availableVariables,
                'is_active' => true,
                'created_at' => $now,
                'updated_at' => $now
            ]
        ];

        // Insert French templates
        foreach ($frenchTemplates as $template) {
            DB::table('email_templates')->updateOrInsert(
                [
                    'category' => $template['category'],
                    'event_type' => $template['event_type'],
                    'locale' => $template['locale']
                ],
                $template
            );
        }

        // Insert Spanish templates
        foreach ($spanishTemplates as $template) {
            DB::table('email_templates')->updateOrInsert(
                [
                    'category' => $template['category'],
                    'event_type' => $template['event_type'],
                    'locale' => $template['locale']
                ],
                $template
            );
        }

        // Success message will be shown by artisan if run through artisan
        // $this->command->info('Multi-language email templates seeded successfully!');
    }
}