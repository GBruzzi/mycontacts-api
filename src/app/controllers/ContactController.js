const { response } = require('express');
const ContactsRepository = require('../repositories/ContactsRepository');

class ContactController {
  //Mostrar todos os registros
  async index(request,response) {
    const { orderBy } = request.query;
    const contacts = await ContactsRepository.findAll(orderBy);

    response.json(contacts);
  }

  //Exibir um registro
  async show(request,response) {
    const { id } = request.params;

    //procura ID
    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      //404 not found

      return response.status(404).json({ error : 'User not found' })
    }

    response.json(contact);
  }

  //Criar novo registro
  async store(request,response) {
    const { name, email,  phone, category_id, } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const contactExists = await ContactsRepository.findByEmail(email);

    if (contactExists) {
      return response.status(400).json({ error: 'This email already exists' });

    }

    const contact = await ContactsRepository.create({
      name, email,  phone, category_id,
    })

    response.json(contact);
    }

  //  Editar um registro
  async update(request,response) {
    const { id } = request.params;
    const { name, email,  phone, category_id, } = request.body;

    const contactExists = await ContactsRepository.findById(id);
    if (!contactExists) {
      return response.status(404).json({error: 'User not found'})
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const contacByEmail = await ContactsRepository.findByEmail(email);

    if (contacByEmail && contacByEmail.id != id) {
      return response.status(400).json({ error: 'This email already exists' });

    }

    const contact = await ContactsRepository.update(id, {
      name, email,  phone, category_id,
    });

    response.json(contact);
  }

  async delete(request,response) {
    const { id } = request.params;

    //procura ID
    const contact = await ContactsRepository.findById(id);

    // retornar um user not found caso o ID não exista (opcional)
    if (!contact) {
      //404 not found

      return response.status(404).json({ error : 'User not found' })
    }

    await ContactsRepository.delete(id);

    //204 : No content
    response.sendStatus(204);
  }
}

module.exports = new ContactController();
