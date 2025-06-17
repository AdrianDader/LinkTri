<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Repository;
use Illuminate\Support\Facades\Auth;
use App\Models\Enlace;
use Illuminate\Support\Str;

class EnlaceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, $repositoryId)
    {
        // Verificamos si el repositorio pertenece al usuario autenticado
        $repository = Repository::where('id', $repositoryId)
                                ->where('user_id', auth()->user()->id)
                                ->first();

        // Si no encontramos el repositorio o no pertenece al usuario, devolvemos error 404
        if (!$repository) {
            return response()->json(['message' => 'Repositorio no encontrado o no autorizado.'], 404);
        }
        $enlaces = Enlace::where('repository_id', $repositoryId)->get();

        // Devolvemos los enlaces encontrados
        return response()->json($enlaces);
    }


    /**
     * Store a newly created resource in storage.
     */


     public function store(Request $request, $repositoryId)
    {
        // Validamos los datos de entrada
        $validated = $request->validate([
            'url' => 'required|url',
            'name' => 'required|string|max:255',
            'visibility' => 'required|in:public,private',
            'shared' => 'nullable|boolean',
        ]);

        // Verificamos si el repositorio existe
        $repository = Repository::find($repositoryId);

        if (!$repository) {
            return response()->json(['message' => 'Repositorio no encontrado.'], 404);
        }

        // Creamos el enlace con el repository_id
        $enlace = new Enlace($validated);
        $enlace->repository_id = $repository->id; 
        $enlace->public_link = 'https://example.com/' . Str::random(10);
        $enlace->private_link = 'https://example.com/private/' . Str::random(12); 
        $enlace->save();

        return response()->json(['message' => 'Enlace ' . $enlace->id .' creado correctamente.', 'enlace' => $enlace], 201);
    }

     

    /**
     * Display the specified resource.
     */


     public function show($repositoryId, $enlaceId)
    {
        // Verificamos que el repositorio exista
        $repository = Repository::find($repositoryId);

        if (!$repository) {
            return response()->json(['message' => 'Repositorio no encontrado.'], 404);
        }

        // Verificamos que el repositorio pertenece al usuario autenticado
        if ($repository->user_id !== Auth::id()) {
            return response()->json(['message' => 'No tienes permiso para ver este repositorio.'], 403);
        }

        // Buscamos el enlace por ID
        $enlace = Enlace::where('repository_id', $repositoryId)->find($enlaceId);

        if (!$enlace) {
            return response()->json(['message' => 'Enlace no encontrado.'], 404);
        }

        // Si todo está correcto, devolvemos el enlace
        return response()->json(['message' => 'enlace encontrado', $enlace], 200);
    }


     

    /**
     * Update the specified resource in storage.
     */


     public function update(Request $request, $repositoryId, $enlaceId)
    {
        // Verificamos que el repositorio exista
        $repository = Repository::find($repositoryId);

        if (!$repository) {
            return response()->json(['message' => 'Repositorio no encontrado.'], 404);
        }

        // Verificamos que el repositorio pertenece al usuario autenticado
        if ($repository->user_id !== Auth::id()) {
            return response()->json(['message' => 'No tienes permiso para actualizar este repositorio.'], 403);
        }

        // Buscamos el enlace dentro del repositorio
        $enlace = Enlace::where('repository_id', $repositoryId)->find($enlaceId);

        if (!$enlace) {
            return response()->json(['message' => 'Enlace no encontrado.'], 404);
        }

        // Verificamos que el enlace pertenece al repositorio
        if ($enlace->repository_id !== $repository->id) {
            return response()->json(['message' => 'Este enlace no pertenece a este repositorio.'], 404);
        }

        // Validamos los datos
        $validated = $request->validate([
            'url' => 'required|url',
            'name' => 'required|string|max:255',
            'visibility' => 'required|in:public,private',
            'shared' => 'nullable|boolean',
        ]);

        // Actualizamos el enlace con los datos validados
        $enlace->update($validated);

        // Regeneramos los links públicos y privados si se actualizan
        $enlace->public_link = 'https://example.com/' . Str::random(10);
        $enlace->private_link = 'https://example.com/private/' . Str::random(12);

        $enlace->save();

        return response()->json(['message' => 'Enlace ' . $enlace->id . ' actualizado correctamente.'], 200);
    }

     

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($repositoryId, $enlaceId)
    {
        // Verificamos que el repositorio exista
        $repository = Repository::find($repositoryId);

        if (!$repository) {
            return response()->json(['message' => 'Repositorio no encontrado.'], 404);
        }

        // Verificamos que el repositorio pertenece al usuario autenticado
        if ($repository->user_id !== Auth::id()) {
            return response()->json(['message' => 'No tienes permiso para eliminar este repositorio.'], 403);
        }

        // Buscamos el enlace por ID
        $enlace = Enlace::where('repository_id', $repositoryId)->find($enlaceId);

        if (!$enlace) {
            return response()->json(['message' => 'Enlace ' . $enlaceId . ' no encontrado.'], 404);
        }

        // Verificamos que el enlace pertenece al repositorio
        if ($enlace->repository_id !== $repository->id) {
            return response()->json(['message' => 'Enlace ' . $enlaceId . ' no pertenece a este repositorio.'], 404);
        }

        // Eliminamos el enlace
        $enlace->delete();

        return response()->json(['message' => 'Enlace ' . $enlaceId . ' eliminado correctamente.'], 200);
    }

}
