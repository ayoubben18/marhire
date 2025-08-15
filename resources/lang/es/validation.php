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
            'format' => 'El número de WhatsApp debe estar en formato internacional (ej: +212612345678)',
        ],
        'date_of_birth' => [
            'age_requirement' => 'Debes tener al menos 18 años para hacer una reserva',
            'max_age' => 'Por favor ingrese una fecha de nacimiento válida',
        ],
        'terms_accepted' => [
            'required' => 'Debe aceptar los términos y condiciones para continuar',
        ],
        'listing' => [
            'not_found' => 'El anuncio seleccionado no existe',
            'not_available' => 'El anuncio seleccionado ya no está disponible',
            'category_mismatch' => 'El anuncio seleccionado no pertenece a la categoría especificada',
        ],
        'addons' => [
            'not_available' => 'Uno o más complementos seleccionados no están disponibles para este anuncio',
        ],
        'car_rental' => [
            'advance_booking' => 'El alquiler de coches debe reservarse con al menos 24 horas de antelación',
            'pickup_location' => 'El lugar de recogida debe estar en :city',
            'listing_city' => 'la ciudad del anuncio',
            'minimum_duration' => 'El alquiler de coches requiere una duración mínima de reserva de 3 días',
            'surf_rack_restriction' => 'El portatablas de surf solo está disponible para vehículos SUV y MPV',
        ],
        'private_driver' => [
            'advance_booking' => 'El servicio de conductor privado debe reservarse con al menos 48 horas de antelación',
            'passengers_exceed' => 'El número de pasajeros excede la capacidad del vehículo de :max',
            'luggage_exceed' => 'El número de equipaje excede la capacidad del vehículo de :max',
        ],
        'boat_rental' => [
            'advance_booking' => 'El alquiler de barcos debe reservarse con al menos 48 horas de antelación',
            'time_range' => 'El horario de alquiler del barco debe estar entre las 8:00 AM y las 8:00 PM',
            'duration_increments' => 'La duración debe ser en incrementos de 30 minutos (0.5 horas)',
            'end_time' => 'El alquiler del barco debe terminar antes de las 8:00 PM. Por favor ajuste la duración o la hora de inicio',
            'capacity_exceed' => 'El número de personas excede la capacidad del barco de :max',
        ],
        'activities' => [
            'advance_booking' => 'Las actividades deben reservarse con al menos 48 horas de antelación',
            'duration_not_available' => 'La opción de duración seleccionada no está disponible para esta actividad',
            'group_size_exceed' => 'El número de personas excede el tamaño máximo del grupo de :max',
            'group_size_minimum' => 'Mínimo :min personas requeridas para esta actividad grupal',
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
        'full_name' => 'Nombre completo',
        'first_name' => 'Nombre',
        'last_name' => 'Apellido',
        'email' => 'Correo electrónico',
        'whatsapp' => 'Número de WhatsApp',
        'country' => 'País de residencia',
        'age' => 'Edad',
        'date_of_birth' => 'Fecha de nacimiento',
        'terms_accepted' => 'Términos y condiciones',
        'flight_number' => 'Número de vuelo',
        'additional_notes' => 'Notas adicionales',
        'pickup_date' => 'Fecha de recogida',
        'dropoff_date' => 'Fecha de devolución',
        'pickup_time' => 'Hora de recogida',
        'dropoff_time' => 'Hora de devolución',
        'pickup_location' => 'Lugar de recogida',
        'dropoff_location' => 'Lugar de devolución',
        'car_type' => 'Tipo de coche',
        'service_types' => 'Tipos de servicio',
        'road_types' => 'Tipos de ruta',
        'pickup_city' => 'Ciudad de recogida',
        'dropoff_city' => 'Ciudad de devolución',
        'prefered_date' => 'Fecha preferida',
        'number_of_passengers' => 'Número de pasajeros',
        'number_of_luggage' => 'Número de equipaje',
        'address' => 'Dirección',
        'duration' => 'Duración',
        'propose' => 'Propósito',
        'number_of_people' => 'Número de personas',
        'duration_option_id' => 'Opción de duración',
        'time_preference' => 'Preferencia horaria',
        'activity_type' => 'Tipo de actividad',
    ],

];
