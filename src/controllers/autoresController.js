import autores from "../models/Autor.js";

// definição dos métodos 

class AutorController {

    static listarAutores = async (req, res) => {
        try {
            const autoresResultado = await autores.find();
            res.status(200).json(autoresResultado);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Erro ao resgatar o autor' });
        }
    }

    static listarAutorPorId = async (req,res) => {
        const id = req.params.id;
        try {
            const autor = await autores.findById(id)
            res.status(200).json(autor)
        } catch (error) {
            res.status(400).send({ message: `${error.message} - Id do autor não localizado.` });
        }
    }

    static cadastrarAutor = async (req, res) => {
        let autor = new autores(req.body);
        try {
            await autor.save();
            res.status(201).send(autor.toJSON());
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send({ message: `${error.message} - falha ao cadastrar autor.` });
        }
    }

    static atualizarAutor = async (req, res) => {
        const id = req.params.id;

        try{
            await autores.findByIdAndUpdate(id, {$set: req.body})
            res.status(200).send({message: 'autor atualizado com sucesso.'})
        } catch(error) {
            console.error('Error:', error);
            res.status(500).send({ message: `${error.message} - falha ao atualizar autor.` });
        }

    }

    static excluirAutor =  async (req, res) => {
        const id = req.params.id;

        try{
            await autores.findByIdAndDelete(id);
            res.status(200).send({message: 'autor excluído com sucesso.'})
        } catch(error) {
            console.error('Error:', error);
            res.status(500).send({ message: `${error.message} - falha ao excluir autor.` });
        }
    }
}

export default AutorController;