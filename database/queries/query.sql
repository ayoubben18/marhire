ALTER TABLE `listings` 
ADD `vehicule_type` INT NULL DEFAULT NULL AFTER `car_model`, 
ADD `vehicule_model` INT NULL DEFAULT NULL AFTER `vehicule_type`;
ALTER TABLE `bookings` ADD `city_id` INT NULL DEFAULT NULL AFTER `car_type`;
TRUNCATE `bookings`;
TRUNCATE `booking_addons`;
ALTER TABLE `bookings` ADD `activity_type` INT NULL DEFAULT NULL AFTER `category_id`;
