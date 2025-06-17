<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Repository;
use Illuminate\Http\Request;
use App\Models\Tag;

class RepositoryController extends Controller
{


    public function index(Request $request)
{
    $repositories = Repository::where('user_id', $request->user()->id)->get();

    return response()->json($repositories);
}


    public function show(string $id, Request $request)
    {
        $repository = Repository::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->first();

        if (!$repository) {
            return response()->json(['message' => 'Repositorio no encontrado o no autorizado.'], 404);
        }

        return response()->json($repository);
    }



    public function destroy(Request $request, string $id)
    {
        $repository = Repository::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->first();

        if (!$repository) {
            return response()->json(['message' => 'Repositorio no encontrado o no autorizado.'], 404);
        }

        $repository->delete();

        return response()->json(['message' => 'Repositorio eliminado'], 200);
    }



            protected function validateTags(array $tags)
            {
                // Obtener todas las tags de MongoDB
                $existingTags = Tag::pluck('name')->toArray();

                // Verificar si todas las tags enviadas existen en MongoDB
                foreach ($tags as $tag) {
                    if (!in_array($tag, $existingTags)) {
                        return false;  // Si alguna tag no existe, devolvemos false
                    }
                }

                return true;  // Si todas las tags son válidas, retornamos true
            }



    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'visibility' => 'required|in:public,private',
            'shared' => 'boolean',
            'tags' => 'required|array',
        ]);

        // Validar las tags
        if (!$this->validateTags($request->tags)) {
            return response()->json(['message' => 'Etiqueta o etiquetas incorrectas. Revise la documentación.'], 422);
        }

        // 👇🏻 Aquí asignamos el user_id manualmente
        $validated['user_id'] = $request->user()->id;

        $repository = Repository::create($validated);

        return response()->json([
            'message' => 'Repositorio subido correctamente.',
            'ID del repositorio' => $repository->id,
            'URL para gestionar enlaces' => '/api/repository/' . $repository->id . '/enlaces'
        ], 201);
        
    }


    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'visibility' => 'required|in:public,private',
            'shared' => 'boolean',
            'tags' => 'required|array',
        ]);

        if (!$this->validateTags($request->tags)) {
            return response()->json(['message' => 'Etiqueta o etiquetas incorrectas. Revise la documentación.'], 422);
        }

        $repository = Repository::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->first();

        if (!$repository) {
            return response()->json(['message' => 'Repositorio no encontrado o no autorizado.'], 404);
        }

        $repository->update($validated);

        return response()->json(['message' => 'Repositorio actualizado correctamente.'], 200);
    }

}
