<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\News;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class NewsController extends Controller
{
    public function index()
    {
        $news = News::with('author')
            ->orderBy('published_at', 'desc')
            ->get();

        return inertia('Admin/News/Index', [
            'news' => $news,
        ]);
    }

    public function create()
    {
        return inertia('Admin/News/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'excerpt' => 'nullable|string|max:500',
            'category' => 'required|string|max:50',
            'image' => 'nullable|string|max:255',
            'is_published' => 'boolean',
            'published_at' => 'nullable|date',
        ]);

        News::create([
            'title' => $request->title,
            'slug' => Str::slug($request->title),
            'content' => $request->content,
            'excerpt' => $request->excerpt,
            'category' => $request->category,
            'image' => $request->image,
            'is_published' => $request->has('is_published'),
            'published_at' => $request->published_at ?? now(),
            'author_id' => auth()->id(),
        ]);

        return redirect()->route('admin.news.index')
            ->with('success', 'Noticia creada correctamente.');
    }

    public function edit(News $news)
    {
        return inertia('Admin/News/Edit', [
            'news' => $news,
        ]);
    }

    public function update(Request $request, News $news)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'excerpt' => 'nullable|string|max:500',
            'category' => 'required|string|max:50',
            'image' => 'nullable|string|max:255',
            'is_published' => 'boolean',
            'published_at' => 'nullable|date',
        ]);

        $news->update([
            'title' => $request->title,
            'slug' => Str::slug($request->title),
            'content' => $request->content,
            'excerpt' => $request->excerpt,
            'category' => $request->category,
            'image' => $request->image,
            'is_published' => $request->has('is_published'),
            'published_at' => $request->published_at ?? $news->published_at,
        ]);

        return redirect()->route('admin.news.index')
            ->with('success', 'Noticia actualizada correctamente.');
    }

    public function destroy(News $news)
    {
        $news->delete();
        return redirect()->route('admin.news.index')
            ->with('success', 'Noticia eliminada correctamente.');
    }
}