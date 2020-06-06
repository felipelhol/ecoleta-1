import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';

export default class CreateItems implements Seeder {
  private items = [
    {
      title: 'Lâmpadas',
      image: 'lampadas.svg',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      title: 'Pilhas e baterias',
      image: 'baterias.svg',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      title: 'Papéis e Papelão',
      image: 'papeis-papelao.svg',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      title: 'Resíduos Eletrônicos',
      image: 'eletronicos.svg',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      title: 'Resíduos Orgânicos',
      image: 'organicos.svg',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      title: 'Óleo de Cozinha',
      image: 'oleo.svg',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  public async run(_: Factory, connection: Connection): Promise<void> {
    await connection
      .createQueryBuilder()
      .insert()
      .into('items')
      .values(this.items)
      .execute();
  }
}
