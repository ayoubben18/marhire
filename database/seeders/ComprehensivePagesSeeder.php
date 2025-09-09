<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Page;

class ComprehensivePagesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $pages = [
            // Missing Main Pages
            [
                'slug' => 'support',
                'meta_title' => [
                    'en' => 'Support - MarHire Help Center',
                    'fr' => 'Support - Centre d\'Aide MarHire',
                    'es' => 'Soporte - Centro de Ayuda MarHire'
                ],
                'meta_description' => [
                    'en' => 'Get support and help with MarHire services. Contact us for assistance with car rentals, private drivers, boats and activities in Morocco.',
                    'fr' => 'Obtenez du support et de l\'aide avec les services MarHire. Contactez-nous pour une assistance avec les locations de voitures, chauffeurs privés, bateaux et activités au Maroc.',
                    'es' => 'Obtén soporte y ayuda con los servicios MarHire. Contáctanos para asistencia con alquileres de coches, conductores privados, barcos y actividades en Marruecos.'
                ]
            ],
            [
                'slug' => 'partners',
                'meta_title' => [
                    'en' => 'Partners - Join MarHire Network',
                    'fr' => 'Partenaires - Rejoindre le Réseau MarHire',
                    'es' => 'Socios - Únete a la Red MarHire'
                ],
                'meta_description' => [
                    'en' => 'Become a MarHire partner. Join our network of trusted providers for car rentals, private drivers, boats and activities in Morocco.',
                    'fr' => 'Devenez partenaire MarHire. Rejoignez notre réseau de prestataires de confiance pour les locations de voitures, chauffeurs privés, bateaux et activités au Maroc.',
                    'es' => 'Conviértete en socio MarHire. Únete a nuestra red de proveedores confiables para alquileres de coches, conductores privados, barcos y actividades en Marruecos.'
                ]
            ],

            // Missing Search Pages
            [
                'slug' => 'car-search',
                'meta_title' => [
                    'en' => 'Car Rental Search - Find the Perfect Car | MarHire',
                    'fr' => 'Recherche Location Voiture - Trouvez la Voiture Parfaite | MarHire',
                    'es' => 'Búsqueda Alquiler Coches - Encuentra el Coche Perfecto | MarHire'
                ],
                'meta_description' => [
                    'en' => 'Search and compare car rentals in Morocco. Find the perfect vehicle for your trip with MarHire. Best prices and instant booking.',
                    'fr' => 'Recherchez et comparez les locations de voitures au Maroc. Trouvez le véhicule parfait pour votre voyage avec MarHire. Meilleurs prix et réservation instantanée.',
                    'es' => 'Busca y compara alquileres de coches en Marruecos. Encuentra el vehículo perfecto para tu viaje con MarHire. Mejores precios y reserva instantánea.'
                ]
            ],
            [
                'slug' => 'private-search',
                'meta_title' => [
                    'en' => 'Private Driver Search - Book Your Chauffeur | MarHire',
                    'fr' => 'Recherche Chauffeur Privé - Réservez Votre Chauffeur | MarHire',
                    'es' => 'Búsqueda Conductor Privado - Reserva Tu Chofer | MarHire'
                ],
                'meta_description' => [
                    'en' => 'Search and book private drivers in Morocco. Professional chauffeurs for airport transfers, city tours and business travel.',
                    'fr' => 'Recherchez et réservez des chauffeurs privés au Maroc. Chauffeurs professionnels pour transferts aéroport, tours de ville et voyages d\'affaires.',
                    'es' => 'Busca y reserva conductores privados en Marruecos. Choferes profesionales para traslados al aeropuerto, tours de ciudad y viajes de negocios.'
                ]
            ],
            [
                'slug' => 'boat-search',
                'meta_title' => [
                    'en' => 'Boat Rental Search - Find Your Perfect Boat | MarHire',
                    'fr' => 'Recherche Location Bateau - Trouvez Votre Bateau Parfait | MarHire',
                    'es' => 'Búsqueda Alquiler Barcos - Encuentra Tu Barco Perfecto | MarHire'
                ],
                'meta_description' => [
                    'en' => 'Search and rent boats in Morocco. Yachts, speedboats and fishing boats for your perfect maritime experience.',
                    'fr' => 'Recherchez et louez des bateaux au Maroc. Yachts, hors-bords et bateaux de pêche pour votre expérience maritime parfaite.',
                    'es' => 'Busca y alquila barcos en Marruecos. Yates, lanchas rápidas y barcos de pesca para tu experiencia marítima perfecta.'
                ]
            ],
            [
                'slug' => 'thingstodo-search',
                'meta_title' => [
                    'en' => 'Activities Search - Discover Morocco Adventures | MarHire',
                    'fr' => 'Recherche Activités - Découvrez les Aventures Maroc | MarHire',
                    'es' => 'Búsqueda Actividades - Descubre Aventuras Marruecos | MarHire'
                ],
                'meta_description' => [
                    'en' => 'Search and book exciting activities in Morocco. Desert tours, quad biking, camel rides and cultural experiences.',
                    'fr' => 'Recherchez et réservez des activités passionnantes au Maroc. Tours du désert, quad, promenades à dos de chameau et expériences culturelles.',
                    'es' => 'Busca y reserva emocionantes actividades en Marruecos. Tours del desierto, quads, paseos en camello y experiencias culturales.'
                ]
            ],

            // Subcategory Templates (for token replacement)
            [
                'slug' => 'category/car-rental/subcategory/*',
                'meta_title' => [
                    'en' => '{{subcategory}} Car Rental in Morocco | MarHire',
                    'fr' => 'Location {{subcategory}} au Maroc | MarHire',
                    'es' => 'Alquiler {{subcategory}} en Marruecos | MarHire'
                ],
                'meta_description' => [
                    'en' => 'Rent {{subcategory}} cars in Morocco with MarHire. {{category}} vehicles with best prices, trusted providers and instant booking.',
                    'fr' => 'Louez des voitures {{subcategory}} au Maroc avec MarHire. Véhicules {{category}} avec les meilleurs prix, prestataires de confiance et réservation instantanée.',
                    'es' => 'Alquila coches {{subcategory}} en Marruecos con MarHire. Vehículos {{category}} con mejores precios, proveedores confiables y reserva instantánea.'
                ]
            ],
            [
                'slug' => 'category/private-driver/subcategory/*',
                'meta_title' => [
                    'en' => '{{subcategory}} Private Driver in Morocco | MarHire',
                    'fr' => 'Chauffeur Privé {{subcategory}} au Maroc | MarHire',
                    'es' => 'Conductor Privado {{subcategory}} en Marruecos | MarHire'
                ],
                'meta_description' => [
                    'en' => 'Book {{subcategory}} private drivers in Morocco. Professional {{category}} chauffeurs for transfers and tours.',
                    'fr' => 'Réservez des chauffeurs privés {{subcategory}} au Maroc. Chauffeurs professionnels {{category}} pour transferts et tours.',
                    'es' => 'Reserva conductores privados {{subcategory}} en Marruecos. Choferes profesionales {{category}} para traslados y tours.'
                ]
            ],
            [
                'slug' => 'category/boats/subcategory/*',
                'meta_title' => [
                    'en' => '{{subcategory}} Boat Rental in Morocco | MarHire',
                    'fr' => 'Location Bateau {{subcategory}} au Maroc | MarHire',
                    'es' => 'Alquiler Barco {{subcategory}} en Marruecos | MarHire'
                ],
                'meta_description' => [
                    'en' => 'Rent {{subcategory}} boats in Morocco with MarHire. {{category}} vessels for your perfect maritime adventure.',
                    'fr' => 'Louez des bateaux {{subcategory}} au Maroc avec MarHire. Embarcations {{category}} pour votre aventure maritime parfaite.',
                    'es' => 'Alquila barcos {{subcategory}} en Marruecos con MarHire. Embarcaciones {{category}} para tu aventura marítima perfecta.'
                ]
            ],
            [
                'slug' => 'category/things-to-do/subcategory/*',
                'meta_title' => [
                    'en' => '{{subcategory}} Activities in Morocco | MarHire',
                    'fr' => 'Activités {{subcategory}} au Maroc | MarHire',
                    'es' => 'Actividades {{subcategory}} en Marruecos | MarHire'
                ],
                'meta_description' => [
                    'en' => 'Book {{subcategory}} activities in Morocco with MarHire. Exciting {{category}} experiences and adventures.',
                    'fr' => 'Réservez des activités {{subcategory}} au Maroc avec MarHire. Expériences et aventures {{category}} passionnantes.',
                    'es' => 'Reserva actividades {{subcategory}} en Marruecos con MarHire. Emocionantes experiencias y aventuras {{category}}.'
                ]
            ],

            // New Subcategory City Templates (for city-specific subcategory pages)
            [
                'slug' => 'category/car-rental/subcategory/*/city/*',
                'meta_title' => [
                    'en' => '{{subcategory}} Car Rental in {{city}} | MarHire',
                    'fr' => 'Location {{subcategory}} à {{city}} | MarHire',
                    'es' => 'Alquiler {{subcategory}} en {{city}} | MarHire'
                ],
                'meta_description' => [
                    'en' => 'Rent {{subcategory}} cars in {{city}}, Morocco with MarHire. {{category}} vehicles with best local prices and instant booking.',
                    'fr' => 'Louez des voitures {{subcategory}} à {{city}}, Maroc avec MarHire. Véhicules {{category}} avec les meilleurs prix locaux et réservation instantanée.',
                    'es' => 'Alquila coches {{subcategory}} en {{city}}, Marruecos con MarHire. Vehículos {{category}} con mejores precios locales y reserva instantánea.'
                ]
            ],
            [
                'slug' => 'category/private-driver/subcategory/*/city/*',
                'meta_title' => [
                    'en' => '{{subcategory}} Private Driver in {{city}} | MarHire',
                    'fr' => 'Chauffeur Privé {{subcategory}} à {{city}} | MarHire',
                    'es' => 'Conductor Privado {{subcategory}} en {{city}} | MarHire'
                ],
                'meta_description' => [
                    'en' => 'Book {{subcategory}} private drivers in {{city}}, Morocco. Professional {{category}} chauffeurs for local transfers and tours.',
                    'fr' => 'Réservez des chauffeurs privés {{subcategory}} à {{city}}, Maroc. Chauffeurs professionnels {{category}} pour transferts locaux et tours.',
                    'es' => 'Reserva conductores privados {{subcategory}} en {{city}}, Marruecos. Choferes profesionales {{category}} para traslados locales y tours.'
                ]
            ],
            [
                'slug' => 'category/boats/subcategory/*/city/*',
                'meta_title' => [
                    'en' => '{{subcategory}} Boat Rental in {{city}} | MarHire',
                    'fr' => 'Location Bateau {{subcategory}} à {{city}} | MarHire',
                    'es' => 'Alquiler Barco {{subcategory}} en {{city}} | MarHire'
                ],
                'meta_description' => [
                    'en' => 'Rent {{subcategory}} boats in {{city}}, Morocco with MarHire. {{category}} vessels for your perfect local maritime adventure.',
                    'fr' => 'Louez des bateaux {{subcategory}} à {{city}}, Maroc avec MarHire. Embarcations {{category}} pour votre aventure maritime locale parfaite.',
                    'es' => 'Alquila barcos {{subcategory}} en {{city}}, Marruecos con MarHire. Embarcaciones {{category}} para tu aventura marítima local perfecta.'
                ]
            ],
            [
                'slug' => 'category/things-to-do/subcategory/*/city/*',
                'meta_title' => [
                    'en' => '{{subcategory}} Activities in {{city}} | MarHire',
                    'fr' => 'Activités {{subcategory}} à {{city}} | MarHire',
                    'es' => 'Actividades {{subcategory}} en {{city}} | MarHire'
                ],
                'meta_description' => [
                    'en' => 'Book {{subcategory}} activities in {{city}}, Morocco with MarHire. Exciting {{category}} experiences in the heart of {{city}}.',
                    'fr' => 'Réservez des activités {{subcategory}} à {{city}}, Maroc avec MarHire. Expériences {{category}} passionnantes au cœur de {{city}}.',
                    'es' => 'Reserva actividades {{subcategory}} en {{city}}, Marruecos con MarHire. Emocionantes experiencias {{category}} en el corazón de {{city}}.'
                ]
            ]
        ];

        // Update existing pages with missing translations
        $existingPagesToUpdate = [
            '/' => [
                'meta_title' => [
                    'en' => 'MarHire - Car Rental, Private Drivers, Boats & Activities in Morocco',
                    'fr' => 'MarHire - Location de Voitures, Chauffeurs Privés, Bateaux et Activités au Maroc',
                    'es' => 'MarHire - Alquiler de Coches, Conductores Privados, Barcos y Actividades en Marruecos'
                ],
                'meta_description' => [
                    'en' => 'Discover Morocco with MarHire. Book car rentals, private drivers, boats and exciting activities. Best prices, trusted providers, instant booking.',
                    'fr' => 'Découvrez le Maroc avec MarHire. Réservez des locations de voitures, chauffeurs privés, bateaux et activités passionnantes. Meilleurs prix, prestataires de confiance, réservation instantanée.',
                    'es' => 'Descubre Marruecos con MarHire. Reserva alquileres de coches, conductores privados, barcos y emocionantes actividades. Mejores precios, proveedores confiables, reserva instantánea.'
                ]
            ],
            'about-us' => [
                'meta_title' => [
                    'en' => 'About MarHire - Your Trusted Travel Partner in Morocco',
                    'fr' => 'À Propos de MarHire - Votre Partenaire de Voyage de Confiance au Maroc',
                    'es' => 'Acerca de MarHire - Su Socio de Viaje de Confianza en Marruecos'
                ],
                'meta_description' => [
                    'en' => 'Learn about MarHire, Morocco\'s leading platform for car rentals, private drivers, boats and activities. Our mission, values and commitment to excellence.',
                    'fr' => 'Découvrez MarHire, la plateforme leader au Maroc pour les locations de voitures, chauffeurs privés, bateaux et activités. Notre mission, valeurs et engagement envers l\'excellence.',
                    'es' => 'Conozca MarHire, la plataforma líder de Marruecos para alquiler de coches, conductores privados, barcos y actividades. Nuestra misión, valores y compromiso con la excelencia.'
                ]
            ],
            'list-your-property' => [
                'meta_title' => [
                    'en' => 'List Your Property - Join MarHire Partners',
                    'fr' => 'Inscrire Votre Propriété - Rejoindre les Partenaires MarHire',
                    'es' => 'Registra Tu Propiedad - Únete a los Socios MarHire'
                ],
                'meta_description' => [
                    'en' => 'List your car, boat or activity on MarHire. Join thousands of trusted providers and start earning with our platform.',
                    'fr' => 'Inscrivez votre voiture, bateau ou activité sur MarHire. Rejoignez des milliers de prestataires de confiance et commencez à gagner avec notre plateforme.',
                    'es' => 'Registra tu coche, barco o actividad en MarHire. Únete a miles de proveedores confiables y comienza a ganar con nuestra plataforma.'
                ]
            ],
            'faq' => [
                'meta_title' => [
                    'en' => 'FAQ - Frequently Asked Questions | MarHire',
                    'fr' => 'FAQ - Questions Fréquemment Posées | MarHire',
                    'es' => 'FAQ - Preguntas Frecuentes | MarHire'
                ],
                'meta_description' => [
                    'en' => 'Find answers to frequently asked questions about MarHire services including car rentals, private drivers, boats and activities in Morocco.',
                    'fr' => 'Trouvez des réponses aux questions fréquemment posées sur les services MarHire incluant les locations de voitures, chauffeurs privés, bateaux et activités au Maroc.',
                    'es' => 'Encuentra respuestas a preguntas frecuentes sobre los servicios MarHire incluyendo alquileres de coches, conductores privados, barcos y actividades en Marruecos.'
                ]
            ],
            'blog' => [
                'meta_title' => [
                    'en' => 'Blog - Travel Tips & Morocco Guides | MarHire',
                    'fr' => 'Blog - Conseils de Voyage et Guides Maroc | MarHire',
                    'es' => 'Blog - Consejos de Viaje y Guías Marruecos | MarHire'
                ],
                'meta_description' => [
                    'en' => 'Explore our travel blog for Morocco tips, guides and insights. Discover the best places to visit, cultural experiences and travel advice.',
                    'fr' => 'Explorez notre blog de voyage pour des conseils, guides et insights du Maroc. Découvrez les meilleurs endroits à visiter, expériences culturelles et conseils de voyage.',
                    'es' => 'Explora nuestro blog de viajes para consejos, guías y perspectivas de Marruecos. Descubre los mejores lugares para visitar, experiencias culturales y consejos de viaje.'
                ]
            ],
            'how-we-work' => [
                'meta_title' => [
                    'en' => 'How We Work - MarHire Process',
                    'fr' => 'Comment Nous Travaillons - Processus MarHire',
                    'es' => 'Cómo Trabajamos - Proceso MarHire'
                ],
                'meta_description' => [
                    'en' => 'Discover how MarHire works. Learn about our booking process, partner verification, and quality assurance for car rentals, drivers, boats and activities.',
                    'fr' => 'Découvrez comment MarHire fonctionne. Apprenez notre processus de réservation, vérification des partenaires et assurance qualité pour les locations de voitures, chauffeurs, bateaux et activités.',
                    'es' => 'Descubre cómo funciona MarHire. Aprende sobre nuestro proceso de reserva, verificación de socios y garantía de calidad para alquileres de coches, conductores, barcos y actividades.'
                ]
            ],
            // Legal pages
            'terms-conditions' => [
                'meta_title' => [
                    'en' => 'Terms & Conditions - MarHire',
                    'fr' => 'Termes et Conditions - MarHire',
                    'es' => 'Términos y Condiciones - MarHire'
                ],
                'meta_description' => [
                    'en' => 'Read MarHire terms and conditions for car rentals, private drivers, boats and activities booking services in Morocco.',
                    'fr' => 'Lisez les termes et conditions MarHire pour les services de réservation de locations de voitures, chauffeurs privés, bateaux et activités au Maroc.',
                    'es' => 'Lee los términos y condiciones MarHire para servicios de reserva de alquileres de coches, conductores privados, barcos y actividades en Marruecos.'
                ]
            ],
            'privacy-policy' => [
                'meta_title' => [
                    'en' => 'Privacy Policy - MarHire',
                    'fr' => 'Politique de Confidentialité - MarHire',
                    'es' => 'Política de Privacidad - MarHire'
                ],
                'meta_description' => [
                    'en' => 'MarHire privacy policy. Learn how we collect, use and protect your personal information when booking our services.',
                    'fr' => 'Politique de confidentialité MarHire. Découvrez comment nous collectons, utilisons et protégeons vos informations personnelles lors de la réservation de nos services.',
                    'es' => 'Política de privacidad MarHire. Aprende cómo recopilamos, usamos y protegemos tu información personal al reservar nuestros servicios.'
                ]
            ],
            'cookie-policy' => [
                'meta_title' => [
                    'en' => 'Cookie Policy - MarHire',
                    'fr' => 'Politique des Cookies - MarHire',
                    'es' => 'Política de Cookies - MarHire'
                ],
                'meta_description' => [
                    'en' => 'MarHire cookie policy. Understand how we use cookies to improve your browsing experience on our platform.',
                    'fr' => 'Politique des cookies MarHire. Comprenez comment nous utilisons les cookies pour améliorer votre expérience de navigation sur notre plateforme.',
                    'es' => 'Política de cookies MarHire. Entiende cómo usamos cookies para mejorar tu experiencia de navegación en nuestra plataforma.'
                ]
            ],
            'cancellation-policy' => [
                'meta_title' => [
                    'en' => 'Cancellation Policy - MarHire',
                    'fr' => 'Politique d\'Annulation - MarHire',
                    'es' => 'Política de Cancelación - MarHire'
                ],
                'meta_description' => [
                    'en' => 'MarHire cancellation policy for car rentals, private drivers, boats and activities. Learn about refunds and cancellation terms.',
                    'fr' => 'Politique d\'annulation MarHire pour les locations de voitures, chauffeurs privés, bateaux et activités. Découvrez les conditions de remboursement et d\'annulation.',
                    'es' => 'Política de cancelación MarHire para alquileres de coches, conductores privados, barcos y actividades. Conoce sobre reembolsos y términos de cancelación.'
                ]
            ],
            'insurance-conditions' => [
                'meta_title' => [
                    'en' => 'Insurance Conditions - MarHire',
                    'fr' => 'Conditions d\'Assurance - MarHire',
                    'es' => 'Condiciones de Seguro - MarHire'
                ],
                'meta_description' => [
                    'en' => 'MarHire insurance conditions and coverage for car rentals, private drivers, boats and activities in Morocco.',
                    'fr' => 'Conditions d\'assurance et couverture MarHire pour les locations de voitures, chauffeurs privés, bateaux et activités au Maroc.',
                    'es' => 'Condiciones de seguro y cobertura MarHire para alquileres de coches, conductores privados, barcos y actividades en Marruecos.'
                ]
            ]
        ];

        // Add new pages
        foreach ($pages as $pageData) {
            $page = Page::updateOrCreate(
                ['slug' => $pageData['slug']],
                [
                    'meta_title' => $pageData['meta_title']['en'],
                    'meta_description' => $pageData['meta_description']['en'],
                ]
            );

            // Prepare translation data for other languages
            $translationData = [];
            foreach (['fr', 'es'] as $locale) {
                $translations = [];
                foreach (['meta_title', 'meta_description'] as $field) {
                    if (isset($pageData[$field][$locale])) {
                        $translations[$field] = $pageData[$field][$locale];
                    }
                }
                if (!empty($translations)) {
                    $translationData[$locale] = $translations;
                }
            }

            // Set translations using the Translatable trait method
            if (!empty($translationData)) {
                $page->updateTranslations($translationData);
            }
            
            echo "✅ Created/Updated: {$pageData['slug']}\n";
        }

        // Update existing pages with translations
        foreach ($existingPagesToUpdate as $slug => $data) {
            $page = Page::where('slug', $slug)->first();
            if ($page) {
                // Update base English content
                $page->update([
                    'meta_title' => $data['meta_title']['en'],
                    'meta_description' => $data['meta_description']['en'],
                ]);

                // Prepare translation data for other languages
                $translationData = [];
                foreach (['fr', 'es'] as $locale) {
                    $translations = [];
                    foreach (['meta_title', 'meta_description'] as $field) {
                        if (isset($data[$field][$locale])) {
                            $translations[$field] = $data[$field][$locale];
                        }
                    }
                    if (!empty($translations)) {
                        $translationData[$locale] = $translations;
                    }
                }

                // Set translations using the Translatable trait method
                if (!empty($translationData)) {
                    $page->updateTranslations($translationData);
                }
                
                echo "🔄 Updated translations for: {$slug}\n";
            }
        }

        echo "\n🎉 Comprehensive Pages Seeder completed successfully!\n";
        echo "📊 Added: " . count($pages) . " new pages\n";
        echo "🌐 Updated: " . count($existingPagesToUpdate) . " existing pages with translations\n";
    }
}