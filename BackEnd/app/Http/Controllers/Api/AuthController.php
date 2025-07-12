<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (!Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'Credenciales incorrectas.',
            ], 401);
        }

        // ⚠️ CAMBIADO: usamos Auth::user() en lugar de $request->user()
        $user = Auth::user();

        $token = $user->createToken('API Token')->plainTextToken;

        // ✅ Estructura uniforme con REGISTER
        return response()->json([
            'message' => "Usuario {$user->name} logeado correctamente.",
            'user' => $user->only(['id', 'name', 'email', 'role', 'created_at', 'updated_at']),
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }



    public function register(Request $request)
    {
        // Validar la petición
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
        ]);

        // Crear el usuario
        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => 'user', // valor user por defecto
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        // Devolver respuesta
        return response()->json([
            'message' => 'Usuario creado correctamente.',
            'user' => $user,
            'api_access_login' => url('/api/login'),
            'payload_example_login' => [
                'email' => 'example@example.com',
                'password' => '1234',
            ],
            'access_token' => $token,
            'token_type' => 'Bearer',
        ], 201);
    }
}
