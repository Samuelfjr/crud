let people = [
  { id: 1, name: "João Silva", email: "joao@example.com" },
  { id: 2, name: "Maria Souza", email: "maria@example.com" },
];

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json(people);
  } else if (req.method === "POST") {
    const { name, email } = req.body;
    const newPerson = { id: people.length + 1, name, email };
    people.push(newPerson);
    res.status(201).json(newPerson);
  } else if (req.method === "PUT") {
    const { id } = req.query;
    const { name, email } = req.body;
    const personIndex = people.findIndex(
      (person) => person.id === parseInt(id)
    );
    if (personIndex !== -1) {
      people[personIndex] = { id: parseInt(id), name, email };
      res.status(200).json(people[personIndex]);
    } else {
      res.status(404).json({ message: "Pessoa não encontrada" });
    }
  } else if (req.method === "DELETE") {
    const { id } = req.query;
    const personIndex = people.findIndex(
      (person) => person.id === parseInt(id)
    );
    if (personIndex !== -1) {
      people.splice(personIndex, 1);
      res.status(200).json({ message: "Pessoa excluída com sucesso" });
    } else {
      res.status(404).json({ message: "Pessoa não encontrada" });
    }
  } else {
    res.status(405).json({ message: "Método não permitido" });
  }
}
