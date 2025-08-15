<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines contain the default error messages used by
    | the validator class. Some of these rules have multiple versions such
    | as the size rules. Feel free to tweak each of these messages here.
    |
    */

    'accepted' => 'The :attribute must be accepted.',
    'accepted_if' => 'The :attribute must be accepted when :other is :value.',
    'active_url' => 'The :attribute is not a valid URL.',
    'after' => 'The :attribute must be a date after :date.',
    'after_or_equal' => 'The :attribute must be a date after or equal to :date.',
    'alpha' => 'The :attribute must only contain letters.',
    'alpha_dash' => 'The :attribute must only contain letters, numbers, dashes and underscores.',
    'alpha_num' => 'The :attribute must only contain letters and numbers.',
    'array' => 'The :attribute must be an array.',
    'before' => 'The :attribute must be a date before :date.',
    'before_or_equal' => 'The :attribute must be a date before or equal to :date.',
    'between' => [
        'numeric' => 'The :attribute must be between :min and :max.',
        'file' => 'The :attribute must be between :min and :max kilobytes.',
        'string' => 'The :attribute must be between :min and :max characters.',
        'array' => 'The :attribute must have between :min and :max items.',
    ],
    'boolean' => 'The :attribute field must be true or false.',
    'confirmed' => 'The :attribute confirmation does not match.',
    'current_password' => 'The password is incorrect.',
    'date' => 'The :attribute is not a valid date.',
    'date_equals' => 'The :attribute must be a date equal to :date.',
    'date_format' => 'The :attribute does not match the format :format.',
    'declined' => 'The :attribute must be declined.',
    'declined_if' => 'The :attribute must be declined when :other is :value.',
    'different' => 'The :attribute and :other must be different.',
    'digits' => 'The :attribute must be :digits digits.',
    'digits_between' => 'The :attribute must be between :min and :max digits.',
    'dimensions' => 'The :attribute has invalid image dimensions.',
    'distinct' => 'The :attribute field has a duplicate value.',
    'email' => 'The :attribute must be a valid email address.',
    'ends_with' => 'The :attribute must end with one of the following: :values.',
    'enum' => 'Champs est obligatoire.',
    'exists' => 'The selected :attribute is invalid.',
    'file' => 'The :attribute must be a file.',
    'filled' => 'The :attribute field must have a value.',
    'gt' => [
        'numeric' => 'The :attribute must be greater than :value.',
        'file' => 'The :attribute must be greater than :value kilobytes.',
        'string' => 'The :attribute must be greater than :value characters.',
        'array' => 'The :attribute must have more than :value items.',
    ],
    'gte' => [
        'numeric' => 'The :attribute must be greater than or equal to :value.',
        'file' => 'The :attribute must be greater than or equal to :value kilobytes.',
        'string' => 'The :attribute must be greater than or equal to :value characters.',
        'array' => 'The :attribute must have :value items or more.',
    ],
    'image' => 'The :attribute must be an image.',
    'in' => 'The selected :attribute is invalid.',
    'in_array' => 'The :attribute field does not exist in :other.',
    'integer' => 'The :attribute must be an integer.',
    'ip' => 'The :attribute must be a valid IP address.',
    'ipv4' => 'The :attribute must be a valid IPv4 address.',
    'ipv6' => 'The :attribute must be a valid IPv6 address.',
    'json' => 'The :attribute must be a valid JSON string.',
    'lt' => [
        'numeric' => 'The :attribute must be less than :value.',
        'file' => 'The :attribute must be less than :value kilobytes.',
        'string' => 'The :attribute must be less than :value characters.',
        'array' => 'The :attribute must have less than :value items.',
    ],
    'lte' => [
        'numeric' => 'The :attribute must be less than or equal to :value.',
        'file' => 'The :attribute must be less than or equal to :value kilobytes.',
        'string' => 'The :attribute must be less than or equal to :value characters.',
        'array' => 'The :attribute must not have more than :value items.',
    ],
    'mac_address' => 'The :attribute must be a valid MAC address.',
    'max' => [
        'numeric' => 'The :attribute must not be greater than :max.',
        'file' => 'The :attribute must not be greater than :max kilobytes.',
        'string' => 'The :attribute must not be greater than :max characters.',
        'array' => 'The :attribute must not have more than :max items.',
    ],
    'mimes' => 'Le fichier doit être un fichier de type: :values.',
    'mimetypes' => 'Le fichier doit être un fichier de type: :values.',
    'min' => [
        'numeric' => 'The :attribute must be at least :min.',
        'file' => 'The :attribute must be at least :min kilobytes.',
        'string' => 'The :attribute must be at least :min characters.',
        'array' => 'The :attribute must have at least :min items.',
    ],
    'multiple_of' => 'The :attribute must be a multiple of :value.',
    'not_in' => 'The selected :attribute is invalid.',
    'not_regex' => 'The :attribute format is invalid.',
    'numeric' => 'The :attribute must be a number.',
    'password' => 'The password is incorrect.',
    'present' => 'The :attribute field must be present.',
    'prohibited' => 'The :attribute field is prohibited.',
    'prohibited_if' => 'The :attribute field is prohibited when :other is :value.',
    'prohibited_unless' => 'The :attribute field is prohibited unless :other is in :values.',
    'prohibits' => 'The :attribute field prohibits :other from being present.',
    'regex' => 'The :attribute format is invalid.',
    'required' => ':attribute required.',
    'required_array_keys' => 'The :attribute field must contain entries for: :values.',
    'required_if' => 'The :attribute field is required when :other is :value.',
    'required_unless' => 'The :attribute field is required unless :other is in :values.',
    'required_with' => 'The :attribute field is required when :values is present.',
    'required_with_all' => 'The :attribute field is required when :values are present.',
    'required_without' => 'The :attribute field is required when :values is not present.',
    'required_without_all' => 'The :attribute field is required when none of :values are present.',
    'same' => 'The :attribute and :other must match.',
    'size' => [
        'numeric' => 'The :attribute must be :size.',
        'file' => 'The :attribute must be :size kilobytes.',
        'string' => 'The :attribute must be :size characters.',
        'array' => 'The :attribute must contain :size items.',
    ],
    'starts_with' => 'The :attribute must start with one of the following: :values.',
    'string' => 'The :attribute must be a string.',
    'timezone' => 'The :attribute must be a valid timezone.',
    'unique' => ':attribute used before.',
    'uploaded' => 'The :attribute failed to upload.',
    'url' => 'The :attribute must be a valid URL.',
    'uuid' => 'The :attribute must be a valid UUID.',

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | Here you may specify custom validation messages for attributes using the
    | convention "attribute.rule" to name the lines. This makes it quick to
    | specify a specific custom language line for a given attribute rule.
    |
    */

    'custom' => [
        'attribute-name' => [
            'rule-name' => 'custom-message',
        ],
        'whatsapp' => [
            'format' => 'Le numéro WhatsApp doit être au format international (ex: +212612345678)',
        ],
        'date_of_birth' => [
            'age_requirement' => 'Vous devez avoir au moins 18 ans pour effectuer une réservation',
            'max_age' => 'Veuillez entrer une date de naissance valide',
        ],
        'terms_accepted' => [
            'required' => 'Vous devez accepter les termes et conditions pour continuer',
        ],
        'listing' => [
            'not_found' => 'L\'annonce sélectionnée n\'existe pas',
            'not_available' => 'L\'annonce sélectionnée n\'est plus disponible',
            'category_mismatch' => 'L\'annonce sélectionnée n\'appartient pas à la catégorie spécifiée',
        ],
        'addons' => [
            'not_available' => 'Un ou plusieurs add-ons sélectionnés ne sont pas disponibles pour cette annonce',
        ],
        'car_rental' => [
            'advance_booking' => 'La location de voiture doit être réservée au moins 24 heures à l\'avance',
            'pickup_location' => 'Le lieu de prise en charge doit être à :city',
            'listing_city' => 'la ville de l\'annonce',
            'minimum_duration' => 'La location de voiture nécessite une durée minimale de réservation de 3 jours',
            'surf_rack_restriction' => 'Le porte-surf n\'est disponible que pour les véhicules SUV et MPV',
        ],
        'private_driver' => [
            'advance_booking' => 'Le service de chauffeur privé doit être réservé au moins 48 heures à l\'avance',
            'passengers_exceed' => 'Le nombre de passagers dépasse la capacité du véhicule de :max',
            'luggage_exceed' => 'Le nombre de bagages dépasse la capacité du véhicule de :max',
        ],
        'boat_rental' => [
            'advance_booking' => 'La location de bateau doit être réservée au moins 48 heures à l\'avance',
            'time_range' => 'L\'heure de location du bateau doit être entre 8h00 et 20h00',
            'duration_increments' => 'La durée doit être par tranches de 30 minutes (0,5 heures)',
            'end_time' => 'La location du bateau doit se terminer avant 20h00. Veuillez ajuster la durée ou l\'heure de début',
            'capacity_exceed' => 'Le nombre de personnes dépasse la capacité du bateau de :max',
        ],
        'activities' => [
            'advance_booking' => 'Les activités doivent être réservées au moins 48 heures à l\'avance',
            'duration_not_available' => 'L\'option de durée sélectionnée n\'est pas disponible pour cette activité',
            'group_size_exceed' => 'Le nombre de personnes dépasse la taille maximale du groupe de :max',
            'group_size_minimum' => 'Minimum :min personnes requises pour cette activité de groupe',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Attributes
    |--------------------------------------------------------------------------
    |
    | The following language lines are used to swap our attribute placeholder
    | with something more reader friendly such as "E-Mail Address" instead
    | of "email". This simply helps us make our message more expressive.
    |
    */

    'attributes' => [
        'full_name' => 'Nom complet',
        'first_name' => 'Prénom',
        'last_name' => 'Nom de famille',
        'email' => 'Email',
        'whatsapp' => 'Numéro WhatsApp',
        'country' => 'Pays de résidence',
        'age' => 'Âge',
        'date_of_birth' => 'Date de naissance',
        'terms_accepted' => 'Termes et conditions',
        'flight_number' => 'Numéro de vol',
        'additional_notes' => 'Notes supplémentaires',
        'pickup_date' => 'Date de prise en charge',
        'dropoff_date' => 'Date de retour',
        'pickup_time' => 'Heure de prise en charge',
        'dropoff_time' => 'Heure de retour',
        'pickup_location' => 'Lieu de prise en charge',
        'dropoff_location' => 'Lieu de retour',
        'car_type' => 'Type de voiture',
        'service_types' => 'Types de service',
        'road_types' => 'Types de route',
        'pickup_city' => 'Ville de prise en charge',
        'dropoff_city' => 'Ville de retour',
        'prefered_date' => 'Date préférée',
        'number_of_passengers' => 'Nombre de passagers',
        'number_of_luggage' => 'Nombre de bagages',
        'address' => 'Adresse',
        'duration' => 'Durée',
        'propose' => 'Objectif',
        'number_of_people' => 'Nombre de personnes',
        'duration_option_id' => 'Option de durée',
        'time_preference' => 'Préférence horaire',
        'activity_type' => 'Type d\'activité',
    ],

];
