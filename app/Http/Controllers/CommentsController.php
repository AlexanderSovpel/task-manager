<?php

namespace App\Http\Controllers;

use App\Comment;
use Illuminate\Http\Request;

class CommentsController extends Controller
{
    public function index() {
        return Comment::all();
    }

    public function get(Comment $comment) {
        return $comment;
    }

    public function create(Request $request) {
        $newComment = Comment::create($request->all());
        return $newComment;
    }

    public function update(Comment $comment, Request $request) {
        $comment->update($request->all());
    }

    public function delete(Comment $comment) {
        $comment->delete();
    }
}
