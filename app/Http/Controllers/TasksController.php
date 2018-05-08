<?php

namespace App\Http\Controllers;

use App\Task;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class TasksController extends Controller
{
    public function index() {
        // return Task::with('comments')->get();
        return Task::select(
            'id',
            'name',
            'status'
        )->withCount('comments')->get();
    }

    public function get(Task $task) {
        $task->comments;
        return $task;
    }

    public function comments(Task $task) {
        return $task->comments;
    }

    public function create(Request $request) {
        $newTask = Task::create($request->all());
        $newTask->comments;
        return $newTask;
    }

    public function update(Task $task, Request $request) {
        $task->update($request->all());
    }

    public function delete(Task $task) {
        $task->delete();
    }
}
