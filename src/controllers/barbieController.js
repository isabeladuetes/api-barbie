import dados from "./../models/dados.js";
const { barbies } = dados;

// GET /barbies
const getAllBarbies = (req, res) => {
  res.status(200).json({
    total: barbies.length,
    barbies: barbies,
  });
};

//Criar a rota do GetById
const getBarbieById = (req, res) => {
  let id = parseInt(req.params.id);

  const barbie = barbies.find((b) => b.id === id);

  res.status(200).json({
    success: true,
    barbie: barbie,
  });
};

//Create Barbie
const createBarbie = (req, res) => {
  const { nome, profissao, anoLancamento } = req.body;

  if (!nome || !profissao || !anoLancamento) {
    return res.status(400).json({
      success: false,
      message: "Nome, professão e ano de Lançamento são obrigatórios!",
    });
  }

  const novaBarbie = {
    id: barbies.length + 1,
    nome: nome,
    profissao: profissao,
    anoLancamento: anoLancamento,
  };

  //Push no array
  barbies.push(novaBarbie);

  res.status(201).json({
    success: true,
    message: "Barbie cadastrada com sucesso!",
    barbie: novaBarbie,
  });
};

//Deletando Barbie
const deleteBarbie = (req, res) => {
    const { id } = req.params;

    // Validar ID
    if (isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "ID deve ser um número válido!"
        });
    }

    const idParaApagar = parseInt(id);
    
    // Verificar se barbie existe antes de remover
    const barbieParaRemover = barbies.find(b => b.id === idParaApagar);
    if (!barbieParaRemover) {
        return res.status(404).json({
            success: false,
            message: `Barbie com ID ${id} não encontrado para remoção!`
        });
    }

    // Remover barbie usando filter
    const barbiesFiltrados = barbies.filter(barbie => barbie.id !== idParaApagar);
    
    // Atualizar array global
    barbies.splice(0, barbies.length, ...barbiesFiltrados);

    res.status(200).json({
        success: true,
        message: `Barbie ${barbieParaRemover.nome} (ID: ${id}) foi removido dos registros.`,
        barbieRemovido: barbieParaRemover
    });
};

// PUT /barbies/:id - Atualizar barbie existente por ID
const updateBarbie = (req, res) => {
  const { id } = req.params;
  const { nome, profissao, anoLancamento } = req.body;

  // Validar ID
  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: "ID deve ser um número válido!",
    });
  }

  const idParaEditar = parseInt(id);

  // Verificar se barbie existe
  const barbieExiste = barbies.find((b) => b.id === idParaEditar);
  if (!barbieExiste) {
    return res.status(404).json({
      success: false,
      message: `Barbie com ID ${id} não encontrada para atualização!`,
    });
  }

  // Atualizar barbie usando map
  const barbieAtualizadas = barbies.map((barbie) =>
    barbie.id === idParaEditar
      ? {
          ...barbie,
          ...(nome && { nome }),
          ...(profissao && { profissao }),
          ...(anoLancamento && { anoLancamento: parseInt(anoLancamento) }),
        }
      : barbie
  );

  // Atualizar array global
  barbies.splice(0, barbies.length, ...barbieAtualizadas);

  // Buscar barbie atualizado para retorno
  const barbieNova = barbies.find((b) => b.id === idParaEditar);

  res.status(200).json({
    success: true,
    message: `Dados da barbie ID ${id} atualizados com sucesso!`,
    barbie: barbieNova,
  });
};

export {
  getAllBarbies,
  getBarbieById,
  createBarbie,
  deleteBarbie,
  updateBarbie,
};
