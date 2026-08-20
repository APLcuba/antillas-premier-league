<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\News;
use App\Models\Notification;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function store(Request $request)
    {
        // Validar
        $request->validate([
            'content' => 'required|string|min:1|max:1000',
            'commentable_type' => 'required|string',
            'commentable_id' => 'required|integer',
            'parent_id' => 'nullable|exists:comments,id',
        ]);

        // Crear el comentario
        $comment = Comment::create([
            'user_id' => auth()->id(),
            'commentable_type' => $request->commentable_type,
            'commentable_id' => $request->commentable_id,
            'parent_id' => $request->parent_id,
            'content' => $request->content,
            'is_approved' => true,
        ]);

        // Cargar el usuario
        $comment->load('user');

        // Devolver respuesta JSON
        return response()->json([
            'success' => true,
            'comment' => $comment,
        ]);
    }

    public function destroy($id)
    {
        $comment = Comment::findOrFail($id);
        
        if ($comment->user_id !== auth()->id() && auth()->user()->role !== 'admin') {
            return response()->json(['error' => 'No autorizado'], 403);
        }
        
        $comment->delete();
        
        return response()->json(['success' => true]);
    }
}