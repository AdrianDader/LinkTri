<?php


namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Tag;

class TagSeeder extends Seeder
{
    public function run(): void
    {
        $tags = [
            // Académico
            'Matemáticas', 'Física', 'Química', 'Biología', 'Geografía',
            'Historia', 'Lengua', 'Literatura', 'Arte', 'Música',
            'Tecnología', 'Informática', 'Robótica', 'Inteligencia Artificial', 'Programación',
            'Economía', 'Filosofía', 'Sociología', 'Psicología', 'Antropología',
            'Derecho', 'Política', 'Ecología', 'Astronomía', 'Medicina',
            'Ingeniería', 'Estadística', 'Contabilidad', 'Marketing', 'Ciencias Ambientales',

            // Recetas y Alimentación
            'Recetas', 'Cocina', 'Gastronomía', 'Dieta', 'Alimentación saludable',
            'Postres', 'Comida rápida', 'Comida vegana', 'Cocina fácil', 'Comida tradicional',

            // Entretenimiento y Cultura
            'Cine', 'Televisión', 'Videojuegos', 'Música en vivo', 'Teatro',
            'Series', 'Libros', 'Comedia', 'Arte contemporáneo', 'Danza',

            // Deportes
            'Fútbol', 'Baloncesto', 'Tenis', 'Atletismo', 'Natación',
            'Ciclismo', 'Fórmula 1', 'Deportes extremos', 'Gimnasia', 'Boxeo',

            // Estilos de vida y bienestar
            'Salud', 'Ejercicio físico', 'Mindfulness', 'Meditación', 'Yoga',
            'Fitness', 'Motivación', 'Bienestar emocional', 'Cuidado personal', 'Autoayuda',

            // Otros temas
            'Viajes', 'Fotografía', 'Tecnología móvil', 'Redes sociales', 'Educación',
            'Emprendimiento', 'Negocios', 'Finanzas', 'Trabajo remoto', 'Automóviles'
        ];

        foreach ($tags as $name) {
            Tag::create(['name' => $name]);
        }
    }
}
