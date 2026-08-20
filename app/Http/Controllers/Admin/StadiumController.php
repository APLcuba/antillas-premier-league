<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Stadium;
use Illuminate\Http\Request;

class StadiumController extends Controller
{
    public function index()
    {
        $stadiums = Stadium::orderBy('name')->get();

        return inertia('Admin/Stadiums/Index', [
            'stadiums' => $stadiums,
        ]);
    }

    public function create()
    {
        return inertia('Admin/Stadiums/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:stadiums',
            'capacity' => 'nullable|integer|min:100',
            'location' => 'nullable|string|max:255',
            'image_path' => 'nullable|string|max:255',
        ]);

        Stadium::create($request->all());

        return redirect()->route('admin.stadiums.index')
            ->with('success', 'Estadio creado correctamente.');
    }

    public function edit(Stadium $stadium)
    {
        return inertia('Admin/Stadiums/Edit', [
            'stadium' => $stadium,
        ]);
    }

    public function update(Request $request, Stadium $stadium)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:stadiums,name,' . $stadium->id,
            'capacity' => 'nullable|integer|min:100',
            'location' => 'nullable|string|max:255',
            'image_path' => 'nullable|string|max:255',
        ]);

        $stadium->update($request->all());

        return redirect()->route('admin.stadiums.index')
            ->with('success', 'Estadio actualizado correctamente.');
    }

    public function destroy(Stadium $stadium)
    {
        $stadium->delete();
        return redirect()->route('admin.stadiums.index')
            ->with('success', 'Estadio eliminado correctamente.');
    }
}