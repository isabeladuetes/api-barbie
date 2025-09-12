import dados from "./../models/dados.js";
const { barbies } = dados;

// GET /barbies 
const getAllBarbies = (req, res) => {
    const resultado = barbies;

    res.status(200).json({
        total: resultado.length,
        barbies: resultado
    });
};

//Criar a rota do GetById - Bruxos
const getBarbieById = (req, res) => {
    let id = parseInt(req.params.id);

    const barbie = barbies.find((b) => b.id === id);

    res.status(200).json({
        success: true,
        barbie: barbie
    });
};

const createBarbie = (req, res) => {

    const { nome, profissao, anoLancamento } = req.body;

    if (!nome || !profissao || !anoLancamento) {
        return res.status(400).json({
            success: false,
            message: "Nome, professão e ano de Lançamento são obrigatórios!"
        });
    }
};

const novaBarbie = {
    id: barbies.length + 1,
    nome: nome,
    profissao: profissao,
    anoLancamento: anoLancamento,
}

//Push no array
barbies.push(novaBarbie);

res.status(201).json({
    success: true,
    message: "Barbie cadastrada com sucesso!",
    barbie: novaBarbie
});

//Deletando Barbie
const deleteBarbie = (req, res) => {
    let id = parseInt(req.params.id);

    const barbieParaRemover = barbies.find(b => b.id === id);

    if (barbieParaRemover) {
        return res.status(404).json({
            success: false,
            message: `Essa barbie não existe, ${id}`
        });
    }
    const barbieFiltradas = barbies.filter(barbie => barbie.id !== id);

    barbies.splice(0, barbies.length, ...barbieFiltradas);

    res.status(200).json({
        success: true,
        message: "A barbie foi removida com sucesso!",
        barbieRemovida: barbieParaRemover
    });
}

export { getAllBarbies, getBarbieById, createBarbie, deleteBarbie };