<?php

namespace Database\Seeders;

use App\Models\Listing;
use App\Models\ListingTranslation;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ListingTranslationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Get first 5 listings or create sample ones if none exist
        $listings = Listing::limit(5)->get();

        if ($listings->isEmpty()) {
            $this->command->info('No listings found. Please run listings seeder first.');
            return;
        }

        $translations = [
            'fr' => [
                'prefixes' => [
                    'title' => ['Location de ', 'Service de ', 'Excursion ', 'Activité ', 'Transport '],
                    'short_description' => [
                        'Profitez de notre excellent service de location',
                        'Découvrez notre offre exclusive',
                        'Une expérience inoubliable vous attend',
                        'Service premium à votre disposition',
                        'La meilleure option pour votre voyage'
                    ],
                    'description' => [
                        'Nous offrons un service exceptionnel avec des véhicules modernes et bien entretenus. Notre équipe professionnelle est à votre service pour garantir une expérience mémorable.',
                        'Découvrez le confort et la fiabilité avec notre flotte premium. Chaque détail est pensé pour votre satisfaction totale.',
                        'Une aventure unique vous attend avec nos services spécialisés. Profitez de tarifs compétitifs et d\'un service client exceptionnel.',
                        'Explorez la région en toute tranquillité avec nos solutions de transport adaptées à vos besoins.',
                        'Service haut de gamme pour les voyageurs exigeants. Réservation simple et assistance 24/7.'
                    ],
                    'special_notes' => 'Réservation requise 24h à l\'avance. Documents d\'identité obligatoires.',
                    'cancellation_policy' => 'Annulation gratuite jusqu\'à 48 heures avant la date de location. Au-delà, 50% du montant sera facturé.',
                    'rental_terms' => 'Le conducteur doit avoir au moins 21 ans et posséder un permis de conduire valide depuis plus de 2 ans.',
                    'pickup_info' => 'Prise en charge disponible à l\'aéroport, au port et dans les hôtels principaux.',
                ],
            ],
            'es' => [
                'prefixes' => [
                    'title' => ['Alquiler de ', 'Servicio de ', 'Excursión ', 'Actividad ', 'Transporte '],
                    'short_description' => [
                        'Disfrute de nuestro excelente servicio de alquiler',
                        'Descubra nuestra oferta exclusiva',
                        'Una experiencia inolvidable le espera',
                        'Servicio premium a su disposición',
                        'La mejor opción para su viaje'
                    ],
                    'description' => [
                        'Ofrecemos un servicio excepcional con vehículos modernos y bien mantenidos. Nuestro equipo profesional está a su servicio para garantizar una experiencia memorable.',
                        'Descubra el confort y la fiabilidad con nuestra flota premium. Cada detalle está pensado para su satisfacción total.',
                        'Una aventura única le espera con nuestros servicios especializados. Disfrute de tarifas competitivas y un servicio al cliente excepcional.',
                        'Explore la región con tranquilidad con nuestras soluciones de transporte adaptadas a sus necesidades.',
                        'Servicio de alta gama para viajeros exigentes. Reserva simple y asistencia 24/7.'
                    ],
                    'special_notes' => 'Reserva requerida con 24h de antelación. Documentos de identidad obligatorios.',
                    'cancellation_policy' => 'Cancelación gratuita hasta 48 horas antes de la fecha de alquiler. Después, se cobrará el 50% del importe.',
                    'rental_terms' => 'El conductor debe tener al menos 21 años y poseer una licencia de conducir válida por más de 2 años.',
                    'pickup_info' => 'Recogida disponible en el aeropuerto, puerto y hoteles principales.',
                ],
            ],
        ];

        foreach ($listings as $index => $listing) {
            foreach (['fr', 'es'] as $locale) {
                // Check if translation already exists
                $existingTranslation = ListingTranslation::where('listing_id', $listing->id)
                    ->where('locale', $locale)
                    ->first();

                if ($existingTranslation) {
                    $this->command->info("Translation for listing {$listing->id} in {$locale} already exists, skipping...");
                    continue;
                }

                $prefixIndex = $index % 5;
                $translation = $translations[$locale];

                ListingTranslation::create([
                    'listing_id' => $listing->id,
                    'locale' => $locale,
                    'title' => $translation['prefixes']['title'][$prefixIndex] . ($listing->title ?? 'Service ' . ($index + 1)),
                    'description' => $translation['prefixes']['description'][$prefixIndex],
                    'short_description' => $translation['prefixes']['short_description'][$prefixIndex],
                    'special_notes' => $translation['prefixes']['special_notes'],
                    'cancellation_policy' => $translation['prefixes']['cancellation_policy'],
                    'rental_terms' => $translation['prefixes']['rental_terms'],
                    'pickup_info' => $translation['prefixes']['pickup_info'],
                    'meta_title' => $translation['prefixes']['title'][$prefixIndex] . ($listing->title ?? 'Service') . ' - ' . ($locale === 'fr' ? 'Maroc' : 'Marruecos'),
                    'meta_description' => Str::limit($translation['prefixes']['description'][$prefixIndex], 160),
                ]);
            }

            $this->command->info("Created translations for listing: {$listing->id}");
        }

        $this->command->info('Listing translations seeded successfully!');
    }
}
