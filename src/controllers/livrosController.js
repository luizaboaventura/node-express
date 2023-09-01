import livros from "../models/Livro.js";

// definição dos métodos 

class LivroController {

    static listarLivros = async (req, res) => {
        await livros.find()
        .populate('autor')
        .then(livros => {
            res.status(200).json(livros)
        })
        .catch (error => {
            console.error('Error:', error);
            res.status(500).json({ error: 'Erro ao resgatar o livro' });
        })
    }

    static listarLivroPorId = async (req,res) => {
        const id = req.params.id;
        await livros.findById(id)
        .populate('autor', 'nome')
        .then(livro =>
            res.status(200).json(livro)
        )
        .catch (error => {
            res.status(400).send({ message: `${error.message} - Id do livro não localizado.` });
        })
    }

    static cadastrarLivro = async (req, res) => {
        let livro = new livros(req.body);
        try {
            await livro.save();
            res.status(201).send(livro.toJSON());
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send({ message: `${error.message} - falha ao cadastrar livro.` });
        }
    }

    static atualizarLivro = async (req, res) => {
        const id = req.params.id;

        try{
            await livros.findByIdAndUpdate(id, {$set: req.body})
            res.status(200).send({message: 'Livro atualizado com sucesso.'})
        } catch(error) {
            console.error('Error:', error);
            res.status(500).send({ message: `${error.message} - falha ao atualizar livro.` });
        }

    }

    static excluirLivro =  async (req, res) => {
        const id = req.params.id;

        try{
            await livros.findByIdAndDelete(id);
            res.status(200).send({message: 'Livro excluído com sucesso.'})
        } catch(error) {
            console.error('Error:', error);
            res.status(500).send({ message: `${error.message} - falha ao excluir livro.` });
        }
    }

    static listarLivroPorEditora = (req, res) => {
        const editora = req.query.editora;
        livros.find({'editora': editora})
        .then((livros) =>
            res.status(200).json(livros)
        )        
        .catch (error => {
            console.error('Error:', error);
            res.status(500).json({ message: `${error.message}` });
        })
    }
}

export default LivroController;