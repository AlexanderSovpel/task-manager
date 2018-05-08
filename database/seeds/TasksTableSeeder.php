<?php

use Faker\Factory;
use Illuminate\Database\Seeder;

class TasksTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Task::class, 8)->create()->each(function($task) {
            $task->comments()->save(factory(App\Comment::class)->make());
        });
    }
}
