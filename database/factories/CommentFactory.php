<?php

use Faker\Generator;

$factory->define(App\Comment::class, function (Faker $faker) {
    return [
        'text' => $faker->paragraph()
    ];
});
