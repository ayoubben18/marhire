<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Page;

class PagesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $pages = [
            // Main Pages
            [
                'slug' => '/',
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
            [
                'slug' => 'about-us',
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
            [
                'slug' => 'list-your-property',
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
                'slug' => 'how-we-work',
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
            [
                'slug' => 'faq',
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
            [
                'slug' => 'blog',
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

            // Legal Pages
            [
                'slug' => 'terms-conditions',
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
            [
                'slug' => 'privacy-policy',
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
            [
                'slug' => 'cookie-policy',
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
            [
                'slug' => 'cancellation-policy',
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
            [
                'slug' => 'insurance-conditions',
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
            ],

            // Search Pages
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

            // Category Pages - with dynamic content placeholders
            [
                'slug' => 'category/car-rental',
                'meta_title' => [
                    'en' => 'Car Rental in Morocco - Best Deals | MarHire',
                    'fr' => 'Location de Voiture au Maroc - Meilleures Offres | MarHire',
                    'es' => 'Alquiler de Coches en Marruecos - Mejores Ofertas | MarHire'
                ],
                'meta_description' => [
                    'en' => 'Rent a car in Morocco with MarHire. Choose from SUVs, sedans, hatchbacks and more. Best prices, trusted providers, instant booking.',
                    'fr' => 'Louez une voiture au Maroc avec MarHire. Choisissez parmi SUV, berlines, citadines et plus. Meilleurs prix, prestataires de confiance, réservation instantanée.',
                    'es' => 'Alquila un coche en Marruecos con MarHire. Elige entre SUVs, sedanes, compactos y más. Mejores precios, proveedores confiables, reserva instantánea.'
                ]
            ],
            [
                'slug' => 'category/private-driver',
                'meta_title' => [
                    'en' => 'Private Driver in Morocco - Professional Chauffeurs | MarHire',
                    'fr' => 'Chauffeur Privé au Maroc - Chauffeurs Professionnels | MarHire',
                    'es' => 'Conductor Privado en Marruecos - Choferes Profesionales | MarHire'
                ],
                'meta_description' => [
                    'en' => 'Book a private driver in Morocco with MarHire. Airport transfers, city tours, business travel with professional chauffeurs.',
                    'fr' => 'Réservez un chauffeur privé au Maroc avec MarHire. Transferts aéroport, tours de ville, voyages d\'affaires avec chauffeurs professionnels.',
                    'es' => 'Reserva un conductor privado en Marruecos con MarHire. Traslados al aeropuerto, tours de ciudad, viajes de negocios con choferes profesionales.'
                ]
            ],
            [
                'slug' => 'category/boats',
                'meta_title' => [
                    'en' => 'Boat Rental in Morocco - Yachts & Speedboats | MarHire',
                    'fr' => 'Location de Bateau au Maroc - Yachts et Hors-bords | MarHire',
                    'es' => 'Alquiler de Barcos en Marruecos - Yates y Lanchas | MarHire'
                ],
                'meta_description' => [
                    'en' => 'Rent a boat in Morocco with MarHire. Yachts, speedboats and fishing boats for your perfect maritime adventure.',
                    'fr' => 'Louez un bateau au Maroc avec MarHire. Yachts, hors-bords et bateaux de pêche pour votre aventure maritime parfaite.',
                    'es' => 'Alquila un barco en Marruecos con MarHire. Yates, lanchas rápidas y barcos de pesca para tu aventura marítima perfecta.'
                ]
            ],
            [
                'slug' => 'category/things-to-do',
                'meta_title' => [
                    'en' => 'Things to Do in Morocco - Adventures & Activities | MarHire',
                    'fr' => 'Choses à Faire au Maroc - Aventures et Activités | MarHire',
                    'es' => 'Qué Hacer en Marruecos - Aventuras y Actividades | MarHire'
                ],
                'meta_description' => [
                    'en' => 'Discover amazing things to do in Morocco. Desert tours, quad biking, camel rides, surfing and cultural experiences.',
                    'fr' => 'Découvrez des choses incroyables à faire au Maroc. Tours du désert, quad, promenades à dos de chameau, surf et expériences culturelles.',
                    'es' => 'Descubre cosas increíbles que hacer en Marruecos. Tours del desierto, quads, paseos en camello, surf y experiencias culturales.'
                ]
            ],

            // Dynamic pattern pages
            [
                'slug' => 'city/*',
                'meta_title' => [
                    'en' => 'Car Rental, Drivers, Boats & Activities in {{city}} | MarHire',
                    'fr' => 'Location Voiture, Chauffeurs, Bateaux et Activités à {{city}} | MarHire',
                    'es' => 'Alquiler Coches, Conductores, Barcos y Actividades en {{city}} | MarHire'
                ],
                'meta_description' => [
                    'en' => 'Find car rentals, private drivers, boats and activities in {{city}}, Morocco. Best deals and trusted providers with MarHire.',
                    'fr' => 'Trouvez des locations de voitures, chauffeurs privés, bateaux et activités à {{city}}, Maroc. Meilleures offres et prestataires de confiance avec MarHire.',
                    'es' => 'Encuentra alquileres de coches, conductores privados, barcos y actividades en {{city}}, Marruecos. Mejores ofertas y proveedores confiables con MarHire.'
                ]
            ],
            [
                'slug' => 'agency/*',
                'meta_title' => [
                    'en' => '{{agency}} - Trusted Provider | MarHire',
                    'fr' => '{{agency}} - Prestataire de Confiance | MarHire',
                    'es' => '{{agency}} - Proveedor Confiable | MarHire'
                ],
                'meta_description' => [
                    'en' => 'Book with {{agency}}, a trusted MarHire partner. Quality services for car rentals, private drivers, boats and activities in Morocco.',
                    'fr' => 'Réservez avec {{agency}}, un partenaire MarHire de confiance. Services de qualité pour locations de voitures, chauffeurs privés, bateaux et activités au Maroc.',
                    'es' => 'Reserva con {{agency}}, un socio MarHire confiable. Servicios de calidad para alquileres de coches, conductores privados, barcos y actividades en Marruecos.'
                ]
            ]
        ];

        foreach ($pages as $pageData) {
            $page = Page::updateOrCreate(
                ['slug' => $pageData['slug']],
                [
                    'meta_title' => $pageData['meta_title']['en'], // Base title in English
                    'meta_description' => $pageData['meta_description']['en'], // Base description in English
                ]
            );

            // Add translations for meta_title
            foreach ($pageData['meta_title'] as $locale => $title) {
                $page->setTranslation('meta_title', $locale, $title);
            }

            // Add translations for meta_description
            foreach ($pageData['meta_description'] as $locale => $description) {
                $page->setTranslation('meta_description', $locale, $description);
            }

            $page->save();
        }
    }
}