// Busca a lista de heróis no backend
export async function listHeroes() {
    const res = await fetch('/api/heroes');
    if (!res.ok) throw new Error("Erro ao carregar os heróis");
    return res.json();
}

// Envia um herói novo para o backend salvar
export async function createHero(hero) {
    const res = await fetch('/api/heroes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(hero),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Erro ao cadastrar o herói");
    return data;
}
