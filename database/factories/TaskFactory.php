<?php

use Faker\Generator;

$factory->define(App\Task::class, function (Faker $faker) {
    return [
        'name' => $faker->sentence(),
        'description' => $faker->paragraph(),
        'status' => $faker->randomElement(['todo', 'doing', 'done'])
    ];
});
