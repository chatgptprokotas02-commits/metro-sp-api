export async function obterStatus() {
    // Aqui retornamos os dados. 
    // Se você tiver um código de webscraping (axios/cheerio), coloque aqui depois.
    // Por enquanto, deixamos fixo para garantir que a API suba.
    return [
        { "linha": "1-Azul", "status": "Operação Normal" },
        { "linha": "2-Verde", "status": "Operação Normal" },
        { "linha": "3-Vermelha", "status": "Operação Normal" },
        { "linha": "4-Amarela", "status": "Operação Normal" },
        { "linha": "5-Lilás", "status": "Operação Normal" },
        { "linha": "15-Prata", "status": "Operação Normal" }
    ];
}
