<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class FixedEmailTemplatesSeeder extends Seeder
{
    public function run(): void
    {
        $now = Carbon::now();
        
        // First, delete ALL existing templates to start fresh
        DB::table('email_templates')->truncate();
        echo "Cleared all existing templates.\n";
        
        // Available variables that the EmailService actually uses
        $availableVariables = json_encode([
            '{{client_name}}' => 'Customer full name',
            '{{client_email}}' => 'Customer email',
            '{{client_phone}}' => 'Customer phone/WhatsApp',
            '{{client_dob}}' => 'Customer date of birth',
            '{{client_notes}}' => 'Customer notes',
            '{{booking_reference}}' => 'Booking invoice number',
            '{{listing_title}}' => 'Service/Product name',
            '{{check_in_date}}' => 'Start date',
            '{{check_out_date}}' => 'End date',
            '{{total_amount}}' => 'Total price',
            '{{currency}}' => 'Currency symbol'
        ]);

        // Base HTML template structure (same for all languages, just text changes)
        $getTemplate = function($lang, $eventType) {
            $translations = [
                'en' => [
                    'booking_received' => [
                        'subject' => 'Your Booking Request Has Been Received – MarHire',
                        'header' => 'Your Booking Request Has Been Received – MarHire',
                        'greeting' => 'Hello',
                        'message' => "Thank you for booking with <strong>MarHire</strong>. We've received your booking request and it is currently under review. Please find the invoice attached to this email.",
                        'booking_summary' => 'Booking Summary',
                        'invoice_no' => 'Invoice No:',
                        'status' => 'Status:',
                        'status_value' => 'Pending',
                        'status_color' => '#f0ad4e',
                        'service' => 'Service:',
                        'start' => 'Start:',
                        'end' => 'End:',
                        'total' => 'Total:',
                        'client_info' => 'Client Information',
                        'name' => 'Name:',
                        'email' => 'Email:',
                        'phone' => 'Phone:',
                        'dob' => 'Date of Birth:',
                        'note' => 'Note:',
                        'need_help' => 'Need Help?',
                        'support_text' => 'Our support team is here to assist you anytime:',
                        'footer' => 'Thank you for choosing <strong>MarHire</strong>.',
                        'terms' => 'Terms & Conditions',
                        'cancel_policy' => 'Cancellation Policy'
                    ],
                    'booking_confirmed' => [
                        'subject' => 'Your Booking is Confirmed – MarHire',
                        'header' => 'Your Booking is Confirmed – MarHire',
                        'greeting' => 'Hello',
                        'message' => "Thank you for booking with <strong>MarHire</strong>. We're pleased to confirm your reservation. Please find the invoice attached to this email.",
                        'booking_summary' => 'Booking Summary',
                        'status_value' => 'Confirmed',
                        'status_color' => '#28a745'
                    ],
                    'booking_cancelled' => [
                        'subject' => 'Your Booking Has Been Canceled – MarHire',
                        'header' => 'Your Booking Has Been Canceled – MarHire',
                        'greeting' => 'Hello',
                        'message' => "Thank you for booking with <strong>MarHire</strong>. Unfortunately, your booking has been canceled. If you have any questions or would like to reschedule, please contact our support team. Please find the invoice attached to this email.",
                        'booking_summary' => 'Booking Summary',
                        'status_value' => 'Canceled',
                        'status_color' => '#d9534f'
                    ],
                    'booking_reminder' => [
                        'subject' => 'Upcoming Booking Reminder – MarHire',
                        'header' => 'Upcoming Booking Reminder – MarHire',
                        'greeting' => 'Hello',
                        'message' => "This is a friendly reminder that your upcoming booking with <strong>MarHire</strong> is scheduled to start soon. Please review the details below and make sure everything is in order. <strong>If you decide to cancel or make changes, please let us know as soon as possible.</strong> If you have any questions or last-minute changes, feel free to contact us.",
                        'booking_summary' => 'Booking Summary',
                        'status_value' => 'Upcoming',
                        'status_color' => '#f0ad4e'
                    ]
                ],
                'fr' => [
                    'booking_received' => [
                        'subject' => 'Votre demande de réservation a été reçue – MarHire',
                        'header' => 'Votre demande de réservation a été reçue – MarHire',
                        'greeting' => 'Bonjour',
                        'message' => "Merci d'avoir réservé avec <strong>MarHire</strong>. Nous avons reçu votre demande de réservation et elle est actuellement en cours d'examen. Veuillez trouver la facture jointe à cet e-mail.",
                        'booking_summary' => 'Résumé de la réservation',
                        'invoice_no' => 'N° de facture:',
                        'status' => 'Statut:',
                        'status_value' => 'En attente',
                        'status_color' => '#f0ad4e',
                        'service' => 'Service:',
                        'start' => 'Début:',
                        'end' => 'Fin:',
                        'total' => 'Total:',
                        'client_info' => 'Informations client',
                        'name' => 'Nom:',
                        'email' => 'Email:',
                        'phone' => 'Téléphone:',
                        'dob' => 'Date de naissance:',
                        'note' => 'Note:',
                        'need_help' => "Besoin d'aide?",
                        'support_text' => 'Notre équipe de support est là pour vous aider à tout moment:',
                        'footer' => "Merci d'avoir choisi <strong>MarHire</strong>.",
                        'terms' => 'Conditions générales',
                        'cancel_policy' => "Politique d'annulation"
                    ],
                    'booking_confirmed' => [
                        'subject' => 'Votre réservation est confirmée – MarHire',
                        'header' => 'Votre réservation est confirmée – MarHire',
                        'greeting' => 'Bonjour',
                        'message' => "Excellente nouvelle! Votre réservation avec <strong>MarHire</strong> est maintenant confirmée. Veuillez trouver votre facture confirmée en pièce jointe.",
                        'booking_summary' => 'Détails de la réservation confirmée',
                        'status_value' => 'Confirmé',
                        'status_color' => '#28a745'
                    ],
                    'booking_cancelled' => [
                        'subject' => 'Votre réservation a été annulée – MarHire',
                        'header' => 'Votre réservation a été annulée – MarHire',
                        'greeting' => 'Bonjour',
                        'message' => "Nous vous informons que votre réservation avec <strong>MarHire</strong> a été annulée. Si vous avez des questions concernant cette annulation, n'hésitez pas à nous contacter.",
                        'booking_summary' => 'Détails de la réservation annulée',
                        'status_value' => 'Annulé',
                        'status_color' => '#d9534f'
                    ],
                    'booking_reminder' => [
                        'subject' => 'Rappel de réservation à venir – MarHire',
                        'header' => 'Rappel de réservation à venir – MarHire',
                        'greeting' => 'Bonjour',
                        'message' => "Ceci est un rappel amical que votre réservation avec <strong>MarHire</strong> approche. Nous avons hâte de vous servir!",
                        'booking_summary' => 'Détails de votre réservation à venir',
                        'status_value' => 'À venir',
                        'status_color' => '#f0ad4e'
                    ]
                ],
                'es' => [
                    'booking_received' => [
                        'subject' => 'Su solicitud de reserva ha sido recibida – MarHire',
                        'header' => 'Su solicitud de reserva ha sido recibida – MarHire',
                        'greeting' => 'Hola',
                        'message' => "Gracias por reservar con <strong>MarHire</strong>. Hemos recibido su solicitud de reserva y actualmente está bajo revisión. Por favor, encuentre la factura adjunta a este correo electrónico.",
                        'booking_summary' => 'Resumen de la reserva',
                        'invoice_no' => 'N° de factura:',
                        'status' => 'Estado:',
                        'status_value' => 'Pendiente',
                        'status_color' => '#f0ad4e',
                        'service' => 'Servicio:',
                        'start' => 'Inicio:',
                        'end' => 'Fin:',
                        'total' => 'Total:',
                        'client_info' => 'Información del cliente',
                        'name' => 'Nombre:',
                        'email' => 'Correo:',
                        'phone' => 'Teléfono:',
                        'dob' => 'Fecha de nacimiento:',
                        'note' => 'Nota:',
                        'need_help' => '¿Necesita ayuda?',
                        'support_text' => 'Nuestro equipo de soporte está aquí para ayudarle en cualquier momento:',
                        'footer' => 'Gracias por elegir <strong>MarHire</strong>.',
                        'terms' => 'Términos y Condiciones',
                        'cancel_policy' => 'Política de cancelación'
                    ],
                    'booking_confirmed' => [
                        'subject' => 'Su reserva está confirmada – MarHire',
                        'header' => 'Su reserva está confirmada – MarHire',
                        'greeting' => 'Hola',
                        'message' => "¡Excelentes noticias! Su reserva con <strong>MarHire</strong> ahora está confirmada. Por favor, encuentre su factura confirmada adjunta.",
                        'booking_summary' => 'Detalles de la reserva confirmada',
                        'status_value' => 'Confirmado',
                        'status_color' => '#28a745'
                    ],
                    'booking_cancelled' => [
                        'subject' => 'Su reserva ha sido cancelada – MarHire',
                        'header' => 'Su reserva ha sido cancelada – MarHire',
                        'greeting' => 'Hola',
                        'message' => "Le informamos que su reserva con <strong>MarHire</strong> ha sido cancelada. Si tiene alguna pregunta sobre esta cancelación, no dude en contactarnos.",
                        'booking_summary' => 'Detalles de la reserva cancelada',
                        'status_value' => 'Cancelado',
                        'status_color' => '#d9534f'
                    ],
                    'booking_reminder' => [
                        'subject' => 'Recordatorio de próxima reserva – MarHire',
                        'header' => 'Recordatorio de próxima reserva – MarHire',
                        'greeting' => 'Hola',
                        'message' => "Este es un recordatorio amistoso de que su reserva con <strong>MarHire</strong> se acerca. ¡Esperamos atenderle pronto!",
                        'booking_summary' => 'Detalles de su próxima reserva',
                        'status_value' => 'Próxima',
                        'status_color' => '#f0ad4e'
                    ]
                ]
            ];

            // Get base translations for this event type
            $baseT = $translations['en']['booking_received'];
            if (isset($translations[$lang][$eventType])) {
                $t = array_merge($baseT, $translations[$lang][$eventType]);
            } else {
                $t = array_merge($baseT, $translations[$lang]['booking_received']);
            }

            $html = '<!DOCTYPE html>
<html lang="' . $lang . '">
<head>
  <meta charset="UTF-8" />
  <title>' . $t['subject'] . '</title>
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
    <div class="header">' . $t['header'] . '</div>
    <p>' . $t['greeting'] . ' <strong>{{client_name}}</strong>,</p>
    <p>' . $t['message'] . '</p>

    <div class="section-title">' . $t['booking_summary'] . '</div>
    <table class="content-table">
      <tr><td><strong>' . $t['invoice_no'] . '</strong></td><td>{{booking_reference}}</td></tr>
      <tr><td><strong>' . $t['status'] . '</strong></td><td style="color: ' . $t['status_color'] . '; font-weight: bold;">' . $t['status_value'] . '</td></tr>
      <tr><td><strong>' . $t['service'] . '</strong></td><td>{{listing_title}}</td></tr>
      <tr><td><strong>' . $t['start'] . '</strong></td><td>{{check_in_date}}</td></tr>
      <tr><td><strong>' . $t['end'] . '</strong></td><td>{{check_out_date}}</td></tr>
      <tr><td><strong>' . $t['total'] . '</strong></td><td><strong>{{currency}} {{total_amount}}</strong></td></tr>
    </table>

    <div class="section-title">' . $t['client_info'] . '</div>
    <table class="content-table">
      <tr><td><strong>' . $t['name'] . '</strong></td><td>{{client_name}}</td></tr>
      <tr><td><strong>' . $t['email'] . '</strong></td><td>{{client_email}}</td></tr>
      <tr><td><strong>' . $t['phone'] . '</strong></td><td>{{client_phone}}</td></tr>
      <tr><td><strong>' . $t['dob'] . '</strong></td><td>{{client_dob}}</td></tr>
      <tr><td><strong>' . $t['note'] . '</strong></td><td>{{client_notes}}</td></tr>
    </table>

    <div class="section-title">' . $t['need_help'] . '</div>
    <div class="help-box">
      ' . $t['support_text'] . '<br><br>
      Email: <a href="mailto:info@marhire.com">info@marhire.com</a><br>
      ' . ($lang === 'fr' ? 'Téléphone' : ($lang === 'es' ? 'Teléfono' : 'Phone')) . ' / WhatsApp: <a href="tel:+212660745055">+212 660 745 055</a><br>
      ' . ($lang === 'fr' ? 'Site Web' : ($lang === 'es' ? 'Sitio web' : 'Website')) . ': <a href="https://www.marhire.com">www.marhire.com</a>
    </div>

    <div class="footer">
      ' . $t['footer'] . '<br />
      <em><a href="https://www.marhire.com/terms">' . $t['terms'] . '</a> | <a href="https://www.marhire.com/cancellation-policy">' . $t['cancel_policy'] . '</a></em>
    </div>
  </div>
</body>
</html>';

            return [
                'subject' => $t['subject'],
                'html' => $html
            ];
        };

        // Create templates for each language and event type
        $languages = ['en', 'fr', 'es'];
        $eventTypes = ['booking_received', 'booking_confirmed', 'booking_cancelled', 'booking_reminder'];

        foreach ($languages as $lang) {
            foreach ($eventTypes as $eventType) {
                $template = $getTemplate($lang, $eventType);
                
                DB::table('email_templates')->insert([
                    'category' => null,
                    'event_type' => $eventType,
                    'locale' => $lang,
                    'subject' => $template['subject'],
                    'body_html' => $template['html'],
                    'default_body_html' => $template['html'],
                    'default_subject' => $template['subject'],
                    'available_variables' => $availableVariables,
                    'is_active' => true,
                    'created_at' => $now,
                    'updated_at' => $now
                ]);
                
                echo "Created: $lang - $eventType\n";
            }
        }

        echo "\n✅ All email templates have been fixed with proper structure!\n";
    }
}